import mediapipe as mp
import cv2
import time 
from angle_calculator import AngleCalculator


class WarriorClassifier:
    def __init__(self,count):
        self.prev_state = None

        self.target_count = count  # Target seconds to hold the pose
        self.start_time = None  # To track when the pose is held correctly
        self.warrior_held_seconds = 0  # Number of seconds warrior pose is held

    def classify(self, landmarks, prev_state, output_image):
        label = 'Unknown Pose'
        is_warrior_correct = False 
        if landmarks:
            left_elbow_angle = AngleCalculator().calculate_angle(landmarks[mp.solutions.pose.PoseLandmark.LEFT_SHOULDER.value],
                                                                 landmarks[mp.solutions.pose.PoseLandmark.LEFT_ELBOW.value],
                                                                 landmarks[mp.solutions.pose.PoseLandmark.LEFT_WRIST.value])
            right_elbow_angle = AngleCalculator().calculate_angle(landmarks[mp.solutions.pose.PoseLandmark.RIGHT_SHOULDER.value],
                                                                  landmarks[mp.solutions.pose.PoseLandmark.RIGHT_ELBOW.value],
                                                                  landmarks[mp.solutions.pose.PoseLandmark.RIGHT_WRIST.value])
            left_knee_angle = AngleCalculator().calculate_angle(landmarks[mp.solutions.pose.PoseLandmark.LEFT_HIP.value],
                                                                landmarks[mp.solutions.pose.PoseLandmark.LEFT_KNEE.value],
                                                                landmarks[mp.solutions.pose.PoseLandmark.LEFT_ANKLE.value])
            right_knee_angle = AngleCalculator().calculate_angle(landmarks[mp.solutions.pose.PoseLandmark.RIGHT_HIP.value],
                                                                 landmarks[mp.solutions.pose.PoseLandmark.RIGHT_KNEE.value],
                                                                 landmarks[mp.solutions.pose.PoseLandmark.RIGHT_ANKLE.value])
            # Get the angle between the left elbow, shoulder and hip points.
            left_shoulder_angle = AngleCalculator().calculate_angle(landmarks[mp.solutions.pose.PoseLandmark.LEFT_ELBOW.value],
                                                landmarks[mp.solutions.pose.PoseLandmark.LEFT_SHOULDER.value],
                                                landmarks[mp.solutions.pose.PoseLandmark.LEFT_HIP.value])

            # Get the angle between the right hip, shoulder and elbow points.
            right_shoulder_angle = AngleCalculator().calculate_angle(landmarks[mp.solutions.pose.PoseLandmark.RIGHT_HIP.value],
                                                landmarks[mp.solutions.pose.PoseLandmark.RIGHT_SHOULDER.value],
                                                landmarks[mp.solutions.pose.PoseLandmark.RIGHT_ELBOW.value])

           # Check if the both arms are straight.
            if left_elbow_angle > 165 and left_elbow_angle < 195 and right_elbow_angle > 165 and right_elbow_angle < 195:

                # Check if shoulders are at the required angle.
                if left_shoulder_angle > 80 and left_shoulder_angle < 110 and right_shoulder_angle > 80 and right_shoulder_angle < 110:

            # Check if it is the warrior II pose.
            #----------------------------------------------------------------------------------------------------------------

                    # Check if one leg is straight.
                    if left_knee_angle > 165 and left_knee_angle < 195 or right_knee_angle > 165 and right_knee_angle < 195:

                        # Check if the other leg is bended at the required angle.
                        if left_knee_angle > 90 and left_knee_angle < 120 or right_knee_angle > 90 and right_knee_angle < 120:

                            # Specify the label of the pose that is Warrior II pose.
                            label = 'Warrior II Pose'
                            is_warrior_correct = True
            
        if is_warrior_correct:
            # Start timing if warrior pose is correct
            if self.start_time is None:
                self.start_time = time.time()  # Start the timer
            else:
                self.warrior_held_seconds = time.time() - self.start_time  # Calculate the time held
                
            # Display the current time held on the screen
            cv2.putText(output_image, f'Time Held: {self.warrior_held_seconds:.1f} sec', 
                        (10, 100), cv2.FONT_HERSHEY_PLAIN, 2, (0, 255, 0), 2)
            
            # Check if the user held the warrior pose for the target time
            if self.warrior_held_seconds >= self.target_count:
                cv2.putText(output_image, 'Warrior Pose Done!', (10, 140), cv2.FONT_HERSHEY_PLAIN, 2, (0, 255, 0), 2)
        else:
            # Reset timer if warrior pose is not correct
            self.start_time = None
            self.warrior_held_seconds = 0

        cv2.putText(output_image, label, (10, 60),
                    cv2.FONT_HERSHEY_PLAIN, 2, (255, 0, 0), 2)

        return output_image, label, prev_state
