import Link from 'next/link';

function MainNavigation() {
	return (
		<header className=''>
			<Link href='/'>
				<a>
					<div className=''>Next Auth</div>
				</a>
			</Link>
			<nav>
				<ul>
					<li>
						<Link href='/auth'>Login</Link>
					</li>
					<li>
						<Link href='/profile'>Profile</Link>
					</li>
					<li>
						<button>Logout</button>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default MainNavigation;
