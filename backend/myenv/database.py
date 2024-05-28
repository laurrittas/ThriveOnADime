# database.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object('config')  # Import configuration from config.py

db = SQLAlchemy(app)

def create_all():
    """Creates all database tables"""
    db.create_all()

def drop_all():
    """Drops all database tables"""
    db.drop_all()

def commit():
    """Commits the current database session"""
    db.session.commit()

def rollback():
    """Rolls back the current database session"""
    db.session.rollback()