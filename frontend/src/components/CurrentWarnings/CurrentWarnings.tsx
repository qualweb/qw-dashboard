import { useParams } from "react-router-dom";
import "./CurrentWarnings.css"
import DashboardMenu from "../DashboardMenu/DashboardMenu";
import WarningsListWidget from "../WarningsListWidget/WarningsListWidget";
import WebsiteIdentifier from "../WebsiteIdentifier/WebsiteIdentifier";


function CurrentWarnings() {
    const { monitoring_id } = useParams();

    return (
        <div className="current-warnings">
            {monitoring_id ? (
                <>
                    <DashboardMenu monitoring_id={monitoring_id} />
                    <div className="wrapper-warnings-list">
                        <WebsiteIdentifier monitoring_id={monitoring_id} />
                        <WarningsListWidget monitoring_id={monitoring_id} />
                    </div>
                </>
            ) : (
                <div className="loading-error">
                    <h1>It was not possible to load content</h1>
                </div>
            )}
        </div>
    );
}

export default CurrentWarnings;