import './Result.css';
import { ResultElement } from '../Types/Types.ts';
import { useEffect, useState } from 'react';
import { getResultElement } from '../../services/EvaluationService.tsx';
import Element from '../Element/Element.tsx';


interface ResultProps {
  id: string;
  description: string;
  evaluation_id: string;
  webpage_url: string;
}

function Result(props: ResultProps) {
  const [element, setElement] = useState<ResultElement>();

  useEffect(() => {
    const fetchElement = async () => {
      const data = await getResultElement(props.id);
      console.log("Fetched element data:", data);
      setElement(data.element);
    };

    fetchElement();
  }, [props.id]);

  return (
    <div className="result-item">
      <div className='result-desc'>
        <h3>{props.description}</h3> <span>{props.webpage_url ? `(${props.webpage_url})` : ''}</span>
      </div>
      {element && 
        <Element 
          key={element.id} 
          id={String(element.id)} 
          html_code={element.htmlCode} 
          pointer= {element.pointer} 
          evaluation_id={props.evaluation_id}
        />
      }
    </div>
  );
};

export default Result;
