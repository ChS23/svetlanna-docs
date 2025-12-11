#!/usr/bin/env python3
"""
Генератор API документации для SVETlANNa.
Парсит docstrings из исходного кода и генерирует MDX файлы.
"""

import ast
import os
import shutil
import subprocess
import sys
from pathlib import Path
from typing import Optional


def clone_or_update_repo(repo_url: str, target_dir: Path) -> None:
    """Клонирует или обновляет репозиторий."""
    if target_dir.exists():
        print(f"Updating {target_dir}...")
        subprocess.run(["git", "-C", str(target_dir), "pull"], check=True)
    else:
        print(f"Cloning {repo_url}...")
        subprocess.run(["git", "clone", "--depth=1", repo_url, str(target_dir)], check=True)


def extract_docstring(node: ast.AST) -> Optional[str]:
    """Извлекает docstring из AST узла."""
    if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef, ast.ClassDef, ast.Module)):
        if node.body and isinstance(node.body[0], ast.Expr):
            if isinstance(node.body[0].value, ast.Constant):
                value = node.body[0].value.value
                if isinstance(value, str):
                    return value
    return None


def extract_function_signature(node: ast.FunctionDef) -> str:
    """Извлекает сигнатуру функции."""
    args = []

    # Positional args
    for i, arg in enumerate(node.args.args):
        arg_str = arg.arg
        if arg.annotation:
            arg_str += f": {ast.unparse(arg.annotation)}"
        # Default values
        defaults_offset = len(node.args.args) - len(node.args.defaults)
        if i >= defaults_offset:
            default = node.args.defaults[i - defaults_offset]
            arg_str += f" = {ast.unparse(default)}"
        args.append(arg_str)

    # *args
    if node.args.vararg:
        arg_str = f"*{node.args.vararg.arg}"
        if node.args.vararg.annotation:
            arg_str += f": {ast.unparse(node.args.vararg.annotation)}"
        args.append(arg_str)

    # **kwargs
    if node.args.kwarg:
        arg_str = f"**{node.args.kwarg.arg}"
        if node.args.kwarg.annotation:
            arg_str += f": {ast.unparse(node.args.kwarg.annotation)}"
        args.append(arg_str)

    # Return type
    returns = ""
    if node.returns:
        returns = f" -> {ast.unparse(node.returns)}"

    return f"({', '.join(args)}){returns}"


def parse_module(file_path: Path) -> dict:
    """Парсит Python модуль и извлекает информацию о классах и функциях."""
    with open(file_path, "r", encoding="utf-8") as f:
        source = f.read()

    try:
        tree = ast.parse(source)
    except SyntaxError:
        return {"classes": [], "functions": [], "docstring": None}

    module_info = {
        "docstring": extract_docstring(tree),
        "classes": [],
        "functions": [],
    }

    for node in ast.iter_child_nodes(tree):
        if isinstance(node, ast.ClassDef):
            class_info = {
                "name": node.name,
                "docstring": extract_docstring(node),
                "methods": [],
                "bases": [ast.unparse(base) for base in node.bases],
            }

            for item in node.body:
                if isinstance(item, ast.FunctionDef):
                    method_info = {
                        "name": item.name,
                        "signature": extract_function_signature(item),
                        "docstring": extract_docstring(item),
                        "is_classmethod": any(
                            isinstance(d, ast.Name) and d.id == "classmethod"
                            for d in item.decorator_list
                        ),
                        "is_staticmethod": any(
                            isinstance(d, ast.Name) and d.id == "staticmethod"
                            for d in item.decorator_list
                        ),
                        "is_property": any(
                            isinstance(d, ast.Name) and d.id == "property"
                            for d in item.decorator_list
                        ),
                    }
                    class_info["methods"].append(method_info)

            module_info["classes"].append(class_info)

        elif isinstance(node, ast.FunctionDef):
            func_info = {
                "name": node.name,
                "signature": extract_function_signature(node),
                "docstring": extract_docstring(node),
            }
            module_info["functions"].append(func_info)

    return module_info


