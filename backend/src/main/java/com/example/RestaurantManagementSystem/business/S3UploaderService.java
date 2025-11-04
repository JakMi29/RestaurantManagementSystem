package com.example.RestaurantManagementSystem.business;

import org.springframework.beans.factory.annotation.Value;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
@AllArgsConstructor
public class S3UploaderService {

    private final S3Client s3Client;

    @Value("${s3.bucket.name}")
    private String bucketName;

    public void uploadString(String data, String keyName) {
        RequestBody requestBody = RequestBody.fromString(data);
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(keyName)
                .contentType("text/plain")
                .build();
        s3Client.putObject(putObjectRequest, requestBody);
    }
}