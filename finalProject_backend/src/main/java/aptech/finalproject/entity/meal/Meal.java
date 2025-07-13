package aptech.finalproject.entity.meal;

import aptech.finalproject.entity.FileMetadata;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinColumn(name = "image_id")
    private FileMetadata image;

    private Long weight;

    private Long kcal;

    private Long protein;

    private Long carbohydrate;

    private Long fiber;

    private Long sugar;

    @OneToMany(mappedBy = "meal", cascade = {CascadeType.PERSIST, CascadeType.MERGE})

    private List<UserMeal> meals;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "meal_mealTime",
            joinColumns = @JoinColumn(name = "meal_id"),
            inverseJoinColumns = @JoinColumn(name="mealTime_id")
    )
    private List<MealTime> mealTimes;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "subCategory_id")
    private MealSubCategory subCategory;
}
