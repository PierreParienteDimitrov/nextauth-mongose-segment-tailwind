import AuthForm from '../components/auth/AuthForm';
import { getSession } from 'next-auth/client';

const signUp = ({ session }) => {
	// console.log(session);
	return (
		<div>
			<AuthForm />
		</div>
	);
};

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });

	if (session) {
		return {
			redirect: {
				destination: '/profile',
				permanent: false,
			},
		};
	}

	return {
		props: { session },
	};
}

export default signUp;
