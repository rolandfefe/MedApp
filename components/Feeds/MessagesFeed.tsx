"use client";

import { pusherClient } from "@/lib/pusher";
import { cn } from "@/lib/utils";
import { uniqBy } from "lodash-es";
import { AnimatePresence, motion, Variants } from "motion/react";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import MsgCard from "../cards/MsgCard";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const msgVariants: Variants = {
	hidden: { opacity: 0, y: 100 },
	visible: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 100 },
};

export default function MessagesFeed({
	initMsgs,
	currentUser,
	appointment,
	className,
}: {
	initMsgs: IMessage[];
	currentUser: IUser;
	appointment: IAppointment;
	className?: string;
}) {
	const [msgs, setMsgs] = useState<IMessage[]>(initMsgs);

	const lastMsgRef = useRef<HTMLDivElement>(null);

	const pusherHandler = useEffectEvent(() => {
		pusherClient.subscribe(`chat-${appointment.id!}-channel`).bind(
			`new-${appointment.id!}-msg`,
			(newMsg: IMessage) => setMsgs((prev) => uniqBy([...prev, newMsg], "id")) // Remove duplicate messages by Id.
		);

		return () => pusherClient.unsubscribe(`chat-${appointment.id!}-channel`);
	});

	useEffect(() => {
		if (lastMsgRef)
			lastMsgRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});

		pusherHandler();
	}, [appointment, lastMsgRef]);

	return (
		<ScrollArea hideScrollbar className="h-[89vh]">
			<section className={cn("space-y-2 pb-40 pt-10", className)}>
				<AnimatePresence>
					{msgs.map((msg) => (
						<motion.div
							variants={msgVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							layout
							key={msg.id}
							ref={msgs[msgs.length - 1].id === msg.id ? lastMsgRef : null}
						>
							<MsgCard msg={msg} currentUser={currentUser} className="" />
						</motion.div>
					))}
				</AnimatePresence>
			</section>
		</ScrollArea>
	);
}
