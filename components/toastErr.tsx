import { X } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import Heading from "./custom/Heading";
import { Separator } from "./ui/separator";
import toast from "react-hot-toast";
import MyBtn from "./custom/MyBtn";

export const errHandler = async (errs: string[]) => {
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
					<div>
						{errs.map((err, i) => (
							<p key={i} className={"text-sm text-secondary-foreground"}>
								<code>{err}</code>
							</p>
						))}
					</div>
				</CardContent>
			</Card>
		),
		{ id: "sdm0c294" }
	);
};
