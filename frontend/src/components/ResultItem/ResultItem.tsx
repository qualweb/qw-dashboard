import { Eye, MapPin, Clipboard } from 'lucide-react';
import './ResultItem.css';
import { IssueElementResponse } from '../Types/Types.tsx';

interface ResultItemProps {
  result : IssueElementResponse;
  description : string;
}

const ResultItem: React.FC<ResultItemProps> = ({ result, description }) => {
  return (
    <div className="result-item">
      <div className='result-desc'>
        <h3>{description}</h3> <span>{result.id ? `(${result.id})` : ''}</span>
      </div>
      <div className='result-content'>
        <div className='code-snippet'>
          {result.html_code}
        </div>
        <div className='location-visualize-wrapper'>
          <button className='copy'>
            <Clipboard />
          </button>
          <button className='location'>
            <MapPin />
          </button>
          <button className='visualize'>
            <Eye />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultItem;