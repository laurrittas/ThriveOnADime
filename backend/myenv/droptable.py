# drop_table.py
from database import db
from models import User, Coach, Questionnaire, QuestionnaireData, UserAvailability, CoachAvailability, Appointment
from app import app  # import your Flask application

# def drop_table(table_name):
with app.app_context():  # set up an application context
    User.query.delete ()
    db.session.commit()


