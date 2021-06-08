import { connectToDatabase } from '../util/mongodb';
import AuthForm from '../components/auth/AuthForm';

const signUp = ({ isConnected }) => {
	return (
		<div>
			<AuthForm />
		</div>
	);
};

export async function getServerSideProps(context) {
	await connectToDatabase();

	// const isConnected = await client.isConnected();

	const isConnected = true;

	return {
		props: { isConnected },
	};
}

export default signUp;
