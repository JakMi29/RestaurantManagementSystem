package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.api.rest.request.AddMealRequest;
import com.example.RestaurantManagementSystem.business.dao.MealDAO;
import com.example.RestaurantManagementSystem.domain.Category;
import com.example.RestaurantManagementSystem.domain.Meal;
import com.example.RestaurantManagementSystem.domain.MealStatus;
import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.domain.exception.ObjectAlreadyExist;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class MealService {
    private final MealDAO mealDAO;
    private final ResourceLoader resourceLoader;
    private final RestaurantService restaurantService;

    @Transactional
    public void addMeal(AddMealRequest request, MultipartFile image) {
        Meal meal = buildMeal(request);
        Restaurant restaurant = restaurantService.findByName(request.getRestaurantName());
        List<Meal> meals = mealDAO.findAllByRestaurant(restaurant);
        Optional<Meal> existingMeal = meals.stream()
                .filter(c -> c.getName().equals(meal.getName()))
                .findFirst();

        if (existingMeal.isEmpty()) {
            mealDAO.createMeal(meal
                    .withRestaurant(restaurant)
                    .withImage(createFile(image)));
        } else {
            throw new ObjectAlreadyExist("Meal with this name already exist!");
        }
    }

    private Meal buildMeal(AddMealRequest request) {
        return Meal.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(new BigDecimal((request.getPrice())))
                .category(Category.valueOf(request.getCategory()))
                .mealOfTheDay(false)
                .mealStatus(MealStatus.ACTIVE)
                .build();
    }

    @Transactional
    public void deleteMeal(String name, String restaurantName) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        Meal meal = mealDAO.findByNameAndRestaurant(name, restaurant);
        mealDAO.updateMeal(meal.withMealStatus(MealStatus.DELETE));
        log.info("Successful deleted meal: [%s]".formatted(name));
    }

    public void setMealOfTheDay(String restaurantName, String mealName) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        Meal meal = mealDAO.findByNameAndRestaurant(mealName, restaurant);
        mealDAO.updateMeal(meal.withMealOfTheDay(!meal.isMealOfTheDay()));
    }

    @Transactional
    public String createFile(MultipartFile file) {
        try {
            String fileName = PhotoNumberGenerator.generatePhotoNumber(OffsetDateTime.now());
            Path uploadPath = new ClassPathResource("static/images/").getFile().toPath();
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            System.out.println(uploadPath);
            return fileName;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "/images/oh_no.png";
    }

    @Transactional
    public Page<Meal> findAllByCategory(String restaurantName, String category, Pageable page) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        return mealDAO.findAllByRestaurantAndCategoryAndStatusNot(
                restaurant,
                Category.valueOf(category.toUpperCase()),
                MealStatus.DELETE,
                page
        );

    }

    @Transactional
    public void updateMeal(AddMealRequest request, MultipartFile image) {
        Restaurant restaurant = restaurantService.findByName(request.getRestaurantName());
        Meal mealToUpdate = mealDAO.findByNameAndRestaurant(request.getName(), restaurant);
        List<Meal> meals = mealDAO.findAllByRestaurant(restaurant);
        Optional<Meal> existingMeal = meals.stream()
                .filter(c -> c.getName().equals(mealToUpdate.getName()))
                .findFirst();

    }

    public void deleteOldPhoto(String path) {
        try {
            Resource resource = resourceLoader.getResource("classpath:static/images/" + path);
            File file = resource.getFile();
            if (file.exists()) {
                if (file.delete()) {
                    log.info("The file has been deleted " + path);
                } else {
                    log.info("Could not delete file: " + path);
                }
            } else {
                log.info("File does not exist: " + path);
            }
        } catch (IOException e) {
            log.error("An error occurred while deleting the file: " + path);
        }
    }

    public Meal getMeal(String restaurantName, String name) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        return mealDAO.findByNameAndRestaurant(name, restaurant);
    }
}
