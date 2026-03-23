package com.isj.registrationmanagement.controller;

import com.isj.registrationmanagement.model.Registration;
import com.isj.registrationmanagement.service.RegistrationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/registrations")
@RequiredArgsConstructor
public class RegistrationController {
    private final RegistrationService registrationService;

    @GetMapping
    public ResponseEntity<List<Registration>> getAllRegistrations() {
        return ResponseEntity.ok(registrationService.getAllRegistrations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Registration> getRegistrationById(@PathVariable Long id) {
        return ResponseEntity.ok(registrationService.getRegistrationById(id));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Registration>> getRegistrationsByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(registrationService.getRegistrationsByStudent(studentId));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Registration>> getRegistrationsByCourse(@PathVariable Long courseId) {
        return ResponseEntity.ok(registrationService.getRegistrationsByCourse(courseId));
    }

    @GetMapping("/year/{academicYear}")
    public ResponseEntity<List<Registration>> getRegistrationsByAcademicYear(@PathVariable String academicYear) {
        return ResponseEntity.ok(registrationService.getRegistrationsByAcademicYear(academicYear));
    }

    @PostMapping
    public ResponseEntity<Registration> createRegistration(@Valid @RequestBody Registration registration) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(registrationService.createRegistration(registration));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Registration> updateRegistration(
            @PathVariable Long id,
            @Valid @RequestBody Registration registration) {
        return ResponseEntity.ok(registrationService.updateRegistration(id, registration));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRegistration(@PathVariable Long id) {
        registrationService.deleteRegistration(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/active/list")
    public ResponseEntity<List<Registration>> getActiveRegistrations() {
        return ResponseEntity.ok(registrationService.getActiveRegistrations());
    }

    @GetMapping("/completed/list")
    public ResponseEntity<List<Registration>> getCompletedRegistrations() {
        return ResponseEntity.ok(registrationService.getCompletedRegistrations());
    }
}