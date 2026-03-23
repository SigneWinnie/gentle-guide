package com.isj.registrationmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class RegistrationManagementApplication {
    public static void main(String[] args) {
        SpringApplication.run(RegistrationManagementApplication.class, args);
    }
}