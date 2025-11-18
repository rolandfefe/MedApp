import ArticleSidebar from "@/components/layouts/ArticleSidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { ArticleProvider } from "@/contexts/Articles.context";
import { CurrentProvider } from "@/contexts/Current.context";
import { getArticle, getArticles } from "@/lib/actions/article.actions";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { getCurrentDoctor } from "@/lib/actions/utils.actions";
import React from "react";

export default async function layout({
	params,
	children,
}: LayoutProps<"/article/[articleId]">) {
	const { articleId } = await params;

	const [article, user, doctor, { articles }] = await Promise.all([
		getArticle(articleId),
		getCurrentUser(),
		getCurrentDoctor(),
		getArticles({}),
	]);

	return (
		<CurrentProvider user={user} doctor={doctor}>
			<ArticleProvider article={article} articlesInit={articles}>
				<SidebarProvider>
					<SidebarInset>
						<main className="p-3 relative ">
							{children}

							<SidebarTrigger className="fixed bottom-4 right-0 glass rounded-r-none" />
						</main>
					</SidebarInset>
					<ArticleSidebar />
				</SidebarProvider>
			</ArticleProvider>
		</CurrentProvider>
	);
}
