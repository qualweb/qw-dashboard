import './WebsiteCard.css'

function WebsiteCard() {
    return (
        <li className='website-card'>
            <div className='website-card-above'>
                <div className='website-info'>
                    <img src="/src/assets/fcul_favicon.ico" alt="" />
                    <div className='website-name-url'>
                        <span><strong>FCUL</strong></span>
                        <span className='website-card-url'><strong>ciencias.ulisboa.pt</strong></span>
                    </div>
                </div>
                <div className='website-last-eval-score'>
                    <div className='website-card-last-eval'>
                        <span className='website-card-last-eval-text'><strong>Latest Evaluation</strong></span>
                        <span className='website-card-last-eval-date'><strong>27/08/2025</strong></span>
                    </div>
                    <div className='website-score'>
                        <span><strong>87</strong></span>
                    </div>
                </div>
            </div>
            <div className='website-card-under'>
                <ul className='website-stats'>
                    <li>
                        <span><strong>Passed</strong></span>
                        <span><strong>124</strong></span>
                    </li>
                    <li>
                        <span><strong>Warnings</strong></span>
                        <span><strong>18</strong></span>
                    </li>
                    <li>
                        <span><strong>Failed</strong></span>
                        <span><strong>5</strong></span>
                    </li>
                    <li>
                        <span><strong>Inapplicable</strong></span>
                        <span><strong>50</strong></span>
                    </li>
                </ul>
                <div className='website-card-webpages'>
                    <span><strong>Webpages</strong></span>
                    <span><strong>10</strong></span>
                </div>
            </div>
        </li>
    );
}

export default WebsiteCard;