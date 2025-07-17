package aptech.finalproject.entity.product;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

import aptech.finalproject.entity.auth.User;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    private Instant orderDate;

    private Integer totalAmount;

    private Boolean status;

    @ManyToOne
    @JoinColumn( name = "user_id")
    private User user;

    @OneToOne( cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn( name = "payment_id")
    private Payment payment;
}
