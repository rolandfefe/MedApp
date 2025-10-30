import MessagesFeed from "@/components/Feeds/MessagesFeed";
import MessageForm from "@/components/forms/MessageForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MsgProvider } from "@/contexts/message.context";
import { getAppointmentById } from "@/lib/actions/appointment.actions";
import { getMsgs } from "@/lib/actions/message.actions";
import { getCurrentUser } from "@/lib/actions/user.actions";
import Image from "next/image";

export default async function page({
	params,
}: {
	params: Promise<{ appointmentId: string }>;
}) {
	const { appointmentId } = await params;

	const [currentUser, { msgs }, appointment] = await Promise.all([
		getCurrentUser(),
		getMsgs({ appointment: decodeURIComponent(appointmentId) }),
		getAppointmentById(decodeURIComponent(appointmentId)),
	]);

	// console.log("MSGS: ", msgs);

	return (
		<MsgProvider msgsInit={msgs}>
			<section className="h-[calc(89.4vh)] w-full relative">
				<Image
					src="/assets/logo_transparent.png"
					alt="logo"
					width={999}
					height={999}
					priority
					className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 opacity-40 dark:opacity-25 w-[40%] sm:w-1/2"
				/>

				<MessagesFeed
					currentUser={currentUser}
					initMsgs={msgs}
					appointment={appointment}
					className="w-full z-20"
				/>

				<MessageForm
					action="Create"
					currentUser={currentUser}
					appointment={appointment}
					className="absolute -bottom-14 left-1/2 -translate-1/2 z-30"
				/>
			</section>
		</MsgProvider>
	);
}
