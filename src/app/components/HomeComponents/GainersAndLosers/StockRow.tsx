import Link from "next/link";

interface StockRowProps {
  symbol: string;
  change: number;
  price: number;
  changesPercentage: number;
}

export default function StockRow({ stock }: { stock: StockRowProps }) {
  const renderChange = (change: number) => {
    if (change > 0) {
      return `+${change.toFixed(2)}`;
    } else {
      return change.toFixed(2);
    }
  };
  const renderChangeColor = (change: number) => {
    return change > 0
      ? "text-green-500 bg-green-200"
      : "text-red-500 bg-red-100";
  };
  return (
    <li key={stock?.symbol}>
      <Link
        href="#"
        className="grid items-center justify-center w-full grid-cols-3 p-2 transition-all rounded text-neutral-500 hover:bg-gray-100"
      >
        <h3 className="font-medium uppercase">{stock?.symbol}</h3>

        <span
          className={`${renderChangeColor(
            stock.changesPercentage
          )} flex items-center justify-center w-full px-4 py-2 font-medium rounded `}
        >
          {renderChange(stock.changesPercentage)}%
        </span>
        <span className="w-full font-medium text-center ">
          {stock?.price?.toFixed(2)}$
        </span>
      </Link>
    </li>
  );
}
