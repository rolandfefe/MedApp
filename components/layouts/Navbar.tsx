import { cn } from "@/lib/utils";
import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
} from "@clerk/nextjs";
import MyBtn from "../custom/MyBtn";
import { SidebarTrigger } from "../ui/sidebar";
import { ThemeBtn } from "../btns/ThemeBtn";

export default function Navbar({ className }: { className?: string }) {
	return (
		<nav
			className={cn(
				"glass-bg p-2 h-[7vh] sticky top-2 right-0 z-30 w-[99%] mx-auto flex items-center justify-between gap-x-2  rounded-xl",
				className
			)}
		>
			<SidebarTrigger />

			<div className="flex items-center gap-x-2">
				<ThemeBtn />
				<SignedIn>
					<UserButton showName />
				</SignedIn>
				<SignedOut>
					<SignInButton mode="modal">
						<MyBtn>Sign in</MyBtn>
					</SignInButton>
					<SignUpButton mode="modal">
						<MyBtn variant={"outline"}>Sign up</MyBtn>
					</SignUpButton>
				</SignedOut>
			</div>
		</nav>
	);
}
