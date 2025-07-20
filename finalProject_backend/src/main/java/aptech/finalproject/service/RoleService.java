package aptech.finalproject.service;

import aptech.finalproject.dto.request.RoleCreationRequest;
import aptech.finalproject.dto.response.RoleCreationResponse;
import aptech.finalproject.dto.response.RolePermissionResponse;

import java.util.List;

public interface RoleService {

    RoleCreationResponse create(RoleCreationRequest request);

    RoleCreationResponse update(RoleCreationRequest request);

    void delete(long permission);

    List<RolePermissionResponse> findAll();

    boolean existedRole(String role);

    RoleCreationResponse findById(long roleId);
}
