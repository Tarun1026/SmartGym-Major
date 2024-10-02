# import mediapipe as mp
# import cv2
# from angle_calculator import AngleCalculator


# class TposeClassifier:
#     def __init__(self,count):
#         self.prev_state = None
#         self.target_count = count
#     def classify(self, landmarks, prev_state, output_image):
#         label = 'Unknown Pose'
#         if landmarks:
#             left_knee_angle = AngleCalculator().calculate_angle(landmarks[mp.solutions.pose.PoseLandmark.LEFT_HIP.value],
#                                                                 landmarks[mp.solutions.pose.PoseLandmark.LEFT_KNEE.value],
#                                                                 landmarks[mp.solutions.pose.PoseLandmark.LEFT_ANKLE.value])
#             right_knee_angle = AngleCalculator().calculate_angle(landmarks[mp.solutions.pose.PoseLandmark.RIGHT_HIP.value],
#                                                                  landmarks[mp.solutions.pose.PoseLandmark.RIGHT_KNEE.value],
#                                                                  landmarks[mp.solutions.pose.PoseLandmark.RIGHT_ANKLE.value])
#             left_elbow_angle = AngleCalculator().calculate_angle(landmarks[mp.solutions.pose.PoseLandmark.LEFT_SHOULDER.value],
#                                                                  landmarks[mp.solutions.pose.PoseLandmark.LEFT_ELBOW.value],
#                                                                  landmarks[mp.solutions.pose.PoseLandmark.LEFT_WRIST.value])
#             right_elbow_angle = AngleCalculator().calculate_angle(landmarks[mp.solutions.pose.PoseLandmark.RIGHT_SHOULDER.value],
#                                                                   landmarks[mp.solutions.pose.PoseLandmark.RIGHT_ELBOW.value],
#                                                                   landmarks[mp.solutions.pose.PoseLandmark.RIGHT_WRIST.value])
#             # Get the angle between the left elbow, shoulder and hip points.
#             left_shoulder_angle = AngleCalculator().calculate_angle(landmarks[mp.solutions.pose.PoseLandmark.LEFT_ELBOW.value],
#                                                 landmarks[mp.solutions.pose.PoseLandmark.LEFT_SHOULDER.value],
#                                                 landmarks[mp.solutions.pose.PoseLandmark.LEFT_HIP.value])

#             # Get the angle between the right hip, shoulder and elbow points.
#             right_shoulder_angle = AngleCalculator().calculate_angle(landmarks[mp.solutions.pose.PoseLandmark.RIGHT_HIP.value],
#                                                 landmarks[mp.solutions.pose.PoseLandmark.RIGHT_SHOULDER.value],
#                                                 landmarks[mp.solutions.pose.PoseLandmark.RIGHT_ELBOW.value])
#             # Check if the both arms are straight.
#             if left_elbow_angle > 165 and left_elbow_angle < 195 and right_elbow_angle > 165 and right_elbow_angle < 195:

#                 # Check if shoulders are at the required angle.
#                 if left_shoulder_angle > 80 and left_shoulder_angle < 110 and right_shoulder_angle > 80 and right_shoulder_angle < 110:
#                     # Check if it is the T pose.
#                     #----------------------------------------------------------------------------------------------------------------

#                     # Check if both legs are straight
#                     if left_knee_angle > 160 and left_knee_angle < 195 and right_knee_angle > 160 and right_knee_angle < 195:

#                         # Specify the label of the pose that is tree pose.
#                         label = 'T Pose'


#         cv2.putText(output_image, label, (10, 60),
#                     cv2.FONT_HERSHEY_PLAIN, 2, (255, 0, 0), 2)

#         return output_image, label, prev_state

import mediapipe as mp
import cv2
import time  # To track seconds
from angle_calculator import AngleCalculator

