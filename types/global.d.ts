import {
	eAllergySeverity,
	eAppointmentStatus,
	eAppointmentTypes,
	eArticleCategories,
	eArticleType,
	eConfidenceLevel,
	eDiagnosticStatus,
	eGender,
	eLicenseType,
	eMaritalStatus,
	eMedicalDegreeTypes,
	eMedicalSpecialties,
	eMessageStatus,
	eMethodOfDrugAdministration,
	eReminderVariants,
	eWeekDays,
} from "@/constants/enums";

export {};

declare global {
	interface IUser {
		_id?: string;
		clerkId: string;
		username: string;
		fname?: string;
		lname?: string;
		email: string;
		imageUrl?: string;

		createdAt?: Date;
		updatedAt?: Date;
	}

	interface IPatient {
		_id?: string;
		user: IUser | string;
		DOB: string;
		gender: eGender;
		maritalStatus?: eMaritalStatus;
		occupation?: string;
		ethnicity?: string;
		race?: string;
		languagesSpoken: eLanguages[];

		emergencyContacts: {
			name: string;
			relationship: string;
			phone: string;
			priority: number;
		}[];

		createdAt?: Date;
		updatedAt?: Date;
	}

	interface IDoctor {
		_id?: string;
		user: IUser | string;
		DOB: Date;
		gender: eGender;
		bio?: string;
		languagesSpoken: eLanguages[];

		// Professional Credentials & Qualifications
		credentials: {
			medicalDegree: {
				type: eMedicalDegreeTypes;
				institution: string;
				date: Date;
			};
			licenses: IMedicalLicense[];
			boardCertifications?: IBoardCertification[];
			hospitalAffiliations: IHospitalAffiliation[];
			residencies: Array<{
				specialty: string;
				hospital: string;
				startDate: Date;
				endDate?: Date;
			}>;
			isVerified: boolean;
		};

		// Specialties & Expertise
		specialties: {
			primary: eMedicalSpecialties;
			secondary?: eMedicalSpecialties[];
			procedures: string[]; // List of procedures they are qualified to perform
		};

		contactInfo: {
			officePhone: string;
			officeEmail?: string;
			mobilePhone?: string; // For on-call purposes
			pager?: string;
		};

		// Professional Schedule & Availability
		schedule: {
			officeHours: Array<{
				dayOfWeek: eWeekDays;
				startTime: string; // in HH:MM format
				endTime: string;
				isAvailable: boolean;
			}>;
			averageAppointmentDuration: string;
			isAcceptingNewPatients: boolean;
			nextAvailableAppointmentDate?: Date;
		};

		// Professional Metrics & Performance (For internal/admin use)
		metrics?: {
			rating?: number[]; // 0-100 scale
			numberOfPatients: number;
			yearsOfExperience: number;
			readmissionRate?: number;
		};

		// ? System Access & Administrative Data
		// systemAccess: {
		// 	role:
		// 		| "admin"
		// 		| "physician"
		// 		| "resident"
		// 		| "fellow"
		// 		| "nurse-practitioner";
		// 	ehrSystemUsername: string;
		// 	permissions: string[]; // e.g., ['prescribe_medications', 'view_all_records', 'order_labs']
		// 	isActive: boolean;
		// };

		createdAt?: Date;
		updatedAt?: Date;
	}

	// Supporting Interfaces for more complex structures

	interface IMedicalLicense {
		licenseNumber: string;
		state: string;
		issuingState: string; // or country/province
		expirationDate?: Date;
		active: boolean;
		licenseType: eLicenseType;
	}

	interface IBoardCertification {
		boardName: string; // e.g., 'American Board of Internal Medicine'
		specialty: string; // e.g., 'Internal Medicine'
		subSpecialty?: string; // e.g., 'Cardiovascular Disease'
		certificationId: string;
		initialCertificationDate: Date;
		expirationDate?: Date; // Time-limited certifications
		status: "active" | "expired" | "not-certified";
	}

	interface IHospitalAffiliation {
		name: string;
		startDate: Date;
		endDate?: Date; // If the affiliation has ended
		department: string;
		role: string; // e.g., 'Attending Physician', 'Chief of Surgery'
		privilegeDetails?: string[]; // Specific procedures they are privileged for
	}

	interface IHistory {
		_id?: string;
		patient: IPatient | string;

		pastConditions: Array<{
			condition: string;
			diagnosisDate?: Date;
			resolved: boolean;
			resolutionDate?: Date;
		}>;
		surgicalHistory: Array<{
			procedure: string;
			date: Date;
			facility?: string;
		}>;
		familyHistory: Array<{
			condition: string;
			relation: string;
			notes?: string;
		}>;

		// socialHistory
		smoking: {
			status: "never" | "former" | "current";
			years?: number;
			quitDate?: Date;
		};
		alcohol: {
			status: "never" | "occasional" | "regular";
			drinksPerWeek?: number;
			type?: string;
		};
		substanceUse?: {
			substances: string[];
			frequency?: string;
			lastUse?: Date;
		};
		exercise?: string; // e.g., "3 times per week"
		diet?: string; // e.g., "vegetarian", "Mediterranean"

		// Allergies
		allergies: IAllergy[];

		createdAt?: Date;
		updatedAt?: Date;
	}

	interface IAllergy {
		_id?: string;

		substance: string;
		reaction: string;
		severity: eAllergySeverity;
		onsetDate?: Date;
		documentedBy: string;
		lastReactionDate?: Date;

		createdAt?: Date;
		updatedAt?: Date;
	}

	interface IMedication {
		_id?: string;
		name: string;
		doctor: IDoctor | IUser;
		dosage: string;
		frequency: string;
		route: eMethodOfDrugAdministration;
		startDate: Date;
		endDate?: Date;
		active: boolean;

		reason?: string;
		instructions?: string;
		sideEffects?: string[];

		createdAt?: Date;
		updatedAt?: Date;
	}

	interface IVitals {
		_id?: string;

		bloodPressure?: string;
		heartRate?: number;
		temperature?: number;
		respiratoryRate?: number;
		oxygenSaturation?: number;
		height?: number;
		weight?: number;
		bmi?: number;

		createdAt?: Date;
		updatedAt?: Date;
	}

	interface IArticle {
		_id: string;
		title: string;
		subtitle?: string;
		authors: IDoctor[];

		// Publication Metadata
		publication?: {
			publisher: string;
			version?: string;
			Date: Date;
		};

		content: {
			body: Array<{
				sectionTitle: string;
				sectionContent: string;
			}>;
			supplementaryMaterials?: Array<{
				title: string;
				url: string;
			}>;
			figures: Array<{
				caption: string;
				url: string;
				type: "image" | "chart" | "graph" | "table";
			}>;
			references?: Array<{
				citation: string; // Full APA/AMA/Vancouver format citation
			}>;
		};

		validation: {
			peerReviewed: boolean;
			conflictOfInterestStatement: string;
			isVerified: boolean;
		};

		licensing: {
			copyright: string; // e.g., "© 2023 American Medical Association"
			licenseType: string; // e.g., "CC-BY-NC 4.0"
			isOpenAccess: boolean;
		};

		// Metadata for discoverability and administration
		meta: {
			articleType: eArticleType;
			categories: eArticleCategories; // MeSH terms or other categories

			reads: IUser[] | string[];
			likes: IUser[] | string[];
			dislikes: IUser[] | string[];
		};
	}

	interface IAppointment {
		_id?: string;

		// ? Optional since we want to allow Open appointments
		patient?: IPatient | string;
		doctor?: IDoctor | string;
		starTime: Date;
		endTime: Date;

		// Appointment Details
		type: eAppointmentTypes;
		status: eAppointmentStatus;
		reason: string; // Chief complaint or reason for appointment
		diagnosis?: IDiagnosis;

		// ? Appointments can be under recurrence plan.
		recurrencePattern?: IRecurrencePlan | string;
		// Communication & Reminders
		reminders: IReminder[];

		confirmation?: {
			isConfirmed: boolean;
			confirmedAt?: Date;
			confirmedBy?: "patient" | "staff" | "system";
		};

		cancellation?: {
			cancelledAt: Date;
			cancelledBy: "patient" | "doctor" | "staff";
			reason: string;
		};

		// Follow-up & Outcomes
		followUpInstructions?: string;
		referral?: IReferral;

		createdAt: Date;
		updatedAt: Date;
	}

	// ? Allow constant follow up on the patients
	interface IRecurrencePlan {
		_id?: string;

		supervisor: IPatient | IDoctor | string;
		name: string;
		frequency: "daily" | "weekly" | "bi-weekly" | "monthly";
		interval: number;
		weekDays?: eWeekDays[];
		// dayOfMonth?: number;
		startDate?: Date;
		endDate?: Date;
		occurrenceCount?: number;
		exceptions: Date[];

		createdAt: Date;
		updatedAt: Date;
	}

	interface IReferral {
		_id?: string;

		appointment: IAppointment | string;

		reason: string;

		createdAt: Date;
		updatedAt: Date;
	}

	interface IReminder {
		_id?: string;

		user: IUser | string;

		variant: eReminderVariants;
		item: IAppointment | IMedication | string;
		body: string;

		scheduledTime: Date;
		sent: boolean;
		status?: "pending" | "sent" | "failed";

		createdAt: Date;
		updatedAt: Date;
	}

	interface IDiagnosis {
		_id?: string;

		appointment: IAppointment | string;
		patient: IPatient | string;
		doctor: IDoctor | string;

		chiefComplaint?: string; // More formal medical description

		preAppointmentNotes?: string;
		medicationsReviewed?: boolean;
		templateUsed?: string; // EHR template name

		onsetDate?: Date;
		dateResolved?: Date;

		healthStatus: IHealthStatus | string;

		// Presenting Information
		historyOfPresentIllness: string;

		differentialDiagnosis: IDifferentialDiagnosis[];
		status: eDiagnosticStatus;

		createdAt: Date;
		updatedAt: Date;
		updatedBy: IDoctor | string;
	}

	interface IDifferentialDiagnosis {
		condition: string;
		icd10Code?: string;
		confidence: eConfidenceLevel;
		reasoning?: string;
		isPrimary: boolean; // Primary vs. secondary/comorbid diagnosis
		laterality?: "left" | "right" | "bilateral"; // For side-specific conditions
		severity?: "mild" | "moderate" | "severe";
		stage?: string; // e.g., "Stage IIB", "Class 3"
		dateConfirmed: Date;
	}

	interface IVerdict {
		_id?: string;
		diagnosis: IDiagnosis | string; // Links back to the IDiagnosis record
		doctor: IDoctor | string;

		// The Final Diagnosis
		confirmedDiagnoses: IDifferentialDiagnosis[];
		
		// Clinical Impact & Assessment
		clinicalSummary: string; // Summary of the case and findings
		complications?: string[]; // Any complications identified
		prognosis: {
			outlook: "excellent" | "good" | "fair" | "poor" | "guarded";
			estimatedRecoveryTime?: string; // e.g., "2-4 weeks"
			notes?: string;
		};

		// Treatment Plan Derived from the Verdict
		treatmentPlan: {
			plan: string; // Overall description of the treatment approach
			medications: IMedication[];
			procedures?: Array<{
				type: string;
				scheduledDate?: Date;
				status: "recommended" | "scheduled" | "completed";
			}>;
			therapies?: Array<{
				type: string; // e.g., "Physical Therapy", "Occupational Therapy"
				frequency: string;
				duration: string;
			}>;
			lifestyleRecommendations?: string[];
		};

		// Follow-up and Monitoring
		followUp: {
			isRequired: boolean;
			frequency?: string; // e.g., "every 3 months"
			nextAppointmentDate?: Date;
			monitoringInstructions?: string; // What to watch for at home
		};

		// Patient Education & Communication
		patientExplanation: string; // How the diagnosis was explained to the patient in layman's terms
		patientMaterialsProvided?: string[]; // e.g., ["brochure_on_hypertension", "website_link"]

		// Verification & Sign-off
		dateFinalized?: Date;
		isConfirmed: boolean;
		requiresSecondOpinion: boolean;
		secondOpinionClinicianId?: string;

		// Metadata
		createdBy: string;
		createdAt: Date;
		updatedAt: Date;
		updatedBy: string;
	}

	// ! Forms Basis of patient follow up
	interface IHealthStatus {
		_id?: string;

		patient: IPatient | string;
		vitals: IVitals | string;

		chiefComplaint?: string;
		symptoms?: Array<{
			description: string;
			onset: Date;
			severity: number; // 1-10 scale
			duration?: string;
		}>;

		pain?: {
			location: string;
			intensity: number; // 0-10 scale
			character: string; // sharp, dull, burning, etc.
			aggravatingFactors?: string[];
			relievingFactors?: string[];
		};

		createdAt: Date;
		updatedAt: Date;
	}

	interface IMessage {
		_id?: string;

		appointment: IAppointment | string;
		body: string;
		status: eMessageStatus;
		refMessage?: IMessage | string;

		from: IUser | string;
		to: IUser | string;

		createdAt: Date;
		updatedAt: Date;
	}
}
