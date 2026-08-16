import React from 'react';

export default function ProblemTable({ problems, onReview }) {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="table-wrapper">
      <table className="pro-table">
        <thead>
          <tr>
            <th style={{ width: '22%' }}>Item / Link</th>
            <th style={{ width: '20%' }}>Pattern & Complexity</th>
            <th style={{ width: '38%' }}>Key Intuition ("Aha!" Moment)</th>
            <th style={{ width: '10%' }}>Status</th>
            <th style={{ width: '10%', textAlign: 'right' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {problems.length === 0 ? (
            <tr>
              <td colSpan="5" className="empty-state">
                No cards in this deck yet. Add one above to start tracking!
              </td>
            </tr>
          ) : (
            problems.map((problem) => {
              const isDue = problem.next_review <= today;
              return (
                <tr key={problem.id} className={isDue ? 'row-due' : ''}>
                  <td>
                    <div className="title-cell">
                      {problem.link ? (
                        <a href={problem.link} target="_blank" rel="noreferrer" className="title-link">
                          {problem.title} ↗
                        </a>
                      ) : (
                        <span className="title-text">{problem.title}</span>
                      )}
                      {problem.tags && problem.tags.length > 0 && (
                        <div className="tag-list">
                          {problem.tags.map((tag, idx) => (
                            <span key={idx} className="tag-pill">#{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="meta-text">{problem.prompt_metadata || '—'}</span>
                  </td>
                  <td>
                    <div className="intuition-cell">
                      "{problem.aha_moment}"
                    </div>
                  </td>
                  <td>
                    <span className={`status-pill ${isDue ? 'status-due' : 'status-ok'}`}>
                      {isDue ? 'Due Today' : problem.next_review}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className={`action-btn ${isDue ? 'action-due' : ''}`}
                      onClick={() => onReview(problem.id)}
                      title={`Current review stage: ${problem.review_count}`}
                    >
                      ✓ Recall ({problem.review_count})
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}