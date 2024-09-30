# from flask import Flask, Response, jsonify, render_template, request
# from video_stream import VideoStream
# from flask_cors import CORS  # Import CORS

# app = Flask(__name__)
# CORS(app)
# print("Hello hgygugt")
# # Initialize the VideoStream object
# video_stream = VideoStream()
# # @app.route('/start-exercise', methods=['POST'])
# # def start_exercise():
# #     exercise = request.json.get('exercise')
# #     count = request.json.get('count')

# #     if exercise == 'pushup':
# #         video_stream.set_classifier('pushup', count)

# #     return jsonify({'message': 'Exercise started'})

# # from flask import Flask, render_template, request, jsonify

# @app.route('/', methods=['GET','POST'])
# def index():
#     print("hello world")
#     if request.method == 'POST':
#         data = request.get_json()
#         choice = data.get('choice')
#         if choice == '1':
#             video_stream.set_classifier('pushup')
#         elif choice == '2':
#             video_stream.set_classifier('bicep')
#         elif choice == '3':
#             video_stream.set_classifier('plank')
#         elif choice == '4':
#             video_stream.set_classifier('Tree')
#         elif choice == '5':
#             video_stream.set_classifier('TPose')
#         elif choice == '6':
#             video_stream.set_classifier('WarriorPose')

#     return render_template('index.html')

# @app.route('/video_feed')
# def video_feed():
#     return Response(video_stream.stream(),
#                     mimetype='multipart/x-mixed-replace; boundary=frame')

# if __name__ == '__main__':
#     app.run(debug=True,port=5000)


from flask import Flask, render_template, request, Response, jsonify
from video_stream import VideoStream
from flask_cors import CORS  # Import CORS


app = Flask(__name__)
CORS(app)
# Initialize the VideoStream object
video_stream = VideoStream()

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        data = request.get_json()
        choice = data.get('choice')
        # choice = request.form['choice']
        count=data.get('count')

        if choice == '1':
            video_stream.set_classifier('pushup')
        elif choice == '2':
            video_stream.set_classifier('bicep',count)
        elif choice == '3':
            video_stream.set_classifier('plank')
        elif choice == '4':
            video_stream.set_classifier('Tree')
        elif choice == '5':
            video_stream.set_classifier('TPose')
        elif choice == '6':
            video_stream.set_classifier('WarriorPose')

    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    return video_stream.stream()

if __name__ == '__main__':
    app.run(debug=True,port=5000)
