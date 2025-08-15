import { ReactNode } from "react";
import './WhyCard.css'

interface WhyCardProps {
    icon : ReactNode,
    description : String
}

function WhyCard(props : WhyCardProps) {
    return (
        <div className="why-card">
            {props.icon}
            <div className="why-desc">
                <span>{props.description}</span>
            </div>
        </div>
    );
}

export default WhyCard;