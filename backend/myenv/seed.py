from datetime import datetime, timedelta
from random import randint
from faker import Faker
from app import create_app, db  # Replace 'your_app' with the actual name of your Flask app module
from models import User, Coach, Questionnaire, QuestionnaireData, UserAvailability, CoachAvailability, Appointment

fake = Faker()

app = create_app()  # Create the Flask application instance
app.app_context().push()  # Push the application context
# Generate fake users
for _ in range(10):
    user = User(
        name=fake.name(),
        username=fake.user_name(),
        email=fake.email(),
        password=fake.password(),
        is_verified_adult=fake.boolean(),
    )
    db.session.add(user)
    db.session.commit()

    # Generate fake questionnaires for the user
    for _ in range(randint(1, 3)):
        questionnaire = Questionnaire(
            user_id=user.id,
            questionnaire_type=fake.word(),
        )
        db.session.add(questionnaire)
        db.session.commit()

        # Generate fake questionnaire data
        for i in range(randint(5, 10)):
            questionnaire_data = QuestionnaireData(
                questionnaire_id=questionnaire.id,
                question_text=fake.sentence(),
                answer=fake.sentence(),
                score=randint(1, 5),
                order=i,
            )
            db.session.add(questionnaire_data)
            db.session.commit()

    # Generate fake user availability
    for _ in range(randint(1, 5)):
        start_time = fake.date_time_between(start_date='-2m', end_date='+2m')
        end_time = start_time + timedelta(hours=randint(1, 4))
        user_availability = UserAvailability(
            user_id=user.id,
            start_time=start_time,
            end_time=end_time,
        )
        db.session.add(user_availability)
        db.session.commit()

# Generate fake coaches
for _ in range(5):
    coach = Coach(
        name=fake.name(),
        bio=fake.paragraph(),
        qualifications=fake.paragraph(),
        rating=fake.pyfloat(left_digits=2, right_digits=1, positive=True),
        is_verified_adult=fake.boolean(),
    )
    db.session.add(coach)
    db.session.commit()

    # Generate fake coach availability
    for _ in range(randint(1, 10)):
        start_time = fake.date_time_between(start_date='-2m', end_date='+2m')
        end_time = start_time + timedelta(hours=randint(1, 4))
        coach_availability = CoachAvailability(
            coach_id=coach.id,
            start_time=start_time,
            end_time=end_time,
        )
        db.session.add(coach_availability)
        db.session.commit()

# Generate fake appointments
for _ in range(20):
    user = User.query.order_by(db.func.random()).first()
    coach = Coach.query.order_by(db.func.random()).first()
    user_availability = user.user_availability.order_by(db.func.random()).first()
    coach_availability = coach.coach_availability.order_by(db.func.random()).first()

    appointment = Appointment(
        user_id=user.id,
        coach_id=coach.id,
        user_availability_id=user_availability.id,
        coach_availability_id=coach_availability.id,
        description=fake.paragraph(),
    )
    db.session.add(appointment)
    db.session.commit()