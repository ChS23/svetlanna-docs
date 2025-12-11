import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16">
        <div className="flex items-center gap-4 mb-8">
          <Image
            src="/logo.jpg"
            alt="SVETlANNa logo"
            width={64}
            height={64}
            className="rounded-xl"
          />
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              SVETlANNa
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Simulation of free-space optical set-ups
            </p>
          </div>
        </div>

        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-2xl">
          Открытая Python-библиотека для моделирования оптических систем
          и нейроморфных вычислителей, таких как дифракционные нейронные сети.
        </p>

        <div className="flex flex-wrap gap-3 mb-12">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
          >
            Документация
          </Link>
          <a
            href="https://github.com/CompPhysLab/SVETlANNa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-neutral-700 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
            </svg>
            GitHub
          </a>
          <Link
            href="/course"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-neutral-700 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors"
          >
            Курс OCAC
          </Link>
        </div>

        {/* Install */}
        <div className="p-4 bg-gray-50 dark:bg-neutral-900 rounded-lg font-mono text-sm mb-12">
          <span className="text-gray-500 dark:text-gray-500">$</span>{" "}
          <span className="text-gray-900 dark:text-gray-100">pip install svetlanna</span>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-semibold mb-6">Возможности</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 border border-gray-200 dark:border-neutral-800 rounded-lg">
            <h3 className="font-semibold mb-2">Моделирование оптики</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Угловой спектр, приближение Френеля, принципы Фурье-оптики
            </p>
          </div>
          <div className="p-5 border border-gray-200 dark:border-neutral-800 rounded-lg">
            <h3 className="font-semibold mb-2">Нейронные сети</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Дифракционные нейросети, feed-forward, автоэнкодеры, рекуррентные архитектуры
            </p>
          </div>
          <div className="p-5 border border-gray-200 dark:border-neutral-800 rounded-lg">
            <h3 className="font-semibold mb-2">Оптимизация DOE/SLM</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Алгоритмы Герчберга-Сакстона и гибридного ввода-вывода
            </p>
          </div>
          <div className="p-5 border border-gray-200 dark:border-neutral-800 rounded-lg">
            <h3 className="font-semibold mb-2">GPU-ускорение</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Построен на PyTorch с полной поддержкой GPU
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-semibold mb-4">О библиотеке</h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          Название <strong>SVETlANNa</strong> объединяет русское слово «свет» и ANN (искусственная нейронная сеть),
          а также напоминает русское имя Светлана.
        </p>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          Библиотека разработана командой CompPhysLab физического факультета Университета ИТМО
          при поддержке Фонда содействия инновациям.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Лицензия: Mozilla Public License 2.0
        </p>
      </section>
    </div>
  );
}
