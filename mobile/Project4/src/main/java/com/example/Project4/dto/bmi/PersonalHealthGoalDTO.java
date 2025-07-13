package com.example.Project4.dto.bmi;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class PersonalHealthGoalDTO {
     private int id;
    private String userId;
    private double targetWeight;
    private LocalDateTime createdAt;
}
