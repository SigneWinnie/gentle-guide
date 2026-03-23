package com.isj.roommanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class RoomManagementApplication {
    public static void main(String[] args) {
        SpringApplication.run(RoomManagementApplication.class, args);
    }
}