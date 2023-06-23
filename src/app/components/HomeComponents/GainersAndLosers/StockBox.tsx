import StockRow from "./StockRow";

interface Stock {
  symbol: string;
  change: number;
  price: number;
  changesPercentage: number;
}

export default function StockBox({
  title,
  stocks,
}: {
  title: string;
  stocks: Stock[];
}) {
  return (
    <div className="mt-4 ml-6">
      <h3 className="ml-3 text-3xl font-medium text-slate-900">{title}</h3>
      <ul className="flex flex-col gap-4 p-2 w-max">
        {stocks?.map((stock: Stock) => (
          <StockRow stock={stock} key={stock.symbol} />
        ))}
      </ul>
    </div>
  );
}
