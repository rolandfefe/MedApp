// Supporting Interfaces for more complex structures

import { eCertificationStatus, eLicenseStatus } from "./enums/enums";

export interface IMedicalLicense {
	licenseNumber: string;
	status: eLicenseStatus;
	issuingState: string; // or country/province
	expirationDate: Date | string;
	type: eLicenseType;
}

export interface IBoardCertification {
	boardName: string; // e.g., 'American Board of Internal Medicine'
	certificationId: string;
	date: Date | string;
	expirationDate: Date | string; // Time-limited certifications
	status: eCertificationStatus;
}

export interface IHospitalAffiliation {
	name: string;
	startDate: Date | string;
	endDate?: Date | string; // If the affiliation has ended
	department: string;
	roles: string[]; // e.g., 'Attending Physician', 'Chief of Surgery'
}
