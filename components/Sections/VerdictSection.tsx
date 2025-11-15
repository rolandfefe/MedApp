"use client";

import { useConsultation } from "@/contexts/consultation.context";
import VerdictForm from "../forms/VerdictForm";
import { Editor } from "../blocks/editor-00/editor";
import { NotebookTabs, Syringe } from "lucide-react";

export default function VerdictSection() {
	const { appointment, verdict } = useConsultation();

	if (!verdict) return <VerdictForm />;

	console.log(verdict);

	return (
		<div>
			<section className="space-y-4" >
				<div>
					<p className="text-lg font-medium inline-flex gap-x-1 items-center">
						<NotebookTabs />
						<span>Verdict Notes</span>
					</p>

					<Editor.Renderer editorSerializedState={verdict.notes} />
				</div>

				<div className="">
					<p className="text-lg font-medium inline-flex gap-x-1 items-center">
						<Syringe />
						<span>Treatment Plan</span>
					</p>
					<Editor.Renderer editorSerializedState={verdict.treatmentPlan.plan} />
				</div>
			</section>
		</div>
	);
}
