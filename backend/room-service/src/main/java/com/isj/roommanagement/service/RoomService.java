package com.isj.roommanagement.service;

import com.isj.roommanagement.model.Room;
import com.isj.roommanagement.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class RoomService {
    private final RoomRepository roomRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Room getRoomById(Long id) {
        return roomRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Room not found with id: " + id));
    }

    public Room getRoomByNumber(String roomNumber) {
        return roomRepository.findByRoomNumber(roomNumber)
            .orElseThrow(() -> new RuntimeException("Room not found with number: " + roomNumber));
    }

    public List<Room> getRoomsByBuilding(String building) {
        return roomRepository.findByBuilding(building);
    }

    public List<Room> getRoomsByType(String roomType) {
        return roomRepository.findByRoomType(roomType);
    }

    public Room createRoom(Room room) {
        if (roomRepository.existsByRoomNumber(room.getRoomNumber())) {
            throw new RuntimeException("Room with number already exists: " + room.getRoomNumber());
        }
        return roomRepository.save(room);
    }

    public Room updateRoom(Long id, Room roomDetails) {
        Room room = getRoomById(id);

        if (!room.getRoomNumber().equals(roomDetails.getRoomNumber()) &&
            roomRepository.existsByRoomNumber(roomDetails.getRoomNumber())) {
            throw new RuntimeException("Room number already exists: " + roomDetails.getRoomNumber());
        }

        room.setRoomNumber(roomDetails.getRoomNumber());
        room.setBuilding(roomDetails.getBuilding());
        room.setCapacity(roomDetails.getCapacity());
        room.setRoomType(roomDetails.getRoomType());
        room.setFacilities(roomDetails.getFacilities());
        room.setActive(roomDetails.getActive());

        return roomRepository.save(room);
    }

    public void deleteRoom(Long id) {
        Room room = getRoomById(id);
        roomRepository.delete(room);
    }

    public List<Room> getActiveRooms() {
        return roomRepository.findByActive(true);
    }
}