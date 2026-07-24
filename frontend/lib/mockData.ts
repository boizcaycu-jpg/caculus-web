import { User, Exam, Question, Submission, AntiCheatLog } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-admin-1',
    email: 'admin@caculus.edu.vn',
    // bcrypt hash of 'admin123'
    passwordHash: '$2a$10$w6M7q3p/k9Zz9t.g3/6VyeGz3/U9eD2eF3.L/M9X8/1Y1Y1Y1Y1Y1', 
    name: 'Quản trị viên hệ thống',
    studentId: 'ADMIN-001',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user-student-1',
    email: 'student@caculus.edu.vn',
    passwordHash: '$2a$10$w6M7q3p/k9Zz9t.g3/6VyeGz3/U9eD2eF3.L/M9X8/1Y1Y1Y1Y1Y1',
    name: 'Nguyễn Cường',
    studentId: 'AECK496692',
    role: 'student',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user-student-2',
    email: 'tranvanb@caculus.edu.vn',
    passwordHash: '$2a$10$w6M7q3p/k9Zz9t.g3/6VyeGz3/U9eD2eF3.L/M9X8/1Y1Y1Y1Y1Y1',
    name: 'Trần Văn B',
    studentId: 'AECK496693',
    role: 'student',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user-student-3',
    email: 'lethic@caculus.edu.vn',
    passwordHash: '$2a$10$w6M7q3p/k9Zz9t.g3/6VyeGz3/U9eD2eF3.L/M9X8/1Y1Y1Y1Y1Y1',
    name: 'Lê Thị C',
    studentId: 'AECK496694',
    role: 'student',
    createdAt: new Date().toISOString(),
  }
];

