package aptech.finalproject.service;


import aptech.finalproject.dto.request.RoleCreationRequest;
import aptech.finalproject.dto.response.RoleCreationResponse;
import aptech.finalproject.entity.Permission;
import aptech.finalproject.entity.Role;
import aptech.finalproject.exception.ApiException;
import aptech.finalproject.exception.ErrorCode;
import aptech.finalproject.exception.GlobalExceptionHandler;
import aptech.finalproject.mapper.RoleMapper;
import aptech.finalproject.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import javax.management.relation.RoleNotFoundException;
import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private RoleMapper roleMapper;

    @PreAuthorize("hasAuthority('ADMIN')")
    public RoleCreationResponse create(RoleCreationRequest request) {
        Role role = roleMapper.toRole(request);
        return roleMapper.toRoleResponse(roleRepository.save(role));
    }
    @PreAuthorize("hasAuthority('ADMIN')")
    public RoleCreationResponse update(RoleCreationRequest request) {
        return roleMapper.toRoleResponse(roleRepository.save(roleMapper.toRole(request)));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public void delete(String permission) {
        roleRepository.deleteById(permission);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public List<RoleCreationResponse> findAll() {
        return roleRepository.findAll().stream().map(roleMapper::toRoleResponse).toList();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public boolean existedRole(String permission) {
        return roleRepository.existsById(permission);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public RoleCreationResponse findById(String role) {
        return roleRepository.findById(role)
                .map(roleMapper::toRoleResponse)
                .orElseThrow(() -> new ApiException(ErrorCode.ROLE_NOT_FOUND));
    }

}
