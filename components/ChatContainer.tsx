"use client";

import Image from "next/image";
import MessagesFeed from "./Feeds/MessagesFeed";
import MessageForm from "./forms/MessageForm";
import {
	FormPanel,
	FormPanelContent,
	FormPanelTrigger,
} from "./custom/form-panel";
import MyBtn from "./custom/MyBtn";
import { ArrowLeft, ArrowLeftCircle, MessageSquareText } from "lucide-react";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import LinkBtn from "./btns/LinkBtn";
import { useConsultation } from "@/contexts/consultation.context";

export default function ChatContainer({ className }: { className?: string }) {
	return (
		<div className={cn("h-[calc(89.4vh)] w-full relative", className)}>
			<Image
				src="/assets/logo_transparent.png"
				alt="logo"
				width={999}
				height={999}
				priority
				className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 opacity-40 dark:opacity-25 w-[40%] sm:w-1/2"
			/>
			<MessagesFeed className="w-full z-20" />
			<MessageForm className="absolute bottom-1 left-1/2 -translate-x-1/2 z-30" />
		</div>
	);
}

ChatContainer.Panel = ({
	className,
	...props
}: ComponentProps<typeof FormPanelTrigger>) => {
	const { appointment } = useConsultation();
	return (
		<FormPanel>
			<FormPanelTrigger {...props} asChild>
				<MyBtn size="icon" variant={"outline"} className="text-primary">
					<MessageSquareText />
				</MyBtn>
			</FormPanelTrigger>
			<FormPanelContent className="relative">
				<LinkBtn
					link={{ href: `/consultation/${appointment.id}` }}
					size="sm"
					variant={"invert"}
					className="sticky top-0 left-2"
				>
					<ArrowLeftCircle size={26} />
					Chat
					{/* <MessageSquareText /> */}
				</LinkBtn>
				<ChatContainer className="sm:h-[90vh]!" />
			</FormPanelContent>
		</FormPanel>
	);
};
