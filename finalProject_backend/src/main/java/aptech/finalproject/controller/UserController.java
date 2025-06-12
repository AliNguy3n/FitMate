package aptech.finalproject.controller;

import aptech.finalproject.dto.request.UserCreationRequest;
import aptech.finalproject.dto.request.UserUpdateRequest;
import aptech.finalproject.dto.response.ApiResponse;
import aptech.finalproject.dto.response.UserResponse;
import aptech.finalproject.entity.User;
import aptech.finalproject.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/identity")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ApiResponse<UserResponse> create(@RequestBody @Valid UserCreationRequest userCreationRequest) {
        UserResponse user = userService.create(userCreationRequest);
        if (user == null) {
            return ApiResponse.badRequest("User creation failed");
        }
        return ApiResponse.created(user, "Created user");
    }

    @GetMapping("/users")
    public ApiResponse<List<UserResponse>> getAll() {
        List<UserResponse> users = userService.getAll();
        if(users.isEmpty()) {
            return ApiResponse.badRequest("No users found");
        }
        return ApiResponse.ok(users, "Get all users");
    }

    @GetMapping("/{userId}")
    public ApiResponse<User> getById(@PathVariable String userId) {
        User user = userService.getById(userId);
        if(user == null) {
            return ApiResponse.badRequest("User not found");
        }
        return ApiResponse.ok(user, "Get user by id");
    }

    @GetMapping("/{username}")
    public ApiResponse<User> getByUsername(@PathVariable String username) {
        User user = userService.getByUsername(username);
        if(user == null){
            return ApiResponse.badRequest("User not found");
        }
        return ApiResponse.ok(user, "Get user by username");
    }

    @PutMapping("/{userId}")
    public ApiResponse<User> update(@PathVariable String userId, @RequestBody UserUpdateRequest userUpdateRequest) {
        return ApiResponse.ok(userService.update(userId, userUpdateRequest), "Update user");
    }

    @DeleteMapping("/{userId}")
    public ApiResponse<User> delete(@PathVariable String userId){
        userService.delete(userId);
        return ApiResponse.noContent(String.format("Deleted user with id %s", userId));
    }
}
