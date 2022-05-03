import './App.scss';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Layout from './Layout';
import AuthContext from './context/AuthProvider';
import Home from './pages/Home';
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/protected' element={<RequireAuth><ProtectedPage /></RequireAuth>} />
        </Route>
      </Routes>
      </Router>
    </>  
  );
}
function ProtectedPage() {
  return <h2>ProtectedPage</h2>
}

function RequireAuth({children}) {
  let auth = useContext(AuthContext);
  let location = useLocation();
  console.log(auth.auth)
  if(!auth.auth.accessToken) {
    return <Navigate to="/login" state={{from: location}} replace />
  }
  return children;
}

export default App;
