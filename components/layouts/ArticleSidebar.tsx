"use client";

import { useArticles } from "@/contexts/Articles.context";
import { Home, NotebookTabs } from "lucide-react";
import BackBtn from "../btns/BackBtn";
import LinkBtn from "../btns/LinkBtn";
import ArticlesFeed from "../Feeds/ArticlesFeed";
import ArticleForm from "../forms/ArticleForm";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarTrigger,
} from "../ui/sidebar";

export default function ArticleSidebar() {
	const { activeArticle } = useArticles();

	return (
		<Sidebar variant="floating" collapsible="offcanvas" side="right">
			<SidebarHeader>
				<div className="flex items-center justify-between gap-x-2">
					<SidebarTrigger />
					<LinkBtn
						link={{ href: "/home" }}
						size="icon"
						variant="secondary"
						className="flex-1!"
					>
						<Home />
					</LinkBtn>
				</div>
			</SidebarHeader>

			<SidebarContent className="px-2">
				<ArticlesFeed.Related />
			</SidebarContent>

			<SidebarFooter>
				<div className="flex items-center justify-between gap-x-2">
					<LinkBtn
						link={{ href: `/article/${activeArticle!.id}` }}
						size="icon"
						variant="secondary"
						className="flex-1!"
					>
						<NotebookTabs />
					</LinkBtn>
					<ArticleForm.Trigger className="flex-1!" />
					<BackBtn />
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}
