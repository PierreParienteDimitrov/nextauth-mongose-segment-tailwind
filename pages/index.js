import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
	return (
		<div className=''>
			<Head>
				<title>Sign Up</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<ul>
					<li>
						<Link href='/'>
							<a>Home</a>
						</Link>
					</li>
					<li>
						<Link href='/signup'>
							<a>Log In</a>
						</Link>
					</li>
				</ul>
			</main>
		</div>
	);
}
