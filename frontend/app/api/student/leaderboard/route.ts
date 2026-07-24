import { NextResponse } from 'next/server';
import { getUsers, getSubmissions } from '@/lib/db';

export async function GET() {
  const users = getUsers().filter(u => u.role === 'student');
  const submissions = getSubmissions();

  const leaderboard = users.map((student, idx) => {
    const studentSubmissions = submissions.filter(s => s.userId === student.id);
    const totalExams = studentSubmissions.length;
    const highestScore = studentSubmissions.reduce((max, s) => Math.max(max, s.score), totalExams > 0 ? 0 : 0);
    const avgScore = totalExams > 0 
      ? Math.round(studentSubmissions.reduce((sum, s) => sum + s.score, 0) / totalExams)
      : 0;

    return {
      rank: 0, // calculated after sorting
      id: student.id,
      name: student.name,
      studentId: student.studentId,
      totalExams,
      highestScore,
      avgScore,
    };
  });

  // Sort by highestScore desc, then totalExams desc
  leaderboard.sort((a, b) => b.highestScore - a.highestScore || b.totalExams - a.totalExams);

  leaderboard.forEach((item, index) => {
    item.rank = index + 1;
  });

  return NextResponse.json({ leaderboard });
}
