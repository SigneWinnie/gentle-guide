package com.isj.studentmanagement.service;

import com.isj.studentmanagement.model.Grade;
import com.isj.studentmanagement.repository.GradeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class GradeService {
    private final GradeRepository gradeRepository;

    public List<Grade> getAllGrades() {
        return gradeRepository.findAll();
    }

    public Grade getGradeById(Long id) {
        return gradeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Grade not found with id: " + id));
    }

    public List<Grade> getGradesByStudent(Long studentId) {
        return gradeRepository.findByStudent_Id(studentId);
    }

    public List<Grade> getGradesByCourse(Long courseId) {
        return gradeRepository.findByCourse_Id(courseId);
    }

    public List<Grade> getGradesByAcademicYear(String academicYear) {
        return gradeRepository.findByAcademicYear(academicYear);
    }

    public Grade createGrade(Grade grade) {
        return gradeRepository.save(grade);
    }

    public Grade updateGrade(Long id, Grade gradeDetails) {
        Grade grade = getGradeById(id);

        grade.setStudent(gradeDetails.getStudent());
        grade.setCourse(gradeDetails.getCourse());
        grade.setAcademicYear(gradeDetails.getAcademicYear());
        grade.setCcScore(gradeDetails.getCcScore());
        grade.setExamScore(gradeDetails.getExamScore());
        grade.calculateFinalScore();

        return gradeRepository.save(grade);
    }

    public void deleteGrade(Long id) {
        Grade grade = getGradeById(id);
        gradeRepository.delete(grade);
    }

    public List<Grade> getPassedGrades() {
        return gradeRepository.findByStatus("PASSED");
    }

    public List<Grade> getFailedGrades() {
        return gradeRepository.findByStatus("FAILED");
    }
}
