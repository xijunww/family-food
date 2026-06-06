import { CATEGORIES } from '../utils/seed';

export default function CategoryTabs({ active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 px-1 -mx-1 sticky top-0 bg-bg z-10 pt-1">
      {CATEGORIES.map((c) => (
        <button
          key={c.key}
          onClick={() => onChange(c.key)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            active === c.key
              ? 'bg-primary text-white shadow-cute'
              : 'bg-white text-text border border-border'
          }`}
        >
          <span className="emoji mr-1">{c.emoji}</span>
          {c.name}
        </button>
      ))}
    </div>
  );
}
