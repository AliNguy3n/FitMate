import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:projectflutter/common/helper/navigation/app_navigator.dart';
import 'package:projectflutter/common/widget/appbar/app_bar.dart';
import 'package:projectflutter/core/config/themes/app_font_size.dart';
import 'package:projectflutter/domain/exercise/entity/exercises_entity.dart';
import 'package:projectflutter/presentation/exercise/bloc/exercise_equipment_cubit.dart';
import 'package:projectflutter/presentation/exercise/bloc/exercise_sub_category_cubit.dart';
import 'package:projectflutter/presentation/exercise/bloc/exercise_sub_category_program_cubit.dart';
import 'package:projectflutter/presentation/exercise/bloc/exercise_sub_category_program_state.dart';
import 'package:projectflutter/presentation/exercise/bloc/exercise_sub_category_state.dart';
import 'package:projectflutter/presentation/exercise/bloc/exercises_cubit.dart';
import 'package:projectflutter/presentation/exercise/bloc/exercises_state.dart';
import 'package:projectflutter/presentation/exercise/pages/suggest/setting_plan.dart';
import 'package:projectflutter/presentation/exercise/widgets/suggest/exercise_plan_item.dart';
import 'package:shared_preferences/shared_preferences.dart';

class PlanExercisePage extends StatefulWidget {
  const PlanExercisePage({super.key});

  @override
  State<PlanExercisePage> createState() => _PlanExercisePageState();
}

class _PlanExercisePageState extends State<PlanExercisePage> {
  List<bool> _selectedDays = List.generate(7, (_) => true);
  bool _isScheduled = false;
  int _selectedDifficultyIndex = 0;
  int _selectedGoalIndex = 0;
  int _selectedDuraitonIndex = 0;
  List<String> _selectedEquipments = [];
  List<bool> _selectedBodyAreas = List.generate(7, (i) => i == 6);
  final Map<String, int> categoryMap = {
    'Full Body': 1,
    'Arm': 2,
    'Butt & Leg': 3,
    'Shoulder': 4,
    'Back': 5,
    'Chest': 6,
    'Core': 7,
  };
  final List<String> _bodyArea = [
    'Full Body',
    'Arm',
    'Butt & Leg',
    'Shoulder',
    'Back',
    'Chest',
    'Core',
  ];
  final List<String> goals = ['Loss Weight', 'Build Muscle', 'Keep Fit'];
  List<String> difficulties = ['Beginner', 'Intermediate', 'Advanced'];
  List<String> durations = [
    '<10 min/day',
    '10-20 min/day',
    '20-30 min/day',
    '30-45 min/day'
  ];
  bool _isLoading = true;

  Future<void> _loadFilterSettings() async {
    final prefs = await SharedPreferences.getInstance();
    _isScheduled = prefs.getBool('isScheduled') ?? false;
    _selectedDifficultyIndex = prefs.getInt('selectedDifficultyIndex') ?? 0;
    _selectedGoalIndex = prefs.getInt('selectedGoalIndex') ?? 0;
    _selectedDuraitonIndex = prefs.getInt('selectedDurationIndex') ?? 0;
    _selectedEquipments = prefs.getStringList('selectedEquipments') ?? [];
    final savedDays = prefs.getStringList('selectedDays');

    if (savedDays != null && savedDays.length == 7) {
      _selectedDays = savedDays.map((e) => e == 'true').toList();
    }

    setState(() {
      _isLoading = false;
    });
  }

  bool _checkDurationByIndex(int duration, int index) {
    switch (index) {
      case 1:
        return duration < 600;
      case 2:
        return duration >= 600 && duration <= 1200;
      case 3:
        return duration > 1200 && duration <= 1800;
      case 4:
        return duration > 1800;
      default:
        return true;
    }
  }