def format_docstring(docstring: Optional[str]) -> str:
    """Форматирует docstring для MDX с поддержкой numpy-style."""
    if not docstring or not isinstance(docstring, str):
        return ""

    # Убираем лишние отступы
    lines = docstring.strip().split("\n")
    if len(lines) > 1:
        # Определяем минимальный отступ (кроме первой строки)
        min_indent = float("inf")
        for line in lines[1:]:
            if line.strip():
                indent = len(line) - len(line.lstrip())
                min_indent = min(min_indent, indent)

        if min_indent < float("inf"):
            lines = [lines[0]] + [line[int(min_indent):] if len(line) > min_indent else line for line in lines[1:]]

    # Парсим numpy-style docstring
    result_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Определяем секции numpy docstring
        if stripped in ("Parameters", "Returns", "Raises", "Yields", "Examples", "Notes", "Attributes"):
            # Проверяем следующую строку на ---
            if i + 1 < len(lines) and lines[i + 1].strip().startswith("---"):
                section_name = stripped
                i += 2  # Пропускаем заголовок и ---

                # Собираем все параметры секции
                params = []
                while i < len(lines):
                    param_line = lines[i]
                    param_stripped = param_line.strip()

                    # Пустая строка
                    if not param_stripped:
                        i += 1
                        continue

                    # Новая секция - выходим
                    if param_stripped in ("Parameters", "Returns", "Raises", "Yields", "Examples", "Notes", "Attributes"):
                        break

                    # Проверяем формат "name : type"
                    if " : " in param_line and not param_line.startswith("    "):
                        parts = param_stripped.split(" : ", 1)
                        param_name = parts[0]
                        param_type = parts[1] if len(parts) > 1 else ""

                        # Собираем описание
                        i += 1
                        desc_lines = []
                        while i < len(lines):
                            desc_line = lines[i]
                            desc_stripped = desc_line.strip()
                            if desc_line.startswith("    ") or desc_line.startswith("  "):
                                desc_lines.append(desc_stripped)
                                i += 1
                            elif not desc_stripped:
                                i += 1
                                break
                            else:
                                break

                        desc_text = " ".join(desc_lines) if desc_lines else ""
                        params.append((param_name, param_type, desc_text))
                    else:
                        # Просто тип (для Returns)
                        type_name = param_stripped
                        i += 1
                        desc_lines = []
                        while i < len(lines):
                            desc_line = lines[i]
                            desc_stripped = desc_line.strip()
                            if desc_line.startswith("    ") or desc_line.startswith("  "):
                                desc_lines.append(desc_stripped)
                                i += 1
                            elif not desc_stripped:
                                i += 1
                                break
                            else:
                                break

                        desc_text = " ".join(desc_lines) if desc_lines else ""
                        params.append((None, type_name, desc_text))

                # Генерируем вывод для секции
                if params:
                    if section_name == "Parameters":
                        result_lines.append("\n<details open>")
                        result_lines.append(f"<summary className=\"cursor-pointer font-semibold text-sm py-2\">📥 Параметры</summary>\n")
                        result_lines.append("| Параметр | Тип | Описание |")
                        result_lines.append("|:---------|:----|:---------|")
                        for name, ptype, desc in params:
                            # Экранируем | в описании
                            desc_safe = desc.replace("|", "\\|")
                            result_lines.append(f"| `{name}` | `{ptype}` | {desc_safe} |")
                        result_lines.append("\n</details>\n")
                    elif section_name == "Returns":
                        result_lines.append("\n<details open>")
                        result_lines.append(f"<summary className=\"cursor-pointer font-semibold text-sm py-2\">📤 Возвращает</summary>\n")
                        for name, ptype, desc in params:
                            if name:
                                result_lines.append(f"**`{name}`** : `{ptype}`")
                            else:
                                result_lines.append(f"**`{ptype}`**")
                            if desc:
                                result_lines.append(f"\n{desc}\n")
                        result_lines.append("\n</details>\n")
                    elif section_name == "Raises":
                        result_lines.append("\n<details>")
                        result_lines.append(f"<summary className=\"cursor-pointer font-semibold text-sm py-2\">⚠️ Исключения</summary>\n")
                        for name, ptype, desc in params:
                            if name:
                                result_lines.append(f"- **`{name}`** : `{ptype}` — {desc}")
                            else:
                                result_lines.append(f"- **`{ptype}`** — {desc}")
                        result_lines.append("\n</details>\n")
                    else:
                        # Другие секции - простой список
                        result_lines.append(f"\n**{section_name}**\n")
                        for name, ptype, desc in params:
                            if name:
                                result_lines.append(f"- `{name}` : *{ptype}* — {desc}")
                            else:
                                result_lines.append(f"- *{ptype}* — {desc}")
                continue

        result_lines.append(line)
        i += 1

    result = "\n".join(result_lines)

    # Экранируем фигурные скобки для MDX
    result = result.replace("{", "&#123;").replace("}", "&#125;")

    return result


