import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/client';

function ProfilePage() {
	return (
		<div>
			<h1>This will be the user profile</h1>
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
