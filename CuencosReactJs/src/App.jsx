import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Perfil from './pages/user/Perfil';
import MudarEmail from './pages/user/MudarEmail';
import Logado from './pages/Logado';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/user/perfil" element={<Perfil />} />
        <Route path="/user/mudar-email" element={<MudarEmail />} />
        <Route path="/logado" element={<Logado />} />
      </Routes>
    </Router>
  );
}

export default App;
