import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppStore } from '../utils/store';
import { addDish, updateDish, getDishById, deleteDish } from '../utils/data';
import { CATEGORIES } from '../utils/seed';

const FOOD_EMOJIS = [
  '🍚','🍜','🍝','🍲','🥘','🍛','🍣','🥟','🍱','🍤',
  '🍙','🍢','🥮','🍡','🥧','🥐','🍞','🥯','🧇','🥞',
  '🍕','🍔','🌭','🌮','🌯','🥙','🥗','🥘','🍳','🥚',
  '🍅','🥦','🥕','🌽','🥔','🍆','🥬','🥒','🌶️','🧄',
  '🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🍈','🍒',
  '🍑','🥭','🍍','🥥','🥝','🍅','🥑','🫐','🍆','🌰',
  '☕','🍵','🥤','🧋','🍶','🍺','🥂','🍷','🥛','🧃',
  '🍰','🎂','🍮','🍭','🍬','🍫','🍩','🍪','🌰','🥜',
];

export default function DishEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAppStore((s) => s.user);
  const editing = id ? getDishById(id) : null;
  const isNew = !editing;

  const [name, setName] = useState(editing?.name || '');
  const [category, setCategory] = useState(editing?.category || 'home');
  const [emoji, setEmoji] = useState(editing?.emoji || '🍚');
  const [description, setDescription] = useState(editing?.description || '');
  const [tagsText, setTagsText] = useState((editing?.tags || []).join(','));
  const [error, setError] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const submit = () => {
    setError('');
    if (!name.trim()) return setError('请填写菜名');
    if (name.length > 20) return setError('菜名最多 20 个字符');
    const tags = tagsText.split(/[,，、\s]+/).filter(Boolean).slice(0, 5);
    if (isNew) {
      addDish({
        name: name.trim(),
        category,
        emoji,
        description: description.trim(),
        tags,
        createdBy: user.username,
      });
    } else {
      updateDish(id, { name: name.trim(), category, emoji, description: description.trim(), tags });
    }
    navigate('/menu');
  };

  const remove = () => {
    if (!confirm('确定删除这道菜？')) return;
    deleteDish(id);
    navigate('/menu');
  };

  return (
    <div className="px-5 pt-6 pb-24">
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white shadow-cute">←</button>
        <h1 className="text-xl font-bold text-text ml-3">{isNew ? '添加菜品' : '编辑菜品'}</h1>
      </div>

      <div className="card space-y-4">
        <div className="flex justify-center">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-bg to-primary-light flex items-center justify-center text-5xl shadow-cute emoji"
          >
            {emoji}
          </button>
        </div>
        {showEmojiPicker && (
          <div className="grid grid-cols-10 gap-1 p-2 bg-bg rounded-2xl max-h-48 overflow-y-auto">
            {FOOD_EMOJIS.map((e) => (
              <button key={e} onClick={() => { setEmoji(e); setShowEmojiPicker(false); }} className="text-2xl emoji">
                {e}
              </button>
            ))}
          </div>
        )}

        <div>
          <label className="label">菜名</label>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="例：番茄炒蛋" maxLength={20} />
        </div>

        <div>
          <label className="label">分类</label>
          <div className="grid grid-cols-5 gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => setCategory(c.key)}
                className={`py-2 rounded-2xl text-sm ${category === c.key ? 'bg-primary text-white' : 'bg-white border border-border text-text'}`}
              >
                <span className="emoji mr-1">{c.emoji}</span>
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label">描述（选填）</label>
          <textarea className="input min-h-[80px]" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="简单介绍下" maxLength={100} />
        </div>

        <div>
          <label className="label">标签（逗号分隔，最多 5 个）</label>
          <input className="input" value={tagsText} onChange={(e) => setTagsText(e.target.value)} placeholder="例：辣, 川菜, 下饭" />
        </div>

        {error && <p className="text-danger text-sm">{error}</p>}

        <div className="flex gap-3">
          {!isNew && !editing.isPreset && (
            <button className="btn-danger" onClick={remove}>删除</button>
          )}
          <button className="btn-primary flex-1" onClick={submit}>
            {isNew ? '+ 添加' : '保存'}
          </button>
        </div>
      </div>
    </div>
  );
}
