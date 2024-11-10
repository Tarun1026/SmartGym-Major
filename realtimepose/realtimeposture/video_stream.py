
import cv2
from flask import Response
from angle_calculator import AngleCalculator
from pushup_classifier import PushupClassifier
from pose_detector import PoseDetector
from bicep_classifier import BicepClassifier
from plank_classifier import PlankClassifier
from tree_classifier import TreeClassifier
from tpose_classifier import TposeClassifier
from warrior_classifier import WarriorClassifier

class VideoStream:
    def __init__(self):
        self.cap = cv2.VideoCapture(0)
        # self.pushup_classifier = PushupClassifier()
        # self.bicep_classifier = BicepClassifier()
        self.pose_detector = PoseDetector()
        # self.plank_classifier = PlankClassifier()
        # self.tree_classifier = TreeClassifier()
        # self.tpose_classifier = TposeClassifier()
        # self.warrior_classifier =WarriorClassifier()
        self.classifier = None

    def set_classifier(self, choice,count):
        if choice == 'pushup':
            self.classifier = PushupClassifier(count)
        elif choice == 'bicep':
            self.classifier = BicepClassifier(count)
        elif choice == 'plank':
            self.classifier = PlankClassifier(count)
        elif choice == 'Tree':
            self.classifier = TreeClassifier(count)
        elif choice == 'TPose':
            self.classifier = TposeClassifier(count)
        elif choice == 'WarriorPose':
            self.classifier = WarriorClassifier(count)

    def get_pushup_count(self):
    # Ensure the classifier exists and is of PushupClassifier type
        if isinstance(self.classifier, PushupClassifier):
                # print("here ",self.classifier.pushup_count)
                return self.classifier.pushup_count
        return 0  # Default if no pushup classifier 
    def get_bicep_count(self):
    # Ensure the classifier exists and is of PushupClassifier type
        if isinstance(self.classifier, BicepClassifier):
                return self.classifier.bicep_count
        return 0  # Default if no pushup classifier 
    def stream(self):
        def generate_frames():
            while True:
                ret, frame = self.cap.read()
                if not ret:
                    break
                frame=cv2.flip(frame,1)
                output_image, pose_landmarks = self.pose_detector.detect_pose(frame)
                if pose_landmarks:
                    landmarks = [(landmark.x, landmark.y, landmark.z) for landmark in pose_landmarks.landmark]

                    if self.classifier:
                        _, _, self.classifier.prev_state = self.classifier.classify(landmarks, self.classifier.prev_state, output_image)

                ret, buffer = cv2.imencode('.jpg', output_image)
                frame_bytes = buffer.tobytes()
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

        return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')
