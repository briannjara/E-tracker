"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useCallback, useState } from "react";
import CardInfo from "./_components/CardInfo";
import { db } from "../../../utils/dbConfig";
import { Expenses, Budgets } from "../../../utils/schema";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import BarChartDashboard from "./_components/BarChartDashboard";
import { BudgetItem } from "./budgets/_components/BudgetItem";
import ExpensesListTable from "./../dashboard/expenses/_components/ExpenseListTable";
import Link from "next/link";
import { PieChart, CreditCard, ArrowUpRight, MessageSquare, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getBudgetList = useCallback(async () => {
    if (!user) return;
    const result = await db
      .select({
        id: Budgets.id,
        name: Budgets.name,
        amount: Budgets.amount,
        icon: Budgets.icon,
        totalSpend: sql`COALESCE(SUM(${Expenses.amount}), 0)::numeric`,
        totalItem: sql`COUNT(${Expenses.id})`,
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Expenses.budgetId, Budgets.id))
      .where(eq(Budgets.createdBy, user.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
  }, [user]);

  const getExpensesList = useCallback(async () => {
    if (!user) return;
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
        budgetName: Budgets.name,
      })
      .from(Expenses)
      .innerJoin(Budgets, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Expenses.createdBy, user.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id))
      .limit(5);

    setExpensesList(result);
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getBudgetList(), getExpensesList()]);
      setIsLoading(false);
    };
    fetchData();
  }, [getBudgetList, getExpensesList]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen bg-gray-900 text-white text-xl font-semibold">Loading...</div>;
  }

  if (budgetList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h2 className="text-3xl font-bold mb-4">Welcome to Your Dashboard!</h2>
        <p className="text-xl text-gray-300 mb-8">It looks like you haven't created any budgets yet.</p>
        <Link 
          href="/dashboard/budgets" 
          className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full text-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Create Your First Budget
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col text-white">
      <main className="flex-grow p-6 md:p-10">
        <CardInfo budgetList={budgetList} budgetCount={budgetList.length} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-blue-400">Budget Overview</h2>
            <BarChartDashboard budgetList={budgetList} />
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-green-400">Recent Expenses</h2>
            <ExpensesListTable expensesList={expensesList.slice(0, 5)} />
          </div>
        </div>
        
        <div className="mt-10 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-purple-400">Your Budgets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {budgetList.map((budget, index) => (
              <BudgetItem budget={budget} key={index} />
            ))}
          </div>
        </div>

        <div className="mt-10 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-orange-400">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <Link href="/dashboard/budgets" className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-4 rounded-lg flex flex-col items-center justify-center transition duration-300 font-semibold text-sm sm:text-base">
              <CreditCard className="w-6 h-6 mb-2" />
              <span>Add Budget</span>
            </Link>
            <Link href="/dashboard/expenses" className="bg-green-600 hover:bg-green-700 text-white py-4 px-4 rounded-lg flex flex-col items-center justify-center transition duration-300 font-semibold text-sm sm:text-base">
              <ArrowUpRight className="w-6 h-6 mb-2" />
              <span>Add Expense</span>
            </Link>
            <Link href="/dashboard/chatai" className="bg-purple-600 hover:bg-purple-700 text-white py-4 px-4 rounded-lg flex flex-col items-center justify-center transition duration-300 font-semibold text-sm sm:text-base">
              <MessageSquare className="w-6 h-6 mb-2" />
              <span>Chat AI</span>
            </Link>
            <Link href="/dashboard/budgets" className="bg-orange-600 hover:bg-orange-700 text-white py-4 px-4 rounded-lg flex flex-col items-center justify-center transition duration-300 font-semibold text-sm sm:text-base">
              <PieChart className="w-6 h-6 mb-2" />
              <span>View All</span>
            </Link>
            <Link href="/dashboard/upgrade" className="bg-yellow-600 hover:bg-yellow-700 text-white py-4 px-4 rounded-lg flex flex-col items-center justify-center transition duration-300 font-semibold text-sm sm:text-base">
              <TrendingUp className="w-6 h-6 mb-2" />
              <span>Upgrade</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
