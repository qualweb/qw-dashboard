import IssueLocation from '../IssueLocation/IssueLocation';
import Visualize from '../Visualize/Visualize';
import './Element.css'

interface ElementProps {
    id : string;
    html_code : string;
    pointer : string;
    evaluation_id : string;
    webpage_screenshot : string;
    x : number;
    y : number;
    width : number;
    height : number;
    style : React.CSSProperties;
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
                webpage_screenshot={props.webpage_screenshot} 
                issueX={props.x} 
                issueY={props.y} 
                issueWidth={props.width} 
                issueHeight={props.height}
              />
            </div>
          </div> 
        </div>
    );
}

export default Element;