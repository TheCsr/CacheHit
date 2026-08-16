import React, { useEffect, useState } from 'react';
import CategoryHub from './components/CategoryHub';
import ProblemForm from './components/ProblemForm';
import ProblemTable from './components/ProblemTable';
import { fetchProblems, createProblem, reviewProblem } from './api/problemsApi';

export default function App() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  const loadData = async () => {
    try {
      const data = await fetchProblems();
      setProblems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = async (formData) => {
    await createProblem(formData);
    loadData();
  };

  const handleReview = async (id) => {
    await reviewProblem(id);
    loadData();
  };

  const today = new Date().toISOString().split('T')[0];
  const filteredProblems = activeCategory
    ? problems.filter((p) => (p.category || 'Competitive Programming') === activeCategory)
    : [];
  const categoryDueCount = filteredProblems.filter((p) => p.next_review <= today).length;

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="brand" onClick={() => setActiveCategory(null)}>
          <h1>⚡ CacheHit</h1>
          <span className="brand-subtitle">Spaced Repetition & Recall Hub</span>
        </div>
      </header>

      <main>
        {loading ? (
          <div className="loader">Loading database...</div>
        ) : !activeCategory ? (
          <CategoryHub
            problems={problems}
            onSelectCategory={(catId) => setActiveCategory(catId)}
          />
        ) : (
          <div className="deck-container">
            <div className="deck-toolbar">
              <button className="back-btn" onClick={() => setActiveCategory(null)}>
                ← Decks
              </button>
              <div className="deck-title-group">
                <h2>{activeCategory}</h2>
                <span className="queue-summary">
                  <strong>{categoryDueCount}</strong> due for recall &bull; {filteredProblems.length} total
                </span>
              </div>
            </div>

            {/* Pinned Top Form */}
            <ProblemForm
              selectedCategory={activeCategory}
              onAddProblem={handleAdd}
            />

            {/* Scrollable Table */}
            <ProblemTable
              problems={filteredProblems}
              onReview={handleReview}
            />
          </div>
        )}
      </main>
    </div>
  );
}