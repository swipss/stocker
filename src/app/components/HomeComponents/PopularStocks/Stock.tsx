import Link from "next/link";
import React, { FC } from "react";
import SmallChart from "./SmallChart";

export interface ChartData {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  change: number;
}

const Stock: FC<any> = ({ stock }) => {
  const renderChange = (change: number) => {
    return change > 0 ? `+${change}` : change;
  };
  const renderChangeColor = (change: number) => {
    return change > 0 ? "text-green-500" : "text-red-500";
  };
  const todaysPrice = stock.historical?.[0]?.close?.toFixed(2);
  const todaysChange = stock.historical?.[0]?.change?.toFixed(2);
  const todaysChangePercent = stock.historical?.[0]?.changePercent?.toFixed(2);
  return (
    <li
      key={stock.name}
      className="flex items-center justify-center w-full mt-4 bg-white rounded-lg shadow-neutral-200 text-neutral-500 "
    >
      <Link href="#" className="w-full">
        <h3 className="font-medium uppercase">{stock.symbol}</h3>
        <span className="text-sm font-medium">${todaysPrice}</span>
        <br />
        <span className={`${renderChangeColor(todaysChange)} mr-1 text-sm`}>
          {renderChange(todaysChange)}
        </span>
        <span className={`${renderChangeColor(todaysChangePercent)} text-sm`}>
          ({renderChange(Number(todaysChangePercent))}%)
        </span>
      </Link>
      <SmallChart stockData={stock?.historical as ChartData[]} />
    </li>
  );
};

export default Stock;
