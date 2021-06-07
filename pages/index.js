import Head from 'next/head';
import AuthForm from '../components/auth/AuthForm';
import { connectToDatabase } from '../util/mongodb';

export default function Home({ isConnected }) {
	return (
		<div className='container'>
			<Head>
				<title>Sign Up</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<AuthForm />
			</main>
		</div>
	);
}

export async function getServerSideProps(context) {
	await connectToDatabase();

	// const isConnected = await client.isConnected();

	const isConnected = true;

	return {
		props: { isConnected },
	};
}
