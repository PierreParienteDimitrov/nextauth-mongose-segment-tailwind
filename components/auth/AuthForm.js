import { useState, useRef } from 'react';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

// Create User /api/auth/signup
async function createUser(email, password) {
	const response = await fetch('/api/users/user', {
		method: 'POST',
		body: JSON.stringify({ email, password }),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || 'Something went wrong!');
	}

	return data;
}

// Sign up form
export default function AuthForm() {
	// User email and password inputs
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	// Switch to show either login or signup
	const [isLogin, setIsLogin] = useState(true);

	// Router
	const router = useRouter();

	function switchAuthModeHandler() {
		setIsLogin((prevState) => !prevState);
	}

	// Submit Function
	async function submitHandler(event) {
		event.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		// console.log(enteredEmail);

		// Add Validation

		if (isLogin) {
			const result = await signIn('credentials', {
				redirect: false,
				email: enteredEmail,
				password: enteredPassword,
			});

			if (!result.error) {
				router.replace('/profile');
			}

			// console.log(result);
		} else {
			try {
				const result = await createUser(enteredEmail, enteredPassword);
				console.log(result);
			} catch (error) {
				console.log(error);
			}
		}
	}

	return (
		<section>
			<h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
			<form onSubmit={submitHandler}>
				{/* Email */}
				<div>
					<label htmlFor='email'>Your Email</label>
					<input type='email' id='email' required ref={emailInputRef} />
				</div>
				{/* Password */}
				<div>
					<label htmlFor='password'>Your Password</label>
					<input type='password' id='password' required ref={passwordInputRef} />
				</div>
				{/* Actions */}
				<button>{isLogin ? 'Login' : 'Create Account'}</button>

				<br />
				<br />
				<br />
				<h1>Or</h1>

				<button type='button' onClick={switchAuthModeHandler}>
					{isLogin ? 'Create new account' : 'Login with existing account'}
				</button>
			</form>
		</section>
	);
}
