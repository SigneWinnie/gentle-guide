import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

// ---- Types ----
export interface Student {
  id: string;
  matricule: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: "M" | "F";
  address: string;
  department: string;
  level: string;
  createdAt: string;
}

export interface Registration {
  id: string;
  studentId: string;
  academicYear: string;
  program: string;
  level: string;
  registrationDate: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  totalFee: number;
  amountPaid: number;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  department: string;
  semester: number;
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  academicYear: string;
  ccScore: number;
  examScore: number;
  finalScore: number;
  gradeLetter: string;
}

export interface Room {
  id: string;
  name: string;
  building: string;
  capacity: number;
  type: "CLASSROOM" | "LAB" | "AMPHITHEATER";
  hasProjector: boolean;
  hasAC: boolean;
}

export interface Schedule {
  id: string;
  roomId: string;
  courseCode: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  academicYear: string;
}

export interface EmailLog {
  id: string;
  recipient: string;
  subject: string;
  template: string;
  status: "SENT" | "FAILED" | "PENDING";
  sentAt: string;
  message: string;
}

// ---- Helper ----
const uid = () => Math.random().toString(36).slice(2, 10);
const now = () => new Date().toISOString();

function calcGradeLetter(score: number): string {
  if (score >= 16) return "A";
  if (score >= 14) return "B+";
  if (score >= 12) return "B";
  if (score >= 10) return "C";
  if (score >= 8) return "D";
  return "F";
}

// ---- Context ----
interface AppState {
  students: Student[];
  registrations: Registration[];
  courses: Course[];
  grades: Grade[];
  rooms: Room[];
  schedules: Schedule[];
  emailLogs: EmailLog[];
  addStudent: (s: Omit<Student, "id" | "createdAt">) => void;
  updateStudent: (id: string, s: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  addRegistration: (r: Omit<Registration, "id" | "registrationDate">) => void;
  updateRegistration: (id: string, r: Partial<Registration>) => void;
  deleteRegistration: (id: string) => void;
  addCourse: (c: Omit<Course, "id">) => void;
  updateCourse: (id: string, c: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  addGrade: (g: Omit<Grade, "id" | "finalScore" | "gradeLetter">) => void;
  updateGrade: (id: string, g: Partial<Grade>) => void;
  deleteGrade: (id: string) => void;
  addRoom: (r: Omit<Room, "id">) => void;
  updateRoom: (id: string, r: Partial<Room>) => void;
  deleteRoom: (id: string) => void;
  addSchedule: (s: Omit<Schedule, "id">) => void;
  deleteSchedule: (id: string) => void;
  sendEmail: (e: Omit<EmailLog, "id" | "sentAt" | "status">) => void;
}

const AppContext = createContext<AppState | null>(null);

export const useAppData = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppData must be inside AppDataProvider");
  return ctx;
};

// ---- Sample Data ----
const sampleStudents: Student[] = [
  { id: "s1", matricule: "ISJ2024001", firstName: "Jean", lastName: "Mbarga", email: "jean.mbarga@isj.cm", phone: "657079807", dateOfBirth: "2000-03-15", gender: "M", address: "Yaoundé, Cameroun", department: "Computer Science", level: "L3", createdAt: now() },
  { id: "s2", matricule: "ISJ2024002", firstName: "Marie", lastName: "Nguesso", email: "marie.nguesso@isj.cm", phone: "651369696", dateOfBirth: "2001-07-22", gender: "F", address: "Douala, Cameroun", department: "Software Engineering", level: "L2", createdAt: now() },
  { id: "s3", matricule: "ISJ2024003", firstName: "Paul", lastName: "Atangana", email: "paul.atangana@isj.cm", phone: "690123456", dateOfBirth: "1999-11-08", gender: "M", address: "Yaoundé, Cameroun", department: "Computer Science", level: "M1", createdAt: now() },
];

const sampleCourses: Course[] = [
  { id: "c1", code: "CS301", name: "IT Architecture", credits: 4, department: "Computer Science", semester: 1 },
  { id: "c2", code: "CS302", name: "Software Engineering", credits: 3, department: "Computer Science", semester: 1 },
  { id: "c3", code: "CS303", name: "Database Systems", credits: 4, department: "Computer Science", semester: 2 },
  { id: "c4", code: "SE201", name: "Web Development", credits: 3, department: "Software Engineering", semester: 1 },
];

const sampleRooms: Room[] = [
  { id: "r1", name: "Room A101", building: "Main Campus", capacity: 50, type: "CLASSROOM", hasProjector: true, hasAC: true },
  { id: "r2", name: "Lab B201", building: "Main Campus", capacity: 30, type: "LAB", hasProjector: true, hasAC: true },
  { id: "r3", name: "Amphi C001", building: "New Campus", capacity: 200, type: "AMPHITHEATER", hasProjector: true, hasAC: false },
];

export const AppDataProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<Student[]>(sampleStudents);
  const [registrations, setRegistrations] = useState<Registration[]>([
    { id: "reg1", studentId: "s1", academicYear: "2024-2025", program: "Computer Science", level: "L3", registrationDate: "2024-09-01", status: "CONFIRMED", totalFee: 500000, amountPaid: 500000 },
    { id: "reg2", studentId: "s2", academicYear: "2024-2025", program: "Software Engineering", level: "L2", registrationDate: "2024-09-05", status: "CONFIRMED", totalFee: 500000, amountPaid: 300000 },
  ]);
  const [courses, setCourses] = useState<Course[]>(sampleCourses);
  const [grades, setGrades] = useState<Grade[]>([
    { id: "g1", studentId: "s1", courseId: "c1", academicYear: "2024-2025", ccScore: 15, examScore: 14, finalScore: 14.4, gradeLetter: "B+" },
    { id: "g2", studentId: "s1", courseId: "c2", academicYear: "2024-2025", ccScore: 12, examScore: 16, finalScore: 14.4, gradeLetter: "B+" },
  ]);
  const [rooms, setRooms] = useState<Room[]>(sampleRooms);
  const [schedules, setSchedules] = useState<Schedule[]>([
    { id: "sch1", roomId: "r1", courseCode: "CS301", dayOfWeek: "Monday", startTime: "08:00", endTime: "10:00", academicYear: "2024-2025" },
    { id: "sch2", roomId: "r2", courseCode: "CS303", dayOfWeek: "Wednesday", startTime: "14:00", endTime: "17:00", academicYear: "2024-2025" },
  ]);
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([]);

