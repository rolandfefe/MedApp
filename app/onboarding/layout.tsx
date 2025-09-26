import { ScrollArea } from "@/components/ui/scroll-area";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
	// if ((await auth()).sessionClaims?.metadata.onboardingComplete === true) {
	// 	redirect("/");
	// }

	return (
		<>
			<ScrollArea className="h-screen">
				<main className="p-1">{children}</main>
			</ScrollArea>
		</>
	);
}
