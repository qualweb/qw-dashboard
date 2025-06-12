import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import Dashboard from './components/Dashboard/Dashboard';
import CurrentWarnings from './components/CurrentWarnings/CurrentWarnings';
import WebsitesOverview from './components/WebsitesOverview/WebsitesOverview';
import Evaluate from './components/Evaluate/Evaluate';
import SelectEvaluations from './components/SelectEvaluations/SelectEvaluations';
import CompareEvaluations from './components/CompareEvaluations/CompareEvaluations';
import Schedule from './components/Schedule/Schedule';
import WebsiteMetadata from './components/WebsiteMetadata/WebsiteMetadata';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/websites-overview' element={<WebsitesOverview />} />
          <Route path="/dashboard/:monitoring_id" element={<Dashboard />} />
          <Route path='/dashboard/:monitoring_id/current-warnings' element={<CurrentWarnings />} />
          <Route path='/dashboard/:monitoring_id/select-evaluations' element={<SelectEvaluations />} />
          <Route path='/dashboard/:monitoring_id/compare-evaluations/:first_cycle/:second_cycle' element={<CompareEvaluations  />} />
          <Route path='/dashboard/:monitoring_id/evaluate' element={<Evaluate />} />
          <Route path='/dashboard/:monitoring_id/scheduler' element={<Schedule />} />
          <Route path='/dashboard/:monitoring_id/website-metadata' element={<WebsiteMetadata />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
