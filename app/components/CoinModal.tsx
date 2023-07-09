import React, { Dispatch, FC, SetStateAction } from "react";
import { ICoin } from "~/routes/coins";
import { CoinType } from "~/routes/coins/api/create";
import { Form } from "@remix-run/react";
import Toast from "./Toast";

interface ICoinModal {
  coin: ICoin | undefined;
  setCoin: Dispatch<SetStateAction<ICoin | undefined>>;
  errors: CoinType | null | undefined;
  isSuccess: boolean | undefined;
}

const CoinModal: FC<ICoinModal> = ({ coin, setCoin, errors, isSuccess }) => {
  if (!coin) return (
    <div className="modal" id="coin_modal">
      <div className="modal-box">
        <h3>No Coin Data.</h3>
      </div></div>
  )
  return (
    <React.Fragment>
      <input type="checkbox" id="coin_modal" className="modal-toggle" />
      <div className="modal" id="coin_modal">
        <div className="modal-box">
        {isSuccess && <Toast message="Coin Added Successfully" type="success"/>}
          <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
            <h2 className="font-bold text-xl text-center">Coin Details</h2>
            <Form method="post" action="/coins">
              <div className="mb-4">
                <label htmlFor="symbol" className="block mb-2 text-sm font-medium text-gray-700">Symbol</label>
                <input type="text" value={coin.symbol} onChange={({target: {value}}) => setCoin({...coin, symbol: value})} id="symbol" name="symbol" className="w-full input input-primary rounded-md" />
                <p className="text-red-400">{errors?.symbol && errors.symbol}</p>
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                <input type="text" value={coin.name} onChange={({target: {value}}) => setCoin({...coin, name: value})} id="name" name="name" className="w-full input input-primary rounded-md " />
                <p className="text-red-400">{errors?.name && errors.name}</p>
             </div>
              <div className="mb-4">
                <label htmlFor="supply" className="block mb-2 text-sm font-medium text-gray-700">Supply</label>
                <input type="text" value={coin.supply} onChange={({target: {value}}) => setCoin({...coin, supply: value})} id="supply" name="supply" className="w-full input input-primary rounded-md " />
                <p className="text-red-400">{errors?.supply && errors.supply}</p>
              </div>
              <div className="mb-4">
                <label htmlFor="volumeUsd24Hr" className="block mb-2 text-sm font-medium text-gray-700">Volume (USD 24hr)</label>
                <input type="text" value={coin.volumeUsd24Hr} onChange={({target: {value}}) => setCoin({...coin, volumeUsd24Hr: value})} id="volumeUsd24Hr" name="volumeUsd24Hr" className="w-full input input-primary rounded-md " />
                <p className="text-red-400">{errors?.volumeUsd24Hr && errors.volumeUsd24Hr}</p>
              </div>
              <div className="mb-4">
                <label htmlFor="changePercent24Hr" className="block mb-2 text-sm font-medium text-gray-700">Change Percent (24hr)</label>
                <input type="text" value={coin.changePercent24Hr} onChange={({target: {value}}) => setCoin({...coin, changePercent24Hr: value})} id="changePercent24Hr" name="changePercent24Hr" className="w-full input input-primary rounded-md " />
                <p className="text-red-400">{errors?.changePercent24Hr && errors.changePercent24Hr}</p>
              </div>
              <div className="flex justify-end">
                <button type="submit" disabled={isSuccess}className="px-4 py-2 btn btn-primary text-white rounded-md hover:bg-blue-600">Submit</button>
              </div>
            </Form>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="coin_modal">Close</label>
      </div>
    </React.Fragment>
  )
}

export default CoinModal;

