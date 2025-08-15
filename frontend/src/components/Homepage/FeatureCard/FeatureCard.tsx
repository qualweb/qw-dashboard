import { ReactNode } from "react";
import './FeatureCard.css'

interface FeatureCardProps {
    icon : ReactNode,
    title : String,
    description : String
}

function FeatureCard(props : FeatureCardProps) {
    return (
        <li className="feature-card">
            <div className="feature-icon-wrapper">
                {props.icon}
            </div>
            <div className="feature-title-desc">
                <h3>{props.title}</h3>
                <span>{props.description}</span>
            </div>
        </li>
    );
}

export default FeatureCard;