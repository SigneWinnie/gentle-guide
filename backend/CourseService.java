package com.isj.studentmanagement.service;

import com.isj.studentmanagement.model.Course;
import com.isj.studentmanagement.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CourseService {
    private final CourseRepository courseRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));
    }

    public Course getCourseByCode(String code) {
        return courseRepository.findByCode(code)
            .orElseThrow(() -> new RuntimeException("Course not found with code: " + code));
    }

    public List<Course> getCoursesByDepartment(String department) {
        return courseRepository.findByDepartment(department);
    }

    public List<Course> getCoursesBySemester(Integer semester) {
        return courseRepository.findBySemester(semester);
    }

    public Course createCourse(Course course) {
        if (courseRepository.existsByCode(course.getCode())) {
            throw new RuntimeException("Course with code already exists: " + course.getCode());
        }
        return courseRepository.save(course);
    }

    public Course updateCourse(Long id, Course courseDetails) {
        Course course = getCourseById(id);

        if (!course.getCode().equals(courseDetails.getCode()) &&
            courseRepository.existsByCode(courseDetails.getCode())) {
            throw new RuntimeException("Course code already exists: " + courseDetails.getCode());
        }

        course.setCode(courseDetails.getCode());
        course.setName(courseDetails.getName());
        course.setCredits(courseDetails.getCredits());
        course.setDepartment(courseDetails.getDepartment());
        course.setSemester(courseDetails.getSemester());
        course.setDescription(courseDetails.getDescription());
        course.setActive(courseDetails.getActive());

        return courseRepository.save(course);
    }

    public void deleteCourse(Long id) {
        Course course = getCourseById(id);
        courseRepository.delete(course);
    }

    public List<Course> getActiveCourses() {
        return courseRepository.findByActive(true);
    }
}
