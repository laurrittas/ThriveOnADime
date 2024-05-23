# drop_table.py
from database import db
from app import app  # import your Flask application

def drop_table(table_name):
    with app.app_context():  # set up an application context
        db.Table(table_name, db.metadata, autoload_with=db.engine).drop(db.engine)

if __name__ == "__main__":
    drop_table('platform_usage')