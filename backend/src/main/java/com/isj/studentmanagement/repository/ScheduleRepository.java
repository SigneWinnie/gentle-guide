package com.isj.studentmanagement.repository;

import com.isj.studentmanagement.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByCourse_Id(Long courseId);
    List<Schedule> findByRoom_Id(Long roomId);
    List<Schedule> findByAcademicYear(String academicYear);
    List<Schedule> findByActive(Boolean active);
}
