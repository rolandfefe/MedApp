import { currentUser } from "@clerk/nextjs/server";
import { AuthStrategy, Payload } from "payload";

export async function getDbUser(payload: Payload): Promise<IUser | null> {
	// const { user.id }: { user.id: string | null } = await auth();
	const user = await currentUser();

	if (!user) return null;

	// const dbUser = await getUser({ clerkId: user.id });
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
