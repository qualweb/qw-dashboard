import './ScoreWidget.css';

import { Progress } from '@ark-ui/react/progress'

function ScoreWidget() {
    return (
        <div className='score'>
            <Progress.Root defaultValue={42}>
                <Progress.Label>Label</Progress.Label>
                <Progress.ValueText />
                <Progress.Circle>
                    <Progress.CircleTrack />
                    <Progress.CircleRange />
                </Progress.Circle>
            </Progress.Root>
        </div>
    );
}

export default ScoreWidget;