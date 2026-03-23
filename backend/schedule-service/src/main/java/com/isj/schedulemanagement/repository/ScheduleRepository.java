package com.isj.schedulemanagement.repository;

import com.isj.schedulemanagement.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByCourseId(Long courseId);
    List<Schedule> findByRoomId(Long roomId);
    List<Schedule> findByAcademicYear(String academicYear);
    List<Schedule> findByActive(Boolean active);
}