import Link from "next/link";
import React, { ComponentProps } from "react";
import MyBtn from "../custom/MyBtn";

export default function LinkBtn({
	children,
	link,
	...props
}: {
	link: ComponentProps<typeof Link>;
} & ComponentProps<typeof MyBtn>) {
	return (
		<Link {...link}>
			<MyBtn {...props}>{children}</MyBtn>;
		</Link>
	);
}
