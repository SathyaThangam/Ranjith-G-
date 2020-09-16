import React from 'react'
import {Link} from 'react-router-dom';

import '/404Error.svg';
import "../css/Errorpage.scss"

function Errorpage() {
    return (
		<div className="error-img-container">
			<img src="404Error.svg" alt="404 not found" />
			<h1>Can't seem to find the page...</h1>
			<h1>
				<Link to="/">Home</Link>
			</h1>
		</div>
	);
}

export default Errorpage
