import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const lessons = [14]; // 나중에 추가 가능

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-indigo-50 grid place-items-center p-4">
      <div className="flex flex-col items-center gap-8">
        {/* Title Stack */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-5xl font-bold">
            <span className="text-primary">니혼키</span>
            <span className="text-gray-700 text-3xl ml-3">日本語</span>
          </h1>
          <p className="text-xl text-gray-700">
            어떤 과를 공부하시겠어요?
          </p>
        </div>

        {/* Lesson Buttons Stack */}
        <div className="flex flex-wrap gap-4 justify-center">
          {lessons.map((lesson) => (
            <button
              key={lesson}
              onClick={() => navigate(`/${lesson}`)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-2xl px-12 py-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              {lesson}과
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export { Home };
