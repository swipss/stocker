"use client";

import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { Article as ArticleType } from "../components/HomeComponents/News/NewsList";
import Article from "../components/HomeComponents/News/Article";
import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";

const queryClient = new QueryClient();

const fetchPosts = async (page: number) => {
  const endpoint = `https://financialmodelingprep.com/api/v3/fmp/articles?page=${page}&size=5&apikey=${process.env.NEXT_PUBLIC_API_KEY}`;
  const res = await fetch(endpoint);
  const data = await res.json();
  return data;
};
const Page = () => {
  const lastArticleRef = useRef<HTMLElement>(null);

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["query"],
    async ({ pageParam = 0 }) => {
      const response = await fetchPosts(pageParam);
      return response;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: {
        pages: [],
        pageParams: [0],
      },
    }
  );

  const { ref, entry } = useIntersection({
    root: lastArticleRef.current,
    threshold: 1,
  });
  console.log(entry);
  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry]);

  const news = data?.pages.flatMap((page) => page.content);

  return (
    <div className="flex flex-col gap-4 mt-10">
      {news?.map((article: ArticleType, i) => {
        if (i === news.length - 1) {
          return (
            <div ref={ref} key={article.title}>
              <Article article={article} />
            </div>
          );
        }
        return (
          <div key={article.title}>
            <Article article={article} key={article.title} />
          </div>
        );
      })}
      <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
        {isFetchingNextPage ? "Loading more..." : "Load More"}
      </button>
    </div>
  );
};

export default function Wrapped() {
  return (
    <QueryClientProvider client={queryClient}>
      <Page />
    </QueryClientProvider>
  );
}
