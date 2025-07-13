package com.example.Project4.mapper;

import com.example.Project4.dto.bmi.PersonalHealthDTO;
import com.example.Project4.dto.bmi.PersonalHealthGoalDTO;
import com.example.Project4.entity.auth.User;
import com.example.Project4.entity.bmi.PersonHealGoalModel;
import com.example.Project4.entity.bmi.PersonHealModel;

public class BmiMapper {
    public static PersonalHealthDTO toHealthDTO(PersonHealModel model) {
        if (model == null || model.getUser() == null) return null;

        return new PersonalHealthDTO(
            model.getId(),
            model.getUser().getId(),
            model.getHeight(),
            model.getWeight(),
            model.getBmi(),
            model.getCreatedAt()
        );
    }

    public static PersonHealModel toHealthModel(PersonalHealthDTO dto, User user) {
        if (dto == null || user == null) return null;

        PersonHealModel model = new PersonHealModel();
        model.setId(dto.getId());
        model.setUser(user);
        model.setHeight(dto.getHeight());
        model.setWeight(dto.getWeight());
        model.setBmi(dto.getBmi());
        model.setCreatedAt(dto.getCreatedAt());
        return model;
    }

    // PersonHealGoalModel → DTO
    public static PersonalHealthGoalDTO toGoalDTO(PersonHealGoalModel model) {
        if (model == null || model.getUser() == null) return null;

        return new PersonalHealthGoalDTO(
            model.getId(),
            model.getUser().getId(),
            model.getTargetWeight(),
            model.getCreatedAt()
        );
    }

    public static PersonHealGoalModel toGoalModel(PersonalHealthGoalDTO dto, User user) {
        if (dto == null || user == null) return null;

        PersonHealGoalModel model = new PersonHealGoalModel();
        model.setId(dto.getId());
        model.setUser(user);
        model.setTargetWeight(dto.getTargetWeight());
        model.setCreatedAt(dto.getCreatedAt());
        return model;
    }
}
