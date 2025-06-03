import './Result.css';
import { ResultElement } from '../Types/Types.ts';
import { useEffect, useState } from 'react';
import { getResultElement } from '../../services/EvaluationService.tsx';
import Element from '../Element/Element.tsx';
import { CheckIcon, FailIcon, InapplicableIcon, Warning2Icon } from '../../assets/Icons.tsx';


interface ResultProps {
  id: string;
  description: string;
  evaluation_id: string;
  webpage_url: string;
  webpage_screenshot: string;
  verdict: string;
}

const categoryConfig = {
  passed: { icon: CheckIcon, className: "status-icon-success" },
  warnings: { icon: Warning2Icon, className: "status-icon-warning" },
  failed: { icon: FailIcon, className: "status-icon-failed" },
  inapplicable: { icon: InapplicableIcon, className: "status-icon-inapplicable" }
};

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

  let { icon, className } = categoryConfig.passed;

  if (props.verdict === "warning") {
    icon = categoryConfig.warnings.icon;
    className = categoryConfig.warnings.className;
  }
  else if (props.verdict === "failed") {
    icon = categoryConfig.failed.icon;
    className = categoryConfig.failed.className;
  }
  else if (props.verdict === "inapplicable") {
    icon = categoryConfig.inapplicable.icon;
    className = categoryConfig.inapplicable.className;
  }

  return (
    <div className="result-item">
      <div className='result-desc'>
        <div className="result-header">
          <div className={className}>
            {icon}
          </div>
          <h3>{props.description}</h3> 
        </div>
        <span className="result-url">{props.webpage_url ? `(${props.webpage_url})` : ''}</span>
      </div>
      {element && 
        <Element 
          key={element.id} 
          id={String(element.id)} 
          html_code={element.htmlCode} 
          pointer= {element.pointer} 
          evaluation_id={props.evaluation_id}
          webpage_screenshot={props.webpage_screenshot}
          x={element.x}
          y={element.y}
          width={element.width}
          height={element.height}
        />
      }
    </div>
  );
};

export default Result;
