import { useSession } from 'next-auth/client';

const Protected = () => {
	const [session] = useSession();

	console.log(session);
	return (
		<>
			<h1>A Protected Page</h1>
			<span>My name is Pierre</span>
			<span>My email is {session.user.email}</span>
		</>
	);
};
Protected.auth = true;
export default Protected;
