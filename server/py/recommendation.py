import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import re
import sys
import json

# Load the dataset
file_path = "T:/Smart_Gym_Project/exercise_recommendation_bmi_expanded.xlsx"
exercise_data = pd.read_excel(file_path)

exercise_data.fillna("Unknown", inplace=True) 
# Initialize label encoders for categorical columns
label_encoders = {}
for column in ['Goal', 'Experience Level']:
    le = LabelEncoder()
    exercise_data[column] = le.fit_transform(exercise_data[column])
    label_encoders[column] = le

# Features and target variables
X = exercise_data[['BMI', 'Goal', 'Experience Level']]
y = exercise_data[['Day1 Exercises', 'Day2 Exercises', 'Day3 Exercises', 
                   'Day4 Exercises', 'Day5 Exercises', 'Day6 Exercises', 'Day7 Exercises']]

# Splitting the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# Function to predict experience level and recommend exercises
def predict_and_recommend(bmi, fitness_goal, fitness_level):
    encoded_goal = label_encoders['Goal'].transform([fitness_goal])[0]
    encoded_level = label_encoders['Experience Level'].transform([fitness_level])[0]
    input_data = pd.DataFrame([[bmi, encoded_goal, encoded_level]], 
                                columns=['BMI', 'Goal', 'Experience Level'])
    predicted_exercises = model.predict(input_data)[0]  

    # Adjust exercises for 4 weeks (same logic as before)
    recommended_exercises_4_weeks = repeat_exercises_for_weeks(predicted_exercises)
    return recommended_exercises_4_weeks

# def get_exercises_for_experience_level(experience_level, fitness_goal):
#     exercises = exercise_data[(exercise_data['Experience Level'] == experience_level) & (exercise_data['Goal'] == fitness_goal)]
#     print("exer",exercises)
#     return exercises[['Day1 Exercises', 'Day2 Exercises', 'Day3 Exercises', 
#                       'Day4 Exercises', 'Day5 Exercises', 'Day6 Exercises', 'Day7 Exercises']].values.tolist()[0]

# Function to adjust exercises for 4 weeks
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
    bmi = float(sys.argv[1])
    fitness_level = sys.argv[2]  # No conversion needed, used directly
    fitness_goal = sys.argv[3]

    try:
        recommendations = predict_and_recommend(bmi, fitness_goal, fitness_level)
        print(json.dumps(recommendations, ensure_ascii=False))
    except Exception as e:
        print(json.dumps({"error": str(e)})) 