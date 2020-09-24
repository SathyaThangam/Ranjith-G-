import React from 'react'
import InputComponent from "./InputComponent";
import OutlinedButtonComponent from "./OutlinedButtonComponent";
function SignupComponent(props) {
    return (
		<div className="tab-content">
			<InputComponent
				label="Email address"
				placeholder="Email-id"
				type="email"
				value={props.signupEmail}
				onChange={props.onSignupEmailChange}
			/>
			<InputComponent
				label="Password"
				placeholder="Password"
				type="password"
				value={props.signupPwd}
				onChange={props.onSignupPwdChange}
			/>
			<InputComponent
				label="Confirm Password"
				placeholder="Confirm Password"
				type="password"
				value={props.signupCPwd}
				onChange={props.onSignupCPwdChange}
			/>
			<OutlinedButtonComponent
				className=" "
				innerHTML="Signup for a new Journey ▶"
				onClick={props.userSignup}
			/>
			<div className="tab-content-bottom">
				<button className="underlined-btn" onClick={props.toggleTab}>
					Know your way? Log in..
				</button>
			</div>
		</div>
	);
}

export default SignupComponent