export const INITIAL_EXAMS: Exam[] = [
  {
    id: 'exam-2k9-1',
    title: 'Đề Trải nghiệm Premium 2K9 - Đề số 1',
    description: 'Bộ đề thi chuẩn cấu trúc Đánh giá Tư duy (TSA) Bách Khoa 2026',
    isFree: true,
    modules: [
      {
        id: 'mod-math-1',
        examId: 'exam-2k9-1',
        title: '1. Tư duy Toán học',
        category: 'math',
        durationMinutes: 60,
        openTime: '00:00 02/05/2026',
        closeTime: '02:59 07/05/2027',
        totalQuestions: 40,
      },
      {
        id: 'mod-reading-1',
        examId: 'exam-2k9-1',
        title: '2. Tư duy Đọc hiểu',
        category: 'reading',
        durationMinutes: 30,
        openTime: '11:01 24/03/2026',
        closeTime: '11:01 31/05/2026',
        totalQuestions: 20,
      },
      {
        id: 'mod-science-1',
        examId: 'exam-2k9-1',
        title: '3. Tư duy Khoa học & Giải quyết vấn đề',
        category: 'science',
        durationMinutes: 60,
        openTime: '14:01 23/03/2026',
        closeTime: '14:01 07/05/2027',
        totalQuestions: 20,
      }
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'exam-2k9-2',
    title: 'Đề Trải nghiệm Premium 2K9 - Đề số 2',
    description: 'Thử thách nâng cao các dạng bài logic và phân tích dữ liệu thực tế',
    isFree: false,
    price: 150000,
    modules: [
      {
        id: 'mod-math-2',
        examId: 'exam-2k9-2',
        title: '1. Tư duy Toán học',
        category: 'math',
        durationMinutes: 60,
        openTime: '08:00 01/06/2026',
        closeTime: '23:59 30/12/2027',
        totalQuestions: 40,
      },
      {
        id: 'mod-reading-2',
        examId: 'exam-2k9-2',
        title: '2. Tư duy Đọc hiểu',
        category: 'reading',
        durationMinutes: 30,
        openTime: '08:00 01/06/2026',
        closeTime: '23:59 30/12/2027',
        totalQuestions: 20,
      },
      {
        id: 'mod-science-2',
        examId: 'exam-2k9-2',
        title: '3. Tư duy Khoa học & Giải quyết vấn đề',
        category: 'science',
        durationMinutes: 60,
        openTime: '08:00 01/06/2026',
        closeTime: '23:59 30/12/2027',
        totalQuestions: 20,
      }
    ],
    createdAt: new Date().toISOString(),
  }
];

export const INITIAL_QUESTIONS: Question[] = [
  // READING MODULE QUESTIONS (Matching Screenshot 2 exact questions: Hydroponics / Gericke passage!)
  {
    id: 'q-read-16',
    moduleId: 'mod-reading-1',
    number: 16,
    text: 'Theo đoạn văn, phát biểu nào sau đây đúng về ứng dụng ban đầu của thủy canh?',
    passage: `[Đoạn văn Đọc hiểu] 
Trong những năm 1930, William Frederick Gericke tại Đại học California ở Berkeley bắt đầu thúc đẩy việc trồng cây nông nghiệp trong dung dịch dinh dưỡng thay vì đất. Ông đặt tên cho phương pháp này là "Hydroponics" (Thủy canh). Gericke đã thu hút sự chú ý của công chúng khi trồng được những cây cà chua khổng lồ trong bãi sau nhà mình bằng các bể chứa nước dinh dưỡng.

Tuy nhiên, giới báo chí Mỹ thời đó đã thêu dệt và làm quá lên về tính khả thi thương mại cũng như quy mô áp dụng thực tế. Mặc dù phương pháp thủy canh của Gericke tỏ ra vượt trội trong môi trường thí nghiệm kiểm soát, việc triển khai đại trà đòi hỏi chi phí hạ tầng ban đầu rất lớn. Nhiều kẻ vụ lợi đã lợi dụng các tiêu đề giật gân của báo chí để bán các bộ kits thủy canh kém chất lượng nhằm trục lợi từ người tiêu dùng thiếu kinh nghiệm.

(Dòng 38-45): Phương pháp này có thể được áp dụng trong môi trường vô trùng, giảm thiểu đáng kể sâu bệnh và lượng nước tiêu thụ so với canh tác truyền thống.
(Dòng 46-52): Tóm lại, mặc dù phương pháp thủy canh thực sự là một đột phá khoa học quan trọng, bài học từ làn sóng cường điệu đầu thế kỷ 20 cho thấy tầm quan trọng của việc đánh giá trung thực giữa thành công phòng thí nghiệm và tính khả thi kinh tế thị trường.`,
    options: [
      { id: 'opt-a', text: 'Các loại cây trong bảng phương pháp thủy canh của Gericke' },
      { id: 'opt-b', text: 'Việc áp dụng thủy canh của Gericke' },
      { id: 'opt-c', text: 'Những cây cà chua của Gericke' },
      { id: 'opt-d', text: 'Các bể chứa nước lớn' }
    ],
    correctOptionId: 'opt-c',
    explanation: 'Dựa vào đoạn văn, Gericke đã thành công trồng những cây cà chua khổng lồ trong bãi sau nhà mình để chứng minh thủy canh.'
  },
  {
    id: 'q-read-17',
    moduleId: 'mod-reading-1',
    number: 17,
    text: 'Kết luận chính của tác giả trong đoạn cuối (dòng 46-52) là gì?',
    passage: `(Dòng 46-52): Tóm lại, mặc dù phương pháp thủy canh thực sự là một đột phá khoa học quan trọng, bài học từ làn sóng cường điệu đầu thế kỷ 20 cho thấy tầm quan trọng của việc đánh giá trung thực giữa thành công phòng thí nghiệm và tính khả thi kinh tế thị trường.`,
    options: [
      { id: 'opt-a', text: 'Báo chí Mỹ đã thiếu chính xác khi viết về thủy canh.' },
      { id: 'opt-b', text: 'Các ưu điểm của phương pháp thủy canh đã được chứng minh.' },
      { id: 'opt-c', text: 'Cây cà chua được trồng bằng phương pháp thủy canh đáng được ca ngợi.' },
      { id: 'opt-d', text: 'Những kẻ vô đạo đức lợi dụng ưu điểm của thủy canh để trục lợi.' }
    ],
    correctOptionId: 'opt-a',
    explanation: 'Tác giả nhấn mạnh sự chênh lệch giữa sự thêu dệt truyền thông và thực tế kinh tế thương mại.'
  },
  {
    id: 'q-read-18',
    moduleId: 'mod-reading-1',
    number: 18,
    text: 'Ý nào sau đây KHÔNG được nhắc đến trong đoạn 6 (dòng 38-45)?',
    passage: `(Dòng 38-45): Phương pháp này có thể được áp dụng trong môi trường vô trùng, giảm thiểu đáng kể sâu bệnh và lượng nước tiêu thụ so với canh tác truyền thống.`,
    options: [
      { id: 'opt-a', text: 'Có thể sử dụng phương pháp thủy canh trong môi trường trơ.' },
      { id: 'opt-b', text: 'Thủy canh tiết kiệm nước hơn so với đất.' },
      { id: 'opt-c', text: 'Sâu bệnh được loại bỏ hoàn toàn mà không cần hóa chất.' },
      { id: 'opt-d', text: 'Năng suất nông sản tăng gấp 10 lần.' }
    ],
    correctOptionId: 'opt-d',
    explanation: 'Đoạn văn không đưa ra con số khẳng định năng suất tăng gấp 10 lần.'
  },

  // MATH MODULE QUESTIONS
  {
    id: 'q-math-1',
    moduleId: 'mod-math-1',
    number: 1,
    text: 'Một công ty sản xuất đồ điện tử tính toán chi phí cố định hằng ngày là 12,000,000 VNĐ và chi phí sản xuất mỗi sản phẩm là 450,000 VNĐ. Nếu giá bán mỗi sản phẩm là 650,000 VNĐ, công ty cần bán ít nhất bao nhiêu sản phẩm mỗi ngày để bắt đầu có lãi?',
    options: [
      { id: 'opt-m1-a', text: '50 sản phẩm' },
      { id: 'opt-m1-b', text: '60 sản phẩm' },
      { id: 'opt-m1-c', text: '61 sản phẩm' },
      { id: 'opt-m1-d', text: '75 sản phẩm' }
    ],
    correctOptionId: 'opt-m1-c',
    explanation: 'Lợi nhuận mỗi sản phẩm = 650,000 - 450,000 = 200,000 VNĐ. Điểm hòa vốn = 12,000,000 / 200,000 = 60 sản phẩm. Để bắt đầu có lãi cần ít nhất 61 sản phẩm.'
  },
  {
    id: 'q-math-2',
    moduleId: 'mod-math-2',
    number: 2,
    text: 'Cho hàm số f(x) liên tục trên R có bảng biến thiên dạng hình chuông cân đối qua x = 2. Biết tích phân từ 0 đến 4 của f(x) dx = 16. Giá trị của tích phân từ 2 đến 4 của f(x) dx là bao nhiêu?',
    options: [
      { id: 'opt-m2-a', text: '4' },
      { id: 'opt-m2-b', text: '8' },
      { id: 'opt-m2-c', text: '12' },
      { id: 'opt-m2-d', text: '16' }
    ],
    correctOptionId: 'opt-m2-b',
    explanation: 'Do tính đối xứng qua x = 2, tích phân từ 2 đến 4 bằng một nửa tích phân từ 0 đến 4 = 16 / 2 = 8.'
  },
  {
    id: 'q-math-3',
    moduleId: 'mod-math-1',
    number: 3,
    text: 'Trong một giải đấu bóng đá gồm 8 đội thi đấu vòng tròn 1 lượt. Mỗi trận thắng được 3 điểm, hòa được 1 điểm, thua 0 điểm. Tổng số điểm của tất cả 8 đội sau khi kết thúc giải đấu có thể đạt giá trị nào sau đây?',
    options: [
      { id: 'opt-m3-a', text: '75 điểm' },
      { id: 'opt-m3-b', text: '80 điểm' },
      { id: 'opt-m3-c', text: '84 điểm' },
      { id: 'opt-m3-d', text: '90 điểm' }
    ],
    correctOptionId: 'opt-m3-a',
    explanation: 'Tổng số trận = C(8,2) = 28 trận. Mỗi trận thắng-thua cho tổng 3 điểm, trận hòa cho tổng 2 điểm. Tổng điểm nằm trong khoảng [56, 84]. Với 84 - (số trận hòa) = 75 điểm khi có 9 trận hòa.'
  },

  // SCIENCE & PROBLEM SOLVING QUESTIONS
  {
    id: 'q-sci-1',
    moduleId: 'mod-science-1',
    number: 1,
    text: 'Trong phản ứng tổng hợp Ammonia (NH3) theo phương pháp Haber-Bosch: N2(k) + 3H2(k) ⇌ 2NH3(k), ΔH < 0. Để tăng hiệu suất thu hồi NH3 trong công nghiệp, biện pháp nào sau đây là hiệu quả nhất?',
    options: [
      { id: 'opt-s1-a', text: 'Tăng nhiệt độ và giảm áp suất hệ thống' },
      { id: 'opt-s1-b', text: 'Giảm nhiệt độ và tăng áp suất hệ thống' },
      { id: 'opt-s1-c', text: 'Tăng nhiệt độ và sử dụng thêm chất xúc tác Fe' },
      { id: 'opt-s1-d', text: 'Giảm áp suất và ngưng tụ liên tục NH3' }
    ],
    correctOptionId: 'opt-s1-b',
    explanation: 'Phản ứng tỏa nhiệt (ΔH < 0) nên giảm nhiệt độ dịch chuyển cân bằng sang phải. Phản ứng làm giảm số mol khí nên tăng áp suất dịch chuyển sang phải.'
  },
  {
    id: 'q-sci-2',
    moduleId: 'mod-science-1',
    number: 2,
    text: 'Một thiết bị cảm biến nhiệt độ báo động khi điện trở R giảm xuống dưới 200 Ω. Biết R biến thiên theo nhiệt độ T (°C) theo công thức R(T) = 1000 / (1 + 0.05T). Nhiệt độ tối thiểu để thiết bị kích hoạt báo động là:',
    options: [
      { id: 'opt-s2-a', text: '60 °C' },
      { id: 'opt-s2-b', text: '75 °C' },
      { id: 'opt-s2-c', text: '80 °C' },
      { id: 'opt-s2-d', text: '100 °C' }
    ],
    correctOptionId: 'opt-s2-c',
    explanation: '1000 / (1 + 0.05T) <= 200 => 1 + 0.05T >= 5 => 0.05T >= 4 => T >= 80 °C.'
  }
];

export const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: 'sub-1',
    examId: 'exam-2k9-1',
    moduleId: 'mod-math-1',
    userId: 'user-student-1',
    userName: 'Nguyễn Cường',
    studentId: 'AECK496692',
    score: 85,
    totalQuestions: 40,
    correctCount: 34,
    answers: [],
    submittedAt: '2026-07-24T14:30:00.000Z',
    antiCheatViolationCount: 0,
  },
  {
    id: 'sub-2',
    examId: 'exam-2k9-1',
    moduleId: 'mod-reading-1',
    userId: 'user-student-1',
    userName: 'Nguyễn Cường',
    studentId: 'AECK496692',
    score: 90,
    totalQuestions: 20,
    correctCount: 18,
    answers: [],
    submittedAt: '2026-07-24T15:15:00.000Z',
    antiCheatViolationCount: 1,
  }
];

export const INITIAL_ANTICHEAT_LOGS: AntiCheatLog[] = [
  {
    id: 'ac-1',
    userId: 'user-student-1',
    userName: 'Nguyễn Cường',
    studentId: 'AECK496692',
    examId: 'exam-2k9-1',
    moduleId: 'mod-reading-1',
    eventType: 'tab_switch',
    timestamp: '2026-07-24T15:10:22.000Z',
    details: 'Thí sinh rời màn hình bài thi (Chuyển tab trình duyệt)'
  }
];
