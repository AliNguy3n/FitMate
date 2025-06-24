package aptech.finalproject.service;

import aptech.finalproject.dto.request.PermissionCreationRequest;
import aptech.finalproject.dto.response.PermissionCreationResponse;
import aptech.finalproject.entity.Permission;
import aptech.finalproject.exception.ApiException;
import aptech.finalproject.exception.ErrorCode;
import aptech.finalproject.mapper.PermissionMapper;
import aptech.finalproject.repository.PermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PermissionServiceImpl implements PermissionService {
    @Autowired
    private PermissionRepository permissionRepository;
    @Autowired
    private PermissionMapper permissionMapper;

    @PreAuthorize("hasAuthority('ADMIN')")
    public PermissionCreationResponse create(PermissionCreationRequest request) {
        return permissionMapper.toPermissionResponse(permissionRepository.save(permissionMapper.toPermission(request)));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public PermissionCreationResponse update(PermissionCreationRequest request) {
        return permissionMapper.toPermissionResponse(permissionRepository.save(permissionMapper.toPermission(request)));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public void delete(String permission) {
        permissionRepository.deleteById(permission);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public List<PermissionCreationResponse> findAll() {
        return permissionRepository.findAll().stream().map(permissionMapper::toPermissionResponse).toList();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public boolean existed(String permission) {
        return permissionRepository.existsById(permission);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public PermissionCreationResponse findById(String permission) {
        return permissionRepository.findById(permission)
                .map(permissionMapper::toPermissionResponse)
                .orElseThrow(()-> new ApiException(ErrorCode.PERMISSION_NOT_FOUND));
    }
}
