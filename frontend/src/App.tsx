import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path="/dashboard/:monitoring_id" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
