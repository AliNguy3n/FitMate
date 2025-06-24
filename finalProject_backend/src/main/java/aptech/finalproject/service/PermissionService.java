package aptech.finalproject.service;

import aptech.finalproject.dto.request.PermissionCreationRequest;
import aptech.finalproject.dto.response.PermissionCreationResponse;

import java.util.List;

public interface PermissionService {
    PermissionCreationResponse create(PermissionCreationRequest request);

    PermissionCreationResponse update(PermissionCreationRequest request);

    void delete(String permission);

    List<PermissionCreationResponse> findAll();

    boolean existed(String permission);

    PermissionCreationResponse findById(String permission);
}
