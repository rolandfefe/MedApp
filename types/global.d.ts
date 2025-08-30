import { eGender, eMaritalStatus } from "@/constants/enums";

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

		createdAt?: Date;
		updatedAt?: Date;
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
			packsPerDay?: number;
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
		substance: string;
		reaction: string;
		severity: "mild" | "moderate" | "severe";
		onsetDate?: Date;
		documentedBy: string;
		lastReactionDate?: Date;
	}

	interface IMedication {
		_id?: string;
		name: string;
		dosage: string;
		frequency: string;
		route: "oral" | "topical" | "injection" | "inhalation" | "other";
		startDate: Date;
		endDate?: Date;
		prescribedBy: string;
		reason: string;
		active: boolean;
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

		// Authorship Information
		authors: IDoctor[];

		// Publication Metadata
		publication: {
			journalName: string;
			publisher: string;
			volume?: string;
			issue?: string;
			publicationDate: Date;
			epubDate?: Date; // Date published online first
			pageRange?: string; // e.g., "102-115"
		};

		// Article Content
		content: {
			abstract: string;
			keywords: string[];
			body: Array<{
				sectionTitle: string;
				sectionContent: string;
				// For more complex content, this could be an array of text, image references, etc.
			}>;
			references: Array<{
				id: string; // e.g., "1", "[1]"
				citation: string; // Full APA/AMA/Vancouver format citation
				doi?: string;
			}>;
		};

		// Medical & Scientific Metadata
		scientificData: {
			articleType:
				| "research"
				| "review"
				| "case-report"
				| "editorial"
				| "letter";
			studyType?:
				| "randomized-controlled-trial"
				| "cohort"
				| "case-control"
				| "cross-sectional";
			peerReviewed: boolean;
			conflictOfInterestStatement: string;
			fundingStatement?: string;
			acknowledgements?: string;
		};

		// Licensing and Copyright
		licensing: {
			copyright: string; // e.g., "© 2023 American Medical Association"
			licenseType: string; // e.g., "CC-BY-NC 4.0"
			isOpenAccess: boolean;
		};

		// Related Data
		related: {
			figures: Array<{
				id: string;
				caption: string;
				url: string;
				type: "image" | "chart" | "graph" | "table";
			}>;
			tables: Array<{
				id: string;
				title: string;
				htmlContent?: string; // Or a structured data object
			}>;
			supplementaryMaterials?: Array<{
				id: string;
				title: string;
				url: string;
				description: string;
			}>;
		};

		// Metadata for discoverability and administration
		meta: {
			wordCount: number;
			revisionHistory: Array<{
				version: number;
				date: Date;
				description: string; // e.g., "Submitted", "Accepted", "Corrected Proof"
			}>;
			citationCount?: number;
			firstReceivedDate: Date;
			acceptedDate: Date;
			categories: string[]; // MeSH terms or other categories
		};
	}

	// Example of a more complex reference interface
	interface IArticleReference {
		id: string;
		authors: string[];
		publicationYear: number;
		title: string;
		journal?: string;
		volume?: string;
		issue?: string;
		pageNumbers?: string;
		doi?: string;
		pmid?: string; // PubMed ID
	}

	// Example of a more complex body content interface for structured data
	interface IArticleSection {
		sectionTitle: string;
		paragraphs: string[];
		figures?: string[]; // Array of figure IDs
		tables?: string[]; // Array of table IDs
	}
}
