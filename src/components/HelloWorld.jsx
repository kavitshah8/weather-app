import React, {Component} from 'react';
import reactSvg from '../assets/images/react.svg';

class HellowWorld extends Component {

    render () {
        return (
            <div className="mw-100pt">
                <div className="w-400 mx-auto">
                    Hello World ##
                </div>
                <img className="w-200 mx-auto" src={reactSvg}></img>
            </div>
        );
    }
}

export default HellowWorld;
