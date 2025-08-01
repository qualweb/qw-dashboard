import IssueLocation from '../IssueLocation/IssueLocation';
import Visualize from '../Visualize/Visualize';
import './Element.css'

interface ElementProps {
    id : string;
    html_code : string;
    pointer : string;
    x : number;
    y : number;
    width : number;
    height : number;
    style : React.CSSProperties;
    eval_id : string;
}

function Element(props: ElementProps) {
    return (
        <div style={props.style}>
          <div className='result-content'> 
            <div className='code-snippet'>
              {props.html_code}
            </div>
            <div className='location-visualize-wrapper'>
              <IssueLocation pointer={props.pointer} />
              <Visualize 
                issueX={props.x} 
                issueY={props.y} 
                issueWidth={props.width} 
                issueHeight={props.height}
                eval_id={props.eval_id}
              />
            </div>
          </div> 
        </div>
    );
}

export default Element;