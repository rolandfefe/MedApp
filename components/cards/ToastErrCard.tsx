import { X } from "lucide-react";
import { ComponentProps } from "react";
import { FieldValues } from "react-hook-form";
import toast, { Toast } from "react-hot-toast";
import Heading from "../custom/Heading";
import MyBtn from "../custom/MyBtn";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";

// ! FIx generics functions
export default function ToastErrCard<E extends FieldValues>({
	t,
	children,
	...props
}: {
	t: Toast;
} & ComponentProps<typeof Card>) {
	return (
		<Card {...props} className="w-[95vw] sm:w-72 relative">
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
				<div>{children}</div>
			</CardContent>
		</Card>
	);
}
