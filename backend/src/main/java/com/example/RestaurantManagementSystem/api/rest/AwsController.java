package com.example.RestaurantManagementSystem.api.rest;


import com.example.RestaurantManagementSystem.business.S3Service;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Profile("aws")
@RestController
@AllArgsConstructor
@RequestMapping("/api/restaurantManagementSystem/aws")
public class AwsController {

    private final S3Service s3Service;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        String keyName = file.getOriginalFilename();
        try {
            s3Service.uploadFile(
                    file.getBytes(),
                    keyName,
                    file.getContentType()
            );
            return ResponseEntity.ok("File uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Something went wrong while uploading the file!");
        }
    }

    @GetMapping("/{key}")
    public ResponseEntity<byte[]> getProcessedString(@PathVariable String key) {
        byte[] processedText = s3Service.downloadFile("processed/" +key);
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + key + "\"");

        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);

        return ResponseEntity.ok()
                .headers(headers)
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
