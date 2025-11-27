package com.example.RestaurantManagementSystem.business;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.nio.charset.StandardCharsets;

@Service
@Profile("aws")
@RequiredArgsConstructor
public class S3Service {

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

    public String downloadFile(String keyName) {
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(keyName)
                .build();

        ResponseBytes<GetObjectResponse> objectBytes = s3Client.getObject(
                getObjectRequest,
                ResponseTransformer.toBytes()
        );

        return objectBytes.asString(StandardCharsets.UTF_8);
    }
}