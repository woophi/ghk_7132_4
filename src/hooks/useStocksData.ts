import { useEffect, useState } from 'react';
import arynokImg from '../assets/stocks/arynok.png';
import atomImg from '../assets/stocks/atoms.png';
import europlanImg from '../assets/stocks/europlan.png';
import gazpImg from '../assets/stocks/gazp.png';
import goldImg from '../assets/stocks/gold.png';
import headImg from '../assets/stocks/hh.png';
import lukolImg from '../assets/stocks/lukol.png';
import magnitImg from '../assets/stocks/magnit.png';
import mechelImg from '../assets/stocks/mechel.png';
import mtsImg from '../assets/stocks/mts.png';
import neftImg from '../assets/stocks/neft.png';
import nikelImg from '../assets/stocks/nikel.png';
import novaImg from '../assets/stocks/nova.png';
import novatekImg from '../assets/stocks/novatek.png';
import rosneftImg from '../assets/stocks/rosneft.png';
import rostelekomImg from '../assets/stocks/rostelekom.png';
import sberImg from '../assets/stocks/sber.png';
import tatNeftImg from '../assets/stocks/tatneft.png';
import tbankImg from '../assets/stocks/tbank.png';
import vtbImg from '../assets/stocks/vtb.png';
import x5Img from '../assets/stocks/x5.png';
import yandexImg from '../assets/stocks/yandex.png';

import { GistResponse, StockItem } from '../types';

export const TICKER_TO_IMAGE: Record<string, string> = {
  SBER: sberImg,
  T: tbankImg,
  PLZL: goldImg,
  YDEX: yandexImg,
  TRNFP: neftImg,
  LKOH: lukolImg,
  GAZP: gazpImg,
  GMKN: nikelImg,
  MTLR: mechelImg,
  NVTK: novatekImg,
  ROSN: rosneftImg,
  VTBR: vtbImg,
  X5: x5Img,
  HEAD: headImg,
  TATN: tatNeftImg,
  AKMMA: arynokImg,
  RU000A10AV98: mtsImg,
  RU000A10B3A6: atomImg,
  RU000A10ANZ8: magnitImg,
  RU000A10ASC6: europlanImg,
  RU000A108CA3: novaImg,
  RU000A10ASS2: rostelekomImg,
};

const stocksToDisplay = ['SBER', 'TATN', 'ROSN', 'TRNFP', 'AKMMA'];

export const useStocksData = () => {
  const [dataAll, setStocks] = useState<{
    stocks: StockItem[];
    bonds: StockItem[];
  }>({
    stocks: [],
    bonds: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://gist.githubusercontent.com/nsdooris/a3b39707cdd7045ced1ef222543c3461/raw/');
      const data = (await response.json()) as GistResponse;

      const stocks = data.stocks
        .filter(stock => stocksToDisplay.includes(stock.ticker))
        .map(stock => ({
          ...stock,
          img: TICKER_TO_IMAGE[stock.ticker] || '',
        }));

      const funds = data.funds
        .filter(stock => stocksToDisplay.includes(stock.ticker))
        .map(fund => ({
          ...fund,
          img: TICKER_TO_IMAGE[fund.ticker] || '',
        }));

      const bonds = data.bonds.map(bond => ({
        ...bond,
        img: TICKER_TO_IMAGE[bond.ticker] || '',
      }));
      setStocks({
        bonds,
        stocks: stocks.concat(funds),
      });

      setLoading(false);
    };

    fetchData();
  }, []);

  return { dataAll, loading };
};
