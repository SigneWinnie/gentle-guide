package com.isj.studentmanagement.repository;

import com.isj.studentmanagement.model.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface GradeRepository extends JpaRepository<Grade, Long> {
    List<Grade> findByStudent_Id(Long studentId);
    List<Grade> findByCourse_Id(Long courseId);
    List<Grade> findByAcademicYear(String academicYear);
    Optional<Grade> findByStudent_IdAndCourse_Id(Long studentId, Long courseId);
    List<Grade> findByStatus(String status);
}
