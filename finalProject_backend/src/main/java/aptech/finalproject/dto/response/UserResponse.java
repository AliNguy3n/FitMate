package aptech.finalproject.dto.response;

import lombok.*;

import java.time.LocalDate;
import java.util.Set;

import aptech.finalproject.entity.auth.Role;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {

    private String id;

    private String username;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String address;

    private LocalDate dob;

    private Role role;

    private Boolean active;
}
