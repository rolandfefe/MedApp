import { connect, connection, ConnectionStates } from "mongoose";

export const connectDb = async () => {
	try {
		const state = connection.readyState;

		if (state === ConnectionStates.connected) return;
		else if (state === ConnectionStates.connecting) {
			console.log(`📡Db Connecting...`);
		} else if (state === ConnectionStates.disconnected) {
			const db = await connect(process.env.MONGO_URI!);
			console.log(`Db connected : ${db.connection.name}🛢️`);
		}

	} catch (error: any) {
    console.error("Db not Connected ⚠️:", error);
		process.exit(1);
	}
};
