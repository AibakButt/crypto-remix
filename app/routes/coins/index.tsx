import CoinModal from "~/components/CoinModal";
import { V2_MetaFunction } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { Key, useCallback, useEffect, useState } from "react";
import { action as NewCoinAction, NewCoinActionData } from './api/create';
import { loader as CoinLoader } from './api/get';
import { TOAST_TIMEOUT } from "~/utils/constants";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Crypto Currency" },
    { name: "description", content: "Crypto Curreny List" },
  ];
};

export interface ICoin {
  id: string;
  symbol: string;
  name: string;
  supply: string;
  volumeUsd24Hr: string;
  changePercent24Hr: string;
  createdAt: Date;
  updatedAt: Date;
}

export const loader = CoinLoader;
export const action = NewCoinAction;

export default function CoinsList() {

  const [searchBy, setSearchBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [coinsData, setCoinsData] = useState<ICoin[]>();
  const [activeCoin, setActiveCoin] = useState<ICoin>();
  const [apiResponse, setApiResponse] = useState<NewCoinActionData>();

  const { coins } = useLoaderData();
  let response = useActionData<typeof action>();

  useEffect(() => {
    setCoinsData(coins)
  }, [coins])

  useEffect(() => {
    setApiResponse(response)
    setTimeout(() => {
      setApiResponse(undefined)
    },TOAST_TIMEOUT) 
  }, [response])


  const onSearch = useCallback(() => {
    const lowercaseSearchTerm = searchTerm.toLowerCase();

    const tempCoins = coins && coins.filter((coin: ICoin) => {
      const lowercaseName = coin.name.toLowerCase();
      const lowercaseSymbol = coin.symbol.toLowerCase();

      if (searchBy === 'name') {
        return lowercaseName.includes(lowercaseSearchTerm);
      } else if (searchBy === 'symbol') {
        return lowercaseSymbol.includes(lowercaseSearchTerm);
      }
      return false;

    });
    setCoinsData(tempCoins)
  },[coins, searchBy, searchTerm, setCoinsData])


  return (
    <div className="flex justify-center">
      <CoinModal coin={activeCoin} setCoin={setActiveCoin} errors={apiResponse?.fieldErrors} isSuccess={apiResponse?.ok}/>
      <div className="container p-4 ">
        <div className="flex justify-center items-center w-full">
          <select className="select select-primary select-bordered " value={searchBy} onChange={({ target: { value } }) => setSearchBy(value)}>
            <option value="name">By Name</option>
            <option value="symbol">By Curreny Code</option>
          </select>
          <input type="text" value={searchTerm} placeholder="Search" className="input input-primary input-bordered w-full m-2" onChange={({ target: { value } }) => setSearchTerm(value)} />
          <button className="btn btn-active btn-primary" onClick={onSearch}>Search</button>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Trade Volume</th>
                <th>Percentage Change</th>
              </tr>
            </thead>
            <tbody>
              {coinsData && coinsData.map((coin: ICoin) => (
                <tr key={coin.id as Key} onClick={() => setActiveCoin(coin)}>
                  <th><label htmlFor="coin_modal">{coin.symbol}</label></th>
                  <td><label htmlFor="coin_modal">{coin.name}</label></td>
                  <td><label htmlFor="coin_modal">{coin.supply}</label></td>
                  <td><label htmlFor="coin_modal">{coin.volumeUsd24Hr}</label></td>
                  <td><label htmlFor="coin_modal">{coin.changePercent24Hr}</label></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
