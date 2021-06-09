import mongoose from 'mongoose';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { connectToDatabase } from '../../../util/mongodb';
import User from '../../../models/users';
import { verifyPassword } from '../../../util/hash';

export default NextAuth({
	session: {
		jwt: true,
	},
	providers: [
		Providers.Credentials({
			async authorize(credentials) {
				await connectToDatabase();

				// is there a user
				const user = await User.findOne({
					email: credentials.email,
				}).exec();

				console.log(user);

				if (!user) {
					mongoose.connection.close();
					throw new Error('No user found');
				}

				const isValid = await verifyPassword(credentials.password, user.password);

				console.log(isValid);

				if (!isValid) {
					mongoose.connection.close();
					throw new Error('Could not log you in');
				}

				mongoose.connection.close();

				return {
					email: user.email,
				};
			},
		}),
	],
});
