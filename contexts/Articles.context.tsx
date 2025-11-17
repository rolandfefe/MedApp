"use client";

import useLoadMore from "@/hooks/useLoadMore";
import { getArticles } from "@/lib/actions/article.actions";
import { flattenDeep, uniqBy } from "lodash";
import {
	ComponentProps,
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useEffectEvent,
	useState,
} from "react";

interface Props extends IPagination {
	articles: IArticle[];
	setArticles: Dispatch<SetStateAction<IArticle[]>>;
	activeArticle?: IArticle;
	setActiveArticle: Dispatch<SetStateAction<IArticle | undefined>>;
}

const ArticleContext = createContext<Props | null>(null);

export const useArticles = () => {
	const context = useContext(ArticleContext);

	if (!context) throw new Error("Element should be child of 'ArticleProvider'");

	return context;
};

export const ArticleProvider = ({
	articlesInit,
	children,
	...props
}: { articlesInit: IArticle[] } & ComponentProps<"div">) => {
	const [articles, setArticles] = useState<IArticle[]>(articlesInit);
	const [activeArticle, setActiveArticle] = useState<IArticle>();
	const [nextPg, setNextPg] = useState<number>(2);
	const [hasNextPg, setHasNextPg] = useState<boolean>(true);

	const loader = useEffectEvent(async () => {
		const {
			articles: _a,
			nextPage,
			hasNextPage,
		} = await getArticles({
			page: nextPg,
		});

		setHasNextPg(hasNextPage);
		setNextPg(nextPage);
		setArticles((prev) => uniqBy([...prev, ..._a], "id"));
	});

	const sync = useEffectEvent(async () => {
		const _a = await Promise.all(
			[...Array(nextPg)].map(
				async (_, i) => (await getArticles({ page: i + 1 })).articles
			)
		);

		setArticles(uniqBy(flattenDeep(_a), "id"));
	});

	const { ref: loadRef, isLoading } = useLoadMore({ loader, hasNextPg });

	const contextValue: Props = {
		articles,
		setArticles,
		loadRef,
		isLoading,
		activeArticle,
		setActiveArticle,
	};

	useEffect(() => {
		console.log("Articles");
		sync();
	}, [articlesInit]);

	return (
		<ArticleContext.Provider value={contextValue}>
			<div {...props}>{children}</div>
		</ArticleContext.Provider>
	);
};
