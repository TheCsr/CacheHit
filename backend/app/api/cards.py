from flask import Blueprint, request, jsonify
from datetime import date
from app.extensions import db
from app.models.Card import Card
from app.services.repetition import calculate_next_review

cards_bp = Blueprint('problems', __name__, url_prefix='/api/v1')

@cards_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify("The backend is running and the problems endpoint is accessible.")

@cards_bp.route('', methods=['GET'])
def get_cards():
    category = request.args.get('category')
    tag = request.args.get('tag')
    
    query = Card.query

    if category:
        query = query.filter(Card.category == category)
    if tag:
        query = query.filter(Card.tags.like(f"%{tag}%"))

    cards = query.order_by(Card.next_review.asc()).all()
    return jsonify([c.to_dict() for c in cards])

@cards_bp.route('', methods=['POST'])
def add_card():
    data = request.get_json()
    
    if not data or not data.get('title') or not data.get('aha_moment'):
        return jsonify({"error": "Missing required fields"}), 400

    tags_str = ",".join(data.get('tags', [])) if isinstance(data.get('tags'), list) else data.get('tags', '')

    new_card = Card(
        title=data['title'],
        link=data.get('link', ''),
        category=data.get('category', 'General'),
        tags=tags_str,
        prompt_metadata=data.get('prompt_metadata', ''),
        aha_moment=data['aha_moment'],
        last_reviewed=date.today(),
        next_review=calculate_next_review(0),
        review_count=0
    )
    
    db.session.add(new_card)
    db.session.commit()
    return jsonify(new_card.to_dict()), 201

@cards_bp.route('/<int:card_id>/review', methods=['POST'])
def review_card(card_id):
    card = Card.query.get_or_404(card_id)
    card.review_count += 1
    card.last_reviewed = date.today()
    card.next_review = calculate_next_review(card.review_count)
    
    db.session.commit()
    return jsonify(card.to_dict())