import React,{useState} from "react";

import "../css/AuthenticateModalComponent.scss";
import "./loginscene.svg";
import SignupComponent from "./SignupComponent";
import LoginComponent from "./LoginComponent";

function AuthenticateModalComponent(props){
	
	const [loginModal, setLoginModal] = useState(true)

	//Toggle between Login and Signup Component
	const toggleTab = () => setLoginModal(prev => !prev);

	return (
		<div className="modal-container">
			<div className="modal-content">
				<div className="modal-content-left">
					<img src="loginscene.svg" alt="login scene" />
				</div>
				<div className="modal-content-right">
					<div className="tab-title-container">
						<div className="tab-title">
							<button onClick={toggleTab}>Login/Signup</button>
						</div>
					</div>
					<div className="tab-container">
						{loginModal ? (
							<LoginComponent
								location={props.location}
								history={props.history}
								handleModalClose={props.handleModalClose}
								toggleTab={toggleTab}
							/>
						) : (
							<SignupComponent
								location={props.location}
								history={props.history}
								handleModalClose={props.handleModalClose}
								toggleTab={toggleTab}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default AuthenticateModalComponent;
