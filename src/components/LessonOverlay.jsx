import React, { useState } from 'react';
import { X, ArrowRight, BookOpen, Trophy, CheckCircle, Clock, Award } from 'lucide-react';
import { getLessonContent, hasLessonContent } from '../data/lessonContent';

export default function LessonOverlay({ lesson, onClose, onComplete }) {
  const [mode, setMode] = useState('content'); // 'content' or 'quiz'
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const lessonContent = getLessonContent(lesson.id);
  const hasContent = hasLessonContent(lesson.id);

  // Handle scroll progress for content
  const handleScroll = (e) => {
    const element = e.target;
    const scrollPercent = (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100;
    setScrollProgress(Math.min(100, scrollPercent));
  };

  const handleAnswer = (index) => {
    if (selected !== null) return; // Already answered
    
    setSelected(index);
    const quiz = hasContent ? lessonContent.quiz : mockQuestions;
    const correct = index === quiz[currentQ].correct;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);
  };

  const handleNext = () => {
    const quiz = hasContent ? lessonContent.quiz : mockQuestions;
    if (currentQ < quiz.length - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setIsCorrect(null);
    } else {
      // Complete lesson
      const percentage = (score / quiz.length) * 100;
      const xp = percentage >= 80 ? 100 : percentage >= 60 ? 75 : 50;
      const coins = percentage >= 80 ? 150 : percentage >= 60 ? 100 : 50;
      onComplete(xp, coins);
    }
  };

  const startQuiz = () => {
    if (scrollProgress >= 80 || !hasContent) {
      setMode('quiz');
    }
  };

  // Mock lesson for nodes without full content yet
  const mockQuestions = [
    {
      question: `What did you learn about ${lesson.title}?`,
      options: ["Key concept A", "Key concept B", "Key concept C", "All of the above"],
      correct: 3
    },
    {
      question: "Ready to apply what you learned?",
      options: ["Yes, let's practice", "Review again", "Need more time", "Ready to advance"],
      correct: 0
    }
  ];

  if (!hasContent) {
    // Fallback for lessons without content yet
    const quiz = mockQuestions;
    
    return (
      <div className="fixed inset-0 bg-[#0F172A]/95 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl border border-slate-700">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 flex justify-between items-center">
            <div>
              <div className="text-xs font-bold text-cyan-100 uppercase tracking-wider mb-1">Lesson</div>
              <h2 className="text-2xl font-bold text-white">{lesson.title}</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <X size={24} className="text-white" />
            </button>
          </div>

          <div className="p-8">
            {mode === 'content' ? (
              <div className="text-center py-12">
                <BookOpen size={64} className="mx-auto text-cyan-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Content Coming Soon!</h3>
                <p className="text-slate-400 mb-6">This lesson is being prepared. Check back soon for full content.</p>
                
                <button
                  onClick={() => setMode('quiz')}
                  className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-xl transition-colors mx-auto"
                >
                  Start Quick Quiz
                </button>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto">
                <div className="mb-6 flex justify-between text-sm font-semibold text-slate-400">
                  <span>Question {currentQ + 1} of {quiz.length}</span>
                  <span className="flex items-center gap-2">
                    <Award size={16} className="text-yellow-400" />
                    Score: {score}/{quiz.length}
                  </span>
                </div>
                
                <div className="w-full h-2 bg-slate-700 rounded-full mb-8 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300" 
                    style={{ width: `${((currentQ + 1) / quiz.length) * 100}%` }}
                  />
                </div>

                <h3 className="text-2xl font-bold text-white mb-8">{quiz[currentQ].question}</h3>

                <div className="grid grid-cols-1 gap-3 mb-8">
                  {quiz[currentQ].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      disabled={selected !== null}
                      className={`p-5 rounded-xl text-left font-semibold transition-all ${
                        selected === null
                          ? 'bg-slate-700 hover:bg-slate-600 text-white hover:scale-[1.02]'
                          : selected === idx
                          ? isCorrect
                            ? 'bg-green-500 text-white scale-[1.02]'
                            : 'bg-red-500 text-white'
                          : idx === quiz[currentQ].correct
                          ? 'bg-green-500/20 border-2 border-green-500 text-green-400'
                          : 'bg-slate-700/50 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                          selected === null
                            ? 'bg-slate-600 text-slate-400'
                            : selected === idx
                            ? isCorrect
                              ? 'bg-white text-green-500'
                              : 'bg-white text-red-500'
                            : idx === quiz[currentQ].correct
                            ? 'bg-green-500 text-white'
                            : 'bg-slate-600 text-slate-500'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span>{opt}</span>
                        {selected !== null && (
                          <>
                            {selected === idx && isCorrect && <CheckCircle size={20} className="ml-auto text-white" />}
                            {selected === idx && !isCorrect && <X size={20} className="ml-auto text-white" />}
                          </>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {selected !== null && (
                  <div className="text-center">
                    <div className={`inline-block px-6 py-3 rounded-xl mb-4 ${
                      isCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {isCorrect ? '✓ Correct! Well done!' : '✗ Incorrect. Try again next time!'}
                    </div>
                    
                    <button
                      onClick={handleNext}
                      className="block w-full px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      {currentQ < quiz.length - 1 ? 'Next Question' : 'Complete Lesson'}
                      <ArrowRight size={20} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Full content mode
  const quiz = lessonContent.quiz;

  return (
    <div className="fixed inset-0 bg-[#0F172A]/95 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl border border-slate-700 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              {mode === 'content' ? <BookOpen size={24} className="text-white" /> : <Trophy size={24} className="text-white" />}
            </div>
            <div>
              <div className="text-xs font-bold text-cyan-100 uppercase tracking-wider mb-1">
                {mode === 'content' ? 'Learning' : 'Quiz'}
              </div>
              <h2 className="text-2xl font-bold text-white">{lessonContent.title}</h2>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-xs text-cyan-100 flex items-center gap-1">
                  <Clock size={14} /> {lessonContent.duration}
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X size={24} className="text-white" />
          </button>
        </div>

        {mode === 'content' ? (
          /* Content Mode */
          <>
            <div 
              className="flex-1 overflow-y-auto p-8 prose prose-invert max-w-none"
              onScroll={handleScroll}
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#475569 #1e293b'
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: lessonContent.content }} />
            </div>

            {/* Progress Footer */}
            <div className="border-t border-slate-700 p-6 bg-slate-800/50 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between text-sm text-slate-400 mb-2">
                    <span>Reading Progress</span>
                    <span>{Math.round(scrollProgress)}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                      style={{ width: `${scrollProgress}%` }}
                    />
                  </div>
                </div>
                <button
                  onClick={startQuiz}
                  disabled={scrollProgress < 80}
                  className={`ml-6 px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                    scrollProgress >= 80
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-white'
                      : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Start Quiz
                  <ArrowRight size={20} />
                </button>
              </div>
              {scrollProgress < 80 && (
                <p className="text-xs text-slate-500 mt-2">Read at least 80% of the content to unlock the quiz</p>
              )}
            </div>
          </>
        ) : (
          /* Quiz Mode */
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-2xl mx-auto">
              {/* Quiz Progress */}
              <div className="mb-6 flex justify-between text-sm font-semibold text-slate-400">
                <span>Question {currentQ + 1} of {quiz.length}</span>
                <span className="flex items-center gap-2">
                  <Award size={16} className="text-yellow-400" />
                  Score: {score}/{quiz.length}
                </span>
              </div>
              
              <div className="w-full h-2 bg-slate-700 rounded-full mb-8 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300" 
                  style={{ width: `${((currentQ + 1) / quiz.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <h3 className="text-2xl font-bold text-white mb-8">{quiz[currentQ].question}</h3>

              {/* Options */}
              <div className="grid grid-cols-1 gap-3 mb-8">
                {quiz[currentQ].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={selected !== null}
                    className={`p-5 rounded-xl text-left font-semibold transition-all ${
                      selected === null
                        ? 'bg-slate-700 hover:bg-slate-600 text-white hover:scale-[1.02]'
                        : selected === idx
                        ? isCorrect
                          ? 'bg-green-500 text-white scale-[1.02]'
                          : 'bg-red-500 text-white'
                        : idx === quiz[currentQ].correct
                        ? 'bg-green-500/20 border-2 border-green-500 text-green-400'
                        : 'bg-slate-700/50 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                        selected === null
                          ? 'bg-slate-600 text-slate-400'
                          : selected === idx
                          ? isCorrect
                            ? 'bg-white text-green-500'
                            : 'bg-white text-red-500'
                          : idx === quiz[currentQ].correct
                          ? 'bg-green-500 text-white'
                          : 'bg-slate-600 text-slate-500'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span>{opt}</span>
                      {selected !== null && (
                        <>
                          {selected === idx && isCorrect && <CheckCircle size={20} className="ml-auto text-white" />}
                          {selected === idx && !isCorrect && <X size={20} className="ml-auto text-white" />}
                        </>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Feedback & Next */}
              {selected !== null && (
                <div className="text-center">
                  <div className={`inline-block px-6 py-3 rounded-xl mb-4 ${
                    isCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {isCorrect ? '✓ Correct! Well done!' : '✗ Incorrect. Review the content and try again.'}
                  </div>
                  
                  <button
                    onClick={handleNext}
                    className="block w-full px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    {currentQ < quiz.length - 1 ? 'Next Question' : 'Complete Lesson'}
                    <ArrowRight size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .prose h2 { color: #fff; font-size: 1.5rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; }
        .prose h3 { color: #e2e8f0; font-size: 1.25rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem; }
        .prose h4 { color: #cbd5e1; font-size: 1.1rem; font-weight: 600; margin-top: 1.25rem; margin-bottom: 0.5rem; }
        .prose p { color: #94a3b8; line-height: 1.7; margin-bottom: 1rem; }
        .prose ul, .prose ol { color: #94a3b8; margin-left: 1.5rem; margin-bottom: 1rem; }
        .prose li { margin-bottom: 0.5rem; line-height: 1.6; }
        .prose strong { color: #e2e8f0; font-weight: 600; }
        .prose code { background: #1e293b; color: #22d3ee; padding: 0.2rem 0.4rem; border-radius: 0.25rem; font-size: 0.9em; }
        .prose pre { background: #0f172a; border: 1px solid #334155; border-radius: 0.5rem; padding: 1rem; overflow-x: auto; margin: 1rem 0; }
        .prose pre code { background: none; color: #e2e8f0; padding: 0; }
      `}</style>
    </div>
  );
}
