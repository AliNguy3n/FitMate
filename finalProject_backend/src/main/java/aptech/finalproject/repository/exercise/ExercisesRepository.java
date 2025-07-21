package aptech.finalproject.repository.exercise;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import aptech.finalproject.entity.exercise.ExercisesModel;

@Repository
public interface ExercisesRepository extends JpaRepository<ExercisesModel,Integer>{
    List<ExercisesModel> findAllBySubCategoryId(int subCategoryId);
    long countBySubCategoryId(int subCategoryId);

    List<ExercisesModel> findByExerciseNameContainingIgnoreCase(String name);
}
