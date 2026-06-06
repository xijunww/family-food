import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './utils/store';
import TabBar from './components/TabBar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Menu from './pages/Menu';
import DishDetail from './pages/DishDetail';
import DishEdit from './pages/DishEdit';
import Order from './pages/Order';
import OrderDetail from './pages/OrderDetail';
import Orders from './pages/Orders';
import Profile from './pages/Profile';

function RequireAuth({ children }) {
  const user = useAppStore((s) => s.user);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function Shell({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">{children}</div>
      <TabBar />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<RequireAuth><Shell><Home /></Shell></RequireAuth>} />
        <Route path="/menu" element={<RequireAuth><Shell><Menu /></Shell></RequireAuth>} />
        <Route path="/order" element={<RequireAuth><Shell><Order /></Shell></RequireAuth>} />
        <Route path="/orders" element={<RequireAuth><Shell><Orders /></Shell></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><Shell><Profile /></Shell></RequireAuth>} />

        <Route path="/dish/:id" element={<RequireAuth><DishDetail /></RequireAuth>} />
        <Route path="/dish-edit" element={<RequireAuth><DishEdit /></RequireAuth>} />
        <Route path="/dish-edit/:id" element={<RequireAuth><DishEdit /></RequireAuth>} />
        <Route path="/order/:id" element={<RequireAuth><OrderDetail /></RequireAuth>} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </HashRouter>
  );
}
