"use client";

import { createMsg, updateMsg } from "@/lib/actions/message.actions";
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
import { useConsultation } from "@/contexts/consultation.context";
import { useCurrent } from "@/contexts/Current.context";

export default function MessageForm({
	className,
	...props
}: ComponentProps<"div">) {
	const currentUser = useCurrent().currentUser as IUser;
	const { appointment } = useConsultation();
	const { refMsg, setRefMsg, editMsg, setEditMsg } = useMsg();

	const [body, setBody] = useState<string>(editMsg?.body ?? "");
	const [isSending, startSending] = useTransition();
	const [isUploadMode, setIsUploadMode] = useState<boolean>(false);

	const submitHandler = () => {
		const cleanData = {
			appointment: appointment.id!,
			body,
			from: currentUser.id!,
			refMessage: refMsg?.id,
		};

		if (editMsg) {
			// Update Msg
			startSending(async () => {
				await updateMsg({ ...editMsg, ...cleanData });

				setEditMsg(undefined);
				setBody("");
				setRefMsg(undefined)
				toast("Message Updated✍️");
			});
		} else {
			if (body) {
				startSending(async () => {
					await createMsg({
						...cleanData,
					});

					setBody("");
					setRefMsg(undefined);
				});
			} else {
				errHandler(["Cannot send empty Message!"]);
			}
		}
	};

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
	}, []);

	useEffect(() => {
		if (editMsg) setBody(editMsg.body);
	}, [editMsg]);

	return (
		<div
			className={cn(
				"w-full",
				className,
				refMsg && "-bottom-[15%] sm:-bottom-[13%]"
			)}
			{...props}
		>
			<div className="flex items-center gap-4">
				<InputGroup className="glass bg-secondary/80!">
					<InputGroupInput
						placeholder="Enter message..."
						onChange={(e) => setBody(e.target.value)}
						value={body}
					/>
					{refMsg && (
						<InputGroupAddon align="block-start" className={"p-2"}>
							<div className="border-l-3 border-primary/50 bg-secondary rounded-r-lg p-1 pl-2 text-xs w-full">
								{refMsg?.body}
							</div>
						</InputGroupAddon>
					)}

					<InputGroupAddon align={"block-end"}>
						<div className="flex items-center gap-x-1">
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

							{editMsg && (
								<InputGroupButton
									onClick={() => {
										setEditMsg(undefined);
										setBody("");
									}}
									variant={"outline"}
									className="text-primary rounded-2xl"
								>
									Edit <X />
								</InputGroupButton>
							)}
							{refMsg && (
								<InputGroupButton
									onClick={() => {
										setRefMsg(undefined);
									}}
									variant={"outline"}
									className="text-primary rounded-2xl"
								>
									Reply <X />
								</InputGroupButton>
							)}
						</div>
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
