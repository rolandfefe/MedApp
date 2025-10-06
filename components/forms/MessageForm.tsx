"use client";

import { cn } from "@/lib/utils";
import React, { ComponentProps, useState } from "react";

export default function MessageForm({
	action,
	msg,
	currentUser,
	className,
	...props
}: {
	action: "Create" | "Update";
	msg?: IMessage;
	currentUser: IUser;
} & ComponentProps<"div">) {
	const [body, setBody] = useState<string>();

	return (
		<div className={cn("w-[95%] mx-auto", className)} {...props}>
			MessageForm
		</div>
	);
}
