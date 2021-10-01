import { hashPassword } from '../../../utils/auth';
import { connectToDB } from '../../../utils/db';

const handler = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !email.includes('@') || !password || password.trim().length < 7) {
		res.status(422).json({ message: 'Invalid Email or Password!' });
		return;
	}

	const client = await connectToDB();
	const db = client.db();

	const user = await db.collection('users').findOne({ email });
	if (user) {
		res.status(422).json({ message: 'User already exists!' });
		return;
	}
	const hashedPassword = await hashPassword(password);
	const result = await db.collection('users').insertOne({ email, password: hashedPassword });

	res.status(201).json({ message: 'User Created Successfully!' });
};

export default handler;
