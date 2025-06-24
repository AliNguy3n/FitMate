package aptech.finalproject.service;

import aptech.finalproject.dto.request.UserCreationRequest;
import aptech.finalproject.dto.request.UserUpdateRequest;
import aptech.finalproject.dto.response.UserResponse;
import aptech.finalproject.entity.Role;
import aptech.finalproject.entity.User;
import aptech.finalproject.exception.ApiException;
import aptech.finalproject.exception.ErrorCode;
import aptech.finalproject.mapper.UserMapper;
import aptech.finalproject.repository.RoleRepository;
import aptech.finalproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserResponse create(UserCreationRequest request) {

        if(userRepository.existsByUsername(request.getUsername()))
            throw new ApiException(ErrorCode.USER_EXISTED);

        User user = userMapper.toUser(request);

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        Set<Role> roles = roleRepository.findByRole("USER");
        user.setRoles(roles);
        return userMapper.toUserResponse(userRepository.save(user));
    }

    @PreAuthorize("hasAuthority('MANAGE_USERS')")
    public List<UserResponse> getAll() {
        return userRepository.findAll().stream()
                .map(userMapper::toUserResponse)
                .collect(Collectors.toList());
    }

    @PreAuthorize("hasAuthority('MANAGE_USERS') or #userId == authentication.principal.id")
    public User getById(String userId) {
        return userRepository.findById(userId).orElseThrow(()-> new ApiException(ErrorCode.USER_EXISTED));
    }
    @PreAuthorize("hasAuthority('MANAGE_USERS') or #username == authentication.principal.username")
    public User getByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(()-> new ApiException(ErrorCode.USER_NOT_FOUND));
    }

    @PreAuthorize("hasAuthority('MANAGE_USERS')")
    public User getByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(()-> new ApiException(ErrorCode.USER_NOT_FOUND));
    }

    @PreAuthorize("hasAuthority('MANAGE_USERS') or #userId == authentication.principal.id")
    public User update(String userId ,UserUpdateRequest userUpdateRequest) {
        User user = getById(userId);
        if (userUpdateRequest.getPassword() != null) {
            userUpdateRequest.setPassword(passwordEncoder.encode(userUpdateRequest.getPassword()));
        }
        userMapper.updateUser(user, userUpdateRequest);
        return userRepository.save(user);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public void delete(String userId) {
        userRepository.deleteById(userId);
    }
}
