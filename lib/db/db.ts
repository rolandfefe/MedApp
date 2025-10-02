import { connect, connection, ConnectionStates } from "mongoose";

export const connectDb = async () => {
	const URI =
		process.env.MY_ENV === "dev"
			? process.env.MONGO_URI_LOCAL
			: process.env.MONGO_URI;

	try {
		const state = connection.readyState;

		if (state === ConnectionStates.connected) return;
		else if (state === ConnectionStates.connecting) {
			console.log(`📡Db Connecting...`);
		} else if (state === ConnectionStates.disconnected) {
			const db = await connect(URI!);
			console.log(`Db connected : ${db.connection.name}🛢️`);
		}
	} catch (error: any) {
		console.error("Db not Connected ⚠️:", error);
		process.exit(1);
	}
};
