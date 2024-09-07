"use client"
import React, { useState, useEffect } from 'react'
import ExpenseListTable from './_components/ExpenseListTable'
import { db } from '../../../../utils/dbConfig'
import { Expenses, Budgets } from '../../../../utils/schema'
import { useUser } from "@clerk/nextjs";
import { desc, eq, and } from 'drizzle-orm'

const ExpensesPage = () => {
	const { user, isLoaded } = useUser();
	const [expensesList, setExpensesList] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	const fetchExpenses = async () => {
		if (!user) return;

		const expenses = await db
			.select({
				expenses: Expenses,
				budgetName: Budgets.name
			})
			.from(Expenses)
			.innerJoin(Budgets, eq(Expenses.budgetId, Budgets.id))
			.where(eq(Expenses.createdBy, user.primaryEmailAddress?.emailAddress))
			.orderBy(desc(Expenses.createdAt))

		setExpensesList(expenses.map(e => ({
			...e.expenses,
			budgetName: e.budgetName
		})))
		setIsLoading(false)
	}

	useEffect(() => {
		if (isLoaded && user) {
			fetchExpenses()
		}
	}, [isLoaded, user])

	if (!isLoaded || isLoading) {
		return <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">Loading...</div>
	}

	return (
		<div className="bg-gray-900 min-h-screen flex flex-col text-white">
			<div className="flex-grow p-6 md:p-10">
				<h1 className="text-3xl font-bold mb-6">Your Expenses</h1>
				<ExpenseListTable 
					expensesList={expensesList} 
					refreshData={fetchExpenses} 
					userEmail={user.primaryEmailAddress?.emailAddress}
				/>
			</div>
		</div>
	)
}

export default ExpensesPage
