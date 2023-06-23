import Link from "next/link";
import StockRow from "./StockRow";
import StockBox from "./StockBox";

interface Gainer {
  symbol: string;
  name: string;
  change: number;
  price: number;
  changesPercentage: number;
}

const endpoint = `https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=${process.env.API_KEY}`;

export default async function Gainers() {
  const res = await fetch(endpoint);
  const data: Gainer[] = await res.json();
  const topGainers = data?.slice(0, 5);

  return <StockBox title="Gainers" stocks={topGainers} />;
}
