import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:projectflutter/common/helper/dialog/show_dialog.dart';
import 'package:projectflutter/common/helper/navigation/app_navigator.dart';
import 'package:projectflutter/core/config/themes/app_color.dart';
import 'package:projectflutter/domain/exercise/entity/exercises_entity.dart';
import 'package:projectflutter/presentation/exercise/bloc/button_exercise_cubit.dart';
import 'package:projectflutter/presentation/exercise/bloc/button_exercise_state.dart';
import 'package:projectflutter/presentation/exercise/pages/exercise_start.dart';

class ExerciseButton extends StatelessWidget {
  final List<ExercisesEntity> exercises;
  final double kcal;
  final int subCategoryId;
  const ExerciseButton(
      {super.key,
      required this.exercises,
      required this.kcal,
      required this.subCategoryId});
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
        create: (context) => ButtonExerciseCubit(),
        child: BlocBuilder<ButtonExerciseCubit, ButtonExerciseState>(
          builder: (context, state) {
            return _startButton(context, exercises);
          },
        ));
  }

  Widget _startButton(BuildContext context, List<ExercisesEntity> exercises) {
    return Positioned(
      bottom: 15,
      left: 0,
      right: 0,
      child: Align(
        alignment: Alignment.center,
        child: SizedBox(
          width: 200,
          height: 48,
          child: ElevatedButton.icon(
            onPressed: () async {
              // final cubit = context.read<ButtonExerciseCubit>();
              // final hasProgress = await cubit.hasProgress(subCategoryId);

              // int resetBatch = 0;
              // if (hasProgress) {
              //   await cubit.incrementResetBatch(subCategoryId);
              //   resetBatch = cubit.getResetBatch();
              // }

              if (context.mounted) {
                AppNavigator.push(
                  context,
                  ExerciseStart(
                    exercises: exercises,
                    kcal: kcal,
                    subCategoryId: subCategoryId,
                  ),
                );
              }
            },
            icon: const Icon(Icons.play_arrow, color: Colors.white),
            label: const Text(
              'Start',
              style: TextStyle(
                color: Colors.white,
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF66BB6A),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(24),
              ),
              elevation: 4,
            ),
          ),
        ),
      ),
    );
  }
}
