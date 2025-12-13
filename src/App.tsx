function App() {
  // prop destruction

  // lib hooks

  // state, ref, querystring hooks

  // form hooks

  // query hooks

  // calculated values

  // effects

  // handlers

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">
            <span className="text-rose-500">니혼키</span>
            <span className="text-gray-400 text-lg ml-2">日本語</span>
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            일본어 단어 암기
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            효과적인 단어 학습으로 일본어 실력을 향상시키세요
          </p>
          <button className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-8 py-3 rounded-full transition-colors shadow-lg hover:shadow-xl">
            학습 시작하기
          </button>
        </section>

        {/* Feature Cards */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">단어장</h3>
            <p className="text-gray-600">
              체계적으로 정리된 일본어 단어를 학습하세요
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">✏️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">단어 테스트</h3>
            <p className="text-gray-600">
              퀴즈를 통해 암기한 단어를 확인하세요
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">학습 현황</h3>
            <p className="text-gray-600">
              나의 학습 진도와 성과를 확인하세요
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white/50 mt-auto py-6">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-500 text-sm">
          © 2024 니혼키. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export { App };
