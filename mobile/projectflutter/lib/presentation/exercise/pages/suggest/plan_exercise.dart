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
import 'package:projectflutter/presentation/exercise/helper/exercise_filter_helper.dart';
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
  int _selectedDurationIndex = 0;
  bool _isLoading = true;
  List<String> _selectedEquipments = [];
  final subCategoryGoalsMap = <int, Set<String>>{};
  List<bool> _selectedBodyAreas = List.generate(7, (_) => false);
  Map<int, bool> completedDays = {};

  Future<void> resetPlanIfMonthChanged() async {
    final prefs = await SharedPreferences.getInstance();
    final startDateStr = prefs.getString('plan_start_date');

    if (startDateStr != null) {
      final startDate = DateTime.parse(startDateStr);
      final now = DateTime.now();

      if (now.month != startDate.month || now.year != startDate.year) {
        await prefs.remove('plan_start_date');
        for (int i = 1; i <= 28; i++) {
          await prefs.remove('day_${i}_completed');
        }
      }
    }
  }

  Future<void> _loadFilterSettings() async {
    final prefs = await SharedPreferences.getInstance();
    _isScheduled = prefs.getBool('isScheduled') ?? false;
    _selectedDifficultyIndex = prefs.getInt('selectedDifficultyIndex') ?? 0;
    _selectedGoalIndex = prefs.getInt('selectedGoalIndex') ?? 0;
    _selectedDurationIndex = prefs.getInt('selectedDurationIndex') ?? 0;
    _selectedEquipments = prefs.getStringList('selectedEquipments') ?? [];
    final savedDays = prefs.getStringList('selectedDays');
    final savedAreas = prefs.getStringList('selectedBodyAreas');
    if (savedAreas != null && savedAreas.length <= bodyAreas.length) {
      _selectedBodyAreas = List.generate(
          bodyAreas.length, (i) => savedAreas.contains(bodyAreas[i]));
    } else {
      _selectedBodyAreas = List.generate(bodyAreas.length, (_) => false);
    }
    if (savedDays != null && savedDays.length == 7) {
      final days = savedDays.map((e) => e == 'true').toList();
      _selectedDays = _isScheduled ? days : List.generate(7, (_) => true);
    } else {
      _selectedDays = List.generate(7, (_) => true);
    }

    for (int i = 1; i <= 28; i++) {
      final done = prefs.getBool('day_${i}_completed') ?? false;
      completedDays[i] = done;
    }

    setState(() {
      _isLoading = false;
    });
  }


  @override
  void initState() {
    super.initState();
    resetPlanIfMonthChanged();
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
            create: (context) => ExerciseEquipmentCubit()..listExerciseEquipment(),
          ),
          BlocProvider(
            create: (context) => ExerciseSubCategoryProgramCubit()..listSubCategoryProgram(),
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
                    return BlocBuilder<ExerciseSubCategoryProgramCubit,
                        ExerciseSubCategoryProgramState>(
                      builder: (context, programState) {
                        if (programState is LoadSubCategoryProgramFailure) {
                          return Center(child: Text(programState.errorMessage));
                        }
                        if (programState is SubCategoryProgramLoaded) {
                          final durationMap = <int, int>{};
                          final kcalMap = <int, double>{};
                          final validGrouped = <int, List<ExercisesEntity>>{};

                          for (var item in programState.entity) {
                            final sub = item.subCategory;
                            final program = item.program;
                            if (sub != null && program != null) {
                              subCategoryGoalsMap
                                  .putIfAbsent(sub.id, () => {})
                                  .add(program.programName ?? '');
                            }
                          }

                          final filteredList = rawList.where((e) =>
                              matchesExerciseFilter(
                                e,
                                _selectedGoalIndex,
                                _selectedDifficultyIndex,
                                _selectedEquipments,
                                _selectedBodyAreas,
                                subCategoryGoalsMap,
                              )).toList();

                          final levelBySubCategoryId = buildLevelBySubCategoryId(filteredList);
                          final expectedLevel = difficulties[_selectedDifficultyIndex];

                          for (final sub in listSubCategory) {
                            final subId = sub.id;
                            final subExercises = filteredList
                                .where((e) => e.subCategory.any((s) => s.id == subId))
                                .toList();

                            if (subExercises.isEmpty) continue;
                            final firstExercise = findFirstValidExerciseInSub(subExercises, subId, expectedLevel);
                            if (firstExercise == null) continue;

                            final totalDuration = subExercises.fold(0, (sum, e) => sum + e.duration);
                            final totalKcal = subExercises.fold(0.0, (sum, e) => sum + e.kcal);

                            if (checkDurationByIndex(totalDuration, _selectedDurationIndex)) {
                              validGrouped[subId] = subExercises;
                              durationMap[subId] = totalDuration;
                              kcalMap[subId] = totalKcal;
                            }
                          }

                          if (validGrouped.isEmpty) {
                            return const Center(
                              child: Text('No exercises match your filters.',
                                  style: TextStyle(fontSize: 16)),
                            );
                          }

                          return ExercisePlanItem(
                            groupedSubCategory: validGrouped,
                            durationBySubCategory: durationMap,
                            isCompleted: completedDays,
                            kcalBySubCategory: kcalMap,
                            levelBySubCategoryId: levelBySubCategoryId,
                            subCategories: listSubCategory
                                .where((sub) => validGrouped.containsKey(sub.id))
                                .toList(),
                            selectedDays: _selectedDays,
                          );
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
