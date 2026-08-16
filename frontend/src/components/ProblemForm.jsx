import React, { useState } from 'react';

const CATEGORY_CONFIG = {
  'Competitive Programming': {
    titlePlaceholder: 'Problem (e.g. 3Sum)',
    metaPlaceholder: 'Pattern & Complexity (e.g. Two Pointers | O(N))',
    ahaPlaceholder: 'Key Intuition / "Aha!" Moment (e.g. Fix one pointer, use two-sum on remainder)',
  },
  'Language Learning': {
    titlePlaceholder: 'Word / Phrase / Rule',
    metaPlaceholder: 'Grammar Context / Part of Speech',
    ahaPlaceholder: 'Usage Example & Context Nuance',
  },
  'System Design': {
    titlePlaceholder: 'Architecture Component / Concept',
    metaPlaceholder: 'Trade-offs (e.g. Latency vs Consistency)',
    ahaPlaceholder: 'When to Use & Known Bottlenecks',
  },
  'General Learning': {
    titlePlaceholder: 'Topic / Core Question',
    metaPlaceholder: 'Domain / Context',
    ahaPlaceholder: 'Core Takeaway / Mental Model',
  }
};

export default function ProblemForm({ selectedCategory, onAddProblem }) {
  const config = CATEGORY_CONFIG[selectedCategory] || CATEGORY_CONFIG['General Learning'];
  const [form, setForm] = useState({ title: '', link: '', prompt_metadata: '', aha_moment: '', tags: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.aha_moment) return;

    onAddProblem({
      ...form,
      category: selectedCategory,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
    });

    setForm({ title: '', link: '', prompt_metadata: '', aha_moment: '', tags: '' });
  };

  return (
    <div className="sticky-form-container">
      <form onSubmit={handleSubmit} className="pro-form">
        <div className="form-row">
          <input
            className="input-field flex-2"
            placeholder={config.titlePlaceholder}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            className="input-field flex-2"
            placeholder={config.metaPlaceholder}
            value={form.prompt_metadata}
            onChange={(e) => setForm({ ...form, prompt_metadata: e.target.value })}
          />
          <input
            className="input-field flex-1"
            placeholder="Tags (e.g. dp, trees)"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />
          <input
            className="input-field flex-1"
            placeholder="URL (Optional)"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
          />
        </div>

        <div className="form-row">
          <input
            className="input-field flex-grow"
            placeholder={config.ahaPlaceholder}
            value={form.aha_moment}
            onChange={(e) => setForm({ ...form, aha_moment: e.target.value })}
            required
          />
          <button type="submit" className="submit-btn">
            + Add Card
          </button>
        </div>
      </form>
    </div>
  );
}