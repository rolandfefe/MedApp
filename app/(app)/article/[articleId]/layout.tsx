import ArticleSidebar from "@/components/layouts/ArticleSidebar";
import PopNotifications from "@/components/PopNotifications";
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
import GoeyProvider from "@/Providers/GoeyProvider";

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
				<GoeyProvider>
					<PopNotifications />
					<SidebarProvider
						style={{ "--sidebar-width": "25rem" } as React.CSSProperties}
					>
						<SidebarInset>
							<main className="p-3 relative ">
								{children}
								<SidebarTrigger className="fixed top-4 right-0 glass rounded-r-none" />
							</main>
						</SidebarInset>
					</SidebarProvider>
				</GoeyProvider>
				<ArticleSidebar />
			</ArticleProvider>
		</CurrentProvider>
	);
}
