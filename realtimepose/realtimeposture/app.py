from flask import Flask, json, render_template, request, Response, jsonify
from video_stream import VideoStream
from flask_cors import CORS

app = Flask(__name__, static_folder='gifs', static_url_path='/gifs')

CORS(app)
video_stream = VideoStream()
selected_exercise = None
exercise_count = 0


with open('T:/SMART_GYM_PROJECT/realtimepose/realtimeposture/templates/gifs.json', 'r') as f:
    gif_data = json.load(f)
@app.route('/', methods=['GET', 'POST'])
def index():
    global selected_exercise, exercise_count 
    if request.method == 'POST':
        data = request.get_json()
        choice = data.get('choice')
        count = data.get('count')  

        if choice == '1':
            selected_exercise = 'Push-up'
            exercise_count = count
            video_stream.set_classifier('pushup',count)
        elif choice == '2':
            selected_exercise = 'Bicep curls'
            exercise_count = count  
            video_stream.set_classifier('bicep', count)  
        elif choice == '3':
            selected_exercise = 'Plank'
            exercise_count = count  
            video_stream.set_classifier('plank',count)
        elif choice == '4':
            selected_exercise = 'Tree Pose'
            exercise_count = count

            video_stream.set_classifier('Tree',count)
        elif choice == '5':
            selected_exercise = 'TPose'
            exercise_count = count
            video_stream.set_classifier('TPose',count)
        elif choice == '6':
            selected_exercise = 'Warrior Pose'
            exercise_count = count
            video_stream.set_classifier('WarriorPose',count)

    return render_template('index.html')


@app.route('/get_exercise', methods=['GET'])
def get_exercise():
    if selected_exercise:
        gif_url = gif_data.get(selected_exercise, "https://yourgifurl.com/default.gif")
        print(f"Selected Exercise: {selected_exercise}, GIF URL: {gif_url}")  
        return jsonify({'exercise': selected_exercise, 'count': exercise_count, 'gifUrl': gif_url})
    else:
        return jsonify({'error': 'No exercise selected'}), 400
@app.route('/get_pushup_count', methods=['GET'])
def get_pushup_count():
    current_pushup_count = video_stream.get_pushup_count()  # Get the current count
    print("Current pushup count:", current_pushup_count)
    return jsonify({"count": current_pushup_count})
@app.route('/get_bicep_count', methods=['GET'])
def get_bicep_count():
    current_bicep_count = video_stream.get_bicep_count()  # Get the current count
    print("Current bicep count:", current_bicep_count)
    return jsonify({"count": current_bicep_count})
@app.route('/get_plank_count', methods=['GET'])
def get_plank_count():
    current_plank_count = video_stream.get_plank_count()  # Get the current count
    print("Current plank count:", current_plank_count)
    return jsonify({"count": current_plank_count})
@app.route('/get_Treepose_count', methods=['GET'])
def get_Treepose_count():
    current_tree_count = video_stream.get_tree_count()  # Get the current count
    print("Current tree count:", current_tree_count)
    return jsonify({"count": current_tree_count})
@app.route('/get_Tpose_count', methods=['GET'])
def get_Tpose_count():
    current_t_count = video_stream.get_t_count()  # Get the current count
    print("Current tpose count:", current_t_count)
    return jsonify({"count": current_t_count})
@app.route('/video_feed')
def video_feed():
    return video_stream.stream()

if __name__ == '__main__':
    app.run(debug=True, port=8000)