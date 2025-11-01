import { ourFileRouter } from "@/app/(payload)/api/uploadthing/core";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import AuthProvider from "@/Providers/AuthProvider";
import BProgressProvider from "@/Providers/BProgressProvider";
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
						<BProgressProvider>
							<ScrollArea className="h-screen">
								{children}
								<ScrollBar />
							</ScrollArea>
						</BProgressProvider>
					</ThemeProvider>
				</body>
			</AuthProvider>
		</html>
	);
}
