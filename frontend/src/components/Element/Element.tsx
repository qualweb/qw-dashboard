import './Element.css'

import {MapPin, Clipboard, Eye } from 'lucide-react';

interface ElementProps {
    id : string;
    html_code : string;
    pointer : string;
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
            <button className='visualize'>
              <Eye />
            </button>
          </div>
        </div>
    );
}

export default Element;