// Supporting Interfaces for more complex structures

import { eCertificationStatus } from "./enums";

export interface IMedicalLicense {
	licenseNumber: string;
	status: eLicenseStatus;
	issuingState: string; // or country/province
	expirationDate?: Date;
	type: eLicenseType;
}

export interface IBoardCertification {
	boardName: string; // e.g., 'American Board of Internal Medicine'
	certificationId: string;
	date: Date;
	expirationDate?: Date; // Time-limited certifications
	status: eCertificationStatus;
}

export interface IHospitalAffiliation {
	name: string;
	startDate: Date;
	endDate?: Date; // If the affiliation has ended
	department: string;
	roles: string[]; // e.g., 'Attending Physician', 'Chief of Surgery'
}
