import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../utils/store';

export default function Login() {
  const navigate = useNavigate();
  const login = useAppStore((s) => s.login);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    setError('');
    if (!username || !password) return setError('请输入用户名和密码');
    const res = login({ username, password });
    if (!res.ok) return setError(res.error);
    navigate('/home');
  };

  return (
    <div className="min-h-screen px-6 pt-20 pb-8 flex flex-col">
      <div className="text-center mb-10">
        <div className="text-7xl mb-4 emoji">🍰</div>
        <h1 className="text-3xl font-bold text-primary">萌萌家厨</h1>
        <p className="text-text-sub text-sm mt-2">家庭点菜 · 温馨共享</p>
      </div>

      <div className="card space-y-4">
        <div>
          <label className="label">用户名</label>
          <input className="input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="请输入用户名" />
        </div>
        <div>
          <label className="label">密码</label>
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="请输入密码" />
        </div>
        {error && <p className="text-danger text-sm">{error}</p>}
        <button className="btn-primary w-full" onClick={submit}>登录</button>
      </div>

      <p className="text-center text-text-sub text-sm mt-6">
        还没有账号？<Link to="/register" className="text-primary">注册一个</Link>
      </p>

      <p className="text-center text-text-sub text-xs mt-auto pt-10">🌸 家里人都可以点菜 🌸</p>
    </div>
  );
}
