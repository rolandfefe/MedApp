import { cn } from "@/lib/_utils";
import { headerFont, logoFont } from "../../app/fonts";

export default function LogoText({ className }: { className?: string }) {
	return (
		<p className={cn(`${logoFont.className} text-primary`, className)}>
			MedNet
		</p>
	);
}
