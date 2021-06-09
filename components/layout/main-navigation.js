import Link from 'next/link';
import { useSession, signOut } from 'next-auth/client';

function MainNavigation() {
	const [session, loading] = useSession();

	// console.log(loading);
	// console.log(session);

	function logoutHandler() {
		signOut();
	}

	return (
		<header className=''>
			<Link href='/'>
				<a>
					<div className=''>Next Auth</div>
				</a>
			</Link>
			<nav>
				<ul>
					{!session && !loading && (
						<li>
							<Link href='/auth'>Login</Link>
						</li>
					)}

					{session && (
						<li>
							<Link href='/profile'>Profile</Link>
						</li>
					)}

					{session && (
						<li>
							<button onClick={logoutHandler}>Logout</button>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
}

export default MainNavigation;
