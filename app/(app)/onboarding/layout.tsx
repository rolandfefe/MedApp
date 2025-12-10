import { ScrollArea } from "@/components/ui/scroll-area";
import { CurrentProvider } from "@/contexts/Current.context";
import { getCurrentUser } from "@/lib/actions/user.actions";
import {
	getCurrentDoctor,
	getCurrentPatient,
} from "@/lib/actions/utils.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
	// if ((await auth()).sessionClaims?.metadata.onboardingComplete === true) {
	// 	redirect("/");
	// }
	const [currentUser, currentDoctor, currentPatient] = await Promise.all([
		getCurrentUser(),
		getCurrentDoctor(),
		getCurrentPatient(),
	]);

	return (
		<CurrentProvider
			user={currentUser}
			doctor={currentDoctor}
			patient={currentPatient}
		>
			<ScrollArea className="h-screen">
				<main className="p-1">{children}</main>
			</ScrollArea>
		</CurrentProvider>
	);
}
