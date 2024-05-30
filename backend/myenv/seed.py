# seed.py
from app import app
from database import db
from models import User, Coach, Questionnaire, QuestionnaireData, UserAvailability, CoachAvailability, Appointment

def seed_users():
    user1 = User(name='John Doe', username='johndoe', email='john@example.com', password='password', is_verified_adult=True)
    user2 = User(name='Jane Smith', username='janesmith', email='jane@example.com', password='password', is_verified_adult=True)
    db.session.add(user1)
    db.session.add(user2)
    db.session.commit()



def seed_coaches():
    coach1 = Coach(name='Coach Alice', bio='Life coach with 5 years of experience.', qualifications='Certified Life Coach')
    coach2 = Coach(name='Coach Bob', bio='Career coach and motivational speaker.', qualifications='MBA, Certified Career Coach')
    db.session.add(coach1)
    db.session.add(coach2)
    db.session.commit()

def seed_all():
    seed_users()
    seed_coaches()
    # Add more seeding functions here for other models

if __name__ == '__main__':
    with app.app_context():
        db.drop_all()
        db.create_all()
        seed_all()
        print('Database seeded!')