package com.isj.schedulemanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class ScheduleManagementApplication {
    public static void main(String[] args) {
        SpringApplication.run(ScheduleManagementApplication.class, args);
    }
}