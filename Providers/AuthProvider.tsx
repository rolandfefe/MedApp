import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";
import { ReactNode } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
	return (
		<ClerkProvider
			dynamic
			afterSignOutUrl="/"
			appearance={{ baseTheme: shadcn }}
		>
			{children}
		</ClerkProvider>
	);
}
