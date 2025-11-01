"use client";

import { useConsultation } from "@/contexts/consultation.context";
import { useCurrent } from "@/contexts/Current.context";
import { pusherClient } from "@/lib/pusher";
import { cn } from "@/lib/utils";
import { uniqBy } from "lodash-es";
import { AnimatePresence, motion, Variants } from "motion/react";
import { useEffect, useEffectEvent, useLayoutEffect, useRef, useState } from "react";
import MsgCard from "../cards/MsgCard";
import { ScrollArea } from "../ui/scroll-area";
import { useMsg } from "@/contexts/message.context";

const msgVariants: Variants = {
	hidden: { opacity: 0, y: 100 },
	visible: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 100 },
};

export default function MessagesFeed({
	initMsgs,
	className,
}: {
	initMsgs: IMessage[];
	className?: string;
}) {
	const currentUser = useCurrent().currentUser as IUser;
	const { appointment } = useConsultation();
	const {msgs, setMsgs} = useMsg()
	// const [msgs, setMsgs] = useState<IMessage[]>(initMsgs);

	console.log(msgs)

	const lastMsgRef = useRef<HTMLDivElement>(null);

	const loadMore = async () => {
		
	}

	const sync = async () => {
		
	}

	const pusherHandler = useEffectEvent(() => {
		pusherClient.subscribe(`chat-${appointment.id!}-channel`).bind(
			`new-${appointment.id!}-msg`,
			(newMsg: IMessage) => setMsgs((prev) => uniqBy([...prev, newMsg], "id")) // Remove duplicate messages by Id.
		);

		return () => pusherClient.unsubscribe(`chat-${appointment.id!}-channel`);
	});

	useEffect(() => {
		
		pusherHandler();
	}, [appointment, pusherHandler]);

	
	useLayoutEffect(() => {
		if (lastMsgRef)
			lastMsgRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});

	}, [lastMsgRef])

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
