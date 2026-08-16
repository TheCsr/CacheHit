# backend/app/models/card.py
from datetime import date
from app.extensions import db

class Card(db.Model):
    __tablename__ = 'cards'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)       # e.g. "3Sum" OR "Ownership & Borrowing"
    link = db.Column(db.String(512), nullable=True)
    
    category = db.Column(db.String(100), nullable=False, default="Competitive Programming") 
    tags = db.Column(db.String(255), nullable=True)          # Comma-separated tags: "rust, memory, lifetime"
    
    prompt_metadata = db.Column(db.String(100), nullable=True)# e.g. Pattern/Complexity or Grammar Rule
    aha_moment = db.Column(db.Text, nullable=False)          # Key Intuition / Example / Takeaway
    
    last_reviewed = db.Column(db.Date, nullable=False, default=date.today)
    next_review = db.Column(db.Date, nullable=False)
    review_count = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "link": self.link,
            "category": self.category,
            "tags": [t.strip() for t in self.tags.split(",")] if self.tags else [],
            "prompt_metadata": self.prompt_metadata,
            "aha_moment": self.aha_moment,
            "last_reviewed": self.last_reviewed.isoformat(),
            "next_review": self.next_review.isoformat(),
            "review_count": self.review_count,
        }