import { getSession } from 'next-auth/client';

async function handler(req, res) {
	const { method } = req;

	switch (method) {
		case 'PATCH':
			const session = getSession({ req: req });

			if (!session) {
				res.status(401).json({ message: 'Not authenticated' });
				return;
			}

			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}

export default handler;
