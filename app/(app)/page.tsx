import LandingNav from "@/components/layouts/LandingNav";
import LandingSectionOne from "@/components/layouts/LandingSectionOne";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function page() {
	return (
		<ScrollArea className="h-screen">
			<div className={"min-h-screen p-3 overflow-x-hidden"}>
				<LandingNav />
				<LandingSectionOne className="" />
			</div>
			<ScrollBar />
		</ScrollArea>
	);
}
