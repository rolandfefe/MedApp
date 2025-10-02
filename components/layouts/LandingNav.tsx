"use client";
import {
	MobileNav,
	MobileNavHeader,
	MobileNavMenu,
	MobileNavToggle,
	Navbar,
	NavbarButton,
	NavbarLogo,
	NavBody,
	NavItems,
} from "@/components/ui/resizable-navbar";
import { LANDING_NAV_ITEMS } from "@/constants";
import { cn } from "@/lib/utils";
import { SignInButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function LandingNav({ className }: { className?: string }) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

	const { setTheme } = useTheme();
	setTheme("dark");

	return (
		<nav className={cn("", className)}>
			<Navbar>
				{/* Desktop */}
				<NavBody>
					<NavbarLogo />

					<NavItems items={LANDING_NAV_ITEMS} />

					<div className="flex items-center gap-x-1">
						{/* <NavbarButton href="#" variant="secondary" className=" p-0">
							<ThemeBtn className="bg-transparent border-none " />
						</NavbarButton> */}
						<NavbarButton href="/home" variant={"gradient"}>
							Get started✨
						</NavbarButton>
						<SignInButton mode="modal" withSignUp >
							<NavbarButton href="#" variant={"primary"}>
								Login
							</NavbarButton>
						</SignInButton>
					</div>
				</NavBody>

				{/* Mobile nav */}

				<MobileNav className="glass">
					<MobileNavHeader className="">
						<NavbarLogo />
						<div className="flex items-center gap-x-2">
							{/* <NavbarButton href="#" variant="secondary" className=" p-0">
								<ThemeBtn className="bg-transparent border-none " />
							</NavbarButton> */}
							<SignInButton mode="modal">
								<NavbarButton href="#" variant={"primary"} className="flex-1">
									Login
								</NavbarButton>
							</SignInButton>

							<MobileNavToggle
								isOpen={isMobileMenuOpen}
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							/>
						</div>
					</MobileNavHeader>

					<MobileNavMenu
						isOpen={isMobileMenuOpen}
						onClose={() => setIsMobileMenuOpen(false)}
					>
						<NavItems
							showIcons
							items={LANDING_NAV_ITEMS}
							className="relative w-full mb-2 p-2 !flex flex-col"
						/>

						<div className="flex  items-center gap-2 w-full">
							<NavbarButton
								href="/home"
								variant={"gradient"}
								className="flex-1"
							>
								Get started✨
							</NavbarButton>
						</div>
					</MobileNavMenu>
				</MobileNav>
			</Navbar>
		</nav>
	);
}
