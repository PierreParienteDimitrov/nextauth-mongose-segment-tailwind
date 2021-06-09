import { getSession } from 'next-auth/client';
import ProfileForm from '../components/profile/ProfileForm';

function ProfilePage() {
	return (
		<div>
			<h1>This is the user profile page</h1>
			<ProfileForm />
		</div>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });

	if (!session) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		};
	}

	return {
		props: { session },
	};
}

export default ProfilePage;
