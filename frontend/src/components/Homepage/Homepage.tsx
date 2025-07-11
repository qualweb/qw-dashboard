import './Homepage.css';
import LoginButton from '../LoginButton/LoginButton';
import evaluation from '../../assets/evaluation.svg'
import logo from '../../assets/qualweb_monitoring_logo.png'

function Homepage() {
    return (
        <div className='homepage-container'>
            <div className='header-wrapper'>
                <div className='homepage-header'>
                    <div className="qwdashboard-logo">
                        <img src={logo} alt="Qualweb Dashboard logo" />
                    </div>
                    <LoginButton />
                </div>
            </div>
            <main className='homepage-content'>
                <div className="homepage-wrapper">
                    <div className='introduction'>
                        <div className="qwdashboard">
                            <h1><span className="title-1">Qualweb</span> <br /><span className='title-2'>Web Accessibility Monitoring Dashboard</span></h1>
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