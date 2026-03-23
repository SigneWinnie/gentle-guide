package com.isj.registrationmanagement.repository;

import com.isj.registrationmanagement.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    List<Registration> findByStudentId(Long studentId);
    List<Registration> findByCourseId(Long courseId);
    List<Registration> findByAcademicYear(String academicYear);
    Optional<Registration> findByStudentIdAndCourseIdAndAcademicYear(Long studentId, Long courseId, String academicYear);
    List<Registration> findByStatus(Registration.RegistrationStatus status);
}