import mongoose from 'mongoose';
import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../../util/mongodb';
import { hashPassword, verifyPassword } from '../../../util/hash';
import User from '../../../models/users';

async function handler(req, res) {
	const { method } = req;

	// console.log(method);

	switch (method) {
		case 'PATCH':
			const session = await getSession({ req: req });

			// console.log(session);

			if (!session) {
				res.status(401).json({ message: 'Not authenticated' });
				return;
			}

			const userEmail = session.user.email;
			const oldPassword = req.body.oldPassword;
			const newPassword = req.body.newPassword;

			await connectToDatabase();

			const user = await User.findOne({ email: userEmail });

			if (!user) {
				res.status(404).json({ message: 'User not found' });
				mongoose.connection.close();
				return;
			}

			// console.log(user);

			const currentPassword = user.password;

			const passwordsAreEquals = await verifyPassword(
				oldPassword,
				currentPassword
			);

			if (!passwordsAreEquals) {
				res.status(403).json({ message: 'Invalid password' });
				mongoose.connection.close();
				return;
			}

			const hashedPassword = await hashPassword(newPassword);

			const result = await User.updateOne(
				{ email: userEmail },
				{
					password: hashedPassword,
				},
				(err, docs) => {
					if (err) {
						console.log(err);
					} else {
						console.log('Update Record: ', docs);
					}
				}
			);

			mongoose.connection.close();

			res.status(200).json({ message: 'password updated' });

			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}

export default handler;
