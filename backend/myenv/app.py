# app.py
from flask import Flask
from database import db, create_all

app = Flask(__name__)
app.config.from_object('config')  # Import configuration from config.py

db.init_app(app)

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    with app.app_context():
        create_all()
    app.run(debug=True)