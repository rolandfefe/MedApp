"use client";

import { createMsg } from "@/lib/actions/message.actions";
import { cn } from "@/lib/utils";
import { Loader, Plus, Send, X } from "lucide-react";
import { usePathname } from "next/navigation";
import {
	ComponentProps,
	useCallback,
	useEffect,
	useState,
	useTransition,
} from "react";
import toast from "react-hot-toast";
import Heading from "../custom/Heading";
import MyBtn from "../custom/MyBtn";
import { Card, CardContent } from "../ui/card";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "../ui/input-group";
import { Separator } from "../ui/separator";
import { useMsg } from "@/contexts/message.context";

export default function MessageForm({
	action,
	msg,
	currentUser,
	className,
	appointment,
	...props
}: {
	action: "Create" | "Update";
	msg?: IMessage;
	currentUser: IUser;
	appointment: IAppointment;
} & ComponentProps<"div">) {
	const [body, setBody] = useState<string>();
	const [isSending, startSending] = useTransition();
	const [isUploadMode, setIsUploadMode] = useState<boolean>(false);
	const { refMsg, updateMsg } = useMsg();

	const submitHandler = useCallback(() => {
		if (body) {
			startSending(async () => {
				await createMsg({
					appointment: appointment._id!,
					body,
					from: currentUser._id!,
				});

				setBody("");
			});
		} else {
			errHandler(["Cannot send empty Message!"]);
		}
	}, [currentUser, appointment, body]);

	const errHandler = async (msgs: string[]) => {
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
						{msgs.map((msg, i) => (
							<p key={i} className="text-xs sm:text-sm">
								<code>{msg}</code>
							</p>
						))}
					</CardContent>
				</Card>
			),
			{ id: "493nw2sx20" }
		);
	};

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				submitHandler();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [submitHandler]);

	return (
		<div className={cn("w-full", className)} {...props}>
			<div className="flex items-center gap-4">
				<InputGroup className="glass">
					<InputGroupInput
						placeholder="Enter message..."
						onChange={(e) => setBody(e.target.value)}
						value={body}
					/>

					<InputGroupAddon align={"block-end"}>
						<InputGroupButton
							variant={"outline"}
							size={"icon-xs"}
							onClick={() => setIsUploadMode((prev) => !prev)}
							className={cn(
								"rounded-full",
								isUploadMode &&
									"text-primary hover:text-primary rotate-45 transition-all delay-150"
							)}
						>
							<Plus />
						</InputGroupButton>
						<InputGroupButton
							asChild
							disabled={isSending}
							variant={"default"}
							onClick={submitHandler}
							className="ml-auto rounded-full"
						>
							Send
							{isSending ? <Loader className="animate-spin" /> : <Send />}
						</InputGroupButton>
					</InputGroupAddon>
				</InputGroup>
			</div>
		</div>
	);
}
