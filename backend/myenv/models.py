# models.py
from database import db
from sqlalchemy.orm import backref
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    is_verified_adult = db.Column(db.Boolean, default=False, nullable=False)
    coach_id = db.Column(db.Integer, db.ForeignKey('coaches.id'), nullable=True)
    coach = db.relationship('Coach', backref=backref('users', uselist=False))
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    def __repr__(self):
        return f"<User {self.name}>"

class Coach(db.Model):
    __tablename__ = 'coaches'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    bio = db.Column(db.Text, nullable=True)
    qualifications = db.Column(db.Text, nullable=True)
    rating = db.Column(db.Float, default=0.0, nullable=False)
    is_verified_adult = db.Column(db.Boolean, default=False, nullable=False)
    availability = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    def __repr__(self):
        return f"<Coach {self.name}>"

class Questionnaire(db.Model):
    __tablename__ = 'questionnaires'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', backref=backref('questionnaires', lazy='dynamic'))
    questionnaire_type = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    def __repr__(self):
        return f"<Questionnaire {self.questionnaire_type}>"

class QuestionnaireData(db.Model):
    __tablename__ = 'questionnaire_data'
    id = db.Column(db.Integer, primary_key=True)
    questionnaire_id = db.Column(db.Integer, db.ForeignKey('questionnaires.id'), nullable=False)
    questionnaire = db.relationship('Questionnaire', backref=backref('questionnaire_data', lazy='dynamic'))
    question_text = db.Column(db.Text, nullable=False)
    answer = db.Column(db.Text, nullable=True)
    order = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    def __repr__(self):
        return f"<QuestionnaireData {self.question_text[:20]}...>"

class UserAvailability(db.Model):
    __tablename__ = 'user_availability'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', backref=backref('user_availability', lazy='dynamic'))
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    def __repr__(self):
        return f"<UserAvailability {self.start_time} - {self.end_time}>"

class CoachAvailability(db.Model):
    __tablename__ = 'coach_availability'
    id = db.Column(db.Integer, primary_key=True)
    coach_id = db.Column(db.Integer, db.ForeignKey('coaches.id'), nullable=False)
    coach = db.relationship('Coach', backref=backref('coach_availability', lazy='dynamic'))
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    def __repr__(self):
        return f"<CoachAvailability {self.start_time} - {self.end_time}>"

class Appointment(db.Model):
    __tablename__ = 'appointments'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', backref=backref('appointments', lazy='dynamic'))
    coach_id = db.Column(db.Integer, db.ForeignKey('coaches.id'), nullable=False)
    coach = db.relationship('Coach', backref=backref('appointments', lazy='dynamic'))
    user_availability_id = db.Column(db.Integer, db.ForeignKey('user_availability.id'), nullable=False)
    user_availability = db.relationship('UserAvailability', backref=backref('appointments', lazy='dynamic'))
    coach_availability_id = db.Column(db.Integer, db.ForeignKey('coach_availability.id'), nullable=False)
    coach_availability = db.relationship('CoachAvailability', backref=backref('appointments', lazy='dynamic'))
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    def __repr__(self):
        return f"<Appointment {self.user.name} - {self.coach.name}>"