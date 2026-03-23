package com.isj.roommanagement.repository;

import com.isj.roommanagement.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findByRoomNumber(String roomNumber);
    List<Room> findByBuilding(String building);
    List<Room> findByRoomType(String roomType);
    List<Room> findByActive(Boolean active);
    boolean existsByRoomNumber(String roomNumber);
}