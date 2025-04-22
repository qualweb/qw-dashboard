import { Form1, Form3, Form4 } from '../../assets/Icons';
import './Homepage.css';
import LoginButton from '../LoginButton/LoginButton';

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
            <div className='homepage-content'>
                <div className='start-monitoring-container'>
                    <div>
                        <div className='start-monitoring-title'>
                            <h2>Website URL</h2>
                        </div>
                        <div className='start-monitoring-input-button'>
                            <input type='text' placeholder='Enter your website URL' />
                            <button><strong>Start Monitoring</strong></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='forms'>
                <div className='form-1'>
                    { Form1 }
                </div>
                <div className='form-2'>
                    { Form1 }
                </div>
                <div className='form-3'>
                    { Form3 }
                </div>
                <div className='form-5'>
                    { Form4 }
                </div>
                <div className='form-6'>
                    { Form1 }
                </div>
                <div className='form-7'>
                    { Form1 }
                </div>
            </div>
        </div>
    );
}

export default Homepage;