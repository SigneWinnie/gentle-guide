package com.isj.studentmanagement.service;

import com.isj.studentmanagement.model.Schedule;
import com.isj.studentmanagement.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;

    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    public Schedule getScheduleById(Long id) {
        return scheduleRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Schedule not found with id: " + id));
    }

    public List<Schedule> getSchedulesByCourse(Long courseId) {
        return scheduleRepository.findByCourse_Id(courseId);
    }

    public List<Schedule> getSchedulesByRoom(Long roomId) {
        return scheduleRepository.findByRoom_Id(roomId);
    }

    public List<Schedule> getSchedulesByAcademicYear(String academicYear) {
        return scheduleRepository.findByAcademicYear(academicYear);
    }

    public Schedule createSchedule(Schedule schedule) {
        return scheduleRepository.save(schedule);
    }

    public Schedule updateSchedule(Long id, Schedule scheduleDetails) {
        Schedule schedule = getScheduleById(id);

        schedule.setCourse(scheduleDetails.getCourse());
        schedule.setRoom(scheduleDetails.getRoom());
        schedule.setDayOfWeek(scheduleDetails.getDayOfWeek());
        schedule.setStartTime(scheduleDetails.getStartTime());
        schedule.setEndTime(scheduleDetails.getEndTime());
        schedule.setAcademicYear(scheduleDetails.getAcademicYear());
        schedule.setActive(scheduleDetails.getActive());

        return scheduleRepository.save(schedule);
    }

    public void deleteSchedule(Long id) {
        Schedule schedule = getScheduleById(id);
        scheduleRepository.delete(schedule);
    }

    public List<Schedule> getActiveSchedules() {
        return scheduleRepository.findByActive(true);
    }
}
