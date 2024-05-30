from flask import Flask, jsonify, request, session
from werkzeug.security import check_password_hash, generate_password_hash
from database import db
from models import User, Coach, Questionnaire, QuestionnaireData, UserAvailability, CoachAvailability, Appointment
from flask_migrate import Migrate
import requests
from flask import request, jsonify
import requests
from anthropic import Anthropic



app = Flask(__name__)
app.config.from_object('config')
app.debug = True
app.secret_key = 'your_secret_key'  # replace with your secret key
migrate = Migrate(app, db)
db.init_app(app)


\
# User routes
@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    if users:
        return jsonify([user.to_dict(rules=('-posts',)) for user in users]), 200
    else:
        return jsonify({"error": "No users found"}), 404
    

@app.route('/api/chat', methods=['POST'])
def handle_chat():
    user_message = request.json.get('message')

    if user_message:
        try:
            claude_response = get_claude_response(user_message)
            return jsonify({"response": claude_response}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "Message is required"}), 400


# def get_claude_response(message):
#     # Replace with the actual Claude API endpoint and authentication
#     api_endpoint = "https://api.anthropic.com/v1/complete"
#     headers = {
#         "Authorization": "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",
#         "Content-Type": "application/json"
#     }
#     data = {
#         "prompt": message,
#         # Add any other necessary parameters for the Claude API request
#     }

#     response = requests.post(api_endpoint, headers=headers, json=data)
#     response.raise_for_status()  # Raise an exception if the request failed

#     # Extract and return the Claude AI response from the API response
#     return response.json()["result"]


@app.route('/api/users/<int:user_id>/availability/<int:availability_id>', methods=['PUT'])
def update_user_availability(user_id, availability_id):
    user = User.query.get(user_id)
    if user:
        availability = UserAvailability.query.get(availability_id)
        if availability:
            data = request.get_json()
            availability.start_time = data.get('startTime', availability.start_time)
            availability.end_time = data.get('endTime', availability.end_time)
            db.session.commit()
            return jsonify(availability.to_dict()), 200
        else:
            return jsonify({"error": "Availability not found"}), 404
    else:
        return jsonify({"error": "User not found"}), 404
    

@app.route('/api/coaches/<int:coach_id>/availability', methods=['POST'])
def create_coach_availability(coach_id):
    coach = Coach.query.get(coach_id)
    if coach:
        data = request.get_json()
        start_time = data.get('startTime')
        end_time = data.get('endTime')

        if start_time and end_time:
            availability = CoachAvailability(
                coach_id=coach_id,
                start_time=start_time,
                end_time=end_time
            )
            db.session.add(availability)
            db.session.commit()
            return jsonify(availability.to_dict()), 201
        else:
            return jsonify({"error": "Start time and end time are required"}), 400
    else:
        return jsonify({"error": "Coach not found"}), 404
    

@app.route('/api/coaches/<int:coach_id>/availability/<int:availability_id>', methods=['PUT'])
def update_coach_availability(coach_id, availability_id):
    coach = Coach.query.get(coach_id)
    if coach:
        availability = CoachAvailability.query.get(availability_id)
        if availability:
            data = request.get_json()
            availability.start_time = data.get('startTime', availability.start_time)
            availability.end_time = data.get('endTime', availability.end_time)
            db.session.commit()
            return jsonify(availability.to_dict()), 200
        else:
            return jsonify({"error": "Availability not found"}), 404
    else:
        return jsonify({"error": "Coach not found"}), 404


@app.route('/api/user/<int:query_id>', methods=['GET'])
def get_user(query_id):
    user = User.query.filter(User.id == query_id).first()
    if user:
        return jsonify(user.to_dict()), 200
    else:
        return jsonify({"error": "User not found"}), 404
    
@app.route('/api/users/<int:user_id>/availability', methods=['POST'])
def create_user_availability(user_id):
    user = User.query.get(user_id)
    if user:
        data = request.get_json()
        start_time = data.get('startTime')
        end_time = data.get('endTime')

        if start_time and end_time:
            availability = UserAvailability(
                user_id=user_id,
                start_time=start_time,
                end_time=end_time
            )
            db.session.add(availability)
            db.session.commit()
            return jsonify(availability.to_dict()), 201
        else:
            return jsonify({"error": "Start time and end time are required"}), 400
    else:
        return jsonify({"error": "User not found"}), 404

@app.route('/api/account/create', methods=['POST'])
def create_user():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if username and email and password:
        existing_user = User.query.filter((User.email == email) | (User.username == username)).first()
        if existing_user:
            return jsonify({"error": "Account with that username/email already exists"}), 400
        else:
            hashed_password = generate_password_hash(password)
            user = User(username=username, email=email, password=hashed_password)
            db.session.add(user)
            db.session.commit()
            return jsonify(user.to_dict()), 201
    else:
        return jsonify({"error": "Username, email, and password are required"}), 400
    
@app.route('/api/users/<int:user_id>/availability', methods=['GET'])
def get_user_availability(user_id):
    user = User.query.get(user_id)
    if user:
        availability = user.user_availability.all()
        return jsonify([slot.to_dict() for slot in availability])
    else:
        return jsonify({"error": "User not found"}), 404

