package com.isj.studentmanagement.service;

import com.isj.studentmanagement.model.Student;
import com.isj.studentmanagement.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class StudentService {
    private final StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
    }

    public Student getStudentByMatricule(String matricule) {
        return studentRepository.findByMatricule(matricule)
            .orElseThrow(() -> new RuntimeException("Student not found with matricule: " + matricule));
    }

    public List<Student> getStudentsByDepartment(String department) {
        return studentRepository.findByDepartment(department);
    }

    public List<Student> getStudentsByLevel(String level) {
        return studentRepository.findByLevel(level);
    }

    public Student createStudent(Student student) {
        if (studentRepository.existsByMatricule(student.getMatricule())) {
            throw new RuntimeException("Student with matricule already exists: " + student.getMatricule());
        }
        if (studentRepository.existsByEmail(student.getEmail())) {
            throw new RuntimeException("Student with email already exists: " + student.getEmail());
        }
        return studentRepository.save(student);
    }

    public Student updateStudent(Long id, Student studentDetails) {
        Student student = getStudentById(id);

        if (!student.getEmail().equals(studentDetails.getEmail()) &&
            studentRepository.existsByEmail(studentDetails.getEmail())) {
            throw new RuntimeException("Email already in use: " + studentDetails.getEmail());
        }

        student.setFirstName(studentDetails.getFirstName());
        student.setLastName(studentDetails.getLastName());
        student.setEmail(studentDetails.getEmail());
        student.setPhone(studentDetails.getPhone());
        student.setDateOfBirth(studentDetails.getDateOfBirth());
        student.setGender(studentDetails.getGender());
        student.setAddress(studentDetails.getAddress());
        student.setDepartment(studentDetails.getDepartment());
        student.setLevel(studentDetails.getLevel());
        student.setActive(studentDetails.getActive());

        return studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        Student student = getStudentById(id);
        studentRepository.delete(student);
    }

    public List<Student> searchStudents(String keyword) {
        return studentRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(keyword, keyword);
    }

    public List<Student> getActiveStudents() {
        return studentRepository.findByActive(true);
    }
}
