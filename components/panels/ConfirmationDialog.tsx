import { CircleAlert, CircleCheck, CircleX, Loader } from "lucide-react";
import { ReactNode, useState, useTransition } from "react";
import toast from "react-hot-toast";
import Heading from "../custom/Heading";
import MyBtn from "../custom/MyBtn";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";

export default function ConfirmationDialog({
	children,
	msg,
	action,
	successMsg,
}: {
	children: ReactNode;
	msg: string;
	successMsg: string;
	action: () => Promise<void>;
}) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isPending, startTransition] = useTransition();

	const actionHandler = () =>
		startTransition(async () => {
			await action();
			setIsOpen(false); // ? Close after action
			toast.success(successMsg);
		});

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild onClick={() => setIsOpen((prev) => !prev)}>
				{children}
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle className="">
						<Heading className="text-xl text-primary justify-center w-full">
							<CircleAlert />
							Confirmation Dialog
						</Heading>
					</DialogTitle>
				</DialogHeader>

				<section>
					<p className="text-sm">{msg}</p>
				</section>

				<div className="flex items-center justify-between gap-x-3">
					<MyBtn
						disabled={isPending}
						size="sm"
						// variant={"secondary"}
						onClick={actionHandler}
						className="flex-1"
					>
						Confirm
						{isPending ? <Loader className="animate-spin" /> : <CircleCheck />}
					</MyBtn>
					<MyBtn
						disabled={isPending}
						size="sm"
						variant={"secondary"}
						onClick={() => setIsOpen(false)}
						className="text-destructive flex-1"
					>
						Cancel
						<CircleX />
					</MyBtn>
				</div>
			</DialogContent>
		</Dialog>
	);
}
