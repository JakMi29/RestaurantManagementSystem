package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.api.rest.request.MealRequest;
import com.example.RestaurantManagementSystem.api.rest.response.Response;
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
import org.springframework.http.HttpStatus;
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
    public Response addMeal(MealRequest request, MultipartFile image) {
        Restaurant restaurant = restaurantService.findByName(request.getRestaurantName());
        List<Meal> meals = mealDAO.findAllByRestaurant(restaurant);
        Optional<Meal> existingMeal = meals.stream()
                .filter(c -> c.getName().equals(request.getName()))
                .findFirst();

        Meal meal = buildMeal(request);

        if (existingMeal.isEmpty()) {
            mealDAO.createMeal(meal
                    .withRestaurant(restaurant)
                    .withImage(createFile(image)));
        } else {
            throw new ObjectAlreadyExist("Meal with this name already exist!");
        }
        log.info("Successful add meal: [%s]".formatted(meal.getName()));
        return Response.builder()
                .code(HttpStatus.OK.value())
                .message(("Meal %s added successfully.".formatted(meal.getName())))
                .build();
    }

    private Meal buildMeal(MealRequest request) {
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
    public Response deleteMeal(String mealName, String restaurantName) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        Meal meal = mealDAO.findByNameAndRestaurant(mealName, restaurant);
        mealDAO.updateMeal(meal.withMealStatus(MealStatus.DELETE));
        log.info("Successful deleted meal: [%s]".formatted(mealName));
        return Response.builder()
                .code(HttpStatus.OK.value())
                .message(("Meal %s deleted successfully.".formatted(meal.getName())))
                .build();
    }

    @Transactional
    public void setMealOfTheDay(String restaurantName, String mealName) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        Meal meal = mealDAO.findByNameAndRestaurant(mealName, restaurant);
        mealDAO.updateMeal(meal.withMealOfTheDay(!meal.isMealOfTheDay()));
        log.info("Successful set meal: [%s] as meal of the day".formatted(mealName));
    }

    @Transactional
    public String createFile(MultipartFile file) {
        try {
            String fileName = PhotoNumberGenerator.generatePhotoNumber(OffsetDateTime.now());
            Path uploadPath = new ClassPathResource("static/images/").getFile().toPath();
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            return fileName;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "/images/oh_no.png";
    }

    @Transactional
    public Page<Meal> findAllByCategory
            (
                    String restaurantName,
                    String category,
                    Pageable page,
                    String searchTerm
            ) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        return searchTerm != null ?
                mealDAO.findAllByRestaurantAndCategoryAndStatusNotAndSearchTerms(
                        restaurant,
                        Category.valueOf(category.toUpperCase()),
                        MealStatus.DELETE,
                        page,
                        searchTerm
                ) :
                mealDAO.findAllByRestaurantAndCategoryAndStatusNot(
                        restaurant,
                        Category.valueOf(category.toUpperCase()),
                        MealStatus.DELETE,
                        page
                );

    }

    @Transactional
    public Response updateMeal(MealRequest request, MultipartFile image) {
        Restaurant restaurant = restaurantService.findByName(request.getRestaurantName());
        Meal mealToUpdate = mealDAO.findByNameAndRestaurant(request.getOldName(), restaurant)
                .withCategory(Category.valueOf(request.getCategory()))
                .withDescription(request.getDescription())
                .withName(request.getName())
                .withPrice(new BigDecimal((request.getPrice())));
        List<Meal> meals = mealDAO.findAllByRestaurant(restaurant);
        Optional<Meal> existingMeal = meals.stream()
                .filter(c -> !c.getId().equals(mealToUpdate.getId()))
                .filter(c -> c.getName().equals(mealToUpdate.getName()))
                .findFirst();

        if (existingMeal.isEmpty()) {
            if (image != null && !image.isEmpty()) {
                deleteOldPhoto(mealToUpdate.getImage());
                Meal newMeal = mealToUpdate.withImage(createFile(image));
                mealDAO.updateMeal(newMeal);
            }
            mealDAO.updateMeal(mealToUpdate);
        } else {
            throw new ObjectAlreadyExist("Meal with this name already exist!");
        }
        return Response.builder()
                .code(HttpStatus.OK.value())
                .message(("Meal %s updated successfully.".formatted(mealToUpdate.getName())))
                .build();

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

    @Transactional
    public Meal getMeal(String restaurantName, String name) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        return mealDAO.findByNameAndRestaurant(name, restaurant);
    }
}
