package com.isj.studentmanagement.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class ApiController {

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> welcome() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Welcome to Student Management System API");
        response.put("version", "1.0.0");
        response.put("status", "Running");
        response.put("timestamp", System.currentTimeMillis());
        response.put("availableEndpoints", Map.of(
                "students", "http://localhost:8080/students",
                "courses", "http://localhost:8080/courses",
                "grades", "http://localhost:8080/grades",
                "registrations", "http://localhost:8080/registrations",
                "rooms", "http://localhost:8080/rooms",
                "schedules", "http://localhost:8080/schedules"
        ));
        return ResponseEntity.ok(response);
    }
}
