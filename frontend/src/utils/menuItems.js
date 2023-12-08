import {dashboard, expenses, transactions, trend, money, stocks, dollar, plus } from '../utils/Icons'

export const menuItems = [
  {
    id: 1,
    title: "Dashboard",
    icon: stocks,
    link: "/dashboard",
  },
  {
    id: 2,
    title: "History",
    icon: transactions,
    link: "/newhistory",
  },
  {
    id: 3,
    title: "Assets",
    icon: trend,
    link: "/dashboard",
  },
  {
    id: 4,
    title: "liabilities",
    icon: expenses,
    link: "/dashboard",
  },
  {
    id: 5,
    title: "New Assets",
    icon: dollar,
    link: "/form",
  },
  {
    id: 6,
    title: "New liabilities",
    icon: expenses,
    link: "/expenseform",
  },
];