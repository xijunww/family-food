import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../utils/store';
import { AVATAR_OPTIONS } from '../utils/seed';

export default function Register() {
  const navigate = useNavigate();
  const register = useAppStore((s) => s.register);
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState(AVATAR_OPTIONS[0]);
  const [error, setError] = useState('');

  const usernameOk = username.length >= 2 && username.length <= 16;
  const passwordOk = password.length >= 6 && password.length <= 20;
  const nicknameOk = nickname.length >= 1 && nickname.length <= 12;

  const next = () => {
    setError('');
    if (!usernameOk) return setError('用户名需 2-16 个字符');
    if (!passwordOk) return setError('密码需 6-20 个字符');
    if (!nicknameOk) return setError('昵称需 1-12 个字符');
    setStep(2);
  };

  const submit = () => {
    const res = register({ username, password, nickname, avatar });
    if (!res.ok) return setError(res.error);
    navigate('/home');
  };

  return (
    <div className="min-h-screen px-6 pt-12 pb-8">
      <div className="text-center mb-8">
        <div className="text-6xl mb-3 emoji">🌸</div>
        <h1 className="text-2xl font-bold text-text">加入萌萌家厨</h1>
        <p className="text-text-sub text-sm mt-1">创建你的小厨娘/小厨师身份</p>
      </div>

      {step === 1 && (
        <div className="card space-y-4">
          <div>
            <label className="label">用户名</label>
            <input className="input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="2-16 个字符" />
          </div>
          <div>
            <label className="label">密码</label>
            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="6-20 个字符" />
          </div>
          <div>
            <label className="label">昵称</label>
            <input className="input" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="家人会看到这个名字" />
          </div>
          {error && <p className="text-danger text-sm">{error}</p>}
          <button className="btn-primary w-full" onClick={next}>下一步</button>
        </div>
      )}

      {step === 2 && (
        <div className="card space-y-4">
          <div>
            <label className="label">选一个头像</label>
            <div className="grid grid-cols-8 gap-2">
              {AVATAR_OPTIONS.map((emo) => (
                <button
                  key={emo}
                  onClick={() => setAvatar(emo)}
                  className={`text-2xl aspect-square rounded-2xl border-2 transition-all ${
                    avatar === emo
                      ? 'border-primary bg-bg scale-110 shadow-cute'
                      : 'border-border bg-white'
                  }`}
                >
                  <span className="emoji">{emo}</span>
                </button>
              ))}
            </div>
          </div>
          {error && <p className="text-danger text-sm">{error}</p>}
          <div className="flex gap-3">
            <button className="btn-secondary flex-1" onClick={() => setStep(1)}>上一步</button>
            <button className="btn-primary flex-1" onClick={submit}>完成注册</button>
          </div>
        </div>
      )}

      <p className="text-center text-text-sub text-sm mt-6">
        已有账号？<Link to="/login" className="text-primary">去登录</Link>
      </p>
    </div>
  );
}
