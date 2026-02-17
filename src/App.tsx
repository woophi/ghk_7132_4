import { AmountInput } from '@alfalab/core-components/amount-input/cssm';
import { Button } from '@alfalab/core-components/button/cssm';
import { Collapse } from '@alfalab/core-components/collapse/cssm';
import { Divider } from '@alfalab/core-components/divider/cssm';
import { Gap } from '@alfalab/core-components/gap/cssm';
import { PureCell } from '@alfalab/core-components/pure-cell/cssm';
import { Radio } from '@alfalab/core-components/radio/cssm';
import { Status } from '@alfalab/core-components/status/cssm';
import { Steps } from '@alfalab/core-components/steps/cssm';
import { Switch } from '@alfalab/core-components/switch/cssm';
import { Typography } from '@alfalab/core-components/typography/cssm';
import { CheckmarkMIcon } from '@alfalab/icons-glyph/CheckmarkMIcon';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { ChevronRightMIcon } from '@alfalab/icons-glyph/ChevronRightMIcon';
import { ChevronUpMIcon } from '@alfalab/icons-glyph/ChevronUpMIcon';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import hb from './assets/hb.jpg';
import img1 from './assets/img1.png';
import img2 from './assets/img2.png';
import img3 from './assets/img3.png';
import img4 from './assets/img4.png';
import img5 from './assets/img5.png';
import img6 from './assets/img6.png';
import op1Img from './assets/op1.png';
import op2Img from './assets/op2.png';
import op3Img from './assets/op3.png';
import op4Img from './assets/op4.png';
import p1Img from './assets/p1.png';
import p2Img from './assets/p2.png';
import p3Img from './assets/p3.png';
import p4Img from './assets/p4.png';
import { useStocksData } from './hooks/useStocksData';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';
import { sendDataToGA } from './utils/events';
import { getWordEnding } from './utils/words';
import { WaitIcon } from './WaitIcon';

const targets = [
  {
    title: 'Получать пассивный доход от накоплений',
    img: img1,
  },
  {
    title: 'Накопить на образование детей',
    img: img2,
  },
  {
    title: 'Выйти на пенсию досрочно',
    img: img3,
  },
  {
    title: 'Больше путешествовать',
    img: img4,
  },
  {
    title: 'Купить дом и жить у моря на пенсии',
    img: img5,
  },
  {
    title: 'Создать начальный капитал для детей',
    img: img6,
  },
];

const pluses = [
  {
    title: '0% налога',
    subtitle: 'На доход до 30 млн руб',
    img: p1Img,
  },
  {
    title: 'До 88 000 ₽',
    subtitle: 'Можно получить за счёт налогового вычета',
    img: p2Img,
  },
  {
    title: '21,56% годовых',
    subtitle: 'Инвестиционный доход за 2024 год',
    img: p3Img,
  },
  {
    title: 'Деньги под защитой',
    subtitle: 'Застрахованы на сумму до 2,8 млн ₽',
    img: p4Img,
  },
];

const faqs = [
  {
    question: 'Какую сумму нужно внести при оформлении договора?',
    answers: ['Счёт можно пополнять на любую сумму. А чтобы получать вычеты, счёт нельзя закрывать в течение пяти лет.'],
  },
  {
    question: 'Какие налоговые вычеты можно получить',
    answers: [
      'Вы можете получить сразу два вычета — на взнос и на доход. Чтобы их получать, ИИС‑3 нельзя закрывать в течение пяти лет.',
      'На взносы',
      'При вычете на взносы вы можете возвращать ежегодно:',
      'до 52 000 ₽, если платите 13% НДФЛ;',
      'до 60 000 ₽, если платите 15% НДФЛ.',
      'На доход',
      'При вычете на доход можно освободить полученный доход от сделок с ценными бумагами до 30 млн ₽, за исключением дивидендов при закрытии счёта.',
    ],
  },
  {
    question: 'Смогу забрать деньги раньше?',
    answers: ['Да, но только при закрытии ИИС и возврате полученных вычетов от государства.'],
  },
];

