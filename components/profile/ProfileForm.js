import { useRef } from 'react';

async function onChangedPassword(passwordData) {
	const response = await fetch('/api/users/change-password', {
		method: 'PATCH',
		body: JSON.stringify(passwordData),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const data = await response.json();

	console.log(data);
}

const ProfileForm = () => {
	const oldPasswordRef = useRef();
	const newPasswordRef = useRef();

	function submitHandler(e) {
		e.preventDefault();

		const enteredOldPassword = oldPasswordRef.current.value;
		const enteredNewPassword = newPasswordRef.current.value;

		console.log(enteredOldPassword);
		console.log(enteredNewPassword);

		// optional: validation

		onChangedPassword({
			oldPassword: enteredOldPassword,
			newPassword: enteredNewPassword,
		});
	}

	return (
		<form className='' onSubmit={submitHandler}>
			<div className=''>
				<label htmlFor='new-password'>New Password</label>
				<input type='password' id='new-password' ref={newPasswordRef} />
			</div>
			<div className=''>
				<label htmlFor='old-password'>Old Password</label>
				<input type='password' id='old-password' ref={oldPasswordRef} />
			</div>
			<div className=''>
				<button>Change Password</button>
			</div>
		</form>
	);
};

export default ProfileForm;
