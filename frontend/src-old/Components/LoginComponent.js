import React from 'react'
import InputComponent from './InputComponent';
import OutlinedButtonComponent from './OutlinedButtonComponent';

function LoginComponent(props) {
    return (
		<div>
			<div className="tab-content">
				<InputComponent
					label="Email address"
					placeholder="Email-id"
					type="email"
					value={props.loginEmail}
					onChange={props.onLoginEmailChange}
				/>
				<InputComponent
					label="Password"
					placeholder="Password"
					type="password"
					value={props.loginPwd}
					onChange={props.onLoginPwdChange}
				/>
				<OutlinedButtonComponent
					className=" "
					innerHTML="Login to continue the Journey ▶"
					onClick={props.userLogin}
				/>
				{/* TODO ADD FORGOT PASSWORD */}
				<div className="tab-content-bottom">
					<button className="underlined-btn" onClick={props.toggleTab}>
						New Traveler? This way in..
					</button>
				</div>
			</div>
		</div>
	);
}

export default LoginComponent
