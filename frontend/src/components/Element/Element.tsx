import Visualize from '../Visualize/Visualize';
import './Element.css'

import {MapPin, Clipboard } from 'lucide-react';

interface ElementProps {
    id : string;
    html_code : string;
    pointer : string;
    evaluation_id : string;
}

function Element(props: ElementProps) {
    return (
        <div className='result-content'>
          <div className='code-snippet'>
            {props.html_code}
          </div>
          <div className='location-visualize-wrapper'>
            <button className='copy'>
              <Clipboard />
            </button>
            <button className='location'>
              <MapPin />
            </button>
            <Visualize evaluation_id={props.evaluation_id} />
          </div>
        </div>
    );
}

export default Element;