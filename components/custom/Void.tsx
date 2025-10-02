import Image from "next/image";
import React, { ComponentProps } from "react";

export default function Void({
	msg,
	...props
}: { msg: string } & ComponentProps<"div">) {
	return (
		<div {...props}>
			<Image
				src={"/assets/void.svg"}
				alt="Void"
				height={999}
				width={999}
				className="w-2/3 mx-auto "
			/>	

			<p className="text-xs sm:text-sm font-medium text-muted-foreground mt-3">
				{msg}
			</p>
		</div>
	);
}
