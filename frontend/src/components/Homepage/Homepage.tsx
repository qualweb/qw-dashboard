import './Homepage.css';
import LoginButton from '../LoginButton/LoginButton';
import evaluation from '../../assets/evaluation.svg'

function Homepage() {
    return (
        <div className='homepage-container'>
            <div className='header-wrapper'>
                <div className='homepage-header'>
                    <h1>
                        <span className="qualweb">Qualweb</span>
                        <div>
                            <span className="monitoring">Monitoring</span>
                        </div>
                    </h1>
                    <LoginButton />
                </div>
            </div>
            <main className='homepage-content'>
                <div className="homepage-wrapper">
                    <div className='introduction'>
                        <div className="qwdashboard">
                            <h2>Qualweb</h2>
                            <h3>Web Accessibility Monitoring Dashboard</h3>
                        </div>
                        <p className='qwdashboard-desc'>Monitor your websites for accessibility compliance with automated WCAG Techniques and ACT Rules testing.</p>
                    </div>
                    <div className="evaluation-illustration">
                        <img src={evaluation} alt="Dashboard illustration" />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Homepage;