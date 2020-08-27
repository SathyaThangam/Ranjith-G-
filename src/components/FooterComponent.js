import React , {Component} from 'react';
import '../css/FooterComponent.css';

class FooterComponent extends Component{
        render(){
            return(
                <div className="footer">
                    <div className="footer-content">
                    <span>Made with <span role="img" aria-label="heart">💖</span> by Ranjith G</span>
                    </div>
                </div>
            )
        }
}

export default FooterComponent;
