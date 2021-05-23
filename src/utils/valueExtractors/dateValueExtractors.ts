const LOCALE_TYPE = 'en-US';

export const extractHours = stringDate => new Date(stringDate).getHours();

export const extractWeekDay = stringDate =>
  new Intl.DateTimeFormat(LOCALE_TYPE, { weekday: 'long' }).format(new Date(stringDate).getDay());

export const extractDate = stringDate => new Intl.DateTimeFormat(LOCALE_TYPE).format(new Date(stringDate));

export const extractMonthDay = stringDate => new Date(stringDate).getDate();

export const extractMonth = stringDate =>
  new Intl.DateTimeFormat(LOCALE_TYPE, { month: 'long' }).format(new Date(stringDate));

export const extractYear = stringDate => new Date(stringDate).getFullYear();
