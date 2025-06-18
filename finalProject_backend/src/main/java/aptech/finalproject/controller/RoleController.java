package aptech.finalproject.controller;

import aptech.finalproject.dto.request.RoleCreationRequest;
import aptech.finalproject.dto.response.ApiResponse;
import aptech.finalproject.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/identity/role")
public class RoleController {
    @Autowired
    private RoleService roleService;

    @PostMapping()
    public ApiResponse<?> create(@RequestBody RoleCreationRequest request) {
        return ApiResponse.ok(roleService.create(request));
    }

    @GetMapping()
    public ApiResponse<?> getAll() {
        return ApiResponse.ok(roleService.findAll());
    }

    @PutMapping("/{role}")
    public ApiResponse<?> update(@PathVariable  String role, @RequestBody RoleCreationRequest request) {
        if(roleService.existedRole(role)){
            return ApiResponse.ok(roleService.update(request));
        }
        return ApiResponse.badRequest("Role not found");
    }

    @GetMapping("/{role}")
    public ApiResponse<?> getById(@PathVariable String role) {
        return ApiResponse.ok(roleService.findById(role));
    }

    @DeleteMapping("/{role}")
    public ApiResponse<?> delete(@PathVariable String role) {
        roleService.delete(role);
        return ApiResponse.ok("Role " + role + " deleted successfully");
    }
}
