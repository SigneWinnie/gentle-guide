package com.isj.studentmanagement.repository;

import com.isj.studentmanagement.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    Optional<Course> findByCode(String code);
    List<Course> findByDepartment(String department);
    List<Course> findBySemester(Integer semester);
    List<Course> findByActive(Boolean active);
    boolean existsByCode(String code);
}
