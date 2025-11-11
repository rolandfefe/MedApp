"use client`"

import { Editor } from "../blocks/editor-00/editor";
import { Separator } from "../ui/separator";

export default function DiagnosisSection({
	diagnosis,
}: {
	diagnosis: IDiagnosis;
}) {
// console.log("Diagnosis:",diagnosis);

	return (
		<div>
			<section>
				<p className="tex-lg font-medium">Chief Complaint</p>

				<Editor.Renderer editorSerializedState={diagnosis.chiefComplaint!} />
			</section>

			{diagnosis.notes && (
				<section>
					<p className="tex-lg font-medium">Notes ✍️</p>

					<Editor.Renderer editorSerializedState={diagnosis.notes} />
				</section>
			)}

			<Separator className="my-5" />
		</div>
	);
}
