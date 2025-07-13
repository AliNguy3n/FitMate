package com.example.Project4.dto.bmi;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PersonalHealthDTO {
     private int id;
    private String userId;
    private double height;
    private double weight;
    private double bmi;
    private LocalDateTime createdAt;
}
