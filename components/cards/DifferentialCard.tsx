import { cn } from "@/lib/utils";
import { Brain, GitCompare } from "lucide-react";
import { ComponentProps } from "react";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import CopyBadge from "../custom/CopyBadge";

export default function DifferentialCard({
	differential,
	className,
	...props
}: {
	differential: NonNullable<IDiagnosis["differentialDiagnosis"]>[number];
} & ComponentProps<typeof Card>) {
	return (
		<Card {...props} className={cn("bg-transparent", className)}>
			<CardContent className="space-y-3">
				<div className="flex items-center justify-between">
					<p className="textsm font-medium flex items-center gap-x-1">
						<GitCompare size={20} />
						<span>{differential.condition}</span>
					</p>
					{/* ? Ask whether to include */}
					{/* {differential.icd10Code && (
						<CopyBadge variant={"outline"} content={differential.icd10Code} />
					)} */}
					{differential.isPrimary && (
						<Badge className="font-medium">Primary</Badge>
					)}
				</div>
				<Separator className="mt-2 mb-4" />

				<div className="bg-muted font-mono p-2 rounded-lg">
					<p className="flex items-center gap-x-1 text-xs mb-1">
						<Brain size={18} />
						Reasoning:
					</p>
					<p className="text-xs text-muted-foreground">
						{differential.reasoning}
					</p>
				</div>

				<div className="flex items-center gap-x-2">
					<div className="flex-1 px-2 py-1 rounded-lg border glass-bg glass-shadow">
						<p className="text-xs text-muted-foreground">Confidence:</p>
						<p className="text-sm sm:text-base font-medium">
							{differential.confidence}
						</p>
					</div>
					<div className="flex-1 px-2 py-1 rounded-lg border glass-bg glass-shadow">
						<p className="text-xs text-muted-foreground">Severity:</p>
						<p className="text-sm sm:text-base font-medium">
							{differential.severity}
						</p>
					</div>
					<div className="flex-1 px-2 py-1 rounded-lg border glass-bg glass-shadow">
						<p className="text-xs text-muted-foreground">Laterality:</p>
						<p className="text-sm sm:text-base font-medium">
							{differential.laterality}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
