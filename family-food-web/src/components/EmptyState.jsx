export default function EmptyState({ emoji = '🍽️', title = '空空如也', desc = '', action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-6xl mb-3 emoji">{emoji}</div>
      <h3 className="text-text font-semibold">{title}</h3>
      {desc && <p className="text-text-sub text-sm mt-1">{desc}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
