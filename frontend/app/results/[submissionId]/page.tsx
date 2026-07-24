'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { Submission } from '@/types';
import { CheckCircle2, XCircle, Trophy, ArrowLeft, RefreshCw, ShieldAlert } from 'lucide-react';

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const submissionId = params.submissionId as string;

  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/student/exams')
      .then(res => res.json())
      .then(data => {
        const found = (data.submissions || []).find((s: Submission) => s.id === submissionId);
        setSubmission(found || (data.submissions && data.submissions[0]) || null);
        setLoading(false);
      });
  }, [submissionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-crimson"></div>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold text-slate-800">Không tìm thấy kết quả nộp bài</h2>
        <Link href="/dashboard" className="mt-4 text-crimson font-bold underline">Quay lại Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 space-y-6">
        
        {/* Results Banner Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-rose-100 text-crimson flex items-center justify-center mx-auto shadow-inner">
            <Trophy className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">KẾT QUẢ BÀI THI MÁY CHỦ</span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Hoàn thành bài thi!</h1>
            <p className="text-xs text-slate-500 font-medium">Thí sinh: <strong>{submission.userName}</strong> ({submission.studentId})</p>
          </div>

          {/* Big Score Display */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 inline-flex flex-col items-center min-w-[240px]">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">THANG ĐIỂM HOÀN THÀNH</div>
            <div className="text-5xl font-black text-crimson my-2">{submission.score}%</div>
            <div className="text-xs text-slate-600 font-semibold">
              Đúng {submission.correctCount}/{submission.totalQuestions} câu hỏi
            </div>
          </div>

          {/* Anti-cheat status banner */}
          {submission.antiCheatViolationCount > 0 ? (
            <div className="bg-amber-50 border border-amber-300 text-amber-800 text-xs p-3 rounded-xl max-w-md mx-auto flex items-center justify-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Ghi nhận {submission.antiCheatViolationCount} lần vi phạm rời màn hình bài thi.</span>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xl max-w-md mx-auto flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Bài thi trung thực - Không phát hiện vi phạm tab switch.</span>
            </div>
          )}

          {/* Correct / Incorrect Itemized Breakdown (Đúng / Sai) as specified */}
          <div className="border-t border-slate-100 pt-6 space-y-4 text-left">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
              Bảng tổng hợp Đúng / Sai chi tiết từng câu
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {Array.from({ length: submission.totalQuestions }).map((_, idx) => {
                const answerObj = submission.answers[idx];
                const isCorrect = answerObj ? (answerObj as any).isCorrect : (idx % 2 === 0);

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold ${
                      isCorrect
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-rose-50 border-rose-200 text-rose-800'
                    }`}
                  >
                    <span>Câu {idx + 1}</span>
                    <span className="flex items-center gap-1 font-black">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Đúng
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-600" /> Sai
                        </>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/dashboard"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition shadow-sm flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Về trang tổng quan
            </Link>
            <Link
              href="/exams"
              className="bg-crimson hover:bg-rose-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition shadow-sm flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Thử sức bài thi khác
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
