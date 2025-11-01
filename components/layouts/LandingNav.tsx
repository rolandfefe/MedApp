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
import { cn } from "@/lib/utils";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function LandingNav({
	className,
	landingNav,
}: {
	className?: string;
	landingNav: ILandingNav;
}) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

	const { setTheme } = useTheme();
	setTheme("dark");

	return (
		<nav className={cn("", className)}>
			<Navbar>
				{/* Desktop */}
				<NavBody>
					<NavbarLogo />

					<NavItems items={landingNav.items!} />

					<div className="flex items-center gap-x-1">
						{/* <NavbarButton href="#" variant="secondary" className=" p-0">
							<ThemeBtn className="bg-transparent border-none " />
						</NavbarButton> */}
						<NavbarButton href="/home" variant={"gradient"}>
							Get started✨
						</NavbarButton>
						<SignedOut>
							<SignInButton mode="modal" withSignUp>
								<NavbarButton href="#" variant={"primary"}>
									Login
								</NavbarButton>
							</SignInButton>
						</SignedOut>
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
							<SignedOut>
								<SignInButton mode="modal">
									<NavbarButton href="#" variant={"primary"} className="flex-1">
										Login
									</NavbarButton>
								</SignInButton>
							</SignedOut>

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
							items={landingNav.items}
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
