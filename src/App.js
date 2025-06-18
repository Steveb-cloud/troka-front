import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './page/Login';
import Home from './page/Home';
import Perfil from './page/Perfil';
import ProtectedRoute from './components/ProtectedRoute';
import ChatsMensajes from './page/ChatsMensajes';
import Registro from './page/Registro';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={<Login />} />

                <Route path="/registro" element={<Registro />} /> 

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

                <Route
                    path="/perfil/:id"
                    element={
                    <ProtectedRoute>
                     <Perfil />
                    </ProtectedRoute>
                    }
                />


                <Route
                    path="/chat/:id_amigo"
                    element={
                        <ProtectedRoute>
                            <ChatsMensajes/>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;

