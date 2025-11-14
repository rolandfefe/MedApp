"use client";

import { SerializedEditorState, SerializedLexicalNode } from "lexical";
import { Dispatch, JSX, SetStateAction } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { Editor } from "../blocks/editor-00/editor";

export default function getDiagnosisFormStepper(
	form: ReturnType<typeof useForm<DiagnosisFormData>>,
	submitHandler: (data: DiagnosisFormData) => void,
	errHandler: (err: FieldErrors<DiagnosisFormData>) => Promise<void>,
	isPending: boolean = false
): {
	title: string;
	body: JSX.Element;
	readonly isComplete: boolean;
}[] {
	return [];
}

export const PatientNotesSection = ({
	setPatientNotesSerializedState,
	patientNotesSerializedState,
}: {
	patientNotesSerializedState?: SerializedEditorState<SerializedLexicalNode>;
	setPatientNotesSerializedState: Dispatch<
		SetStateAction<SerializedEditorState<SerializedLexicalNode> | undefined>
	>;
}) => {
	return (
		<div>
			<Editor
				editorSerializedState={patientNotesSerializedState}
				onSerializedChange={setPatientNotesSerializedState}
			/>
		</div>
	);
};

export const PlanSection = ({
	setPlanSerializedText,
	planSerializedText,
}: {
	planSerializedText?: SerializedEditorState<SerializedLexicalNode>;
	setPlanSerializedText: Dispatch<
		SetStateAction<SerializedEditorState<SerializedLexicalNode> | undefined>
	>;
}) => {
	return (
		<div>
			<Editor
				editorSerializedState={planSerializedText}
				onSerializedChange={setPlanSerializedText}
			/>
		</div>
	);
};
