package com.isj.studentmanagement.controller;

import com.isj.studentmanagement.model.Schedule;
import com.isj.studentmanagement.service.ScheduleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/schedules")
@RequiredArgsConstructor
public class ScheduleController {
    private final ScheduleService scheduleService;

    @GetMapping
    public ResponseEntity<List<Schedule>> getAllSchedules() {
        return ResponseEntity.ok(scheduleService.getAllSchedules());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Schedule> getScheduleById(@PathVariable Long id) {
        return ResponseEntity.ok(scheduleService.getScheduleById(id));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Schedule>> getSchedulesByCourse(@PathVariable Long courseId) {
        return ResponseEntity.ok(scheduleService.getSchedulesByCourse(courseId));
    }

    @GetMapping("/room/{roomId}")
    public ResponseEntity<List<Schedule>> getSchedulesByRoom(@PathVariable Long roomId) {
        return ResponseEntity.ok(scheduleService.getSchedulesByRoom(roomId));
    }

    @GetMapping("/year/{academicYear}")
    public ResponseEntity<List<Schedule>> getSchedulesByAcademicYear(@PathVariable String academicYear) {
        return ResponseEntity.ok(scheduleService.getSchedulesByAcademicYear(academicYear));
    }

    @PostMapping
    public ResponseEntity<Schedule> createSchedule(@Valid @RequestBody Schedule schedule) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(scheduleService.createSchedule(schedule));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Schedule> updateSchedule(
            @PathVariable Long id,
            @Valid @RequestBody Schedule schedule) {
        return ResponseEntity.ok(scheduleService.updateSchedule(id, schedule));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id) {
        scheduleService.deleteSchedule(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/active/list")
    public ResponseEntity<List<Schedule>> getActiveSchedules() {
        return ResponseEntity.ok(scheduleService.getActiveSchedules());
    }
}
