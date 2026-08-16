from flask import Flask, jsonify
from app.extensions import db, cors
from app.api.cards import cards_bp

def create_app(config_class='app.config.DevelopmentConfig'):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(config_class)

    # Initialize Extensions
    db.init_app(app)
    cors.init_app(app)

    # Register Blueprints
    app.register_blueprint(cards_bp)

    # Create tables
    with app.app_context():
        db.create_all()

    return app