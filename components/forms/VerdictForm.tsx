"use client";

import { SerializedEditorState } from "lexical";
import { useState } from "react";
import { Editor } from "../blocks/editor-00/editor";

export default function VerdictForm() {
	const [patientNotesSerializedState, setPatientNotesSerializedState] =
		useState<SerializedEditorState>();
	const [planSerializedText, setPlanSerializedText] =
		useState<SerializedEditorState>();

	return (
		<div>
			<Editor />
		</div>
	);
}
