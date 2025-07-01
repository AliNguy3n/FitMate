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

    @PreAuthorize("hasAuthority('MANAGE_ROLES')")
    public RoleCreationResponse create(RoleCreationRequest request) {
        Role role = roleMapper.toRole(request);
        return roleMapper.toRoleResponse(roleRepository.save(role));
    }
    @PreAuthorize("hasAuthority('MANAGE_ROLES')")
    public RoleCreationResponse update(RoleCreationRequest request) {
        return roleMapper.toRoleResponse(roleRepository.save(roleMapper.toRole(request)));
    }

    @PreAuthorize("hasAuthority('MANAGE_ROLES')")
    public void delete(long permissionId) {
        roleRepository.deleteById(permissionId);
    }

    @PreAuthorize("hasAuthority('MANAGE_ROLES')")
    public List<RoleCreationResponse> findAll() {
        return roleRepository.findAll().stream().map(roleMapper::toRoleResponse).toList();
    }

    @PreAuthorize("hasAuthority('MANAGE_ROLES')")
    public boolean existedRole(String role) {
        return roleRepository.existsByRole(role);
    }

    @PreAuthorize("hasAuthority('MANAGE_ROLES')")
    public RoleCreationResponse findById(long roleId) {
        return roleRepository.findById(roleId)
                .map(roleMapper::toRoleResponse)
                .orElseThrow(() -> new ApiException(ErrorCode.ROLE_NOT_FOUND));
    }

}
