package com.example.RestaurantManagementSystem.business;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
@Profile("aws")
@RequiredArgsConstructor
public class S3Service {

    private final S3Client s3Client;

    @Value("${s3.bucket.name}")
    private String bucketName;

    public void uploadFile(byte[] data, String keyName, String contentType) {
        RequestBody requestBody = RequestBody.fromBytes(data);

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key("raw/"+keyName)
                .contentType(contentType)
                .build();

        s3Client.putObject(putObjectRequest, requestBody);
    }

    public byte[] downloadFile(String keyName) {
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(keyName)
                .build();

        return s3Client.getObject(
                getObjectRequest,
                ResponseTransformer.toBytes()
        ).asByteArray();
    }
}