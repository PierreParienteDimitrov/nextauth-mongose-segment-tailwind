import { Provider } from 'next-auth/client';
import Auth from '../components/auth/auth';
import Layout from '../components/layout/layout';

function MyApp({ Component, pageProps }) {
	return (
		<Provider session={pageProps.session}>
			<Layout>
				{Component.auth ? (
					<Auth>
						<Component {...pageProps} />
					</Auth>
				) : (
					<Component {...pageProps} />
				)}
			</Layout>
		</Provider>
	);
}

export default MyApp;
