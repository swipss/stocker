"use client";

import { useEffect, useRef, useState } from "react";
import useDebounce from "../helpers/useDebounce";
import Link from "next/link";
import { useOutsideClick } from "../helpers/useOutsideClick";

export default function Search() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any>([]);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: any) => {
    setSearch(e.target.value);
    if (e.target.value.length === 0) {
      setSearchResults([]);
    }
  };

  useOutsideClick(searchRef, () => {
    if (
      searchRef.current &&
      !searchRef.current.contains(document.activeElement)
    ) {
      setSearchResults([]);
    }
  });

  const debouncedSearch = useDebounce(search, 1000);
  useEffect(() => {
    if (debouncedSearch) {
      const searchLimit = 5; // Specify the limit of search results you want

      const fetchSearchResults = async () => {
        const NYSEExchangeURL = `https://financialmodelingprep.com/api/v3/search?query=${debouncedSearch}&limit=${searchLimit}&exchange=NYSE&apikey=${process.env.NEXT_PUBLIC_API_KEY}`;
        const NASDAQExchangeURL = `https://financialmodelingprep.com/api/v3/search?query=${debouncedSearch}&limit=${searchLimit}&exchange=NASDAQ&apikey=${process.env.NEXT_PUBLIC_API_KEY}`;

        try {
          const [NYSEResponse, NASDAQResponse] = await Promise.all([
            fetch(NYSEExchangeURL),
            fetch(NASDAQExchangeURL),
          ]);

          const [NYSEData, NASDAQData] = await Promise.all([
            NYSEResponse.json(),
            NASDAQResponse.json(),
          ]).then((data) => {
            return data;
          });

          const combinedData = [...NYSEData, ...NASDAQData];
          setSearchResults(combinedData);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };

      fetchSearchResults();
    }
  }, [debouncedSearch]);
  return (
    <div className="relative">
      <input
        type="text"
        className="relative w-64 p-2 text-sm border rounded-md shadow text-slate-900 shadow-gray-200 focus:outline-none"
        placeholder="Search for a stock..."
        value={search}
        onChange={handleTextChange}
      />
      {searchResults?.length > 0 && (
        <div
          ref={searchRef}
          className="absolute z-50 w-full rounded shadow-xl text-slate-900 bg-gray-50 top-10"
        >
          {searchResults?.map((result: any) => (
            <Link
              href="#"
              key={result.symbol}
              className="flex w-full gap-4 px-4 py-2 text-sm transition-all group hover:bg-blue-50"
            >
              <p className="font-semibold group-hover:text-blue-600">
                {result.symbol}
              </p>
              <p className="text-xs font-semibold truncate group-hover:text-blue-600 text-slate-500">
                {result.name}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
