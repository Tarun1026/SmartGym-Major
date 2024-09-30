# import cv2
# import math
# import numpy as np
# from time import time
# from angle_calculator import AngleCalculator
# import mediapipe as mp

# class BicepClassifier:
#     def __init__(self,count):
#         self.prev_state = None
#         self.bicep_count = 0
#         self.count=count

#     def classify(self, landmarks, prev_state, output_image):
#         # Your classification logic here

#         left_elbow_angle = AngleCalculator().calculate_angle(landmarks[mp.solutions.pose.PoseLandmark.LEFT_SHOULDER.value],
#                                             landmarks[mp.solutions.pose.PoseLandmark.LEFT_ELBOW.value],
#                                             landmarks[mp.solutions.pose.PoseLandmark.LEFT_WRIST.value])

#         right_elbow_angle = AngleCalculator().calculate_angle(landmarks[mp.solutions.pose.PoseLandmark.RIGHT_SHOULDER.value],
#                                             landmarks[mp.solutions.pose.PoseLandmark.RIGHT_ELBOW.value],
#                                             landmarks[mp.solutions.pose.PoseLandmark.RIGHT_WRIST.value])

#         label = ''
#         if left_elbow_angle > 140 and left_elbow_angle < 170 or right_elbow_angle > 140 and right_elbow_angle < 170:            
#             if prev_state != 'down':
#                 label = 'down'
#                 prev_state = 'down'
#         elif left_elbow_angle > 50 and left_elbow_angle < 70 or right_elbow_angle > 50 and right_elbow_angle < 70:
#             if prev_state == 'down':
#                 self.bicep_count += 1
#                 prev_state = 'up'
#                 label = 'up'
#         cv2.putText(output_image, f'Bicep: {self.bicep_count}', (10, 60), cv2.FONT_HERSHEY_PLAIN, 2, (255, 0, 0), 2)      

#         return output_image,label, prev_state 




import cv2
import math
import numpy as np
from time import time
from angle_calculator import AngleCalculator
import mediapipe as mp

class BicepClassifier:
    def __init__(self, count):
        self.prev_state = None
        self.bicep_count = 0
        self.target_count = count  # Target count for the exercise

    def classify(self, landmarks, prev_state, output_image):
        # Calculate elbow angles
        left_elbow_angle = AngleCalculator().calculate_angle(
            landmarks[mp.solutions.pose.PoseLandmark.LEFT_SHOULDER.value],
            landmarks[mp.solutions.pose.PoseLandmark.LEFT_ELBOW.value],
            landmarks[mp.solutions.pose.PoseLandmark.LEFT_WRIST.value]
        )

        right_elbow_angle = AngleCalculator().calculate_angle(
            landmarks[mp.solutions.pose.PoseLandmark.RIGHT_SHOULDER.value],
            landmarks[mp.solutions.pose.PoseLandmark.RIGHT_ELBOW.value],
            landmarks[mp.solutions.pose.PoseLandmark.RIGHT_WRIST.value]
        )

        label = ''
        # Detect the "down" position
        if (140 < left_elbow_angle < 170 or 140 < right_elbow_angle < 170):
            if prev_state != 'down':
                label = 'down'
                prev_state = 'down'
        # Detect the "up" position
        elif (50 < left_elbow_angle < 70 or 50 < right_elbow_angle < 70):
            if prev_state == 'down':
                self.bicep_count += 1
                prev_state = 'up'
                label = 'up'

        # Display the bicep count on the output image
        cv2.putText(output_image, f'Bicep: {self.bicep_count}', (10, 60), cv2.FONT_HERSHEY_PLAIN, 2, (255, 0, 0), 2)

        # Check if the exercise is complete (reached target count)
        if self.bicep_count >= self.target_count:
            cv2.putText(output_image, 'Bicep Done!', (10, 100), cv2.FONT_HERSHEY_PLAIN, 2, (0, 255, 0), 2)

        return output_image, label, prev_state
