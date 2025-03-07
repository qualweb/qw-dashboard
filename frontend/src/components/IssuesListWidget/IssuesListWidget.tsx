import './IssuesListWidget.css';
import { ChevronDown, Globe, Filter } from 'lucide-react';

function IssuesListWidget() {
    return (
        <div className='issues-container'>
            <div className="header">
                <div className='pills'>
                    <div className="title-pill"><h2>Current Accessibility Issues</h2></div>
                    <div className='filter-pills'>
                        <div className="dropdown-pill">
                            <span><strong>By webpage</strong></span>
                            <ChevronDown size={20} />
                        </div>
                        
                        <div className="stats-pill">
                            <div className="stat success">
                                <span><strong>53</strong></span>
                                <div className="icon-success">✓</div>
                            </div>
                            <div className="stat warning">
                                <span><strong>2</strong></span>
                                <div className="icon-warning">!</div>
                            </div>
                            <div className="stat error">
                                <span><strong>4</strong></span>
                                <div className="icon-error">✕</div>
                            </div>
                        </div>
                        
                        <div className="filters-pill">
                            <Filter size={18} />
                            <strong><span>Filters</span></strong>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="issues-list">
                {[1, 2, 3, 4].map((item) => (
                <div className="issue-item" key={item}>
                    <div className="issue-left">
                        <div className="globe-icon">
                            <Globe size={24} />
                        </div>
                        <strong><h3 className="issue-url">www.ciencias.ulisboa.pt</h3></strong>
                    </div>
                    <div className="issue-right">
                        <strong><span>More info</span></strong>
                        <ChevronDown size={20} />
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}

export default IssuesListWidget;