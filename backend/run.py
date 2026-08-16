import os
from app import create_app

class DevelopmentConfig:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///../instance/cachehit.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key')

app = create_app(config_class=DevelopmentConfig)

if __name__ == '__main__':
    app.run(port=5000, debug=True)