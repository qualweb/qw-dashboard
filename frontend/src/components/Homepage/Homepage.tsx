import { Accessibility, Calculator, ChartColumn, ChartSpline, ClockFading, Eye, Gavel, GitCompare, HandCoins, Scale } from 'lucide-react';
import './Homepage.css';
import FeatureCard from './FeatureCard/FeatureCard';
import WhyCard from './WhyCard/WhyCard';
import LoginButton from '../LoginButton/LoginButton';

function Homepage() {
    return (
        <div className='homepage-container'>
            <div className="homepage-header">
                <h1>
                    <span className='title-qualweb'><strong>Qualweb</strong></span>
                    <span className='title-monitoring'><strong>Monitoring</strong></span>
                </h1>
                <LoginButton />
            </div>
            <main>
                <div className="main-message">
                    <div className="icon-wrapper-1">
                        <div className="icon-square growth-icon">
                            <ChartSpline size={"3rem"} />
                        </div>
                    </div>
                    <div className="main-message-text">
                        <h1>
                            Make your website
                            <span className='title-highlight'> accessible with QualWeb Monitoring</span>
                        </h1>
                        <p>Monitor website accessibility compliance with automated ACT Rules, WCAG Techniques, and WAI-ARIA testing.</p>
                    </div>
                    <div className="icon-wrapper-2">
                        <div className="icon-square accessibility-icon">
                            <Accessibility size={"3rem"} />
                        </div>
                    </div>
                </div>
                <div className="key-features">
                    <h2>Key Features</h2>
                    <ul className='key-features-list'>
                        <FeatureCard icon={<ChartColumn />} title={"Accessibility Tracking Over Time"} description={"Improvements and regressions across your website over time"} />
                        <FeatureCard icon={<Scale />} title={"Multi Specification Testing Support"} description={"ACT Rules, WCAG Techniques and WAI-ARIA"} />
                        <FeatureCard icon={<Calculator />} title={"Accessibility Scoring"} description={"Clear scores to measure your website’s compliance"} />
                        <FeatureCard icon={<ClockFading />} title={"Automatic Evaluation Scheduling"} description={"Schedule automated accessibility evaluations to run at regular intervals"} />
                        <FeatureCard icon={<Eye />} title={"Issue Visualization"} description={"View accessibility issues directly on webpage screenshots with visual overlays"} />
                        <FeatureCard icon={<GitCompare />} title={"Evaluation Comparison"} description={"Compare evaluations across different dates with detailed metrics and visual graphs"} />
                    </ul>
                </div>
                <div className="why-stay-compliant">
                    <h2>Why should you stay <span>compliant</span></h2>
                    <ul className='why-card-list'>
                        <WhyCard icon={<Gavel size={"6rem"} />} description={"Digital accessibility compliance is legally mandatory globally under regulations like the European Accessibility Act, US ADA and Section 508, Brazil's Lei Nº 13.146, and Canada's AODA. With penalties from fines to prosecution and standards converging on WCAG 2.1-2.2 Level AA, compliance is both a legal and business necessity for organizations worldwide."} />
                        <WhyCard icon={<HandCoins size={"6rem"} />} description={"Beyond legal compliance, organizations are losing billions in revenue by excluding over 1.3 billion disabled customers globally. The WebAIM Million 2025 report shows 94.8% of top websites fail basic accessibility standards, with disabled users encountering errors on 1 in every 24 elements, effectively locking out this massive market from digital commerce and services."} />
                    </ul>
                </div>
            </main>
            <footer>
                <div className="powered-by">
                    <h4>Powered by</h4>
                    <img src="/src/assets/qualweb_logo.png" alt="QualWeb logo" />
                </div>
            </footer>
        </div>
    );
}

export default Homepage;