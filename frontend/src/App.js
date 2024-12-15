import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';

function App() {
  return (
  <BrowserRouter>
    <Routes >
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginRegister />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
