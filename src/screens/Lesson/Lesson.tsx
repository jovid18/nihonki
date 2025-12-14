import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface VocabItem {
  prob: string;
  ans: string;
}

interface LessonData {
  kanji: VocabItem[];
  katakana: VocabItem[];
}

function Lesson() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/${id}.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch lesson data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Failed to load lesson data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">레슨을 찾을 수 없습니다</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← 돌아가기
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            <span className="text-rose-500">{id}과</span>
            <span className="text-gray-400 text-lg ml-2">Lesson {id}</span>
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Kanji Section */}
        {data.kanji && data.kanji.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              한자 ({data.kanji.length})
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {data.kanji.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="text-sm text-gray-500 mb-2">문제</div>
                  <div className="text-2xl font-medium text-gray-800 mb-4">
                    {item.prob}
                  </div>
                  <div className="text-sm text-gray-500 mb-2">정답</div>
                  <div className="text-3xl font-bold text-rose-500">
                    {item.ans}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Katakana Section */}
        {data.katakana && data.katakana.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              카타카나 ({data.katakana.length})
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {data.katakana.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="text-sm text-gray-500 mb-2">문제</div>
                  <div className="text-2xl font-medium text-gray-800 mb-4">
                    {item.prob}
                  </div>
                  <div className="text-sm text-gray-500 mb-2">정답</div>
                  <div className="text-3xl font-bold text-indigo-500">
                    {item.ans}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export { Lesson };
