package com.example.Project4.payload.exercise;

import java.util.List;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseSessionBatchRequest {
    private List<ExerciseSessionRequest> sessions;
    private int userId;
    private Integer resetBatch;
    private Integer subCategoryId;
}