def generate_class_mdx(class_info: dict, heading_level: int = 3) -> str:
    """Генерирует MDX для класса с улучшенным форматированием."""
    h = "#" * heading_level
    h_method = "#" * (heading_level + 1)

    lines = [f"{h} {class_info['name']}"]

    # Badges для наследования
    if class_info["bases"]:
        bases_badges = " ".join([f"`{b}`" for b in class_info["bases"]])
        lines.append(f"\n<small>Наследует: {bases_badges}</small>")

    if class_info["docstring"]:
        lines.append(f"\n{format_docstring(class_info['docstring'])}")

    # Properties в карточках
    properties = [m for m in class_info["methods"] if m["is_property"] and not m["name"].startswith("_")]
    if properties:
        lines.append(f"\n{h_method} Свойства\n")
        lines.append("<div className=\"grid grid-cols-1 md:grid-cols-2 gap-4 my-4\">")
        for prop in properties:
            doc = format_docstring(prop["docstring"]) if prop["docstring"] else ""
            # Извлекаем первую строку описания
            first_line = doc.split("\n")[0] if doc else ""
            lines.append(f"""
<div className="border rounded-lg p-4 dark:border-neutral-700">
  <code className="text-sm font-semibold">{prop['name']}</code>
  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{first_line}</p>
</div>""")
        lines.append("</div>\n")

    # Class methods (factories)
    classmethods = [m for m in class_info["methods"]
                    if m["is_classmethod"] and not m["name"].startswith("_")]
    if classmethods:
        lines.append(f"\n{h_method} Фабричные методы\n")
        for method in classmethods:
            lines.append(generate_method_mdx(method, "classmethod"))

    # Regular methods
    public_methods = [m for m in class_info["methods"]
                      if not m["name"].startswith("_")
                      and not m["is_property"]
                      and not m["is_classmethod"]
                      and not m["is_staticmethod"]
                      or m["name"] == "__init__"]

    if public_methods:
        lines.append(f"\n{h_method} Методы\n")
        for method in public_methods:
            badge = "constructor" if method["name"] == "__init__" else None
            lines.append(generate_method_mdx(method, badge))

    return "\n".join(lines)


def generate_method_mdx(method: dict, badge: str = None) -> str:
    """Генерирует MDX для метода с улучшенным форматированием."""
    lines = []

    # Заголовок с badge
    badge_html = f" <small className=\"px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs\">{badge}</small>" if badge else ""

    lines.append(f"<div className=\"border-l-4 border-blue-500 pl-4 my-6\">")
    lines.append(f"\n**`{method['name']}`**{badge_html}\n")

    # Сигнатура в блоке кода
    sig = method['signature']
    lines.append(f"```python\n{method['name']}{sig}\n```\n")

    if method["docstring"]:
        lines.append(format_docstring(method["docstring"]))

    lines.append("</div>\n")

    return "\n".join(lines)


