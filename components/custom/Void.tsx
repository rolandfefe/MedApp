import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { ComponentProps } from "react";

export default function Void({
	msg,
	className,
	...props
}: { msg: string } & ComponentProps<"div">) {
	return (
		<div {...props} className={cn("w-2/3 mx-auto", className)}>
			<Image
				src={"/assets/void.svg"}
				alt="Void"
				height={999}
				width={999}
				priority
				className="w-2/3 mx-auto "
			/>

			<p className="text-xs text-center sm:text-sm font-medium text-muted-foreground mt-3">
				{msg}
			</p>
		</div>
	);
}