  @override
  void initState() {
    super.initState();
    _loadFilterSettings();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: BasicAppBar(
        hideBack: true,
        title: Align(
          alignment: Alignment.centerLeft,
          child: Text('Plan Exercise',
              style: TextStyle(fontSize: AppFontSize.heading2(context))),
        ),
        action: IconButton(
            onPressed: () {
              AppNavigator.pushFuture(context, const SettingPlanPage())
                  .then((result) {
                if (result == true) {
                  _loadFilterSettings();
                }
              });
            },
            icon: const Icon(Icons.tune)),
      ),
      body: MultiBlocProvider(
        providers: [
          BlocProvider(
            create: (context) => ExerciseSubCategoryCubit()..listSubCategory(),
          ),
          BlocProvider(
            create: (context) => ExercisesCubit()..listExercise(),
          ),
          BlocProvider(
            create: (context) =>
                ExerciseEquipmentCubit()..listExerciseEquipment(),
          ),
          BlocProvider(
            create: (context) =>
                ExerciseSubCategoryProgramCubit()..listSubCategoryProgram(),
          ),
        ],
        child: BlocBuilder<ExerciseSubCategoryCubit, ExerciseSubCategoryState>(
          builder: (context, state) {
            if (state is SubCategoryLoading) {
              return const Center(child: CircularProgressIndicator());
            }
            if (state is LoadSubCategoryFailure) {
              return Center(child: Text(state.errorMessage));
            }
            if (state is SubCategoryLoaded) {
              final listSubCategory = state.entity;
              return BlocBuilder<ExercisesCubit, ExercisesState>(
                builder: (context, exerciseState) {
                  if (exerciseState is ExercisesLoading) {
                    return const Center(child: CircularProgressIndicator());
                  }
                  if (exerciseState is LoadExercisesFailure) {
                    return Center(child: Text(exerciseState.errorMessage));
                  }
                  if (exerciseState is ExercisesLoaded) {
                    final rawList = exerciseState.entity;

                    Map<int, List<ExercisesEntity>> groupedSubCategory = {};
                    Map<int, int> durationBySubCategory = {};
                    Map<int, double> kcalBySubCategory = {};
                    return BlocBuilder<ExerciseSubCategoryProgramCubit,
                        ExerciseSubCategoryProgramState>(
                      builder: (context, programState) {
                        if (programState is LoadSubCategoryProgramFailure) {
                          return Center(child: Text(programState.errorMessage));
                        }
                        if (programState is SubCategoryProgramLoaded) {
                          final subCategoryGoalMap = {
                            for (var item in programState.entity)
                              if (item.subCategory != null &&
                                  item.program != null)
                                item.subCategory!.id:
                                    item.program!.programName ?? '',
                          };

                          final filteredList = rawList.where((exercise) {
                            final modeName = exercise.mode?.modeName;
                            final matchesDifficulty =
                                _selectedDifficultyIndex == 0 ||
                                    modeName ==
                                        difficulties[_selectedDifficultyIndex];

                            final matchesGoal = _selectedGoalIndex == 0 ||
                                exercise.subCategory.any((sub) =>
                                    subCategoryGoalMap[sub.id] ==
                                    goals[_selectedGoalIndex]);

                            final matchesDuration = _selectedDuraitonIndex ==
                                    0 ||
                                _checkDurationByIndex(
                                    exercise.duration, _selectedDuraitonIndex);

                            final equipmentName =
                                exercise.equipment?.equipmentName;
                            final matchesEquipment = _selectedEquipments.isEmpty ||
                                _selectedEquipments.any((e) =>
                                    equipmentName!.toLowerCase().contains(e.toLowerCase()));
                            final matchesBodyArea = _selectedBodyAreas.contains(true)
                                ? exercise.subCategory.any((sub) {
                              for (var cat in sub.category) {
                                for (int i = 0; i < _bodyArea.length; i++) {
                                  final selected = _selectedBodyAreas[i];
                                  final expectedId = categoryMap[_bodyArea[i]];
                                  if (selected && cat.id == expectedId) {
                                    return true;
                                  }
                                }
                              }
                              return false;
                            })
                                : true;
                            final isValidExercise =
                                exercise.duration != null &&
                                    exercise.kcal != null &&
                                    exercise.duration > 0 &&
                                    exercise.kcal > 0;
                            final result = matchesDifficulty &&
                                matchesGoal &&
                                matchesDuration &&
                                matchesEquipment
                                && matchesBodyArea && isValidExercise;
                            return result;
                          }).toList();

                          if (filteredList.isEmpty) {
                            return const Center(
                              child: Text('No exercises match your filters.',
                                  style: TextStyle(fontSize: 16)),
                            );
                          }

                          for (var exercise in filteredList) {
                            final validSubCategories = exercise.subCategory.where((sub) {
                              return sub.category.any((cat) {
                                final expectedIdList = _selectedBodyAreas
                                    .asMap()
                                    .entries
                                    .where((entry) => entry.value)
                                    .map((entry) => categoryMap[_bodyArea[entry.key]])
                                    .toList();
                                return expectedIdList.contains(cat.id);
                              });
                            });

                            for (var sub in validSubCategories) {
                              final subCategoryId = sub.id;
                              groupedSubCategory
                                  .putIfAbsent(subCategoryId, () => [])
                                  .add(exercise);
                            }
                          }

                          groupedSubCategory
                              .forEach((subCategoryId, exercises) {
                            durationBySubCategory[subCategoryId] = exercises
                                .fold(0, (sum, item) => sum + item.duration);
                            kcalBySubCategory[subCategoryId] = exercises.fold(
                                0.0, (sum, item) => sum + item.kcal);
                          });
                          return ExercisePlanItem(
                            groupedSubCategory: groupedSubCategory,
                            durationBySubCategory: durationBySubCategory,
                            kcalBySubCategory: kcalBySubCategory,
                            subCategories: listSubCategory
                                .where((sub) => groupedSubCategory.containsKey(sub.id))
                                .toList(),
                            selectedDays: _selectedDays,
                          );
                          // grouping và return ExercisePlanItem như cũ
                        }
                        return const Center(child: CircularProgressIndicator());
                      },
                    );
                  }
                  return const SizedBox();
                },
              );
            }
            return const SizedBox();
          },
        ),
      ),
    );
  }
}
