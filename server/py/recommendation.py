# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.preprocessing import LabelEncoder
# from sklearn.ensemble import RandomForestClassifier
# import re
# import sys
# import json

# file_path = 'D:/smartgym/SmartGym-Major/exercise_recommendation_bmi_expanded.xlsx'
# exercise_data = pd.read_excel(file_path)

# label_encoders = {}
# for column in ['Goal', 'Experience Level']:
#     le = LabelEncoder()
#     exercise_data[column] = le.fit_transform(exercise_data[column])
#     label_encoders[column] = le

# X = exercise_data[['BMI', 'Goal', 'Experience Level']]
# y = exercise_data[['Day1 Exercises', 'Day2 Exercises', 'Day3 Exercises',
#                    'Day4 Exercises', 'Day5 Exercises', 'Day6 Exercises', 'Day7 Exercises']].values.tolist()

# # Convert the sequence of exercises into a single string
# y = [' '.join(day_exercises) for day_exercises in y]

# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# model = RandomForestClassifier(random_state=42)
# model.fit(X_train, y_train)

# def recommend_exercises_for_week(bmi, goal, experience_level):
#     valid_goals = ['Muscle Gain', 'Fat Loss', 'Bicep Gain']
#     valid_levels = ['Beginner', 'Intermediate', 'Advanced']

#     if goal not in valid_goals or experience_level not in valid_levels:
#         raise ValueError(f"Invalid goal or experience level: {goal}, {experience_level}")

#     encoded_goal = label_encoders['Goal'].transform([goal])[0]
#     encoded_experience = label_encoders['Experience Level'].transform([experience_level])[0]
    
#     input_data = pd.DataFrame([[bmi, encoded_goal, encoded_experience]], columns=['BMI', 'Goal', 'Experience Level'])
#     predicted_exercises = model.predict(input_data)
    
#     return predicted_exercises[0]

# def extract_count(exercise_str):
#     match = re.search(r'\((\d+)\)', exercise_str)
#     if match:
#         return int(match.group(1))
#     return 0

# def repeat_exercises_for_weeks(exercises_for_week):
#     exercises_for_4_weeks = {}
    
#     for week in range(1, 5):
#         weekly_exercises = []
#         increase = 5 * (week - 1)  
        
#         for day_exercises in exercises_for_week.split(', '):
#             updated_day_exercises = []
#             for exercise in day_exercises.split(','):
#                 match = re.search(r'\((\d+)\)', exercise)
#                 if match:
#                     count = int(match.group(1))
#                     updated_count = count + increase 
#                     updated_exercise = re.sub(r'\(\d+\)', f'({updated_count})', exercise)
#                     updated_day_exercises.append(updated_exercise)
#                 else:
#                     updated_day_exercises.append(exercise)
#             weekly_exercises.append(', '.join(updated_day_exercises))
        
#         exercises_for_4_weeks[f"Week {week}"] = weekly_exercises
    
#     return exercises_for_4_weeks

# if __name__ == "__main__":
#     bmi = sys.argv[1]
#     fitness_goal = sys.argv[2]
#     fitness_level = sys.argv[3]

#     try:
#         encoded_goal = label_encoders['Goal'].transform([fitness_goal])[0]
#         encoded_experience = label_encoders['Experience Level'].transform([fitness_level])[0]

#         recommended_exercises_week_1 = recommend_exercises_for_week(bmi, encoded_goal, encoded_experience)
#         recommended_exercises_4_weeks = repeat_exercises_for_weeks(recommended_exercises_week_1)

#         # Ensure valid JSON output
#         print(json.dumps(recommended_exercises_4_weeks, ensure_ascii=False))  
#         # Output the result as JSON
#         # print(recommended_exercises_4_weeks) 
#     except Exception as e:
#         # Print the error as a JSON object
#         print(json.dumps({"error": str(e)}))

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import re
import sys
import json

file_path = 'D:/smartgym/SmartGym-Major/exercise_recommendation_bmi_expanded.xlsx'
exercise_data = pd.read_excel(file_path)

label_encoders = {}
for column in ['Goal', 'Experience Level']:
    le = LabelEncoder()
    exercise_data[column] = le.fit_transform(exercise_data[column])
    label_encoders[column] = le

X = exercise_data[['BMI', 'Goal']]
y = exercise_data['Experience Level']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

def predict_exercise_level(bmi, goal):
    encoded_goal = label_encoders['Goal'].transform([goal])[0]
    input_data = pd.DataFrame([[bmi, encoded_goal]], columns=['BMI', 'Goal'])
    predicted_experience = model.predict(input_data)
    return predicted_experience[0]

def get_exercises_for_experience_level(experience_level, goal):
    exercises = exercise_data[(exercise_data['Experience Level'] == experience_level) & (exercise_data['Goal'] == goal)]
    return exercises[['Day1 Exercises', 'Day2 Exercises', 'Day3 Exercises',
                      'Day4 Exercises', 'Day5 Exercises', 'Day6 Exercises', 'Day7 Exercises']].values.tolist()[0]

def repeat_exercises_for_weeks(exercises_for_week):
    exercises_for_4_weeks = {}
    
    for week in range(1, 5):
        weekly_exercises = []
        increase = 5 * (week - 1)  
        
        for day_exercises in exercises_for_week:
            updated_day_exercises = []
            for exercise in day_exercises.split(','):
                match = re.search(r'\((\d+)\)', exercise)
                if match:
                    count = int(match.group(1))
                    updated_count = count + increase 
                    updated_exercise = re.sub(r'\(\d+\)', f'({updated_count})', exercise)
                    updated_day_exercises.append(updated_exercise)
                else:
                    updated_day_exercises.append(exercise)
            weekly_exercises.append(', '.join(updated_day_exercises))
        
        exercises_for_4_weeks[f"Week {week}"] = weekly_exercises
    
    return exercises_for_4_weeks

if __name__ == "__main__":
    bmi = sys.argv[1]
    fitness_goal = sys.argv[2]

    try:
        predicted_experience = predict_exercise_level(bmi, fitness_goal)
        exercises_for_week = get_exercises_for_experience_level(predicted_experience, fitness_goal)
        recommended_exercises_4_weeks = repeat_exercises_for_weeks(exercises_for_week)

        # Ensure valid JSON output
        print(json.dumps(recommended_exercises_4_weeks, ensure_ascii=False))  
        # Output the result as JSON
        # print(recommended_exercises_4_weeks) 
    except Exception as e:
        # Print the error as a JSON object
        print(json.dumps({"error": str(e)}))