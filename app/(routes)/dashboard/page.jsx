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
      .where(eq(Budgets.createdBy, user.primaryEmailAddress?.emailAddress))
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
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  if (budgetList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-semibold mb-4">Welcome to Your Dashboard!</h2>
        <p className="text-lg text-gray-600 mb-8">It looks like you haven't created any budgets yet.</p>
        <Link 
          href="/dashboard/budgets" 
          className="px-6 py-3 bg-primary text-white font-medium rounded-full text-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Create Your First Budget
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <CardInfo budgetList={budgetList} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Budget Overview</h2>
          <BarChartDashboard budgetList={budgetList} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
          <ExpensesListTable expensesList={expensesList} />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Your Budgets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
