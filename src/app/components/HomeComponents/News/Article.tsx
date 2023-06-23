import Image from "next/image";
import { Article as ArticleType } from "./NewsList";
import Link from "next/link";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

export default function Article({ article }: { article: ArticleType }) {
  const ticker = article.tickers.split(":")[1];

  const convertHtmlToText = (html: any) => {
    const window = new JSDOM("").window;
    const purify = DOMPurify(window);
    const sanitizedHtml = purify.sanitize(html);
    return sanitizedHtml.replace(/<[^>]*>?/gm, "");
  };

  const content = convertHtmlToText(article.content);

  return (
    <li>
      <Link href="#" className="flex w-full gap-4 pr-4 bg-white rounded-lg ">
        <Image
          src={article.image}
          alt={article.title}
          width={300}
          height={300}
          className="rounded-lg"
        />
        <div className="flex flex-col justify-between">
          <h3 className="text-xl font-medium text-slate-900">
            {article.title}
          </h3>
          <p className="text-sm text-slate-500">{content.slice(0, 300)}</p>
          <div className="flex items-center gap-2">
            <span className="px-2 text-sm font-medium text-blue-600 bg-blue-200 rounded w-max">
              {ticker}
            </span>
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
2;
