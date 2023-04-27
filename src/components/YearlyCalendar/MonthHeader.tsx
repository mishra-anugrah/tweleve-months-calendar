import React from 'react';

interface IMonthHeaderProps {
  month: string;
}

export const MonthHeader = (props: IMonthHeaderProps) => {
  const { month } = props;
  return <div className='month-header'>{month}</div>;
};
