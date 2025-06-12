package aptech.finalproject.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "roles")
public class Role {
    @Id
    private String role;
    private String description;

    @ManyToMany(mappedBy = "permissions", cascade = CascadeType.MERGE)
    private Set<Permission> permissions;
}