  const addStudent = useCallback((s: Omit<Student, "id" | "createdAt">) => {
    setStudents((prev) => [...prev, { ...s, id: uid(), createdAt: now() }]);
  }, []);
  const updateStudent = useCallback((id: string, s: Partial<Student>) => {
    setStudents((prev) => prev.map((x) => (x.id === id ? { ...x, ...s } : x)));
  }, []);
  const deleteStudent = useCallback((id: string) => {
    setStudents((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const addRegistration = useCallback((r: Omit<Registration, "id" | "registrationDate">) => {
    setRegistrations((prev) => [...prev, { ...r, id: uid(), registrationDate: new Date().toISOString().split("T")[0] }]);
  }, []);
  const updateRegistration = useCallback((id: string, r: Partial<Registration>) => {
    setRegistrations((prev) => prev.map((x) => (x.id === id ? { ...x, ...r } : x)));
  }, []);
  const deleteRegistration = useCallback((id: string) => {
    setRegistrations((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const addCourse = useCallback((c: Omit<Course, "id">) => {
    setCourses((prev) => [...prev, { ...c, id: uid() }]);
  }, []);
  const updateCourse = useCallback((id: string, c: Partial<Course>) => {
    setCourses((prev) => prev.map((x) => (x.id === id ? { ...x, ...c } : x)));
  }, []);
  const deleteCourse = useCallback((id: string) => {
    setCourses((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const addGrade = useCallback((g: Omit<Grade, "id" | "finalScore" | "gradeLetter">) => {
    const finalScore = +(g.ccScore * 0.4 + g.examScore * 0.6).toFixed(2);
    setGrades((prev) => [...prev, { ...g, id: uid(), finalScore, gradeLetter: calcGradeLetter(finalScore) }]);
  }, []);
  const updateGrade = useCallback((id: string, g: Partial<Grade>) => {
    setGrades((prev) => prev.map((x) => {
      if (x.id !== id) return x;
      const merged = { ...x, ...g };
      merged.finalScore = +(merged.ccScore * 0.4 + merged.examScore * 0.6).toFixed(2);
      merged.gradeLetter = calcGradeLetter(merged.finalScore);
      return merged;
    }));
  }, []);
  const deleteGrade = useCallback((id: string) => {
    setGrades((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const addRoom = useCallback((r: Omit<Room, "id">) => {
    setRooms((prev) => [...prev, { ...r, id: uid() }]);
  }, []);
  const updateRoom = useCallback((id: string, r: Partial<Room>) => {
    setRooms((prev) => prev.map((x) => (x.id === id ? { ...x, ...r } : x)));
  }, []);
  const deleteRoom = useCallback((id: string) => {
    setRooms((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const addSchedule = useCallback((s: Omit<Schedule, "id">) => {
    setSchedules((prev) => [...prev, { ...s, id: uid() }]);
  }, []);
  const deleteSchedule = useCallback((id: string) => {
    setSchedules((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const sendEmail = useCallback((e: Omit<EmailLog, "id" | "sentAt" | "status">) => {
    setEmailLogs((prev) => [...prev, { ...e, id: uid(), sentAt: now(), status: "SENT" }]);
  }, []);

  return (
    <AppContext.Provider value={{
      students, registrations, courses, grades, rooms, schedules, emailLogs,
      addStudent, updateStudent, deleteStudent,
      addRegistration, updateRegistration, deleteRegistration,
      addCourse, updateCourse, deleteCourse,
      addGrade, updateGrade, deleteGrade,
      addRoom, updateRoom, deleteRoom,
      addSchedule, deleteSchedule,
      sendEmail,
    }}>
      {children}
    </AppContext.Provider>
  );
};
