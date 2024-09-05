import React, { useEffect, useState, useCallback } from 'react'
import CreateBudget from './CreateBudget'
import { db } from '../../../../../utils/dbConfig'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '../../../../../utils/schema'
import { useUser } from '@clerk/nextjs'
import { BudgetItem } from './BudgetItem'

function BudgetList() {
	const [budgetList, setBudgetList] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const { user } = useUser();

	const getBudgetList = useCallback(async () => {
		if (!user?.primaryEmailAddress?.emailAddress) return;

		const result = await db.select({
			...getTableColumns(Budgets),
			totalSpend: sql`COALESCE(SUM(${Expenses.amount}), 0)`,
			totalItem: sql`COUNT(${Expenses.id})`
		})
		.from(Budgets)
		.leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
		.where(eq(Budgets.createdBy, user.primaryEmailAddress.emailAddress))
		.groupBy(Budgets.id)
		.orderBy(desc(Budgets.id));

		setBudgetList(result.map(item => ({
			...item,
			totalSpend: Number(item.totalSpend),
			totalItem: Number(item.totalItem)
		})));
		setIsLoading(false);
	}, [user]);

	useEffect(() => {
		if (user) getBudgetList();
	}, [user, getBudgetList]);

	const renderSkeletons = () => (
		Array.from({ length: 7}, (_, index) => (
			<div key={index} className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'>
				<h2 className='text-xl font-bold'></h2>
			</div>
		))
	);

	return (
		<div className='mt-7'>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
				<CreateBudget refreshData={getBudgetList} />
				{isLoading ? (
					renderSkeletons()
				) : budgetList.length > 0 ? (
					budgetList.map((budget, index) => (
						<BudgetItem budget={budget} key={budget.id} />
					))
				) : (
					<div className="col-span-full text-center text-gray-500">
						No budgets added yet.
					</div>
				)}
			</div>
		</div>
	)
}

export default BudgetList