def generate_function_mdx(func_info: dict) -> str:
    """Генерирует MDX для функции."""
    lines = [f"### `{func_info['name']}{func_info['signature']}`"]

    if func_info["docstring"]:
        lines.append(f"\n{format_docstring(func_info['docstring'])}")

    return "\n".join(lines)


# Описания модулей
MODULE_DESCRIPTIONS = {
    "core": "Основные классы для работы с оптическими симуляциями",
    "elements": "Оптические элементы: линзы, апертуры, дифракционные слои, SLM и др.",
    "networks": "Нейронные сети и оптические системы",
    "specs": "Спецификации параметров для экспорта и сериализации",
    "phase_retrieval_problem": "Алгоритмы восстановления фазы",
    "visualization": "Инструменты визуализации",
    "detector": "Детекторы излучения",
}

# Какие классы/функции экспортировать из корневых файлов
CORE_EXPORTS = {
    "wavefront.py": ["Wavefront", "mul"],
    "simulation_parameters.py": ["SimulationParameters", "Axes"],
    "parameters.py": ["Parameter", "ConstrainedParameter"],
    "setup.py": ["LinearOpticalSetup"],
    "clerk.py": ["Clerk"],
    "detector.py": ["Detector", "IntensityDetector", "AmplitudeDetector"],
}


def generate_core_page(svetlanna_pkg: Path) -> tuple[str, dict]:
    """Генерирует страницу Core с основными классами."""
    all_classes = []
    all_functions = []

    for filename, exports in CORE_EXPORTS.items():
        filepath = svetlanna_pkg / filename
        if filepath.exists():
            module_info = parse_module(filepath)

            # Filter to only exported items
            for cls in module_info["classes"]:
                if cls["name"] in exports:
                    all_classes.append(cls)

            for func in module_info["functions"]:
                if func["name"] in exports:
                    all_functions.append(func)

    lines = [
        "# Core",
        "",
        MODULE_DESCRIPTIONS["core"],
        "",
        "```python",
        "from svetlanna import Wavefront, SimulationParameters, Parameter",
        "```",
    ]

    if all_classes:
        lines.append("\n## Классы\n")
        for cls in all_classes:
            lines.append(generate_class_mdx(cls))
            lines.append("")

    if all_functions:
        lines.append("\n## Функции\n")
        for func in all_functions:
            if not func["name"].startswith("_"):
                lines.append(generate_function_mdx(func))
                lines.append("")

    module_info = {"classes": all_classes, "functions": all_functions}
    return "\n".join(lines), module_info


def generate_module_mdx(module_name: str, module_info: dict, submodule: bool = False) -> str:
    """Генерирует MDX для модуля."""
    title = module_name.replace("_", " ").title()
    lines = [f"# {title}"]

    desc = MODULE_DESCRIPTIONS.get(module_name, "")
    if desc:
        lines.append(f"\n{desc}")

    if module_info["docstring"]:
        lines.append(f"\n{format_docstring(module_info['docstring'])}")

    # Import example
    if submodule:
        lines.append(f"\n```python\nfrom svetlanna.{module_name} import ...\n```")
    else:
        lines.append(f"\n```python\nimport svetlanna\n```")

    # Classes
    if module_info["classes"]:
        lines.append("\n## Классы\n")
        for class_info in module_info["classes"]:
            lines.append(generate_class_mdx(class_info))
            lines.append("")

    # Functions
    public_functions = [f for f in module_info["functions"] if not f["name"].startswith("_")]
    if public_functions:
        lines.append("\n## Функции\n")
        for func_info in public_functions:
            lines.append(generate_function_mdx(func_info))
            lines.append("")

    return "\n".join(lines)


