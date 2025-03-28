import { useEffect, useState } from 'react';
import './ScoreWidget.css';

import { Progress } from '@ark-ui/react/progress'
import { getAccessibilityScore } from '../../services/EvaluationService';

interface ScoreWidgetProps {
    monitoring_id: string;
}

function ScoreWidget(props: ScoreWidgetProps) {
    const [value, setValue] = useState(0);
    const [accessibilityScore, setAccessibilityScore] = useState(0.0);

    useEffect(() => {
        const fetchAccessibilityScore = async () => {
            const score = await getAccessibilityScore(props.monitoring_id);
            setAccessibilityScore(score * 100);
        }

        fetchAccessibilityScore();
    }, [props.monitoring_id]);

    useEffect(() => {
        const timeout = setTimeout(() => {
        const animationDuration = 1500;
        const interval = 20;
        const steps = animationDuration / interval;
        const increment = accessibilityScore / steps;
        let currentValue = 0;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= accessibilityScore) {
            setValue(accessibilityScore);
            clearInterval(timer);
            } else {
            setValue(currentValue);
            }
        }, interval);
        
        return () => clearInterval(timer);
        }, 300);
        
        return () => clearTimeout(timeout);
    }, [accessibilityScore]);

    return (
        <div className="score-container">
            <h2 className="score-title"><strong>Overall Accessibility Score</strong></h2>
            <Progress.Root 
                value={value}
                min={0} 
                max={100} 
                className="score-progress"
            >
                <div className="score-value-container">
                    <strong><Progress.ValueText className="score-value" /></strong>
                </div>
                <Progress.Circle className="score-circle">
                    <Progress.CircleTrack className="score-track" />
                    <Progress.CircleRange className="score-range" />
                </Progress.Circle>
            </Progress.Root>
        </div>
    );
}

export default ScoreWidget;