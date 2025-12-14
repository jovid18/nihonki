import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface VocabItem {
  prob: string;
  ans: string;
}

interface VocabItemWithStats extends VocabItem {
  wrongCount: number;
}

interface LessonData {
  kanji: VocabItem[];
  katakana: VocabItem[];
}

function Test() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [queue, setQueue] = useState<VocabItemWithStats[]>([]);
  const [currentCard, setCurrentCard] = useState<VocabItemWithStats | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedItems, setCompletedItems] = useState<VocabItemWithStats[]>([]);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Load and shuffle data
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/${id}.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch lesson data');
        }
        const jsonData: LessonData = await response.json();

        // Combine kanji and katakana, then shuffle
        const allItems = [...(jsonData.kanji || []), ...(jsonData.katakana || [])];
        const itemsWithStats: VocabItemWithStats[] = allItems.map((item) => ({
          ...item,
          wrongCount: 0,
        }));
        const shuffled = shuffleArray(itemsWithStats);

        setQueue(shuffled);
        setCurrentCard(shuffled[0] || null);
      } catch (error) {
        console.error('Failed to load lesson data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isCompleted) return;

      if (!showAnswer && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        setShowAnswer(true);
      } else if (showAnswer) {
        if (e.key === '1' || e.key === 'ArrowLeft') {
          handleWrong();
        } else if (e.key === '2' || e.key === 'ArrowRight') {
          handleCorrect();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showAnswer, isCompleted, queue]);

  const handleCorrect = () => {
    if (!currentCard) return;

    // Add to completed items
    setCompletedItems((prev) => [...prev, currentCard]);

    const newQueue = queue.slice(1); // Remove first item

    if (newQueue.length === 0) {
      setIsCompleted(true);
      setCurrentCard(null);
    } else {
      setCurrentCard(newQueue[0]);
      setQueue(newQueue);
    }
    setShowAnswer(false);
  };

  const handleWrong = () => {
    if (!currentCard) return;

    // Increment wrong count
    const updatedCard = {
      ...currentCard,
      wrongCount: currentCard.wrongCount + 1,
    };

    const newQueue = [...queue.slice(1), updatedCard]; // Move to end with updated count
    setCurrentCard(newQueue[0]);
    setQueue(newQueue);
    setShowAnswer(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-indigo-100 py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Celebration */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold text-rose-500 mb-8 animate-bounce">
              🎉 축하합니다! 🎉
            </h1>
            <p className="text-2xl text-gray-700 mb-8">모든 단어를 완료했습니다!</p>
          </div>

          {/* Statistics Table */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-rose-500 to-indigo-500 px-6 py-4">
              <h2 className="text-2xl font-bold text-white">테스트 결과</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      문제
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      정답
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                      틀린 횟수
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[...completedItems].sort((a, b) => b.wrongCount - a.wrongCount).map((item, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-50 transition-colors ${
                        item.wrongCount > 0 ? 'bg-red-50' : ''
                      }`}
                    >
                      <td className="px-6 py-4 text-lg text-gray-800">{item.prob}</td>
                      <td className="px-6 py-4 text-xl font-bold text-rose-500">{item.ans}</td>
                      <td className="px-6 py-4 text-center">
                        {item.wrongCount > 0 ? (
                          <span className="inline-flex items-center justify-center w-10 h-10 bg-red-500 text-white font-bold rounded-full">
                            {item.wrongCount}
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-10 h-10 bg-green-500 text-white font-bold rounded-full">
                            ✓
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex justify-around text-center">
                <div>
                  <div className="text-sm text-gray-600">총 단어 수</div>
                  <div className="text-2xl font-bold text-gray-800">{completedItems.length}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">한 번에 맞춘 단어</div>
                  <div className="text-2xl font-bold text-green-600">
                    {completedItems.filter((item) => item.wrongCount === 0).length}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">틀린 단어</div>
                  <div className="text-2xl font-bold text-red-600">
                    {completedItems.filter((item) => item.wrongCount > 0).length}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <button
              onClick={() => navigate(`/${id}`)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              레슨으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(`/${id}`)}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← 돌아가기
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            <span className="text-rose-500">{id}과 테스트</span>
          </h1>
          <div className="text-gray-600 font-medium">남은 카드: {queue.length}</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        {currentCard && (
          <div className="bg-white rounded-2xl shadow-2xl p-12 min-h-[400px] flex flex-col items-center justify-center">
            {/* Problem */}
            <div className="text-center mb-8">
              <div className="text-sm text-gray-500 mb-4">문제</div>
              <div className="text-5xl font-bold text-gray-800">{currentCard.prob}</div>
              {currentCard.wrongCount > 0 && (
                <div className="mt-4 text-sm text-red-500">
                  이미 {currentCard.wrongCount}번 틀렸습니다
                </div>
              )}
            </div>

            {/* Answer (shown after reveal) */}
            {showAnswer && (
              <div className="text-center mb-12 animate-fade-in">
                <div className="text-sm text-gray-500 mb-4">정답</div>
                <div className="text-6xl font-bold text-rose-500">{currentCard.ans}</div>
              </div>
            )}

            {/* Action Buttons */}
            {!showAnswer ? (
              <button
                onClick={() => setShowAnswer(true)}
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold text-xl px-12 py-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                정답 보기 (Enter / Space)
              </button>
            ) : (
              <div className="flex gap-6">
                <button
                  onClick={handleWrong}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold text-xl px-10 py-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  틀림 (1 / ←)
                </button>
                <button
                  onClick={handleCorrect}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl px-10 py-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  맞음 (2 / →)
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export { Test };
