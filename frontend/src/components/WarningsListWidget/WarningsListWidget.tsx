import { useEffect, useState } from "react";
import "./WarningsListWidget.css"
import { useMonitoringApi } from "../../services/EvaluationService";
import CategoryWebsite from "../CatergoryWebsite/CategoryWebsite";

interface CurrentWarningsWidgetProps {
    monitoring_id: string;
}

function CurrentWarningsWidget(props: CurrentWarningsWidgetProps) {
    const { getLatestEvaluations } = useMonitoringApi();

    const [latestEvalIds, setLatestEvalIds] = useState<string[]>([]);

    useEffect(() => {
        const fetchLatestEvals = async () => {
            const latest_evals = await getLatestEvaluations(props.monitoring_id);

            const ids : string[] = []

            for (let i = 0; i < latest_evals.length; i++) {
                ids[i] = latest_evals[i].id;
            }
            setLatestEvalIds(ids);
        }

        fetchLatestEvals();
    }, [props.monitoring_id]);
    
    
    return (
        <div className="current-warnings-widget">
            <div className="current-warnings-header">
                <h1>Current Warnings</h1>
            </div>
            <div className="current-warnings-list">
            {latestEvalIds ? (
                <>
                    <CategoryWebsite 
                        key={"warnings"}
                        evaluation_ids={latestEvalIds} 
                        outcome={"warning"} 
                        wcagLevelFilters={[]}
                        wcagGuidelinesFilters={[]} 
                    />
                </>
            ) : null}
            </div>
        </div>
    );
}

export default CurrentWarningsWidget;