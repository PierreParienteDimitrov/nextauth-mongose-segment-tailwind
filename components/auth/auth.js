import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

export default function Auth({ children }) {
	const router = useRouter();

	const [session, loading] = useSession();

	const hasUser = !!session?.user;

	useEffect(() => {
		if (!loading && !hasUser) {
			router.push('/auth');
		}
	}, [hasUser, loading]);
	if (loading || !hasUser) return <div>Waiting for session...</div>;
	return children;
}
