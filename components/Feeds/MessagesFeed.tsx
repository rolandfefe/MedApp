"use client";

import { useConsultation } from "@/contexts/consultation.context";
import { useMsg } from "@/contexts/message.context";
import useLoadMore from "@/hooks/useLoadMore";
import { getMsgs } from "@/lib/actions/message.actions";
import { pusherClient } from "@/lib/pusher";
import { cn } from "@/lib/utils";
import { uniqBy } from "lodash-es";
import { AnimatePresence, motion, Variants } from "motion/react";
import {
	ComponentProps,
	useEffect,
	useEffectEvent,
	useLayoutEffect,
	useRef,
} from "react";
import MsgCard from "../cards/MsgCard";
import { ScrollArea } from "../ui/scroll-area";

const msgVariants: Variants = {
	hidden: { opacity: 0, y: 100 },
	visible: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 100 },
};

export default function MessagesFeed({
	className,
	...props
}: ComponentProps<"section">) {
	const { appointment } = useConsultation();
	const { msgs, setMsgs, nextPg, setNextPg } = useMsg();

	const lastMsgRef = useRef<HTMLDivElement>(null);
	// const [msgs, setMsgs] = useState<IMessage[]>(initMsgs);

	const loadMore = async () => {
		const { msgs, nextPg: nextPage } = await getMsgs({
			appointment: appointment.id,
			page: nextPg,
		});

		setNextPg(nextPage);
		setMsgs((prev) => uniqBy([...prev, ...msgs], "id"));
	};

	const { ref, isLoading } = useLoadMore({ loader: loadMore });
	console.log("isLoading: ", isLoading, msgs);

	const pusherHandler = useEffectEvent(() => {
		pusherClient
			.subscribe(`chat-${appointment.id!}-channel`)
			.bind(`new-${appointment.id!}-msg`, (newMsg: IMessage) =>
				setMsgs((prev) => uniqBy([...prev, newMsg], "id"))
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
	}, [lastMsgRef]);

	return (
		<ScrollArea hideScrollbar className="h-[89vh]">
			<section {...props} className={cn("space-y-2 pb-40 pt-10", className)}>
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
							<MsgCard
								msg={msg}
								ref={msgs[msgs.length - 1].id === msg.id ? ref : null}
								className=""
							/>
						</motion.div>
					))}
				</AnimatePresence>
			</section>
		</ScrollArea>
	);
}