const strategies = [
  {
    name: 'Облигации с переменным купоном',
    risk: 'НИЗКИЙ РИСК',
    color: 'green',
    income: '8-17%',
    minSum: '100 ₽',
    itemBlue: {
      text: '97,58% облигации',
      width: '97%',
    },
    itemPink: {
      text: '2,42% Муниципальные ценные бумаги',
    },
  },
  {
    name: 'Тихая гавань 2.0',
    risk: 'НИЗКИЙ РИСК',
    color: 'green',
    income: '12-17%',
    minSum: '100 ₽',
    itemBlue: {
      text: '90,66% Паи фондов',
      width: '90%',
    },
    itemPink: {
      text: '9,27% Облигации',
    },
  },
  {
    name: 'Золото 2',
    risk: 'СРЕДНИЙ РИСК',
    color: 'orange',
    income: '19-22%',
    minSum: '100 ₽',
    itemBlue: {
      text: '100% паи биржевого фонда',
      width: '100%',
    },
  },
  {
    name: 'Квант',
    risk: 'ВЫСОКИЙ РИСК',
    color: 'red',
    income: '20-25%',
    minSum: '100 ₽',
    itemBlue: {
      text: '100% акции',
      width: '100%',
    },
  },
];

const openingSteps = [
  {
    title: 'Накопить на жилье',
    img: op1Img,
    link: 'buildings' as const,
  },
  {
    title: 'Пассивный доход',
    img: op2Img,
    link: 'passive' as const,
  },
  {
    title: 'Сохранить от инфляции',
    img: op3Img,
    link: 'inflation' as const,
  },
  {
    title: 'Попробовать инвестиции',
    img: op4Img,
    link: 'invest' as const,
  },
];

