import './Result.css';
import { ResultElement } from '../Types/Types.ts';
import { useEffect, useState } from 'react';
import { getResultElement } from '../../services/EvaluationService.tsx';
import Element from '../Element/Element.tsx';


interface ResultProps {
  id: string;
  description: string;
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
        <h3>{props.description}</h3> <span>{props.id ? `(${props.id})` : ''}</span>
      </div>
      {element && 
        <Element 
          key={element.id} 
          id={String(element.id)} 
          html_code={element.htmlCode} 
          pointer= {element.pointer} 
        />
      }
    </div>
  );
};

export default Result;
