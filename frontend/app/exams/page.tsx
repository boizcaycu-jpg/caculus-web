'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { Exam } from '@/types';
import { BookOpen, PlayCircle, Clock, CheckCircle } from 'lucide-react';

export default function ExamsPortalPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/student/exams')
      .then(res => res.json())
      .then(data => {
        setExams(data.exams || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-2">
          <h1 className="text-2xl font-black text-slate-900">Danh sách khoá luyện đề TSA</h1>
          <p className="text-xs text-slate-500">Lựa chọn đề thi thử nghiệm cấu trúc 3 phần: Tư duy Toán học, Đọc hiểu, Khoa học & Giải quyết vấn đề</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <div key={exam.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5 hover:shadow-md transition flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                    exam.isFree ? 'bg-rose-100 text-crimson' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {exam.isFree ? 'Miễn phí' : `${exam.price?.toLocaleString()} VNĐ`}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">1 kỳ thi</span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-lg">{exam.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{exam.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href={`/exams/${exam.id}`}
                  className="w-full bg-crimson hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl transition text-xs flex items-center justify-center gap-2 shadow-xs"
                >
                  <PlayCircle className="w-4 h-4" /> Tham gia khảo thí
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
