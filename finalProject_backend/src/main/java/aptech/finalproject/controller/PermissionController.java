package aptech.finalproject.controller;

import aptech.finalproject.dto.request.PermissionCreationRequest;
import aptech.finalproject.dto.response.ApiResponse;
import aptech.finalproject.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/identity/permission")
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

    @PutMapping("/{permission}")
    public ApiResponse<?> update(@PathVariable String permission, @RequestBody PermissionCreationRequest request) {
        return ApiResponse.ok(permissionService.update(request));
    }
    @DeleteMapping("/{permission}")
    public ApiResponse<?> delete(@PathVariable String permission) {
        permissionService.delete(permission);
        return ApiResponse.ok("Permission " + permission + " deleted successfully");
    }

    @GetMapping("/{permission}")
    public ApiResponse<?> getById(@PathVariable String permission) {
        return ApiResponse.ok(permissionService.findById(permission));
    }
}
