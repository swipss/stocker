interface MarketStatusProps {
  isTheStockMarketOpen: boolean;
}

const endpoint = `https://financialmodelingprep.com/api/v3/is-the-market-open?apikey=${process.env.API_KEY}`;

export default async function MarketStatus() {
  const res = await fetch(endpoint, {
    next: {
      revalidate: 6000,
    },
  });
  const data: MarketStatusProps = await res.json();
  console.log(data?.isTheStockMarketOpen);
  const renderCircleColor = () => {
    if (data?.isTheStockMarketOpen) {
      return "bg-green-500";
    } else {
      return "bg-red-500";
    }
  };

  return (
    <div className="relative flex items-center gap-2 pl-4">
      <div className={`w-2 h-2 ${renderCircleColor()} rounded-full z-10`} />
      <p className="text-sm font-semibold text-gray-700">
        {data?.isTheStockMarketOpen
          ? "U.S markets are open"
          : "U.S markets are closed"}
      </p>
    </div>
  );
}