class TposeClassifier:
    def __init__(self, count):
        self.prev_state = None
        self.target_count = count  # Target seconds to hold the pose
        self.start_time = None  # To track when the pose is held correctly
        self.tpose_held_seconds = 0  # Number of seconds T-pose is held

    def classify(self, landmarks, prev_state, output_image):
        label = 'Unknown Pose'
        is_tpose_correct = False  # To track whether the pose is correct
        
        if landmarks:
            # Calculate angles for knees and elbows
            left_knee_angle = AngleCalculator().calculate_angle(landmarks[mp.solutions.pose.PoseLandmark.LEFT_HIP.value],
                                                                landmarks[mp.solutions.pose.PoseLandmark.LEFT_KNEE.value],
                                                                landmarks[mp.solutions.pose.PoseLandmark.LEFT_ANKLE.value])
            right_knee_angle = AngleCalculator().calculate_angle(landmarks[mp.solutions.pose.PoseLandmark.RIGHT_HIP.value],
                                                                 landmarks[mp.solutions.pose.PoseLandmark.RIGHT_KNEE.value],
                                                                 landmarks[mp.solutions.pose.PoseLandmark.RIGHT_ANKLE.value])
            left_elbow_angle = AngleCalculator().calculate_angle(landmarks[mp.solutions.pose.PoseLandmark.LEFT_SHOULDER.value],
                                                                 landmarks[mp.solutions.pose.PoseLandmark.LEFT_ELBOW.value],
                                                                 landmarks[mp.solutions.pose.PoseLandmark.LEFT_WRIST.value])
            right_elbow_angle = AngleCalculator().calculate_angle(landmarks[mp.solutions.pose.PoseLandmark.RIGHT_SHOULDER.value],
                                                                  landmarks[mp.solutions.pose.PoseLandmark.RIGHT_ELBOW.value],
                                                                  landmarks[mp.solutions.pose.PoseLandmark.RIGHT_WRIST.value])
            
            # Calculate shoulder angles
            left_shoulder_angle = AngleCalculator().calculate_angle(landmarks[mp.solutions.pose.PoseLandmark.LEFT_ELBOW.value],
                                                                    landmarks[mp.solutions.pose.PoseLandmark.LEFT_SHOULDER.value],
                                                                    landmarks[mp.solutions.pose.PoseLandmark.LEFT_HIP.value])
            right_shoulder_angle = AngleCalculator().calculate_angle(landmarks[mp.solutions.pose.PoseLandmark.RIGHT_HIP.value],
                                                                     landmarks[mp.solutions.pose.PoseLandmark.RIGHT_SHOULDER.value],
                                                                     landmarks[mp.solutions.pose.PoseLandmark.RIGHT_ELBOW.value])

            # Check if the arms and legs are straight for T-pose
            if 165 < left_elbow_angle < 195 and 165 < right_elbow_angle < 195:
                if 80 < left_shoulder_angle < 110 and 80 < right_shoulder_angle < 110:
                    if 160 < left_knee_angle < 195 and 160 < right_knee_angle < 195:
                        label = 'T Pose'
                        is_tpose_correct = True

        if is_tpose_correct:
            # Start timing if T-pose is correct
            if self.start_time is None:
                self.start_time = time.time()  # Start the timer
            else:
                self.tpose_held_seconds = time.time() - self.start_time  # Calculate the time held
                
            # Display the current time held on the screen
            cv2.putText(output_image, f'Time Held: {self.tpose_held_seconds:.1f} sec', 
                        (10, 100), cv2.FONT_HERSHEY_PLAIN, 2, (0, 255, 0), 2)
            
            # Check if the user held the T-pose for the target time
            if self.tpose_held_seconds >= self.target_count:
                cv2.putText(output_image, 'T Pose Done!', (10, 140), cv2.FONT_HERSHEY_PLAIN, 2, (0, 255, 0), 2)
        else:
            # Reset timer if T-pose is not correct
            self.start_time = None
            self.tpose_held_seconds = 0

        # Display the current label (T-pose or unknown)
        cv2.putText(output_image, label, (10, 60), cv2.FONT_HERSHEY_PLAIN, 2, (255, 0, 0), 2)

        return output_image, label, prev_state
