'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Award, Trophy, Medal, Star } from 'lucide-react';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/student/leaderboard')
      .then(res => res.json())
      .then(data => {
        setLeaderboard(data.leaderboard || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-2 text-center">
          <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-2 border border-amber-200">
            <Trophy className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">Bảng Xếp Hạng Toàn Hệ Thống CACULUS TSA</h1>
          <p className="text-xs text-slate-500">Bảng vinh danh thí sinh có kết quả bài thi Tư duy cao nhất</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3 text-center">Hạng</th>
                  <th className="p-3">Thí sinh</th>
                  <th className="p-3">Mã dự thi</th>
                  <th className="p-3 text-center">Số bài thi</th>
                  <th className="p-3 text-right">Điểm cao nhất</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leaderboard.map((item) => {
                  let rankBadge = <span className="font-mono font-bold text-slate-600">#{item.rank}</span>;
                  if (item.rank === 1) rankBadge = <span className="text-lg">🥇</span>;
                  if (item.rank === 2) rankBadge = <span className="text-lg">🥈</span>;
                  if (item.rank === 3) rankBadge = <span className="text-lg">🥉</span>;

                  return (
                    <tr key={item.id} className="hover:bg-slate-50 transition">
                      <td className="p-3 text-center">{rankBadge}</td>
                      <td className="p-3 font-bold text-slate-900">{item.name}</td>
                      <td className="p-3 font-mono text-slate-500">{item.studentId}</td>
                      <td className="p-3 text-center font-mono font-semibold">{item.totalExams} bài</td>
                      <td className="p-3 text-right font-mono font-extrabold text-crimson text-base">
                        {item.highestScore} %
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
