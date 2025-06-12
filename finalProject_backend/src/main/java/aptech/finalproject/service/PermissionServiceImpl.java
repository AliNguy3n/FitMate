package aptech.finalproject.service;

import aptech.finalproject.entity.Permission;
import aptech.finalproject.repository.PermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PermissionServiceImpl implements PermissionService {
    @Autowired
    private PermissionRepository permissionRepository;

    public Object create(Permission permission) {
        return permissionRepository.save(permission);
    }

}
