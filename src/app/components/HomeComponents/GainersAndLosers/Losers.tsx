import Link from "next/link";
import StockRow from "./StockRow";
import StockBox from "./StockBox";

interface Loser {
  symbol: string;
  name: string;
  change: number;
  price: number;
  changesPercentage: number;
}

const endpoint = `https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=${process.env.API_KEY}`;

export default async function Losers() {
  const res = await fetch(endpoint, {
    next: {
      revalidate: 6000,
    },
  });
  const data: Loser[] = await res.json();
  const topLosers = data?.slice(0, 5);

  return <StockBox title="Losers" stocks={topLosers} />;
}
