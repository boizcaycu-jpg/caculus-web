'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { FileText, Download, BookOpen, ExternalLink, CheckCircle } from 'lucide-react';

export default function DocumentsPage() {
  const documents = [
    {
      id: 'doc-1',
      title: 'Bộ tài liệu Ôn luyện Tư duy Toán học TSA Bách Khoa 2026',
      category: 'Tư duy Toán học',
      fileSize: '4.2 MB',
      updatedAt: '15/05/2026',
      downloadUrl: '#',
    },
    {
      id: 'doc-2',
      title: 'Tuyển tập 50 Bài đọc hiểu Kỹ năng Phân tích Logic & Văn bản',
      category: 'Tư duy Đọc hiểu',
      fileSize: '6.8 MB',
      updatedAt: '20/05/2026',
      downloadUrl: '#',
    },
    {
      id: 'doc-3',
      title: 'Cẩm nang Giải quyết vấn đề Khoa học Lý - Hóa - Sinh ứng dụng',
      category: 'Tư duy Khoa học',
      fileSize: '8.1 MB',
      updatedAt: '02/06/2026',
      downloadUrl: '#',
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-2">
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-crimson" />
            Tài liệu ôn tập & Đề thi mẫu PDF
          </h1>
          <p className="text-xs text-slate-500">Tải tài liệu dạng PDF trực tuyến để xem offline và rèn luyện kỹ năng làm bài trên giấy</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 hover:shadow-md transition flex flex-col justify-between">
              <div className="space-y-3">
                <span className="bg-rose-50 text-crimson font-bold text-[11px] px-3 py-1 rounded-full border border-rose-200 inline-block">
                  {doc.category}
                </span>
                <h3 className="font-extrabold text-slate-900 text-base">{doc.title}</h3>
                <div className="text-xs text-slate-500 space-y-1">
                  <div>Dung lượng: <strong>{doc.fileSize}</strong></div>
                  <div>Cập nhật ngày: {doc.updatedAt}</div>
                </div>
              </div>

              <a
                href={doc.downloadUrl}
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Đang tải file PDF: ${doc.title}`);
                }}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl transition text-xs flex items-center justify-center gap-2 shadow-xs"
              >
                <Download className="w-4 h-4" /> Tải tài liệu PDF
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
