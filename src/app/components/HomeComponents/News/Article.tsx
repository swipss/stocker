"use client";

import Image from "next/image";
import { Article as ArticleType } from "./NewsList";
import Link from "next/link";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import Ticker from "./Ticker";
import { sanitize } from "dompurify";

export default function Article({ article }: { article: ArticleType }) {
  const convertHtmlToText = (html: any) => {
    const sanitizedHtml = sanitize(html);
    return sanitizedHtml.replace(/<[^>]*>?/gm, "");
  };

  const content = convertHtmlToText(article.content);
  const convertedText = article?.title
    ?.toLowerCase()
    .replace(/\s/g, "-") // Remove spaces
    .replace(/[^a-zA-Z0-9-]/g, "-") // Replace special characters with hyphens
    .replace(/--+/g, "-") // Remove consecutive hyphens
    .replace(/^-|-$/g, ""); // Remove hyphens from the beginning or end of the string

  return (
    <li className="list-none">
      <Link
        href={`/market-news/${convertedText}?title=${article.title}`}
        as={{
          pathname: `/market-news/${convertedText}`,
        }}
        className="flex flex-col w-full gap-4 pr-4 bg-white rounded-lg group md:flex-row"
      >
        <Image
          src={article.image}
          alt={article.title}
          width={200}
          height={100}
          className="object-cover object-center w-full rounded-lg"
        />
        <div className="flex flex-col justify-start gap-4">
          <h3 className="text-xl font-medium text-slate-900 group-hover:text-blue-600">
            {article.title}
          </h3>
          <p className="text-sm text-slate-500">{content.slice(0, 300)}...</p>
          <div className="flex items-center gap-2">
            <Ticker tickers={article.tickers} />
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
            <span className="text-sm text-slate-500">
              {new Date(article.date).toLocaleDateString()}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
