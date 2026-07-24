'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Question, ExamModule, UserAnswer } from '@/types';
import { ChevronLeft, ChevronRight, Clock, AlertTriangle, CheckCircle, ShieldAlert, Wifi } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SplitTestRoomProps {
  examId: string;
  module: ExamModule;
  questions: Question[];
  studentName: string;
  studentId: string;
}

export default function SplitTestRoom({
  examId,
  module,
  questions,
  studentName,
  studentId,
}: SplitTestRoomProps) {
  const router = useRouter();

  // Active question index
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // User selected answers map { questionId: selectedOptionId }
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  
  // Individual question timer (seconds)
  const [questionSeconds, setQuestionSeconds] = useState(0);
  
  // Global exam timer (seconds) - e.g. 113 minutes and 37 seconds = 6817s
  const [globalSeconds, setGlobalSeconds] = useState(module.durationMinutes * 60);

  // Anti-cheat state
  const [antiCheatViolations, setAntiCheatViolations] = useState(0);
  const [showAntiCheatModal, setShowAntiCheatModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentIndex] || questions[0];

  // Global Countdown Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setGlobalSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Individual Question Timer effect
  useEffect(() => {
    setQuestionSeconds(0);
    const qTimer = setInterval(() => {
      setQuestionSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(qTimer);
  }, [currentIndex]);

  // Anti-cheat window blur & tab switch detector
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setAntiCheatViolations((prev) => {
          const count = prev + 1;
          logAntiCheatEvent('tab_switch', `Thí sinh chuyển tab (Lần ${count})`);
          return count;
        });
        setShowAntiCheatModal(true);
      }
    };

    const handleBlur = () => {
      // Record focus loss
      logAntiCheatEvent('window_blur', 'Thí sinh rời khỏi cửa sổ làm bài');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  const logAntiCheatEvent = async (eventType: string, details: string) => {
    try {
      await fetch('/api/student/anticheat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examId,
          moduleId: module.id,
          eventType,
          details,
        }),
      });
    } catch (e) {
      console.error('Anti-cheat log error:', e);
    }
  };

  const handleSelectOption = (optionId: string) => {
    if (!currentQuestion) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleAutoSubmit = () => {
    executeSubmission();
  };

  const executeSubmission = async () => {
    setIsSubmitting(true);
    const answersList: UserAnswer[] = Object.entries(userAnswers).map(([qId, optId]) => ({
      questionId: qId,
      selectedOptionId: optId,
      timeSpentSeconds: 30,
    }));

    try {
      const res = await fetch('/api/student/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examId,
          moduleId: module.id,
          answers: answersList,
          antiCheatViolationCount: antiCheatViolations,
        }),
      });

      const data = await res.json();
      if (data.success) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        router.push(`/results/${data.submission.id}`);
      } else {
        alert(data.error || 'Có lỗi xảy ra khi nộp bài');
        setIsSubmitting(false);
      }
    } catch (e) {
      console.error(e);
      alert('Không thể kết nối máy chủ để nộp bài');
      setIsSubmitting(false);
    }
  };

  // Format seconds to mm:ss or hh:mm:ss
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatQuestionTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins}:${remainderSecs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(userAnswers).length;
  const progressPercent = Math.round((answeredCount / (questions.length || 1)) * 100);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none">
      {/* Top Header Bar matching AECK TSA layout */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-xs sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-crimson font-black text-2xl tracking-tighter">TSA</span>
            <span className="font-bold text-slate-800 text-base hidden sm:inline">
              Kíp thi {module.title.replace(/^\d+\.\s*/, '')} - NỘI BỘ
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
          <span className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Đã kết nối máy chủ
          </span>
          {antiCheatViolations > 0 && (
            <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-300">
              <ShieldAlert className="w-3.5 h-3.5" />
              Cảnh báo tab: {antiCheatViolations}
            </span>
          )}
        </div>
      </header>

      {/* Main Split Screen Container */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden max-w-[1600px] w-full mx-auto p-3 sm:p-6 gap-6">
        
        {/* LEFT PANEL: QUESTION & OPTIONS AREA (68% width on desktop) */}
        <div className="flex-1 flex flex-col bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          
          {/* Question Scrollable Body */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            
            {/* Reading Passage / Problem Context if available */}
            {currentQuestion?.passage && (
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-lg text-slate-700 text-sm leading-relaxed space-y-3 max-h-80 overflow-y-auto">
                <div className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5 border-b border-slate-200 pb-2">
                  <span>Ngữ cảnh / Đoạn văn đọc hiểu</span>
                </div>
                <div className="whitespace-pre-line text-slate-800 font-serif">
                  {currentQuestion.passage}
                </div>
              </div>
            )}

            {/* Question Text */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="bg-slate-100 text-slate-700 font-extrabold px-3 py-1.5 rounded-lg text-base min-w-[3rem] text-center border border-slate-200">
                  {currentQuestion?.number || currentIndex + 1}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug pt-1">
                  {currentQuestion?.text}
                </h2>
              </div>

              {/* Options List */}
              <div className="pl-0 sm:pl-16 space-y-3 pt-2">
                {currentQuestion?.options.map((opt, idx) => {
                  const letter = String.fromCharCode(65 + idx); // A, B, C, D
                  const isSelected = userAnswers[currentQuestion.id] === opt.id;

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80'
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-blue-50 text-blue-600 border border-blue-200'
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="text-sm sm:text-base font-medium text-slate-800 flex-1">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Left Panel Fixed Bottom Toolbar (Exact matching Screenshot 2 red box) */}
          <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevQuestion}
                disabled={currentIndex === 0}
                className="bg-slate-800 hover:bg-slate-900 disabled:opacity-40 text-white font-bold px-4 py-2.5 rounded-lg text-sm flex items-center gap-1 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNextQuestion}
                disabled={currentIndex === questions.length - 1}
                className="bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white font-bold px-5 py-2.5 rounded-lg text-sm flex items-center gap-1 transition shadow-xs"
              >
                Câu tiếp <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-slate-600 font-semibold text-xs sm:text-sm">
              <span>Thời gian làm câu hiện tại</span>
              <span className="bg-white border border-slate-300 font-mono font-bold text-slate-800 px-3 py-1 rounded-md">
                {formatQuestionTime(questionSeconds)}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: STATUS, CANDIDATE INFO & GRID (32% width on desktop) */}
        <div className="w-full md:w-80 lg:w-96 flex flex-col gap-5">
          
          {/* Candidate Info Box matching Screenshot 2 */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide border-b border-slate-100 pb-2">
              Thông tin thí sinh
            </h3>
            
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between items-center text-slate-600">
                <span>Họ tên</span>
                <span className="font-bold text-slate-900">{studentName}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Ngày sinh</span>
                <span className="text-slate-500">Chưa xác định</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Mã dự thi</span>
                <span className="font-mono font-bold text-slate-800">{studentId}</span>
              </div>
            </div>

            {/* Global Countdown Timer & Prominent Crimson Submit Button */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">Thời gian còn lại</span>
                <span className={`font-mono font-extrabold text-xl sm:text-2xl ${globalSeconds < 300 ? 'text-crimson animate-pulse' : 'text-slate-900'}`}>
                  {formatTime(globalSeconds)}
                </span>
              </div>

              <button
                onClick={() => setShowSubmitModal(true)}
                className="bg-crimson hover:bg-rose-700 text-white font-black px-6 py-2.5 rounded-lg text-sm transition shadow-md hover:shadow-lg transform active:scale-95"
              >
                Nộp bài
              </button>
            </div>
          </div>

          {/* Question Grid Section */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                DANH SÁCH CÂU HỎI ({questions.length} CÂU)
              </h4>

              {/* Grid Buttons */}
              <div className="grid grid-cols-5 gap-2 max-h-72 overflow-y-auto pr-1">
                {questions.map((q, idx) => {
                  const isAnswered = !!userAnswers[q.id];
                  const isCurrent = idx === currentIndex;

                  let btnStyle = 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200';
                  if (isCurrent) {
                    btnStyle = 'bg-slate-900 text-white font-extrabold ring-2 ring-slate-900 shadow-md';
                  } else if (isAnswered) {
                    btnStyle = 'bg-blue-600 text-white font-bold shadow-xs';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-10 h-10 rounded-full font-semibold text-xs transition-all flex items-center justify-center mx-auto border ${btnStyle}`}
                    >
                      {q.number || idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Completion Progress Bar */}
            <div className="border-t border-slate-100 pt-4 space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                <span>Bạn đã hoàn thành</span>
                <span className="font-bold text-slate-900">
                  {answeredCount}/{questions.length} câu - {progressPercent}%
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                <div
                  className="bg-crimson h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUBMIT CONFIRMATION MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl border border-slate-200">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-crimson flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">Xác nhận nộp bài thi?</h3>
              <p className="text-sm text-slate-600">
                Bạn đã hoàn thành <strong className="text-slate-900">{answeredCount}/{questions.length}</strong> câu hỏi. 
                {questions.length - answeredCount > 0 && (
                  <span className="text-amber-600 font-semibold block mt-1">
                    Còn {questions.length - answeredCount} câu chưa trả lời!
                  </span>
                )}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                disabled={isSubmitting}
                className="flex-1 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-2.5 rounded-xl text-sm transition"
              >
                Làm tiếp
              </button>
              <button
                onClick={executeSubmission}
                disabled={isSubmitting}
                className="flex-1 bg-crimson hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl text-sm transition shadow-sm flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Đang nộp...' : 'Xác nhận nộp'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ANTI-CHEAT TAB SWITCH WARNING MODAL */}
      {showAntiCheatModal && (
        <div className="fixed inset-0 bg-red-950/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border-2 border-red-500 text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto animate-bounce">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-red-600">CẢNH BÁO VI PHẠM QUY CHẾ</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Hệ thống phát hiện bạn đã rời khỏi màn hình bài thi hoặc chuyển tab trình duyệt. 
                <span className="block mt-2 font-bold text-red-700 bg-red-50 p-2 rounded-lg border border-red-200">
                  Vi phạm đã được ghi nhận vào nhật ký giám sát của Hội đồng thi (Lần {antiCheatViolations}).
                </span>
              </p>
            </div>
            <button
              onClick={() => setShowAntiCheatModal(false)}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-sm transition shadow-md"
            >
              Tôi hiểu và quay lại làm bài
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
