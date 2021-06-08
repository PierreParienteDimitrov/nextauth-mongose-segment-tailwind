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
				<h1>This is the homepage</h1>
			</main>
		</div>
	);
}
