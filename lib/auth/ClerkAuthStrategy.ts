// import { currentUser } from "@clerk/nextjs/server";
import { AuthStrategy, Payload } from "payload";

export async function getDbUser(payload: Payload): Promise<IUser | null> {
	"use server";
	// const user = await currentUser();
	const user = {};

	if (!user) return null;

	const {
		docs: [dbUser],
	} = await payload.find({
		collection: "users",
		where: {
			clerkId: { equals: user.id },
		},
		limit: 1,
	});

	return dbUser;
}

export const ClerkAuthStrategy: AuthStrategy = {
	name: "clerk-auth-strategy",
	authenticate: async ({ payload }) => {
		const user = await getDbUser(payload);

		if (!user) {
			return { user: null };
		}

		return {
			user: {
				collection: "users",
				...user,
			},
		};
	},
};
