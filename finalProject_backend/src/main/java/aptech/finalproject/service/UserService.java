package aptech.finalproject.service;

import aptech.finalproject.dto.request.UserCreationRequest;
import aptech.finalproject.dto.request.UserUpdateRequest;
import aptech.finalproject.dto.response.UserResponse;
import aptech.finalproject.entity.User;

import java.util.List;

public interface UserService {
    UserResponse create(UserCreationRequest request);

    List<UserResponse> getAll();

    User getById(String userId);

    User getByUsername(String username);

    User getByEmail(String email);

    User update(String userId , UserUpdateRequest userUpdateRequest);

    void delete(String userId);
}
