"use client";

import { pusherClient } from "@/lib/pusher";
import { cn } from "@/lib/utils";
import { uniqBy } from "lodash-es";
import { AnimatePresence, motion, Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";
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

	const lastMsgRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		// ? 2. Subscribe to Channel
		pusherClient.subscribe(`chat-${appointment._id!}-channel`).bind(
			`new-${appointment._id!}-msg`,
			(newMsg: IMessage) => setMsgs((prev) => uniqBy([...prev, newMsg], "_id")) // Remove duplicate messages by Id.
		);

		// Scroll to latest msg
		if (lastMsgRef)
			lastMsgRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});

		return () => pusherClient.unsubscribe(`chat-${appointment._id!}-channel`);
	}, [appointment]);

	return (
		<ScrollArea hideScrollbar className="h-[89vh]">
			<section className={cn("space-y-2 pb-40", className)}>
				<AnimatePresence>
					{msgs.map((msg) => (
						<motion.div
							variants={msgVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							layout
							key={msg._id}
							ref={msgs[msgs.length - 1]._id === msg._id ? lastMsgRef : null}
						>
							<MsgCard msg={msg} currentUser={currentUser} className="" />
						</motion.div>
					))}
				</AnimatePresence>
			</section>
		</ScrollArea>
	);
}
