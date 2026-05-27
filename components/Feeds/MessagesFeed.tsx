"use client";

import { useConsultation } from "@/contexts/consultation.context";
import { useMsg } from "@/contexts/message.context";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, Variants } from "motion/react";
import { ComponentProps, useLayoutEffect, useRef } from "react";
import MsgCard from "../cards/MsgCard";
import { ScrollArea } from "../ui/scroll-area";

export default function MessagesFeed({
	className,
	...props
}: ComponentProps<"section">) {
	const { appointment } = useConsultation();
	const { msgs, loadRef, isLoading } = useMsg();

	const lastMsgRef = useRef<HTMLDivElement>(null);

	console.log("isLoading: ", isLoading, msgs);

	useLayoutEffect(() => {
		if (lastMsgRef)
			lastMsgRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
	}, [lastMsgRef]);

	const msgVariants: Variants = {
		hidden: { opacity: 0, y: 100 },
		visible: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: 100 },
	};

	return (
		<ScrollArea hideScrollbar className="h-[89vh]">
			<section {...props} className={cn("space-y-2 pb-40 pt-10", className)}>
				<AnimatePresence>
					{msgs.map((msg) => {
						const isLastItem = msgs[msgs.length - 1].id === msg.id;
						const isFirstItem = msgs[0].id === msg.id;

						return (
							<motion.div
								variants={msgVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
								layout
								key={msg.id}
								ref={isLastItem ? lastMsgRef : null}
							>
								<MsgCard
									msg={msg}
									ref={isFirstItem ? loadRef : null}
									className=""
								/>
							</motion.div>
						);
					})}
				</AnimatePresence>
			</section>
		</ScrollArea>
	);
}
