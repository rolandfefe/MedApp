"use client";

import React, { ReactNode, useState } from "react";
import {
	FormPanel,
	FormPanelContent,
	FormPanelTrigger,
} from "../custom/form-panel";
import PatientForm from "../forms/patientForm";

export default function PatientFormPanel({
	currentUser,
	children,
	action = "create",
	patient,
}: {
	currentUser: IUser;
	children: ReactNode;
	action?: "create" | "update";
	patient?: IPatient;
}) {
	// const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		// <FormPanel open={isOpen} onOpenChange={setIsOpen}>
		<FormPanel>
			<FormPanelTrigger asChild>{children}</FormPanelTrigger>

			<FormPanelContent>
				<PatientForm
					action={action}
					currentUser={currentUser}
					patient={patient}
				/>
			</FormPanelContent>
		</FormPanel>
	);
}
