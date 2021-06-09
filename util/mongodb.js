/* This is a database connection function*/
import mongoose from 'mongoose';

const connection = {}; /* creating connection object*/

export async function connectToDatabase() {
	/* check if we have connection to our databse*/
	if (connection.isConnected) {
		return;
	}

	/* connecting to our database */
	const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.23vfo.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

	try {
		const db = await mongoose.connect(connectionString, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});

		connection.isConnected = db.connections[0].readyState;

		console.log('connected to database');
	} catch (error) {
		console.log(error);
	}
}

// import { MongoClient } from 'mongodb';

// const { MONGODB_URI, MONGODB_DB } = process.env;

// if (!MONGODB_URI) {
// 	throw new Error(
// 		'Please define the MONGODB_URI environment variable inside .env.local'
// 	);
// }

// if (!MONGODB_DB) {
// 	throw new Error(
// 		'Please define the MONGODB_DB environment variable inside .env.local'
// 	);
// }

// /**
//  * Global is used here to maintain a cached connection across hot reloads
//  * in development. This prevents connections growing exponentially
//  * during API Route usage.
//  */
// let cached = global.mongo;

// if (!cached) {
// 	cached = global.mongo = { conn: null, promise: null };
// }

// export async function connectToDatabase() {
// 	if (cached.conn) {
// 		return cached.conn;
// 	}

// 	if (!cached.promise) {
// 		const opts = {
// 			useNewUrlParser: true,
// 			useUnifiedTopology: true,
// 		};

// 		cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
// 			return {
// 				client,
// 				db: client.db(MONGODB_DB),
// 			};
// 		});
// 	}
// 	cached.conn = await cached.promise;
// 	return cached.conn;
// }
