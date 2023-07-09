import { ActionFunction, json } from '@remix-run/node';
import { db } from '~/utils/db.server';
import { validateChangePercent, validateName, validateSupply, validateSymbol, validateVolumeUsd } from './validations';

export type CoinType = {
  symbol: string;
  name: string;
  supply: string;
  volumeUsd24Hr: string;
  changePercent24Hr: string;
}

export type NewCoinActionData = {
  formError?: string | null;
  fieldErrors?: CoinType | null;
  fields?: CoinType | null;
  ok?: boolean;
};

const badRequest = (data: NewCoinActionData) => {
  return json(data, { status: 400 });
};

export const action: ActionFunction = async ({ request }) => {
  //setting values to fields from request
  const coin = await request.formData();

  const symbol = coin.get("symbol");
  const name = coin.get("name");
  const supply = coin.get("supply");
  const volumeUsd24Hr = coin.get("volumeUsd24Hr");
  const changePercent24Hr = coin.get("changePercent24Hr");

  if (
    typeof symbol !== "string" ||
    typeof name !== "string" ||
    typeof supply !== "string" ||
    typeof volumeUsd24Hr !== "string" ||
    typeof changePercent24Hr !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Form not submitted correctly.",
    });
  }

  //validation
  const fieldErrors = {
    symbol: validateSymbol(symbol),
    name: validateName(name),
    supply: validateSupply(supply),
    volumeUsd24Hr: validateVolumeUsd(volumeUsd24Hr),
    changePercent24Hr: validateChangePercent(changePercent24Hr),
  };

  const fields = { symbol, name, supply, volumeUsd24Hr, changePercent24Hr };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  //Add Coin into db
  try {
    const newCoin = await db.coin.create({
      data: fields
    })
    return json({ ok: true, message: "Coin Added Successfully", newCoin});
  } catch (err) {
    return badRequest({
      formError: "Internal Server Error",
    });
  }
  
};
