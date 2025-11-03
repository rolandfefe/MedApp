import ChatContainer from "@/components/ChatContainer";
import { MsgProvider } from "@/contexts/message.context";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { getMsgs } from "@/lib/actions/message.actions";

export default async function page({
	params,
}: {
	params: Promise<{ appointmentId: string }>;
}) {
	// const { appointmentId } = await params;

	// const [{ msgs }, appointment] = await Promise.all([
	// 	getMsgs({ appointment: decodeURIComponent(appointmentId) }),
	// 	getAppointment(decodeURIComponent(appointmentId)),
	// ]);

	// console.log("MSGS: ", msgs);
	
	return (
		// <MsgProvider msgsInit={msgs} appointment={appointment}>
			<ChatContainer />
		// </MsgProvider>
	);
}
