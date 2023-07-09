import { json } from '@remix-run/node';
import { LoaderFunction } from 'remix';
import { COINS_API_ENDPOINT } from '~/utils/constants';

export const loader: LoaderFunction = async () => {

  const response = await fetch(COINS_API_ENDPOINT);
  const { data } = await response.json();
  return json({coins: data});

};