# Update
@app.route('/api/user/<int:user_id>', methods=['PATCH'])
def update_user(user_id):
    user = User.query.get(user_id)
    if user:
        data = request.get_json()
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        if 'password' in data:
            user.password = generate_password_hash(data['password'])
        db.session.commit()
        return jsonify(user.to_dict()), 200
    else:
        return jsonify({"error": "User not found"}), 404
    
# Delete
@app.route('/api/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted"}), 200
    else:
        return jsonify({"error": "User not found"}), 404


@app.route('/api/account/signin', methods=['POST'])
def user_signin():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username and password:
        user = User.query.filter(User.username == username).first()
        if user and user.check_password(password):
            session['user'] = user.to_dict()
            return jsonify(user.to_dict()), 200
        else:
            return jsonify({"error": "Invalid username or password"}), 401
    else:
        return jsonify({"error": "Username and password are required"}), 400


@app.route('/api/questionnaire/<int:user_id>', methods=['GET'])
def get_questionnaire(user_id):
    questionnaire = Questionnaire.query.filter(Questionnaire.user_id == user_id).first()
    if questionnaire:
        return jsonify(questionnaire.to_dict()), 200
    else:
        return jsonify({"error": "Questionnaire not found for this user"}), 404

@app.route('/api/questionnaire', methods=['POST'])
def create_questionnaire():
    data = request.get_json()
    user_id = data.get('user_id')
    questionnaire_type = data.get('questionnaire_type')

    if user_id and questionnaire_type:
        questionnaire = Questionnaire(user_id=user_id, questionnaire_type=questionnaire_type)
        db.session.add(questionnaire)
        db.session.commit()
        return jsonify(questionnaire.to_dict()), 201
    else:
        return jsonify({"error": "User ID and questionnaire type are required"}), 400

@app.route('/api/questionnairedata/<int:questionnaire_id>', methods=['GET'])
def get_questionnaire_data(questionnaire_id):
    questionnaire_data = QuestionnaireData.query.filter(QuestionnaireData.questionnaire_id == questionnaire_id).all()
    if questionnaire_data:
        return jsonify([data.to_dict() for data in questionnaire_data]), 200
    else:
        return jsonify({"error": "No data found for this questionnaire"}), 404

@app.route('/api/questionnairedata', methods=['POST'])
def create_questionnaire_data():
    data = request.get_json()
    questionnaire_id = data.get('questionnaire_id')
    question_text = data.get('question_text')
    answer = data.get('answer')
    score = data.get('score')
    order = data.get('order')

    if questionnaire_id and question_text and answer and order and score is not None:
        questionnaire_data = QuestionnaireData(questionnaire_id=questionnaire_id, question_text=question_text, answer=answer, score=score, order=order)
        db.session.add(questionnaire_data)
        db.session.commit()
        return jsonify(questionnaire_data.to_dict()), 201
    else:
        return jsonify({"error": "Questionnaire ID, question text, answer, score, and order are required"}), 400
    

# ... (existing code)

# Coach routes
@app.route('/api/coaches', methods=['GET'])
def get_coaches():
    coaches = Coach.query.all()
    return jsonify([coach.to_dict() for coach in coaches])

@app.route('/api/coaches/<int:coach_id>/availability', methods=['GET'])
def get_coach_availability(coach_id):
    coach = Coach.query.get(coach_id)
    if coach:
        availability = coach.coach_availability.all()
        return jsonify([slot.to_dict() for slot in availability])
    else:
        return jsonify({"error": "Coach not found"}), 404

# app.py
# ...

@app.route('/api/appointments', methods=['POST'])
def create_appointment():
    data = request.get_json()
    user_id = data.get('userId')
    coach_id = data.get('coachId')
    user_availability_id = data.get('userAvailabilityId')
    coach_availability_id = data.get('coachAvailabilityId')

    if user_id and coach_id and user_availability_id and coach_availability_id:
        user = User.query.get(user_id)
        coach = Coach.query.get(coach_id)
        user_availability = UserAvailability.query.get(user_availability_id)
        coach_availability = CoachAvailability.query.get(coach_availability_id)

        if user and coach and user_availability and coach_availability:
            appointment = Appointment(
                user_id=user_id,
                coach_id=coach_id,
                user_availability_id=user_availability_id,
                coach_availability_id=coach_availability_id,
                description=None  # You can add a description later
            )
            db.session.add(appointment)
            db.session.commit()
            return jsonify({"message": "Appointment created successfully"}), 201
        else:
            return jsonify({"error": "Invalid user, coach, or availability"}), 400
    else:
        return jsonify({"error": "User ID, coach ID, and availability IDs are required"}), 400

if __name__ == '__main__':
    with app.app_context():
        print("Creating database tables...")  # Debug: Print database setup message
        db.create_all()
        print("Database tables created successfully.")  # Debug: Print success message
    print("Starting Flask application...")  # Debug: Print application start message
    app.run(debug=True, host='0.0.0.0', port=5000)