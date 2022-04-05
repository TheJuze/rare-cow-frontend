/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text } from 'components';
import { TableProps } from './Table';
import { TableRowProps } from './Table.types';

const dataObjectMock = {
  amount: 100,
  tokens: 'SHIT TOKENS',
  price: 1,
  fees: 123,
};

const createDataForTable = (amount: number) => {
  const res = [];
  for (let i = 0; i <= amount; i += 1) {
    res.push({
      ...dataObjectMock,
      price: i + dataObjectMock.price,
      amount: i + dataObjectMock.amount,
    });
  }

  return res;
};

export const simpleTablePropsMocked: TableProps = {
  columns: [
    {
      Header: 'AMOUNT',
      accessor: 'amount',
      width: '22%',
      disableSortBy: true,
      Cell: ({ row: { original } }: TableRowProps<any>) => {
        const { amount } = original;
        return (
          <Text>Custom cell component{amount}</Text>
        );
      },
    },
    {
      Header: 'TOKENS',
      accessor: 'tokens',
      width: '23%',
      disableSortBy: true,
      Cell: ({ row: { original } }: TableRowProps<any>) => {
        const { tokens } = original;
        return (
          <Text>Custom cell component{tokens}</Text>
        );
      },
    },
    {
      Header: 'PRICE',
      accessor: 'price',
      width: '20%',
      Cell: ({ row: { original } }: TableRowProps<any>) => {
        const { price } = original;
        return (
          <Text>Custom cell component{price}</Text>
        );
      },
    },
    {
      Header: 'FEES',
      accessor: 'fees',
      width: '13%',
      Cell: ({ row: { original } }: TableRowProps<any>) => {
        const { fees } = original;
        return (
          <Text>Custom cell component{fees}</Text>
        );
      },
    },
  ],
  data: createDataForTable(100),
  withPagination: true,
};
