"use client";

import { PhoneCall } from "lucide-react";
import { ComponentProps, useTransition } from "react";
import toast from "react-hot-toast";
import MyBtn from "../custom/MyBtn";
import { cn } from "@/lib/utils";
import { Spinner } from "../ui/spinner";

export default function CallBtn({
	contact,
	className,
	...props
}: { contact: string } & ComponentProps<typeof MyBtn>) {
	const [isCalling, startCalling] = useTransition();

	const callHandler = () => {
		startCalling(async () => {
			// ! Figure this out coming soon.
			toast("Coming soon...");
		});
	};
	return (
		<MyBtn
			{...props}
			size={"icon"}
			onClick={callHandler}
			disabled={isCalling}
			className={cn("text-primary", className)}
		>
			{isCalling ? <Spinner /> : <PhoneCall />}
		</MyBtn>
	);
}
