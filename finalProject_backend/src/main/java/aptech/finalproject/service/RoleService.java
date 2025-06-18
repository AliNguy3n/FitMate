package aptech.finalproject.service;

import aptech.finalproject.dto.request.RoleCreationRequest;
import aptech.finalproject.dto.response.RoleCreationResponse;

import java.util.List;

public interface RoleService {

    RoleCreationResponse create(RoleCreationRequest request);

    RoleCreationResponse update(RoleCreationRequest request);

    void delete(String permission);

    List<RoleCreationResponse> findAll();

    boolean existedRole(String permission);

    RoleCreationResponse findById(String role);
}
