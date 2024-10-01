import mediapipe as mp
import cv2
import time  # To track seconds
from angle_calculator import AngleCalculator


class TreeClassifier:
    def __init__(self, count):

        self.prev_state = None
        self.target_count = count  # Target seconds to hold the pose
        self.start_time = None  # To track when the pose is held correctly
        self.tree_held_seconds = 0  # Number of seconds tree pose is held

    def classify(self, landmarks, prev_state, output_image):
        label = 'Unknown Pose'
        is_tree_correct = False  # To track whether the pose is correct

        if landmarks:
            left_knee_angle = AngleCalculator().calculate_angle(landmarks[mp.solutions.pose.PoseLandmark.LEFT_HIP.value],
                                                                landmarks[mp.solutions.pose.PoseLandmark.LEFT_KNEE.value],
                                                                landmarks[mp.solutions.pose.PoseLandmark.LEFT_ANKLE.value])
            right_knee_angle = AngleCalculator().calculate_angle(landmarks[mp.solutions.pose.PoseLandmark.RIGHT_HIP.value],
                                                                 landmarks[mp.solutions.pose.PoseLandmark.RIGHT_KNEE.value],
                                                                 landmarks[mp.solutions.pose.PoseLandmark.RIGHT_ANKLE.value])
        
            # Check if one leg is straight
            if (165 < left_knee_angle < 195 or 165 < right_knee_angle < 195):
                # Check if the other leg is bent at the required angle
                if (315 < left_knee_angle < 335 or 25 < right_knee_angle < 45):
                    label = 'Tree Pose'
                    is_tree_correct = True

        if is_tree_correct:
            # Start timing if tree pose is correct
            if self.start_time is None:
                self.start_time = time.time()  # Start the timer
            else:
                self.tree_held_seconds = time.time() - self.start_time  # Calculate the time held
                
            # Display the current time held on the screen
            cv2.putText(output_image, f'Time Held: {self.tree_held_seconds:.1f} sec', 
                        (10, 100), cv2.FONT_HERSHEY_PLAIN, 2, (0, 255, 0), 2)
            
            # Check if the user held the tree pose for the target time
            if self.tree_held_seconds >= self.target_count:
                cv2.putText(output_image, 'Tree Pose Done!', (10, 140), cv2.FONT_HERSHEY_PLAIN, 2, (0, 255, 0), 2)
        else:
            # Reset timer if tree pose is not correct
            self.start_time = None
            self.tree_held_seconds = 0

        # Display the current label (Tree Pose or unknown)
        cv2.putText(output_image, label, (10, 60), cv2.FONT_HERSHEY_PLAIN, 2, (255, 0, 0), 2)

        return output_image, label, prev_state