const fonds = [
  {
    name: 'Накопительный',
    forPpl: 'Для осторожных инвесторов',
    risk: 'НИЗКИЙ РИСК',
    color: 'green',
    income: '9-12%',
    itemBlue: {
      text: '99.8% корпоративные облигации',
      width: '95%',
    },
    itemPink: {
      text: '0,2% ценные бумаги РФ',
    },
  },
  {
    name: 'Облигации Плюс',
    forPpl: 'Для сбалансированного дохода',
    risk: 'СРЕДНИЙ РИСК',
    color: 'orange',
    income: '11-32%',
    itemBlue: {
      text: '61,7% корпоративные облигации',
      width: '62%',
    },
    itemPink: {
      text: '38,3% ценные бумаги РФ',
    },
  },
  {
    name: 'Ликвидные акции',
    forPpl: 'Для агрессивных инвесторов',
    risk: 'ВЫСОКИЙ РИСК',
    color: 'red',
    income: '9-33%',
    itemBlue: {
      text: '84,7% акции',
      width: '85%',
    },
    itemPink: {
      text: '15,3% ценные бумаги РФ',
    },
  },
];

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [collapsedItems, setCollapsedItem] = useState<string[]>([]);
  const [steps, setSteps] = useState<'init' | 'opening' | 'buildings' | 'passive' | 'inflation' | 'invest'>();
  const [selectedStrategy, setSelectedStrategy] = useState('');
  const [stockSlots, setStockSlots] = useState<{ ticker: string; lots: number }[]>([]);
  const [bondsSlots, setBondsSlots] = useState<{ ticker: string; lots: number }[]>([]);
  const [selectedFund, setSelectedFund] = useState('');

  const {
    dataAll: { bonds, stocks },
  } = useStocksData();

  useEffect(() => {
    if (!LS.getItem(LSKeys.UserId, null)) {
      LS.setItem(LSKeys.UserId, Date.now());
    }
  }, []);

  const submit = (skipLog?: boolean) => {
    if (!skipLog) {
      window.gtag('event', '7132_next_click', { var: 'var4' });
    }
    setLoading(true);

    let activeList = 'none';
    switch (steps) {
      case 'buildings':
        activeList = selectedStrategy || 'none';
        break;
      case 'passive':
        activeList =
          stockSlots
            .map(slot => `${stocks.find(stock => stock.ticker === slot.ticker)?.name || slot.ticker}: ${slot.lots}`)
            .join('; ') || 'none';
        break;
      case 'inflation':
        activeList =
          bondsSlots
            .map(slot => `${bonds.find(bond => bond.ticker === slot.ticker)?.name || slot.ticker}: ${slot.lots}`)
            .join('; ') || 'none';
        break;

      case 'invest':
        activeList = selectedFund || 'none';
        break;

      default:
        break;
    }

    sendDataToGA({
      active_list: activeList,
    }).then(() => {
      LS.setItem(LSKeys.ShowThx, true);
      setThx(true);
      setLoading(false);
    });
  };

  if (thxShow) {
    return <ThxLayout />;
  }

  if (steps === 'invest') {
    return (
      <>
        <div className={appSt.container}>
          <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h1" view="medium" font="system" weight="semibold">
            Выберите фонд
          </Typography.TitleResponsive>

          {fonds.map((fond, index) => (
            <div
              className={appSt.boxInfo({ selected: selectedFund === fond.name })}
              key={index}
              onClick={() => setSelectedFund(fond.name)}
            >
              <div className={appSt.rowSb}>
                <Status view="contrast" color={fond.color as 'red' | 'green' | 'orange'} size={20}>
                  <Typography.Text view="secondary-small" weight="bold">
                    {fond.risk}
                  </Typography.Text>
                </Status>

                <Radio checked={selectedFund === fond.name} onChange={() => setSelectedFund(fond.name)} />
              </div>

              <div>
                <Typography.TitleResponsive tag="h4" view="small" font="system" weight="semibold">
                  {fond.name}
                </Typography.TitleResponsive>
                <Typography.Text view="primary-small">{fond.forPpl}</Typography.Text>
              </div>

              <div>
                <Typography.Text view="component-secondary" color="secondary" className={appSt.row}>
                  Доходность:
                  <Typography.TitleResponsive tag="h5" view="xsmall" font="system" weight="bold" color="positive">
                    {fond.income}
                  </Typography.TitleResponsive>
                </Typography.Text>
              </div>

              <div className={appSt.btms}>
                <Typography.Text view="component-secondary" color="secondary">
                  Состав портфеля
                </Typography.Text>

                <div className={appSt.progressBarContainer}>
                  <div className={appSt.progressBarFill} style={{ width: fond.itemBlue.width }} />
                </div>

                <div className={appSt.row}>
                  <div className={appSt.dot({ color: 'blue' })} />
                  <Typography.Text view="component-secondary" color="secondary">
                    {fond.itemBlue.text}
                  </Typography.Text>
                </div>
                <div className={appSt.row}>
                  <div className={appSt.dot({ color: 'pink' })} />
                  <Typography.Text view="component-secondary" color="secondary">
                    {fond.itemPink.text}
                  </Typography.Text>
                </div>
              </div>
            </div>
          ))}
          <Typography.Text view="primary-small" color="secondary">
            Не является индивидуальной инвестиционной рекомендацией
          </Typography.Text>
        </div>

        <Gap size={96} />

        <div className={appSt.bottomBtn}>
          <Button block view="primary" onClick={() => submit()} loading={loading}>
            Продолжить
          </Button>
        </div>
      </>
    );
  }

  if (steps === 'inflation') {
    return (
      <>
        <div className={appSt.container}>
          <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h1" view="medium" font="system" weight="semibold">
            Выберите активы
          </Typography.TitleResponsive>

          {bonds.map(stock => {
            const isBondSelected = bondsSlots.some(slot => slot.ticker === stock.ticker);
            const value = bondsSlots.find(slot => slot.ticker === stock.ticker)?.lots ?? 1;
            return (
              <div key={stock.ticker} className={appSt.stockBox}>
                <PureCell>
                  <PureCell.Graphics verticalAlign="center">
                    <img src={stock.img} width={48} height={48} alt={stock.ticker} />
                  </PureCell.Graphics>
                  <PureCell.Content>
                    <PureCell.Main>
                      <Typography.Text view="primary-medium" weight="bold">
                        {stock.name}
                      </Typography.Text>

                      <Typography.Text view="primary-small" color="secondary">
                        Текущая цена: {stock.price_today.toLocaleString('ru-RU')} ₽
                      </Typography.Text>
                    </PureCell.Main>
                  </PureCell.Content>
                  <PureCell.Addon verticalAlign="center">
                    <Switch
                      checked={isBondSelected}
                      onChange={() => {
                        // add or remove from bondsSlots
                        setBondsSlots(slots => {
                          if (slots.some(slot => slot.ticker === stock.ticker)) {
                            return slots.filter(slot => slot.ticker !== stock.ticker);
                          } else {
                            return [...slots, { ticker: stock.ticker, lots: 1 }];
                          }
                        });
                      }}
                    />
                  </PureCell.Addon>
                </PureCell>

                {isBondSelected && (
                  <>
                    <Divider />

                    <AmountInput
                      value={value}
                      labelView="outer"
                      label={`1 лот = ${stock.lot} шт`}
                      minority={1}
                      bold={false}
                      suffix={getWordEnding(value, ['лот', 'лота', 'лотов'])}
                      block
                      onChange={(_, { value }) => {
                        setBondsSlots(slots =>
                          slots.map(slot => (slot.ticker === stock.ticker ? { ...slot, lots: value || 1 } : slot)),
                        );
                      }}
                      stepper={{ step: 1, min: 1, max: 1_000 }}
                    />
                  </>
                )}
              </div>
            );
          })}

          <Typography.Text view="primary-small" color="secondary">
            Не является индивидуальной инвестиционной рекомендацией
          </Typography.Text>
        </div>

        <Gap size={96} />

        <div className={appSt.bottomBtn}>
          <Button block view="primary" onClick={() => submit()} loading={loading}>
            Продолжить
          </Button>
        </div>
      </>
    );
  }

  if (steps === 'passive') {
    return (
      <>
        <div className={appSt.container}>
          <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h1" view="medium" font="system" weight="semibold">
            Выберите активы
          </Typography.TitleResponsive>

          {stocks.map(stock => {
            const isStockSelected = stockSlots.some(slot => slot.ticker === stock.ticker);
            const value = stockSlots.find(slot => slot.ticker === stock.ticker)?.lots ?? 1;
            return (
              <div key={stock.ticker} className={appSt.stockBox}>
                <PureCell>
                  <PureCell.Graphics verticalAlign="center">
                    <img src={stock.img} width={48} height={48} alt={stock.ticker} />
                  </PureCell.Graphics>
                  <PureCell.Content>
                    <PureCell.Main>
                      <Typography.Text view="primary-medium" weight="bold">
                        {stock.name}
                      </Typography.Text>

                      <Typography.Text view="primary-small" color="secondary">
                        Текущая цена: {stock.price_today.toLocaleString('ru-RU')} ₽
                      </Typography.Text>
                    </PureCell.Main>
                  </PureCell.Content>
                  <PureCell.Addon verticalAlign="center">
                    <Switch
                      checked={isStockSelected}
                      onChange={() => {
                        // add or remove from stockSlots
                        setStockSlots(slots => {
                          if (slots.some(slot => slot.ticker === stock.ticker)) {
                            return slots.filter(slot => slot.ticker !== stock.ticker);
                          } else {
                            return [...slots, { ticker: stock.ticker, lots: 1 }];
                          }
                        });
                      }}
                    />
                  </PureCell.Addon>
                </PureCell>

                {isStockSelected && (
                  <>
                    <Divider />

                    <AmountInput
                      value={value}
                      labelView="outer"
                      label={`1 лот = ${stock.lot} шт`}
                      minority={1}
                      bold={false}
                      suffix={getWordEnding(value, ['лот', 'лота', 'лотов'])}
                      block
                      onChange={(_, { value }) => {
                        setStockSlots(slots =>
                          slots.map(slot => (slot.ticker === stock.ticker ? { ...slot, lots: value || 1 } : slot)),
                        );
                      }}
                      stepper={{ step: 1, min: 1, max: 1_000 }}
                    />
                  </>
                )}
              </div>
            );
          })}

          <Typography.Text view="primary-small" color="secondary">
            Не является индивидуальной инвестиционной рекомендацией
          </Typography.Text>
        </div>

        <Gap size={96} />

        <div className={appSt.bottomBtn}>
          <Button block view="primary" onClick={() => submit()} loading={loading}>
            Продолжить
          </Button>
        </div>
      </>
    );
  }

  if (steps === 'buildings') {
    return (
      <>
        <div className={appSt.container}>
          <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h1" view="medium" font="system" weight="semibold">
            Выберите стратегию
          </Typography.TitleResponsive>

          {strategies.map((strategy, index) => (
            <div
              className={appSt.boxInfo({ selected: selectedStrategy === strategy.name })}
              key={index}
              onClick={() => setSelectedStrategy(strategy.name)}
            >
              <div className={appSt.rowSb}>
                <Status view="contrast" color={strategy.color as 'red' | 'green' | 'orange'} size={20}>
                  <Typography.Text view="secondary-small" weight="bold">
                    {strategy.risk}
                  </Typography.Text>
                </Status>

                <Radio checked={selectedStrategy === strategy.name} onChange={() => setSelectedStrategy(strategy.name)} />
              </div>

              <div>
                <Typography.TitleResponsive tag="h4" view="small" font="system" weight="semibold">
                  {strategy.name}
                </Typography.TitleResponsive>
              </div>

              <div>
                <Typography.Text view="component-secondary" color="secondary" className={appSt.row}>
                  Доходность:
                  <Typography.TitleResponsive tag="h5" view="xsmall" font="system" weight="bold" color="positive">
                    {strategy.income}
                  </Typography.TitleResponsive>
                </Typography.Text>
              </div>

              <div>
                <Typography.Text view="component-secondary" color="secondary" className={appSt.row}>
                  Минимальная сумма
                  <Typography.TitleResponsive tag="h5" view="xsmall" font="system" weight="bold" color="primary">
                    {strategy.minSum}
                  </Typography.TitleResponsive>
                </Typography.Text>
              </div>

              <div className={appSt.btms}>
                <Typography.Text view="component-secondary" color="secondary">
                  Состав портфеля
                </Typography.Text>

                <div className={appSt.progressBarContainer}>
                  <div className={appSt.progressBarFill} style={{ width: strategy.itemBlue.width }} />
                </div>

                <div className={appSt.row}>
                  <div className={appSt.dot({ color: 'blue' })} />
                  <Typography.Text view="component-secondary" color="secondary">
                    {strategy.itemBlue.text}
                  </Typography.Text>
                </div>
                {strategy.itemPink && (
                  <div className={appSt.row}>
                    <div className={appSt.dot({ color: 'pink' })} />
                    <Typography.Text view="component-secondary" color="secondary">
                      {strategy.itemPink.text}
                    </Typography.Text>
                  </div>
                )}
              </div>
            </div>
          ))}
          <Typography.Text view="primary-small" color="secondary">
            Не является индивидуальной инвестиционной рекомендацией
          </Typography.Text>
        </div>

        <Gap size={96} />

        <div className={appSt.bottomBtn}>
          <Button block view="primary" onClick={() => submit()} loading={loading}>
            Продолжить
          </Button>
        </div>
      </>
    );
  }

  if (steps === 'opening') {
    return (
      <>
        <div className={appSt.container}>
          <Gap size={8} />
          <WaitIcon />
          <Typography.TitleResponsive tag="h1" view="small" font="system" weight="semibold">
            ИИС открывается
          </Typography.TitleResponsive>
          <div style={{ borderRadius: '1rem', backgroundColor: '#F6F6FD' }} className={appSt.container}>
            <Typography.TitleResponsive tag="h4" view="xsmall" font="system" weight="semibold">
              Выберите цель инвестирования и мы подберем активы
            </Typography.TitleResponsive>

            {openingSteps.map((adv, index) => (
              <PureCell
                key={index}
                className={appSt.openingCell}
                onClick={() => {
                  window.gtag('event', '7132_goal_select_var4', { goal: adv.title });

                  setSteps(adv.link);
                }}
              >
                <PureCell.Graphics verticalAlign="center">
                  <img src={adv.img} width={48} height={48} alt="house" />
                </PureCell.Graphics>
                <PureCell.Content>
                  <PureCell.Main>
                    <Typography.Text view="primary-small">{adv.title}</Typography.Text>
                  </PureCell.Main>
                </PureCell.Content>
                <PureCell.Graphics verticalAlign="center">
                  <ChevronRightMIcon />
                </PureCell.Graphics>
              </PureCell>
            ))}
          </div>
        </div>

        <Gap size={96} />

        <div className={appSt.bottomBtn}>
          <Button
            block
            view="secondary"
            onClick={() => {
              window.gtag('event', '7132_skip_click', { var: 'var4' });
              submit(true);
            }}
            loading={loading}
          >
            Пропустить
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={appSt.container}>
        <div className={appSt.boxHb}>
          <Typography.TitleResponsive tag="h1" view="xlarge" font="system" weight="semibold">
            ИИС
          </Typography.TitleResponsive>
          <img src={hb} alt="hb" height={199} width={309} style={{ objectFit: 'contain', marginBottom: '-25px' }} />
        </div>
        <div className={appSt.boxUnderHb}>
          <Typography.Text view="primary-medium">
            Более 2 млн пользователей
            <br />
            за 2025 оформили ИИС
          </Typography.Text>
        </div>

        <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h4" view="small" font="system" weight="semibold">
          Описание программы:
        </Typography.TitleResponsive>
        <Typography.Text view="primary-medium">
          Индивидуальный инвестиционный счёт или ИИС — это специальный брокерский счёт с налоговыми льготами
        </Typography.Text>

        <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h4" view="small" font="system" weight="semibold">
          Копите на любые цели и мечты
        </Typography.TitleResponsive>
        <div>
          <Swiper style={{ marginLeft: '0' }} spaceBetween={12} slidesPerView="auto">
            {targets.map((target, index) => (
              <SwiperSlide className={appSt.sliderContainer} key={index}>
                <div className={appSt.sliderBox}>
                  <img src={target.img} width="100%" height={112} style={{ marginTop: '-60px' }} alt={target.title} />
                  <Typography.Text view="primary-small" weight="bold" style={{ maxWidth: '180px' }}>
                    {target.title}
                  </Typography.Text>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h4" view="small" font="system" weight="semibold">
          Плюсы программы:
        </Typography.TitleResponsive>

        {pluses.map((adv, index) => (
          <PureCell key={index}>
            <PureCell.Graphics verticalAlign="center">
              <img src={adv.img} width={48} height={48} alt="house" />
            </PureCell.Graphics>
            <PureCell.Content>
              <PureCell.Main>
                <Typography.Text view="primary-medium" weight="bold">
                  {adv.title}
                </Typography.Text>

                <Typography.Text view="primary-medium" color="secondary">
                  {adv.subtitle}
                </Typography.Text>
              </PureCell.Main>
            </PureCell.Content>
          </PureCell>
        ))}

        <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h4" view="small" font="system" weight="semibold">
          Как работает программа
        </Typography.TitleResponsive>

        <Steps isVerticalAlign interactive={false} className={appSt.stepStyle}>
          <span>
            <Typography.Text tag="p" defaultMargins={false} view="primary-medium">
              Вносите любую сумму
            </Typography.Text>
            <Typography.Text view="primary-small" color="secondary">
              Для удобства можно подключить автоплатёж
            </Typography.Text>
          </span>
          <span>
            <Typography.Text tag="p" defaultMargins={false} view="primary-medium">
              Государство возвращает налоговый вычет до 88 000 ₽
            </Typography.Text>
          </span>
          <span>
            <Typography.Text tag="p" defaultMargins={false} view="primary-medium">
              Инвестируйте деньги в акции и облигации и получайте доход
            </Typography.Text>
          </span>
        </Steps>

        <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h4" view="small" font="system" weight="semibold">
          Деньги под защитой
        </Typography.TitleResponsive>

        <PureCell>
          <PureCell.Graphics verticalAlign="top">
            <CheckmarkMIcon color="#0D9336" />
          </PureCell.Graphics>
          <PureCell.Content>
            <PureCell.Main>
              <Typography.Text view="primary-medium">
                Застрахованы на сумму до 2,8 млн ₽ в Агентстве по страхованию вкладов
              </Typography.Text>
            </PureCell.Main>
          </PureCell.Content>
        </PureCell>

        <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h4" view="small" font="system" weight="semibold">
          Какие налоговые вычеты можно получить
        </Typography.TitleResponsive>

        <Typography.Text view="primary-medium">
          <b>Вычет на взносы.</b> Позволяет вернуть 13% от суммы пополнений ИИС — до 52 000 ₽ в год. Чтобы получить вычет,
          нужно иметь официальный доход, облагаемый НДФЛ.
        </Typography.Text>
        <Typography.Text view="primary-medium">
          <b>Вычет на доход.</b> Освобождает от уплаты налога 13% с прибыли от сделок с ценными бумагами на сумму до 30 млн ₽
        </Typography.Text>

        <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h4" view="small" font="system" weight="semibold">
          Частые вопросы
        </Typography.TitleResponsive>

        {faqs.map((faq, index) => (
          <div key={index}>
            <div
              onClick={() => {
                setCollapsedItem(items =>
                  items.includes(String(index + 1))
                    ? items.filter(item => item !== String(index + 1))
                    : [...items, String(index + 1)],
                );
              }}
              className={appSt.rowSb}
            >
              <Typography.Text view="primary-medium" weight="medium">
                {faq.question}
              </Typography.Text>
              {collapsedItems.includes(String(index + 1)) ? (
                <div style={{ flexShrink: 0 }}>
                  <ChevronUpMIcon />
                </div>
              ) : (
                <div style={{ flexShrink: 0 }}>
                  <ChevronDownMIcon />
                </div>
              )}
            </div>
            <Collapse expanded={collapsedItems.includes(String(index + 1))}>
              {faq.answers.map((answerPart, answerIndex) => (
                <Typography.Text key={answerIndex} tag="p" defaultMargins={false} view="primary-medium">
                  {answerPart}
                </Typography.Text>
              ))}
            </Collapse>
          </div>
        ))}
      </div>
      <Gap size={96} />

      <div className={appSt.bottomBtn}>
        <Button
          block
          view="primary"
          onClick={() => {
            window.gtag('event', '7132_start_click', { var: 'var4' });

            setSteps('opening');
          }}
        >
          К оформлению
        </Button>
      </div>
    </>
  );
};