def generate_api_overview(submodules: list) -> str:
    """Генерирует MDX для главной страницы API."""
    lines = [
        "# API Reference",
        "",
        "Документация по API библиотеки SVETlANNa.",
        "",
        "```python",
        "import svetlanna",
        "from svetlanna import Wavefront, SimulationParameters",
        "```",
        "",
        "## Модули",
        "",
    ]

    for submodule, module_info in submodules:
        title = submodule.replace("_", " ").title()
        desc = MODULE_DESCRIPTIONS.get(submodule, "")
        class_count = len(module_info["classes"])
        func_count = len([f for f in module_info["functions"] if not f["name"].startswith("_")])

        line = f"- **[{title}](/docs/api/{submodule})**"
        if desc:
            line += f" — {desc}"
        if class_count or func_count:
            parts = []
            if class_count:
                parts.append(f"{class_count} классов")
            if func_count:
                parts.append(f"{func_count} функций")
            line += f" ({', '.join(parts)})"

        lines.append(line)

    return "\n".join(lines) + "\n"


def main():
    # Paths
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    temp_dir = project_root / ".temp"
    svetlanna_dir = temp_dir / "SVETlANNa"
    output_dir = project_root / "app" / "docs" / "api"

    # Clone/update SVETlANNa
    temp_dir.mkdir(exist_ok=True)
    clone_or_update_repo(
        "https://github.com/CompPhysLab/SVETlANNa.git",
        svetlanna_dir
    )

    # Clean output directory
    if output_dir.exists():
        shutil.rmtree(output_dir)
    output_dir.mkdir(parents=True)

    # Parse main module
    svetlanna_pkg = svetlanna_dir / "svetlanna"

    # Generate _meta.js (without "index" - page.mdx serves as index in App Router)
    meta_entries = {}
    generated_submodules = []

    # Generate Core page (main classes from root files)
    core_content, core_info = generate_core_page(svetlanna_pkg)
    core_output = output_dir / "core"
    core_output.mkdir(exist_ok=True)
    (core_output / "page.mdx").write_text(core_content, encoding="utf-8")
    print(f"Generated: api/core/page.mdx")
    meta_entries["core"] = "Core"
    generated_submodules.append(("core", core_info))

    # Submodules to parse
    submodules = [
        "elements",
        "networks",
        "specs",
        "phase_retrieval_problem",
        "visualization",
    ]

    for submodule in submodules:
        submodule_init = svetlanna_pkg / submodule / "__init__.py"
        if submodule_init.exists():
            module_info = parse_module(submodule_init)

            # Also parse individual files in submodule
            submodule_dir = svetlanna_pkg / submodule
            for py_file in submodule_dir.glob("*.py"):
                if py_file.name != "__init__.py":
                    file_info = parse_module(py_file)
                    module_info["classes"].extend(file_info["classes"])
                    module_info["functions"].extend(file_info["functions"])

            # Deduplicate classes by name
            seen_classes = set()
            unique_classes = []
            for cls in module_info["classes"]:
                if cls["name"] not in seen_classes:
                    seen_classes.add(cls["name"])
                    unique_classes.append(cls)
            module_info["classes"] = unique_classes

            # Skip empty modules
            if not unique_classes and not module_info["functions"]:
                print(f"Skipping empty module: {submodule}")
                continue

            # Generate MDX
            submodule_output = output_dir / submodule
            submodule_output.mkdir(exist_ok=True)

            mdx_content = generate_module_mdx(submodule, module_info, submodule=True)
            (submodule_output / "page.mdx").write_text(mdx_content, encoding="utf-8")
            print(f"Generated: api/{submodule}/page.mdx")

            meta_entries[submodule] = submodule.replace("_", " ").title()
            generated_submodules.append((submodule, module_info))

    # Generate main API overview page
    overview_content = generate_api_overview(generated_submodules)
    (output_dir / "page.mdx").write_text(overview_content, encoding="utf-8")
    print(f"Generated: api/page.mdx")

    # Write _meta.js
    meta_content = "export default {\n"
    for key, value in meta_entries.items():
        meta_content += f'  "{key}": "{value}",\n'
    meta_content += "};\n"
    (output_dir / "_meta.js").write_text(meta_content, encoding="utf-8")
    print(f"Generated: api/_meta.js")

    print("\nAPI documentation generated successfully!")


if __name__ == "__main__":
    main()
