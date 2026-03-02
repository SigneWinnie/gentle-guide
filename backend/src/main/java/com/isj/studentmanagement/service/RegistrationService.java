package com.isj.studentmanagement.service;

import com.isj.studentmanagement.model.Registration;
import com.isj.studentmanagement.repository.RegistrationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class RegistrationService {
    private final RegistrationRepository registrationRepository;

    public List<Registration> getAllRegistrations() {
        return registrationRepository.findAll();
    }

    public Registration getRegistrationById(Long id) {
        return registrationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Registration not found with id: " + id));
    }

    public List<Registration> getRegistrationsByStudent(Long studentId) {
        return registrationRepository.findByStudent_Id(studentId);
    }

    public List<Registration> getRegistrationsByCourse(Long courseId) {
        return registrationRepository.findByCourse_Id(courseId);
    }

    public List<Registration> getRegistrationsByAcademicYear(String academicYear) {
        return registrationRepository.findByAcademicYear(academicYear);
    }

    public Registration createRegistration(Registration registration) {
        return registrationRepository.save(registration);
    }

    public Registration updateRegistration(Long id, Registration registrationDetails) {
        Registration registration = getRegistrationById(id);

        registration.setStudent(registrationDetails.getStudent());
        registration.setCourse(registrationDetails.getCourse());
        registration.setAcademicYear(registrationDetails.getAcademicYear());
        registration.setStatus(registrationDetails.getStatus());
        registration.setCompletionDate(registrationDetails.getCompletionDate());

        return registrationRepository.save(registration);
    }

    public void deleteRegistration(Long id) {
        Registration registration = getRegistrationById(id);
        registrationRepository.delete(registration);
    }

    public List<Registration> getActiveRegistrations() {
        return registrationRepository.findByStatus(Registration.RegistrationStatus.ACTIVE);
    }

    public List<Registration> getCompletedRegistrations() {
        return registrationRepository.findByStatus(Registration.RegistrationStatus.COMPLETED);
    }
}
