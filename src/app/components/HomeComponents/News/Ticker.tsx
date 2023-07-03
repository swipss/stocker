export default function Ticker({ tickers }: { tickers: string }) {
  const ticker = tickers.split(":")[1];

  return (
    <span className="px-2 text-sm font-medium text-blue-600 bg-blue-200 rounded w-max">
      {ticker}
    </span>
  );
}
