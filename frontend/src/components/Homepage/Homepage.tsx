import { SetStateAction, useState } from 'react';
import { Form1, Form3, Form4 } from '../../assets/Icons';
import './Homepage.css';
import { runCrawler, runEvaluation } from '../../services/EvaluationService';
import { useNavigate } from 'react-router-dom';

function Homepage() {
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState('');
    const navigate = useNavigate();

    const handleUrlChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setUrl(event.target.value);
    };

    const postData = async (url: string) => {
        setLoading(true);

        try {
            const crawl_response = await runCrawler(url);
            console.log(crawl_response);
    
            const eval_response = await runEvaluation(crawl_response);
            console.log(eval_response);

            navigate(`/dashboard/evaluations/${crawl_response.monitoring_registry_id}`);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

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
                    <div className='login-register'>
                        <button className='register-button'><strong>Register</strong></button>
                        <button className='login-button'><strong>Login</strong></button>
                    </div>
                </div>
            </div>
            <div className='homepage-content'>
                <div className='start-monitoring-container'>
                    {loading ? (
                        <div className='loading'>
                            <div className='loader'></div>
                            <p>Starting monitoring...</p>
                        </div>
                    ) : (
                        <div>
                            <div className='start-monitoring-title'>
                                <h2>Website URL</h2>
                            </div>
                            <div className='start-monitoring-input-button'>
                                <input type='text' placeholder='Enter your website URL' value={url} onChange={handleUrlChange} />
                                <button onClick={() => postData(url)}><strong>Start Monitoring</strong></button>
                            </div>
                        </div>
                    )}
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