import { Eye, MapPin } from 'lucide-react';
import './ResultItem.css';
import { Result } from '../Types/Types.tsx';

interface ResultItemProps {
  result : Result;
}

const ResultItem: React.FC<ResultItemProps> = ({ result }) => {
  return (
    <div className="result-item">
      <div className='result-desc'>
        <h3>{result.description}</h3>
      </div>
      <div className='result-content'>
        <div className='code-snippet'>
          {result.code}
        </div>
        <div className='location-visualize-wrapper'>
          <div className='location'>
            <MapPin />
          </div>
          <div className='visualize'>
            <Eye />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultItem;