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
import { getCurrentUser } from "@/lib/actions/user.actions";
import { RemindersProvider } from "@/contexts/Reminder.context";
import { eReminderVariants } from "@/types/enums/enums";
import { getReminders } from "@/lib/actions/reminder.actions";

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

	const [
		{ reminders: appointmentReminders },
		{ reminders: medicationReminders },
		{ reminders: personalReminders },
		{ reminders: followUpReminders },
	] = await Promise.all([
		getReminders({
			user: currentUser.id,
			variant: eReminderVariants.APPOINTMENT,
		}),
		getReminders({
			user: currentUser.id,
			variant: eReminderVariants.MEDICATION,
		}),
		getReminders({ user: currentUser.id, variant: eReminderVariants.PERSONAL }),
		getReminders({
			user: currentUser.id,
			variant: eReminderVariants.FOLLOW_UP,
		}),
	]);

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
							<RemindersProvider
								remindersInit={{
									appointments: appointmentReminders,
									medications: medicationReminders,
									personal: personalReminders,
									followUp: followUpReminders,
								}}
							>
								<ScrollArea className="h-screen">
									{children}
									<ScrollBar />
								</ScrollArea>
							</RemindersProvider>
						</BProgressProvider>
					</ThemeProvider>
				</body>
			</AuthProvider>
		</html>
	);
}
