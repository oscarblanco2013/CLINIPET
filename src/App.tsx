import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Asegúrate de tener instalada esta librería
import { Login } from "./pages/Login";  // Asegúrate de que Login esté en './pages/Login'
import { Register } from "./pages/Register";
import { Admin } from "./pages/admin"; // Asegúrate de que Register esté en './pages/Register'
import { Home } from "./pages/Home";
import { Appointment } from "./pages/appointment_scheduling"; // Asegúrate de que Register esté en './pages/Register'
import { Database_pets } from "./pages/database_pets"; // Asegúrate de que Register esté en './pages/Register'
import { Medical_history } from "./pages/medical_history";
import { Schedule } from "./pages/schedule";
import { User } from "./pages/user"; // Asegúrate de que Register esté en './pages/Register'
import { Forget_password } from "./pages/forget_password"; // Asegúrate de que Register esté en './pages/Register'
import { Update_password } from "./pages/update_password"; // Asegúrate de que Register esté en './pages/Register'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Ruta para Login */}
        <Route path="/login" element={<Login />} /> {/* Ruta para Login */}
        <Route path="/register" element={<Register />} />{" "}
        {/* Ruta para Register */}
        <Route path="/home" element={<Home />} /> {/* Ruta para Home */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/database_pets" element={<Database_pets />} />
        {/* Ruta para Database_pets */}
        <Route path="/medical_history" element={<Medical_history />} />
        {/* Ruta para Medical_history */}
        <Route path="/schedule" element={<Schedule />} />
        {/* Ruta para Schedule */}
        <Route path="/user" element={<User />} />
        {/* Ruta para User */}
        <Route path="/forget_password" element={<Forget_password />} />
        {/* Ruta para Forget_password */}
        <Route path="/update_password" element={<Update_password />} />
        {/* Ruta para Update_password */}
      </Routes>
    </Router>
  );
};

export default App;
