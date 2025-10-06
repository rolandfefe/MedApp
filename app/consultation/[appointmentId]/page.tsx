import Heading from "@/components/custom/Heading";
import MyBtn from "@/components/custom/MyBtn";
import MessageForm from "@/components/forms/MessageForm";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

export default async function page({
	params,
}: {
	params: Promise<{ appointmentId: string }>;
}) {
	const { appointmentId } = await params;
	const currentUser = await getCurrentUser();

	const appointment = await getAppointment({
		_id: decodeURIComponent(appointmentId),
	});

	const errHandler = async () => {
		toast.custom(
			(t) => (
				<Card className="w-[95vw] sm:w-72 relative">
					<MyBtn
						size="icon"
						variant={"secondary"}
						onClick={() => toast.dismiss(t.id)}
						className="size-7 rounded-xl hover:text-destructive absolute top-2 right-2 "
					>
						<X />
					</MyBtn>
					<CardContent className="px-2 py-1">
						<Heading className="text-xl">🚨Form input error(s) </Heading>
						<Separator className="my-1" />
						<div></div>
					</CardContent>
				</Card>
			),
			{ id: "493nw2sx20" }
		);
	};

	return (
		<div className="relative h-[90vh] overflow-hidden border border-red-500 ">
			<Image
				src="/assets/logo_transparent.png"
				alt="logo"
				width={999}
				height={999}
				priority
				className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 opacity-25 w-[40%] sm:w-1/2 md:w-2/3 lg:w-4/5"
			/>

			<MessageForm
				action="Create"
				currentUser={currentUser}
				className="absolute bottom-3 right-3 border border-green-300"
			/>
		</div>
	);
}
