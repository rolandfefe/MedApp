import { cn } from "@/lib/utils";
import { headerFont, logoFont } from "./fonts";

export default function LogoText({ className }: { className?: string }) {
	return <p className={cn(`${logoFont.className} text-primary`, className)}>MedNet</p>;
}
