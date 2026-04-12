"use client";

export default function CoursePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            ← Svetlanna Docs
          </a>
          <a
            href="https://github.com/CompPhysLab/SVETlANNa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            GitHub
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12">
        <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium mb-6">
          <span>ITMO University</span>
          <span className="text-gray-300 dark:text-gray-600">·</span>
          <span>The Department of Physics</span>
          <span className="text-gray-300 dark:text-gray-600">·</span>
          <span>CompPhysLab</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
          Optical Computing Academic Course
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl">
          The first comprehensive course on optical computing, covering fundamental principles, key technologies, and practical applications. Designed for students, researchers, and professionals interested in the field of optical computing by the CompPhysLab team at ITMO University.
        </p>
      </section>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 pb-20">
        {/* About */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">About the Course</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            The course explores the concept of optical computing — a technology that uses light
            for transmitting and processing information. Unlike the classical von Neumann architecture,
            optical systems enable parallel data processing at the speed of light with low power consumption.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            The course is built upon the{" "}
            <a
              href="https://github.com/CompPhysLab/SVETlANNa"
              className="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              SVETlANNa
            </a>
            {" "}library for designing diffractive neural networks.
          </p>
        </section>

        {/* Программа курса */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Syllabus</h2>

          <div className="space-y-4">
            {/* Модуль 1 */}
            <div className="p-5 border border-gray-200 dark:border-neutral-800 rounded-lg">
              <div className="flex items-start gap-4">
                <span className="text-sm font-mono text-gray-400 dark:text-gray-500 pt-0.5">01</span>
                <div>
                  <h3 className="font-semibold mb-2">The basics of electrodynamics</h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>Maxwell's equations</li>
                    <li>Harmonic waves</li>
                    <li>Electromagnetic medium</li>
                    <li>Wave equation</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Модуль 2 */}
            <div className="p-5 border border-gray-200 dark:border-neutral-800 rounded-lg">
              <div className="flex items-start gap-4">
                <span className="text-sm font-mono text-gray-400 dark:text-gray-500 pt-0.5">02</span>
                <div>
                  <h3 className="font-semibold mb-2">Fourier-optics</h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>Green’s function</li>
                    <li>Weyl representation of spherical waves</li>
                    <li>Longitudinal component of the field</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Модуль 3 */}
            <div className="p-5 border border-gray-200 dark:border-neutral-800 rounded-lg">
              <div className="flex items-start gap-4">
                <span className="text-sm font-mono text-gray-400 dark:text-gray-500 pt-0.5">03</span>
                <div>
                  <h3 className="font-semibold mb-2">Angular Spectrum Method</h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>Plane wave decomposition</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Модуль 4 */}
            <div className="p-5 border border-gray-200 dark:border-neutral-800 rounded-lg">
              <div className="flex items-start gap-4">
                <span className="text-sm font-mono text-gray-400 dark:text-gray-500 pt-0.5">04</span>
                <div>
                  <h3 className="font-semibold mb-2">Diffractive Optical Elements</h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>Thin transparency approach</li>
                    <li>Thin lens</li>
                    <li>Diffractive layer</li>
                    <li>Spatial Light Modulator (SLM)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Модуль 5 */}
            <div className="p-5 border border-gray-200 dark:border-neutral-800 rounded-lg">
              <div className="flex items-start gap-4">
                <span className="text-sm font-mono text-gray-400 dark:text-gray-500 pt-0.5">05</span>
                <div>
                  <h3 className="font-semibold mb-2">Backpropagation algorithm</h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>Common schema</li>
                    <li>Forward pass</li>
                    <li>Backward pass</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Модуль 6 */}
            <div className="p-5 border border-gray-200 dark:border-neutral-800 rounded-lg">
              <div className="flex items-start gap-4">
                <span className="text-sm font-mono text-gray-400 dark:text-gray-500 pt-0.5">06</span>
                <div>
                  <h3 className="font-semibold mb-2">Optimization methods</h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>Problem formulation</li>
                    <li>Gradient descent</li>
                    <li>Adam</li>
                    <li>SGD</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Модуль 7 */}
            <div className="p-5 border border-gray-200 dark:border-neutral-800 rounded-lg">
              <div className="flex items-start gap-4">
                <span className="text-sm font-mono text-gray-400 dark:text-gray-500 pt-0.5">07</span>
                <div>
                  <h3 className="font-semibold mb-2">Optical computers</h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>Linear Diffractive Neural Network</li>
                    <li>Diffractive Recurrent Neural Network</li>
                    <li>Convolutional Diffractive Network</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Для кого */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">For Whom</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-neutral-900 rounded-lg">
              <p className="font-medium mb-1">Students</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">who are interested in neural networks, computational physics and machine learning</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-neutral-900 rounded-lg">
              <p className="font-medium mb-1">Researchers</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">who are interested in optical computing, diffractive neural networks and modern photonic technologies</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-neutral-900 rounded-lg">
              <p className="font-medium mb-1">Engineers</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">who are working on optical systems and AI accelerators</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="p-6 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Start training</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Access course materials or explore library documentation to start your journey into optical computing
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/docs/course"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
            >
              Course Materials →
            </a>
            <a
              href="https://github.com/CompPhysLab/SVETlANNa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-neutral-700 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
              </svg>
              GitHub
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
