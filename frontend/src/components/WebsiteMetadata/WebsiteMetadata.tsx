import { useParams } from 'react-router-dom';
import './WebsiteMetadata.css'
import DashboardMenu from '../DashboardMenu/DashboardMenu';
import WebsiteIdentifier from '../WebsiteIdentifier/WebsiteIdentifier';
import { useEffect, useState } from 'react';
import { useMonitoringApi } from '../../services/EvaluationService';

function WebsiteMetadata() {
    const { getMonitoredWebpages } = useMonitoringApi();

    const { monitoring_id } = useParams();

    const [ webpages, setWebpages ] = useState([]);

    useEffect(() => {
        const getWebpages = async () => {
            const response = await getMonitoredWebpages(String(monitoring_id));
            setWebpages(response);
        };

        getWebpages();
    }, [monitoring_id]);

    const formatSize = (sizeKB : number) => {
        if (sizeKB >= 1024) {
          return `${(sizeKB / 1024).toFixed(1)} MB`;
        }
        return `${sizeKB.toFixed(1)} KB`;
      };
    
    const totalElements = webpages.reduce((sum, webpage) => sum + webpage['num_elements'], 0);
    const totalSizeKB = webpages.reduce((sum, webpage) => sum + webpage['sizeKB'], 0);

    return (
        <div className="website-metadata-container">
            <DashboardMenu monitoring_id={String(monitoring_id)} />
            { monitoring_id ? (
                <div className="metadata-wrapper">
                    <WebsiteIdentifier monitoring_id={String(monitoring_id)} />
                    <div className="metadata-content">
                        <h2>Website Metadata</h2>
                        <table 
                            role="table"
                            aria-label="Webpage analysis data"
                            className="metadata-table"
                        >
                            <thead>
                                <tr>
                                    <th scope="col">URL</th>
                                    <th scope="col">Elements</th>
                                    <th scope="col">Size</th>
                                </tr>
                            </thead>
                            
                            <tbody className='metadata-table-body'>
                                {webpages.map((webpage) => (
                                    <tr key={webpage['url']} 
                                        className='metadata-table-row'
                                    >
                                        <td>
                                            <a 
                                            href={webpage['url']}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Visit ${webpage['url']} (opens in new tab)`}
                                            >
                                                {webpage['url']}
                                            </a>
                                        </td>
                                        
                                        <td>
                                            <span aria-label={`${webpage['num_elements']} elements`}>
                                                {webpage['num_elements']}
                                            </span>
                                        </td>
                                        
                                        <td>
                                            <span aria-label={`File size: ${formatSize(webpage['sizeKB'])}`}>
                                            {formatSize(webpage['sizeKB'])}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                
                                <tr>
                                    <td><strong>Total</strong></td>
                                    <td>
                                        <strong aria-label={`Total elements: ${totalElements}`}>
                                            {totalElements.toLocaleString()}
                                        </strong>
                                    </td>
                                    <td>
                                        <strong aria-label={`Total size: ${formatSize(totalSizeKB)}`}>
                                            {formatSize(totalSizeKB)}
                                        </strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default WebsiteMetadata;