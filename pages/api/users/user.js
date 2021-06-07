import { connectToDatabase } from '../../../util/mongodb';
import { hashPassword } from '../../../util/hash';
import User from '../../../models/users';

export default async function handler(req, res) {
	const { method } = req;
	await connectToDatabase();

	switch (method) {
		case 'POST':
			try {
				// Getting user's data
				const data = req.body;
				// console.log(data);
				const { email, password } = data;

				// Adding validation on the server
				if (
					!email ||
					!email.includes('@') ||
					!password ||
					password.trim().length < 7
				) {
					res.status(422).json({
						message: 'Invalid input - password should be at least 7 char long.',
					});
					return;
				}

				const hashedPassword = await hashPassword(password);

				const user = await User.create({
					email: email,
					password: hashedPassword,
				}); /* create a new model in the database */

				res
					.status(201)
					.json({ success: true, data: user, message: 'Created user' });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
