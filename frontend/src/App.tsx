import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import Dashboard from './components/Dashboard/Dashboard';
import CurrentWarnings from './components/CurrentWarnings/CurrentWarnings';
import WebsitesOverview from './components/WebsitesOverview/WebsitesOverview';
import CompareEvaluations from './components/CompareEvaluations/CompareEvaluations';
import Evaluate from './components/Evaluate/Evaluate';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/websites-overview' element={<WebsitesOverview />} />
          <Route path="/dashboard/:monitoring_id" element={<Dashboard />} />
          <Route path='/dashboard/:monitoring_id/current-warnings' element={<CurrentWarnings />} />
          <Route path='/dashboard/:monitoring_id/compare-evaluations' element={<CompareEvaluations  />} />
          <Route path='/dashboard/:monitoring_id/evaluate' element={<Evaluate />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
