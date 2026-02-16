import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const bottomBtn = style({
  position: 'fixed',
  zIndex: 2,
  width: '100%',
  padding: '12px',
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const container = style({
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  gap: '1rem',
});

const boxHb = style({
  display: 'flex',
  paddingTop: '24px',
  flexDirection: 'column',
  textAlign: 'center',
  alignItems: 'center',
  borderRadius: '1rem',
  backgroundColor: '#96D0FF',
  marginTop: '1rem',
  overflow: 'hidden',
  position: 'relative',
  zIndex: 1,
});
const boxUnderHb = style({
  display: 'flex',
  padding: '33px 1rem 8px',
  flexDirection: 'column',
  textAlign: 'center',
  alignItems: 'center',
  borderRadius: '0 0 1rem 1rem',
  backgroundColor: '#F4F5F6',
  marginTop: '-2rem',
});

const sliderContainer = style({
  width: '212px',
});
const sliderBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  paddingBottom: '1rem',
  borderRadius: '12px',
  backgroundColor: '#e4f0ff',
  width: '100%',
  marginTop: '60px',
  textAlign: 'center',
  alignItems: 'center',
  minHeight: '124px',
});

const stepStyle = style({});
globalStyle(`${stepStyle} > div > div > div[class^="_option_"]`, {
  backgroundColor: '#EF3124',
  color: 'var(--color-light-text-primary-inverted)',
});

const rowSb = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '8px',
});

const bannerAccount = style({
  padding: '1rem',
  backgroundColor: '#F5F5F8',
  borderRadius: '1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  marginTop: '6px',
});

const stockBox = style({
  padding: '1rem',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  backgroundColor: '#F6F6FD',
});

const boxInfo = recipe({
  base: {
    borderRadius: '1rem',
    padding: '16px 20px 20px',
    backgroundColor: '#F6F6FD',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    border: '1px solid transparent',
    transition: 'all 0.3s ease-in-out',
  },
  variants: {
    selected: {
      true: {
        border: '1px solid #373FFF',
        backgroundColor: '#373FFF1A',
      },
    },
  },
});

const progressBarContainer = style({
  width: '100%',
  height: '8px',
  backgroundColor: '#F859C5',
  borderRadius: '8px',
  overflow: 'hidden',
  position: 'relative',
});

const progressBarFill = style({
  height: '100%',
  backgroundColor: '#3193FC',
  borderRadius: '8px',
  position: 'absolute',
  top: 0,
  left: 0,
});

const dot = recipe({
  base: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  variants: {
    color: {
      blue: {
        backgroundColor: '#3193FC',
      },
      pink: {
        backgroundColor: '#F859C5',
      },
    },
  },
});

const row = style({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
});

const btms = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const openingCell = style({
  backgroundColor: '#fff',
  padding: '12px',
  borderRadius: '12px',
});

export const appSt = {
  bottomBtn,
  container,
  boxHb,
  row,
  boxUnderHb,
  sliderContainer,
  sliderBox,
  stepStyle,
  rowSb,
  bannerAccount,
  stockBox,
  boxInfo,
  progressBarContainer,
  progressBarFill,
  dot,
  btms,
  openingCell,
};
