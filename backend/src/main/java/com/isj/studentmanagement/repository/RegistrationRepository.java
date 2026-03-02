package com.isj.studentmanagement.repository;

import com.isj.studentmanagement.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    List<Registration> findByStudent_Id(Long studentId);
    List<Registration> findByCourse_Id(Long courseId);
    List<Registration> findByAcademicYear(String academicYear);
    Optional<Registration> findByStudent_IdAndCourse_IdAndAcademicYear(Long studentId, Long courseId, String academicYear);
    List<Registration> findByStatus(Registration.RegistrationStatus status);
}
