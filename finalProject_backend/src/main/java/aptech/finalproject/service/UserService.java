package aptech.finalproject.service;

import aptech.finalproject.dto.request.UserCreationRequest;
import aptech.finalproject.dto.request.UserUpdateRequest;
import aptech.finalproject.dto.response.UserResponse;
import aptech.finalproject.entity.auth.User;
import aptech.finalproject.exception.ApiException;

import java.util.List;

public interface UserService {
    UserResponse create(UserCreationRequest request);

    void activateAccount(String token) throws ApiException;

    List<UserResponse> getAll();

    User getById(String userId);

    User getByUsername(String username);

    User getByEmail(String email);

    User update(String userId , UserUpdateRequest userUpdateRequest);

    void delete(String userId);
}
