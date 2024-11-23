import mediapipe as mp
import cv2
from angle_calculator import AngleCalculator


class SideRaiseClassifier:
    def __init__(self):
        self.prev_state = None
        self.sideraise_count = 0

    def classify(self, landmarks, prev_state, output_image):
        label = 'unknown pose'
        if landmarks:
            # Calculate the left and right arm angles (shoulder-elbow-wrist).
            left_shoulder_angle = AngleCalculator().calculate_angle(landmarks[mp.solutions.pose.PoseLandmark.LEFT_ELBOW.value],
                                                landmarks[mp.solutions.pose.PoseLandmark.LEFT_SHOULDER.value],
                                                landmarks[mp.solutions.pose.PoseLandmark.LEFT_HIP.value])

            # Get the angle between the right hip, shoulder and elbow points.
            right_shoulder_angle = AngleCalculator().calculate_angle(landmarks[mp.solutions.pose.PoseLandmark.RIGHT_HIP.value],
                                                landmarks[mp.solutions.pose.PoseLandmark.RIGHT_SHOULDER.value],
                                                landmarks[mp.solutions.pose.PoseLandmark.RIGHT_ELBOW.value])
            # Define "up" and "down" states for side raises
            if (left_shoulder_angle > 80 and left_shoulder_angle < 120) and (right_shoulder_angle > 80 and right_shoulder_angle < 120):
                if prev_state == 'down':
                    self.sideraise_count += 1
                    label = 'up'
                    prev_state = 'up'
            elif (left_shoulder_angle < 60 or left_shoulder_angle > 160) and (right_shoulder_angle < 60 or right_shoulder_angle > 160):
                label = 'down'
                prev_state = 'down'


        cv2.putText(output_image, label, (10, 30),
                cv2.FONT_HERSHEY_PLAIN, 2, (255, 0, 0), 2)
        cv2.putText(output_image, f'Side Raises: {self.sideraise_count}', (10, 60), cv2.FONT_HERSHEY_PLAIN, 2, (255, 0, 0), 2)

        return output_image, label, prev_state