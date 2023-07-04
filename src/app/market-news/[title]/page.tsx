import { Article } from "@/app/components/HomeComponents/News/NewsList";
import Ticker from "@/app/components/HomeComponents/News/Ticker";
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params }: { params: { title: string } }) {
  const endpoint = `https://financialmodelingprep.com/api/v3/fmp/articles?page=0&size=999&apikey=${process.env.API_KEY}`;
  const res = await fetch(endpoint, {
    next: {
      revalidate: 6000,
    },
  });

  const news = await res.json();
  const article: Article = news.content.find(
    (article: { title: string }) =>
      article.title
        .toLowerCase()
        .replace(/\s/g, "-") // Remove spaces
        .replace(/[^a-zA-Z0-9-]/g, "-") // Replace special characters with hyphens
        .replace(/--+/g, "-") // Remove consecutive hyphens
        .replace(/^-|-$/g, "") === params.title
  );
  const filteredOtherNews = news.content.filter(
    (article: { title: string }) =>
      article.title
        .toLowerCase()
        .replace(/\s/g, "-") // Remove spaces
        .replace(/[^a-zA-Z0-9-]/g, "-") // Replace special characters with hyphens
        .replace(/--+/g, "-") // Remove consecutive hyphens
        .replace(/^-|-$/g, "") !== params.title
  );
  const trimmedNews = filteredOtherNews.slice(0, 3);
  console.log(trimmedNews);

  return (
    <div className="p-4 pt-10">
      <Ticker tickers={article.tickers} />
      <h1 className="my-4 text-4xl font-semibold text-slate-900">
        {article.title}
      </h1>
      <h2>Published at {article.date}</h2>
      <h2>by {article.author}</h2>
      <Link href={article.link} className="hover:underline">
        {article.site}
      </Link>
      <div
        className="flex flex-col gap-4 mt-4 text-lg font-normal text-slate-900"
        dangerouslySetInnerHTML={{
          __html: article.content,
        }}
      />
      <h3 className="my-4 text-4xl font-semibold text-slate-900">Other News</h3>
      <div className="flex flex-wrap gap-4 divide-x lg:flex-nowrap">
        {trimmedNews.map((article: Article) => (
          <Link
            href="#"
            key={article.title}
            className="flex w-full gap-2 py-2 pr-2 group"
          >
            <Image
              src={article.image}
              alt={article.title}
              width={100}
              height={100}
              className="object-cover object-center rounded-md"
            />
            <div className="flex flex-col">
              <h4 className="font-medium group-hover:text-blue-600">
                {article.title}
              </h4>
              <span>{article.date}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
