import React from 'react';

const CATEGORIES = [
  {
    id: 'Competitive Programming',
    title: 'Competitive Programming',
    icon: '⚡',
    description: 'Patterns, complexities, and algorithmic intuitions.'
  },
  {
    id: 'Language Learning',
    title: 'Language Learning',
    icon: '🌐',
    description: 'Grammar rules, vocabulary, and contextual usage.'
  },
  {
    id: 'System Design',
    title: 'System Design',
    icon: '🏗️',
    description: 'Architectures, trade-offs, bottlenecks, and protocols.'
  },
  {
    id: 'General Learning',
    title: 'General Learning',
    icon: '🧠',
    description: 'Core concepts, principles, and mental models.'
  }
];

export default function CategoryHub({ problems, onSelectCategory }) {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="hub-container">
      <header className="hub-header">
        <h2>Choose a Deck to Review</h2>
        <p>Select a learning domain to access active recall cards and log new items.</p>
      </header>

      <div className="category-grid">
        {CATEGORIES.map((cat) => {
          const categoryItems = problems.filter((p) => (p.category || 'Competitive Programming') === cat.id);
          const dueCount = categoryItems.filter((p) => p.next_review <= today).length;

          return (
            <div
              key={cat.id}
              className="category-card"
              onClick={() => onSelectCategory(cat.id)}
            >
              <div className="card-top">
                <span className="cat-icon">{cat.icon}</span>
                <span className={`badge ${dueCount > 0 ? 'badge-due' : 'badge-clear'}`}>
                  {dueCount} Due
                </span>
              </div>
              <h3>{cat.title}</h3>
              <p>{cat.description}</p>
              <div className="card-footer">
                <span>{categoryItems.length} Total Cards</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}