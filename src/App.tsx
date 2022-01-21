import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import IndexPage from './pages/Index/IndexPage';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    <>
      <Header></Header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </>
  );
}

export default App;
