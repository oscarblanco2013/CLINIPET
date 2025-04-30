import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Asegúrate de tener instalada esta librería
import { Login } from "./pages/Login";  // Asegúrate de que Login esté en './pages/Login'
import { Register } from "./pages/Register";  // Asegúrate de que Register esté en './pages/Register'
import { Home } from "./pages/Home";  // Asegúrate de que Home esté en './pages/Home'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />        {/* Ruta para Login */}
        <Route path="/login" element={<Login />} />   {/* Ruta para Login */}
        <Route path="/register" element={<Register />} />  {/* Ruta para Register */}
        <Route path="/home" element={<Home />} />     {/* Ruta para Home */}
      </Routes>
    </Router>
  );
};

export default App;
