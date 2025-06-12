import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './page/Login';
import Home from './page/Home';
import Perfil from './page/Perfil';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={<Login />} />

                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/perfil"
                    element={
                        <ProtectedRoute>
                            <Perfil />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;

