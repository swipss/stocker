import Image from "next/image";
import Link from "next/link";
import { IgrFinancialChart } from "igniteui-react-charts";
import Stock from "./components/HomeComponents/PopularStocks/Stock";
import PopularStocks from "./components/HomeComponents/PopularStocks/PopularStocks";
import NewsList from "./components/HomeComponents/News/NewsList";
import Gainers from "./components/HomeComponents/GainersAndLosers/Gainers";
import Losers from "./components/HomeComponents/GainersAndLosers/Losers";
import Currencies from "./components/HomeComponents/GainersAndLosers/Currencies";
import MarketStatus from "./components/HomeComponents/MarketStatus";

// https://financialmodelingprep.com/api/v3/quote/AAPL,FB,GOOG?apikey=e2738bc8f19f441f8d36c36adcf5e2ee

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-4 bg-white">
      <div className="flex flex-col-reverse w-full lg:mt-10 lg:divide-x lg:flex-row">
        <NewsList />
        <div>
          <Gainers />
          <Losers />
          <Currencies />
        </div>
      </div>
    </main>
  );
}
