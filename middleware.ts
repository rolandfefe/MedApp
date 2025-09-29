import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import "@/lib/db/models";
import { getCurrentUser } from "./lib/actions/user.actions";
import { getDoctor } from "./lib/actions/doctor.actions";

const isPublicRoute = createRouteMatcher([
	"/",
	"/home",
	"/api/webhooks/clerk",
	"/api/uploadthing",
]);

const isOnboardingRoute = createRouteMatcher([
	"/onboarding",
	"/onboarding/(.*)",
]);

const isDoctorRoute = createRouteMatcher(["/doctor/(.*)"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
	const { isAuthenticated, sessionClaims, redirectToSignIn, userId } =
		await auth();

	if (process.env.MY_ENV == "dev") {
		// For users visiting /onboarding, don't try to redirect
		if (isAuthenticated && isOnboardingRoute(req)) {
			return NextResponse.next();
		}

		// If the user isn't signed in and the route is private, redirect to sign-in
		if (!isAuthenticated && !isPublicRoute(req))
			return redirectToSignIn({ returnBackUrl: req.url });

		// Catch users who do not have `onboardingComplete: true` in their publicMetadata
		// Redirect them to the /onboarding route to complete onboarding
		if (isAuthenticated && !sessionClaims?.metadata?.onboardingComplete) {
			const onboardingUrl = new URL("/onboarding", req.url);
			return NextResponse.redirect(onboardingUrl);
		}

		// If the user is logged in and the route is protected, let them view.
		if (isAuthenticated && !isPublicRoute(req)) return NextResponse.next();
	}

	if (isDoctorRoute(req)) {
		// ! trying to apply security on doctor's file.
		const id = req.nextUrl.pathname.split("/")[1];
		// const { clerkId } = (await getDoctor({ id })).user as IUser;

		// const redirectUrl = new URL("/home", req.url);
		// console.log("📡Req: ", id, clerkId, userId, clerkId != userId);

		// if (clerkId != userId) return NextResponse.redirect(redirectUrl);
	}
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};
