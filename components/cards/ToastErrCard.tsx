import React from "react";
import MyBtn from "../custom/MyBtn";
import { Card, CardContent } from "../ui/card";
import { X } from "lucide-react";
import Heading from "../custom/Heading";
import { Separator } from "../ui/separator";
import toast, { Toast } from "react-hot-toast";
import { FieldErrors, FieldValues } from "react-hook-form";

// ! FIx generics functions
export default function ToastErrCard<E extends FieldValues>({
	t,
}: {
	t: Toast;
	err: FieldErrors<E>;
}) {
	return (
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
				<div>
					{Object.entries(err).map(([k, v]) => (
						<p key={k} className={"text-sm text-secondary-foreground"}>
							<span className="font-medium text-destructive">{k}: </span>
							<code>{v.message}</code>
						</p>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
