from flask import Flask, jsonify, request
from database import db
from models import User, Coach, Questionnaire, QuestionnaireData, UserAvailability, CoachAvailability, Appointment
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object('config')
migrate = Migrate(app, db)
db.init_app(app)


# User routes
@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    print(f"Received data: {data}")  # Debug: Print the received data

    email = data['email']
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        print(f"User with email {email} already exists")  # Debug: Print existing user message
        return jsonify({'message': 'Email already exists'}), 400

    user = User(name=data['name'], email=email, password=data['password'])
    db.session.add(user)
    try:
        db.session.commit()
        print(f"User created: {user}")  # Debug: Print the created user
    except Exception as e:
        print(f"Error creating user: {e}")  # Debug: Print the error
        db.session.rollback()
        return jsonify({'message': 'An error occurred while creating the user'}), 500

    return jsonify({'message': 'User created successfully'}), 201

@app.route('/api/getusers', methods=['GET'])
def get_user(user_id):
    print(f"Fetching user with ID: {user_id}")  # Debug: Print the user ID
    user = User.query.get(user_id)
    if user:
        print(f"Found user: {user}")  # Debug: Print the found user
        return jsonify(user.to_dict()), 200
    print(f"User with ID {user_id} not found")  # Debug: Print user not found message
    return jsonify({'message': 'User not found'}), 404

if __name__ == '__main__':
    with app.app_context():
        print("Creating database tables...")  # Debug: Print database setup message
        db.create_all()
        print("Database tables created successfully.")  # Debug: Print success message
    print("Starting Flask application...")  # Debug: Print application start message
    app.run(debug=True, host='0.0.0.0', port=5000)