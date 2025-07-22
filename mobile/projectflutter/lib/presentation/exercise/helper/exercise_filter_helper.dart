import 'package:projectflutter/domain/exercise/entity/exercises_entity.dart';

// Constants
const List<String> difficulties = ['Beginner', 'Intermediate', 'Advanced'];
const List<String> goals = ['Lose Weight', 'Build Muscle', 'Keep Fit'];
const List<String> durations = [
  '<10 min/day',
  '10-20 min/day',
  '20-30 min/day',
  '30-45 min/day'
];
const List<String> bodyAreas = [
  'Full Body',
  'Arm',
  'Butt & Leg',
  'Shoulder',
  'Back',
  'Chest',
  'Core',
];

// Filter logic
bool matchesExerciseFilter(
    ExercisesEntity exercise,
    int selectedGoalIndex,
    int selectedDifficultyIndex,
    List<String> selectedEquipments,
    List<bool> selectedBodyAreas,
    Map<int, Set<String>> subCategoryGoalMap,
    ) {
  final expectedLevel = difficulties[selectedDifficultyIndex];
  final modeNames = exercise.modes.map((m) => m.modeName.trim()).toSet();
  if (!modeNames.contains(expectedLevel)) return false;

  if (selectedGoalIndex != 0) {
    final expectedGoal = goals[selectedGoalIndex];
    final hasMatch = exercise.subCategory.any((sub) {
      final goalsSet = subCategoryGoalMap[sub.id];
      return goalsSet != null && goalsSet.contains(expectedGoal);
    });
    if (!hasMatch) return false;
  }

  if (selectedEquipments.isNotEmpty) {
    final equipmentName = exercise.equipment?.equipmentName ?? '';
    if (!selectedEquipments.any(
            (e) => equipmentName.toLowerCase().contains(e.toLowerCase()))) {
      return false;
    }
  }

  if (selectedBodyAreas.contains(true)) {
    final selectedIndexes = selectedBodyAreas
        .asMap()
        .entries
        .where((e) => e.value)
        .map((e) => e.key)
        .toList();
    final expectedNames =
    selectedIndexes.map((i) => bodyAreas[i].toLowerCase()).toSet();

    final matchesBody = exercise.subCategory.every((sub) => sub.category.any(
            (cat) => expectedNames.contains(cat.categoryName.toLowerCase())));
    if (!matchesBody) return false;
  }

  return exercise.duration > 0 && exercise.kcal > 0;
}

// Duration checker
bool checkDurationByIndex(int duration, int index) {
  switch (index) {
    case 0:
      return duration < 600;
    case 1:
      return duration >= 600 && duration <= 1200;
    case 2:
      return duration > 1200 && duration <= 1800;
    case 3:
      return duration > 1800;
    default:
      return true;
  }
}

// First valid exercise
ExercisesEntity? findFirstValidExerciseInSub(
    List<ExercisesEntity> list, int subId, String expectedLevel) {
  try {
    return list.firstWhere((e) =>
    e.subCategory.length == 1 &&
        e.subCategory.first.id == subId &&
        e.modes.any((m) => m.modeName.trim() == expectedLevel));
  } catch (_) {
    return null;
  }
}

// Build level map
Map<int, String> buildLevelBySubCategoryId(List<ExercisesEntity> exercises) {
  Map<int, Set<String>> modeBySubCategoryId = {};

  for (var exercise in exercises) {
    for (var sub in exercise.subCategory) {
      if (exercise.subCategory.length == 1) {
        modeBySubCategoryId.putIfAbsent(sub.id, () => {});
        modeBySubCategoryId[sub.id]!.addAll(
          exercise.modes.map((m) => m.modeName.trim()),
        );
      }
    }
  }

  const ordered = ["Beginner", "Intermediate", "Advanced", "Stretch"];

  return {
    for (var entry in modeBySubCategoryId.entries)
      entry.key: ordered.firstWhere(
            (m) => entry.value.contains(m),
        orElse: () => entry.value.isNotEmpty ? entry.value.first : 'Unknown',
      )
  };
}
