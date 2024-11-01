export type Group = {
  group_id: number;
  name: string;
  budgeted: number;
  spent: number;
  balance: number;
  expanded: boolean;
  subRows?: Category[];
};

export type Category = {
  id: number;
  name: string;
  budgeted: number;
  spent: number;
  balance: number;
};
