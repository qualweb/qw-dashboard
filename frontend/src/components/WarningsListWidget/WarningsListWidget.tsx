import { useEffect, useState } from "react";
import "./WarningsListWidget.css"
import { getCurrentWarnings } from "../../services/EvaluationService";
import { Warning2Icon } from "../../assets/Icons";
import TestItem from "../TestItem/TestItem";
import { AssertionResponse } from "../Types/Types";

interface CurrentWarningsWidgetProps {
    monitoring_id: string;
}

function CurrentWarningsWidget(props: CurrentWarningsWidgetProps) {
    const [warnings, setWarnings] = useState<AssertionResponse[]>([]);
    

    useEffect(() => {
        const fetchCurrentWarnings = async () => {
            const response = await getCurrentWarnings(props.monitoring_id);
            setWarnings(response);
        }

        fetchCurrentWarnings();
    }, [props.monitoring_id]);
    
    
    return (
        <div className="current-warnings-widget">
            <div className="current-warnings-header">
                <h1>Current Warnings</h1>
                <div className="current-warnings-counter">
                    <span><strong>{warnings.length}</strong></span>
                    { Warning2Icon }
                </div>
            </div>
            <div className="current-warnings-list">
                {warnings.map((test) => (
                    <TestItem 
                        key={test.id}
                        test={test}
                        className={"stat-warning"}
                        icon={Warning2Icon}
                    />
                ))}
            </div>
        </div>
    );
}

export default CurrentWarningsWidget;