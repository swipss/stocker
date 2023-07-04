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
    <div className="w-full mt-4 lg:ml-6">
      <h3 className="text-3xl font-medium lg:ml-3 text-slate-900">{title}</h3>
      <div className="overflow-x-scroll scrollbar-hide">
        <ul className="flex gap-4 p-2 divide-x lg:divide-none lg:flex-col w-max">
          {stocks?.map((stock: Stock) => (
            <StockRow stock={stock} key={stock.symbol} />
          ))}
        </ul>
      </div>
    </div>
  );
}
