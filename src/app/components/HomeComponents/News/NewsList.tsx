import Article from "./Article";

export interface Article {
  title: string;
  date: string;
  content: string;
  image: string;
  tickers: string;
  author: string;
  site: string;
  link: string;
}

interface NewsData {
  content: Article[];
}
const endpoint = `https://financialmodelingprep.com/api/v3/fmp/articles?page=0&size=15&apikey=${process.env.API_KEY}`;
export default async function NewsList() {
  const res = await fetch(endpoint, {
    next: {
      revalidate: 6000,
    },
  });
  const { content: data }: NewsData = await res.json();
  return (
    <div>
      <h2 className="mb-4 text-3xl font-medium text-slate-900">Latest News</h2>
      <ul className="flex flex-col gap-10">
        {data?.map((article) => (
          <Article article={article} key={article.title} />
        ))}
      </ul>
    </div>
  );
}
