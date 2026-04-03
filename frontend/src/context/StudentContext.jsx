import { createContext, useContext, useState } from 'react';

const StudentContext = createContext();

export const defaultStudent = {
  name: '',
  semester: 1,
  attendedClasses: 0,
  totalClasses: 0,
  targetAttendance: 75,
  subjects: [],
  studyHoursPerDay: 0,
  sleepHoursPerDay: 7,
  daysToExam: 30,
  skillsScore: 0,
};

export function StudentProvider({ children }) {
  const [studentData, setStudentData] = useState(defaultStudent);
  const [logicResult, setLogicResult] = useState(null);
  const [aiInsight, setAiInsight] = useState(null);
  const [loading, setLoading] = useState(false);

  function updateStudent(fields) {
    setStudentData(prev => ({ ...prev, ...fields }));
  }

  return (
    <StudentContext.Provider value={{
      studentData,
      updateStudent,
      logicResult,
      setLogicResult,
      aiInsight,
      setAiInsight,
      loading,
      setLoading,
    }}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  return useContext(StudentContext);
}