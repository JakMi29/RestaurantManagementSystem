package com.example.RestaurantManagementSystem.api.rest;


import com.example.RestaurantManagementSystem.business.S3Service;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Profile("aws")
@RestController
@AllArgsConstructor
@RequestMapping("/api/restaurantManagementSystem/aws")
public class AwsController {

    private final S3Service s3Service;

    @PostMapping
    public String test(@RequestParam String text, @RequestParam String key) {
        s3Service.uploadString(text, key);
        return "Successfully upload text: " + key;
    }

    @GetMapping("/{key}")
    public ResponseEntity<String> getProcessedString(@PathVariable String key) {
        String processedText = s3Service.downloadFile("processed" +key);
        return ResponseEntity.ok()
                .body(processedText);
    }

    @GetMapping("admin")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String adminOnlyEndpoint() {
        return "hello admin!";
    }

    @GetMapping("user")
    @PreAuthorize("hasAuthority('USER')")
    public String userOrAdminEndpoint() {
        return "Helo user";
    }
}
