package com.example.RestaurantManagementSystem.api.rest;


import com.example.RestaurantManagementSystem.business.S3UploaderService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/restaurantManagementSystem/test/aws")
public class AwsTestController {

    private final S3UploaderService s3UploaderService;


    @GetMapping
    public String test(@RequestParam String text) {
        String keyName = "uploaded/test-" + System.currentTimeMillis() + ".txt";

        try {
            s3UploaderService.uploadString(text, keyName);
            return "Pomyślnie wysłano tekst do S3. Klucz: " + keyName;
        } catch (Exception e) {
            System.err.println("Błąd podczas wysyłania do S3: " + e.getMessage());
            return "Błąd podczas wysyłania do S3: " + e.getMessage();
        }
    }
}
