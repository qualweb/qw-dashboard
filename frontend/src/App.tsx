import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebsiteDashboard from './components/WebsiteDashboard/WebsiteDashboard';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/websitedashboard" element={<WebsiteDashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
