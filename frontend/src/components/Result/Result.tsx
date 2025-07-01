import React, { useMemo, useCallback } from 'react';
import './Result.css';
import Element from '../Element/Element.tsx';
import { CheckIcon, FailIcon, InapplicableIcon, Warning2Icon } from '../../assets/Icons.tsx';
import { FixedSizeList } from 'react-window';

interface ResultProps {
  id: string;
  description: string;
  webpage_url: string;
  webpage_screenshot: string;
  verdict: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  elements: any[];
  visible: boolean;
}

const categoryConfig = {
  passed: { icon: CheckIcon, className: "status-icon-success" },
  warnings: { icon: Warning2Icon, className: "status-icon-warning" },
  failed: { icon: FailIcon, className: "status-icon-failed" },
  inapplicable: { icon: InapplicableIcon, className: "status-icon-inapplicable" }
};

const Result = React.memo((props: ResultProps) => {
  // Memoize the icon and className calculation
  const { icon, className } = useMemo(() => {
    if (props.verdict === "warning") {
      return categoryConfig.warnings;
    } else if (props.verdict === "failed") {
      return categoryConfig.failed;
    } else if (props.verdict === "inapplicable") {
      return categoryConfig.inapplicable;
    }
    return categoryConfig.passed;
  }, [props.verdict]);

  // Memoize the row renderer to prevent recreation on every render
  const ElementRow = useCallback(({ index, style }) => (
    <Element 
      key={props.elements[index]?.id} 
      id={String(props.elements[index]?.id)} 
      html_code={props.elements[index]?.htmlCode} 
      pointer={props.elements[index]?.pointer} 
      webpage_screenshot={props.webpage_screenshot}
      x={props.elements[index]?.x}
      y={props.elements[index]?.y}
      width={props.elements[index]?.width}
      height={props.elements[index]?.height}
      style={style}
    />
  ), [props.elements, props.webpage_screenshot]);

  // Memoize the item count to prevent unnecessary recalculations
  const itemCount = useMemo(() => {
    return props.visible ? props.elements.length : 0;
  }, [props.visible, props.elements.length]);

  // Memoize the list style
  const listStyle = useMemo(() => ({
    overflow: props.visible ? 'auto' : 'hidden'
  }), [props.visible]);

  return (
    <div className="result-item" style={{
      visibility: props.visible ? 'visible' : 'hidden'
    }}>
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
        height={props.visible ? 300 : 0}
        width="95%"
        itemCount={itemCount}
        itemSize={80}
        direction='vertical'
        style={listStyle}
        overscanCount={1} // Reduce overscan for better performance
      >
        {ElementRow}
      </FixedSizeList>
    </div>
  );
});

// Add display name for debugging
Result.displayName = 'Result';

export default Result;