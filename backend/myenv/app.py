from flask import Flask, jsonify, request, session
from werkzeug.security import check_password_hash, generate_password_hash
from database import db
from models import User, Coach, Questionnaire, QuestionnaireData, UserAvailability, CoachAvailability, Appointment
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object('config')
app.secret_key = 'your_secret_key'  # replace with your secret key
migrate = Migrate(app, db)
db.init_app(app)

# User routes
@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    if users:
        return jsonify([user.to_dict(rules=('-posts',)) for user in users]), 200
    else:
        return jsonify({"error": "No users found"}), 404

@app.route('/api/user/<int:query_id>', methods=['GET'])
def get_user(query_id):
    user = User.query.filter(User.id == query_id).first()
    if user:
        return jsonify(user.to_dict()), 200
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

if __name__ == '__main__':
    with app.app_context():
        print("Creating database tables...")  # Debug: Print database setup message
        db.create_all()
        print("Database tables created successfully.")  # Debug: Print success message
    print("Starting Flask application...")  # Debug: Print application start message
    app.run(debug=True, host='0.0.0.0', port=5000)