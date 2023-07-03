import StockBox from "./StockBox";

interface Currency {
  ticker: string;
  changes: any;
  ask: number;
  changesPercentage: number;
}

const endpoint = `https://financialmodelingprep.com/api/v3/fx?apikey=${process.env.API_KEY}`;

export default async function Currencies() {
  const res = await fetch(endpoint, {
    next: {
      revalidate: 6000,
    },
  });
  const data = await res.json();
  // the data returns changes instead of changesPercentage
  // so we need to map it to changesPercentage
  const topCurrencies = data?.slice(0, 5).map((currency: Currency) => {
    return {
      symbol: currency.ticker,
      change: 0,
      price: Number(currency.ask),
      changesPercentage: currency.changes,
    };
  });
  return <StockBox title="Currencies" stocks={topCurrencies} />;
}
