package aptech.finalproject.service;

import aptech.finalproject.dto.request.UserCreationRequest;
import aptech.finalproject.dto.request.UserUpdateRequest;
import aptech.finalproject.dto.response.UserResponse;
import aptech.finalproject.entity.User;
import aptech.finalproject.exception.ApiException;
import aptech.finalproject.exception.ErrorCode;
import aptech.finalproject.mapper.UserMapper;
import aptech.finalproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    public UserResponse create(UserCreationRequest request) {

        if(userRepository.existsByUsername(request.getUsername()))
            throw new RuntimeException("Username existed");

        User user = userMapper.toUser(request);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        return userMapper.toUserResponse(userRepository.save(user));
    }

    public List<UserResponse> getAll() {
        return userRepository.findAll().stream()
                .map(userMapper::toUserResponse)
                .collect(Collectors.toList());
    }

    public User getById(String userId) {
        return userRepository.findById(userId).orElseThrow(()-> new ApiException(ErrorCode.USER_EXISTED));
    }

    public User getByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(()-> new RuntimeException("User not found"));
    }

    public User update(String userId ,UserUpdateRequest userUpdateRequest) {
        User user = getById(userId);
        userMapper.updateUser(user, userUpdateRequest);
        return userRepository.save(user);
    }

    public void delete(String userId) {
        userRepository.deleteById(userId);
    }
}
