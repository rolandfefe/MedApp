import LandingNav from "@/components/layouts/LandingNav";
import LandingSectionOne from "@/components/layouts/LandingSectionOne";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getLandingNav } from "@/lib/actions/globals.actions";

export default async function page() {
	const landingNav = await getLandingNav();
	return (
		<ScrollArea className="h-screen">
			<div className={"min-h-screen p-3 overflow-x-hidden"}>
				<LandingNav landingNav={landingNav} />
				<LandingSectionOne className="" />
			</div>
			<ScrollBar />
		</ScrollArea>
	);
}
