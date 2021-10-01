import { MongoClient } from 'mongodb';

export const connectToDB = async () => {
	const client = await MongoClient.connect(
		'mongodb+srv://hasibullah:nodecomplete@cluster0.4gnac.mongodb.net/nextjs-auth-demo?retryWrites=true&w=majority'
	);

	return client;
};
