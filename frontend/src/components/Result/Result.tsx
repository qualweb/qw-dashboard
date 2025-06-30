import './Result.css';
import { ResultElement } from '../Types/Types.ts';
import Element from '../Element/Element.tsx';
import { CheckIcon, FailIcon, InapplicableIcon, Warning2Icon } from '../../assets/Icons.tsx';
import { FixedSizeList } from 'react-window';


interface ResultProps {
  id: string;
  description: string;
  evaluation_id: string;
  webpage_url: string;
  webpage_screenshot: string;
  verdict: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  elements: any[];
}

const categoryConfig = {
  passed: { icon: CheckIcon, className: "status-icon-success" },
  warnings: { icon: Warning2Icon, className: "status-icon-warning" },
  failed: { icon: FailIcon, className: "status-icon-failed" },
  inapplicable: { icon: InapplicableIcon, className: "status-icon-inapplicable" }
};

function Result(props: ResultProps) {
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

      <FixedSizeList
        height={300}
        width="95%"
        itemCount={props.elements.length}
        itemSize={80}
        direction='vertical'

      >
        {({ index, style }) => (
          <Element 
            key={props.elements[index].id} 
            id={String(props.elements[index].id)} 
            html_code={props.elements[index].htmlCode} 
            pointer= {props.elements[index].pointer} 
            evaluation_id={props.evaluation_id}
            webpage_screenshot={props.webpage_screenshot}
            x={props.elements[index].x}
            y={props.elements[index].y}
            width={props.elements[index].width}
            height={props.elements[index].height}
            style={style}
          />
        )}
      </FixedSizeList>
    </div>
  );
};

export default Result;
