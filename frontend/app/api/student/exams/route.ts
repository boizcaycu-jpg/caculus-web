import { NextRequest, NextResponse } from 'next/server';
import { getExams, getQuestionsByModule, getSubmissions } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('caculus_token')?.value;
  const user = token ? verifyToken(token) : null;

  const exams = getExams();
  const submissions = user ? getSubmissions(user.userId) : [];

  return NextResponse.json({
    exams,
    submissions,
  });
}
