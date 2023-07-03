import Stock from "./Stock";

const companies = ["AAPL", "META", "GOOG", "MSFT", "TSLA"];

const endpoint = `https://financialmodelingprep.com/api/v3/historical-price-full/${companies.join(
  ","
)}?apikey=${process.env.API_KEY}`;
async function getPopularStocks() {
  const res = await fetch(endpoint, {
    next: {
      revalidate: 6000,
    },
  });
  const data = await res.json();
  return data;
}
export default async function PopularStocks() {
  const stocks = await getPopularStocks();

  return (
    <ul className="flex w-full gap-2 overflow-x-scroll lg:overflow-visible">
      {stocks?.historicalStockList?.map((stock: any) => (
        <Stock stock={stock} key={stock.name} />
      ))}
    </ul>
  );
}
