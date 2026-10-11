import { ourFileRouter } from "@/app/(payload)/api/uploadthing/core";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getCurrentUser } from "@/lib/actions/user.actions";
import AuthProvider from "@/Providers/AuthProvider";
import BProgressProvider from "@/Providers/BProgressProvider";
import GoeyProvider from "@/Providers/GoeyProvider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { extractRouterConfig } from "uploadthing/server";
import "./globals.css";

const poppinsFont = Poppins({
	weight: ["100", "200", "300", "400", "500", "600", "700"],
	style: "normal",
	display: "auto",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Med App",
	description: "Saving Live is all we do.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const currentUser = await getCurrentUser();

	return (
		<html lang="en" suppressHydrationWarning>
			<AuthProvider>
				<body
					className={`${poppinsFont.className} ${geistMono.variable} antialiased`}
				>
					<Toaster />

					<NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />

					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<GoeyProvider>
							<BProgressProvider>
								<ScrollArea className="h-screen">
									{children}
									<ScrollBar />
								</ScrollArea>
							</BProgressProvider>
						</GoeyProvider>
						ss
					</ThemeProvider>
				</body>
			</AuthProvider>
		</html>
	);
}
