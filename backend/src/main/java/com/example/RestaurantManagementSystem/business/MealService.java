package com.example.RestaurantManagementSystem.business;

import com.example.RestaurantManagementSystem.api.dto.MealDTO;
import com.example.RestaurantManagementSystem.api.dto.mapper.MealDTOMapper;
import com.example.RestaurantManagementSystem.api.rest.request.MealRequest;
import com.example.RestaurantManagementSystem.business.dao.MealDAO;
import com.example.RestaurantManagementSystem.domain.Category;
import com.example.RestaurantManagementSystem.domain.Meal;
import com.example.RestaurantManagementSystem.domain.MealStatus;
import com.example.RestaurantManagementSystem.domain.Restaurant;
import com.example.RestaurantManagementSystem.domain.exception.BadRequestException;
import com.example.RestaurantManagementSystem.domain.exception.NotFoundException;
import com.example.RestaurantManagementSystem.domain.exception.ObjectAlreadyExistException;
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
    private final MealDTOMapper mapper;
    private final ResourceLoader resourceLoader;
    private final RestaurantService restaurantService;

    @Transactional
    public MealDTO addMeal(MealRequest request, MultipartFile image) {
        Restaurant restaurant = restaurantService.findByName(request.getRestaurantName());
        Optional<Meal> existingMeal = mealDAO.findByNameAndRestaurant(request.getName(), restaurant);
        existingMeal.ifPresent(meal -> {
            throw new ObjectAlreadyExistException("Meal with this name already exists!");
        });
        Meal updatedMeal = mealDAO.createMeal(buildMeal(request)
                .withRestaurant(restaurant)
                .withImage(createFile(image)));
        log.info("Successful add meal: [%s]".formatted(updatedMeal.getName()));
        return mapper.map(updatedMeal);
    }

    @Transactional
    public MealDTO deleteMeal(String mealName, String restaurantName) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        Meal meal = mealDAO.findByNameAndRestaurant(mealName, restaurant)
                .orElseThrow(() -> new NotFoundException("Meal with this name does not exist!"));
        Meal updatedMeal = mealDAO.updateMeal(meal.withStatus(MealStatus.DELETE));
        log.info("Successful deleted meal: [%s]".formatted(mealName));
        return mapper.map(updatedMeal);
    }

    @Transactional
    public MealDTO setMealOfTheDay(String restaurantName, String mealName) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        Meal meal = mealDAO.findByNameAndRestaurant(mealName, restaurant)
                .orElseThrow(() -> new NotFoundException("Meal with this name does not exist!"));
        Meal updatedMeal = mealDAO.updateMeal(meal.withMealOfTheDay(!meal.isMealOfTheDay()));
        log.info("Successful set meal: [%s] as meal of the day".formatted(mealName));
        return mapper.map(updatedMeal);
    }

    @Transactional
    public String createFile(MultipartFile file) {
        try {
            String fileName =  PhotoNumberGenerator.generatePhotoNumber(OffsetDateTime.now());
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
    public Meal getMeal(String restaurantName, String name) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        return mealDAO.findByNameAndRestaurant(name, restaurant)
                .orElseThrow(() -> new NotFoundException("Meal with this name does not exist!"));
    }

    @Transactional
    public Meal findByNameAndRestaurant(String name, Restaurant restaurant) {
        return mealDAO.findByNameAndRestaurant(name, restaurant)
                .orElseThrow(() -> new NotFoundException("Meal with this name does not exist"));
    }

    @Transactional
    public MealDTO updateMeal(MealRequest request, MultipartFile image) {
        Restaurant restaurant = restaurantService.findByName(request.getRestaurantName());
        Meal mealToUpdate = mealDAO.findByNameAndRestaurant(request.getOldName(), restaurant)
                .orElseThrow(() -> new NotFoundException("Meal with this name does not exist!"))
                .withCategory(Category.valueOf(request.getCategory()))
                .withDescription(request.getDescription())
                .withName(request.getName())
                .withPrice(new BigDecimal((request.getPrice())));

        mealDAO.findByNameAndRestaurant(request.getName(), restaurant)
                .filter(m -> m.getId() != mealToUpdate.getId())
                .ifPresent(m -> {
                    throw new ObjectAlreadyExistException("Meal with this name already exists!");
                });

        if (image != null && !image.isEmpty()) {
            deleteOldPhoto(mealToUpdate.getImage());
            Meal newMeal = mealToUpdate.withImage(createFile(image));
            mealDAO.updateMeal(newMeal);
        }
        return mapper.map(mealDAO.updateMeal(mealToUpdate));
    }

    @Transactional
    public Page<MealDTO> findAllByCategory(
            String restaurantName,
            String category,
            Pageable page,
            String searchTerm,
            List<String> excludesNames
    ) {
        Restaurant restaurant = restaurantService.findByName(restaurantName);
        Category categoryEnum = Category.valueOf(category.toUpperCase());
        MealStatus status = MealStatus.DELETE;

        // Choose the appropriate method based on the presence of searchTerm and excludesNames
        if (searchTerm != null) {
            return mealsWithSearch(restaurant, categoryEnum, status, page, searchTerm, excludesNames);
        } else {
            return mealsWithoutSearch(restaurant, categoryEnum, status, page, excludesNames);
        }
    }

    private Page<MealDTO> mealsWithSearch(
            Restaurant restaurant,
            Category categoryEnum,
            MealStatus status,
            Pageable page,
            String searchTerm,
            List<String> excludesNames
    ) {
        if (excludesNames != null && !excludesNames.isEmpty()) {
            return mealDAO.findAllByRestaurantAndCategoryAndStatusNotAndSearchTermsAndNameNotIn(
                    restaurant,
                    categoryEnum,
                    status,
                    page,
                    searchTerm,
                    excludesNames
            ).map(mapper::map);
        }
        return mealDAO.findAllByRestaurantAndCategoryAndStatusNotAndSearchTerms(
                restaurant,
                categoryEnum,
                status,
                page,
                searchTerm
        ).map(mapper::map);
    }

    private Page<MealDTO> mealsWithoutSearch(
            Restaurant restaurant,
            Category categoryEnum,
            MealStatus status,
            Pageable page,
            List<String> excludesNames
    ) {
        if (excludesNames != null && !excludesNames.isEmpty()) {
            return mealDAO.findAllByRestaurantAndCategoryAndStatusNotAndNameNotIn(
                    restaurant,
                    categoryEnum,
                    status,
                    page,
                    excludesNames
            ).map(mapper::map);
        }
        return mealDAO.findAllByRestaurantAndCategoryAndStatusNot(
                restaurant,
                categoryEnum,
                status,
                page
        ).map(mapper::map);
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

    private Meal buildMeal(MealRequest request) {
        return Meal.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(new BigDecimal((request.getPrice())))
                .category(Category.valueOf(request.getCategory()))
                .mealOfTheDay(false)
                .status(MealStatus.ACTIVE)
                .build();
    }
}
