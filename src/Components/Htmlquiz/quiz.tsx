import { useEffect, useState } from 'react';
import quizData from '../../../quiz.json';
import { Link } from 'react-router-dom';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface Quiz {
  title: string;
  questions: Question[];
}

interface QuizData {
  quizzes: Quiz[];
}

export default function Htmlquiz() {
  const { quizzes } = quizData as QuizData;
  const [currentQues, updateCurrentQues] = useState(0);
  const [timer, setTimer] = useState(300);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [scoreCard, setScoreCard] = useState(false);

  useEffect(() => {
    const time = setInterval(() => {
      setTimer(prev => {
        if (prev === 0) {
          clearInterval(time);
          setScoreCard(true);
          return 0;
        } else {
          return prev - 1;

        }
      })
    }, 1000)
    return () => clearInterval(time)
  }, []);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  function updateQuestion() {
    if (currentQues < quizzes[0].questions.length - 1) {
      updateCurrentQues(currentQues + 1);
      setSelectedOption(null);
    } else {
      setScoreCard(true);
    }
  }

  function backQuestion() {
    updateCurrentQues(currentQues - 1);
  }

  function handleOptionClick(optionIndex: number) {
    const currentQuestion = quizzes[0].questions[currentQues];
    if (quizzes[0].questions[currentQues].options[optionIndex] === currentQuestion.answer) {
      if (!answeredQuestions.includes(currentQues)) {
        setScore((prev) => prev + 1);
        setAnsweredQuestions((prev) => [...prev, currentQues]);
      }
    } else {
      if (answeredQuestions.includes(currentQues)) {
        setScore((prev) => prev - 1);
        const newAnsweredQuestions = answeredQuestions.filter((q) => q !== currentQues);
        setAnsweredQuestions(newAnsweredQuestions);
      }
    }
    setSelectedOption(optionIndex);
  }


  return (
    <>
      <div className="h-screen flex justify-center items-center bg-gray-100">
        <div className="bg-white w-full sm:w-2/5 rounded-lg shadow-md p-8 ">

          {scoreCard ? (
            <div className='bg-gray-200 rounded-lg p-6'>
              <h1 className='text-3xl font-bold mb-4 text-center'>{quizzes[0].title} Score Card </h1>
              <div className="text-2xl font-bold mb-4 text-center">
                <p className={score >= 5 ? 'text-green-600' : 'text-red-600'}>
                  {score >= 5 ? `Congratulations, You have passed with the score of ${score} out of ${quizzes[0].questions.length}` : `Sorry, You are failed with the score of ${score} out of ${quizzes[0].questions.length}`}

                </p>
                <p>
                  {timer === 0 ? "Time is over" : null}
                </p>
                <Link to={'/'} className='bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700 inline-block mt-4'>Play Again</Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between flex-col md:flex-row items-center mb-4">
                <h1 className="text-3xl font-bold">{quizzes[0].title}</h1>
                <p>Quetion {currentQues + 1} of {quizzes[0].questions.length}</p>
                <p>
                  {minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}
                </p>
              </div>
              <div className="bg-gray-200 p-5 rounded-md shadow-md mb-4">
                <p className="text-lg">{quizzes[0].questions[currentQues].question}</p>
              </div>

              <div>
                {quizzes[0].questions[currentQues].options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`bg-gray-300 p-4 rounded-md shadow-sm mb-2 cursor-pointer ${selectedOption === optionIndex ? 'bg-blue-200' : ''} ${selectedOption === optionIndex ? 'text-white font-bold' : ''}`}
                    onClick={() => handleOptionClick(optionIndex)}
                  >
                    <p>{option}</p>
                  </div>
                ))}
                <div className="flex justify-between mt-4">
                  {currentQues > 0 && (
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md  hover:bg-blue-700" onClick={backQuestion}>
                      Back
                    </button>
                  )}

                  {currentQues < quizzes[0].questions.length - 1 && (

                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700" onClick={updateQuestion}>
                      Next
                    </button>
                  )}

                  {currentQues === quizzes[0].questions.length - 1 && (
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700" onClick={updateQuestion}>
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
