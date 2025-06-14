package aptech.finalproject.controller;

import aptech.finalproject.dto.request.PermissionCreationRequest;
import aptech.finalproject.dto.response.ApiResponse;
import aptech.finalproject.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/permission")
public class PermissionController {
    @Autowired
    private PermissionService permissionService;

    @PostMapping()
    public ApiResponse<?> create(@RequestBody PermissionCreationRequest request) {
        return ApiResponse.ok(permissionService.create(request));
    }

    @GetMapping()
    public ApiResponse<?> getAll() {
        return ApiResponse.ok(permissionService.findAll());
    }

    @DeleteMapping("/{permission}")
    public ApiResponse<?> delete(@PathVariable String permission) {
        permissionService.delete(permission);
        return ApiResponse.builder().code(200).build();
    }
}
