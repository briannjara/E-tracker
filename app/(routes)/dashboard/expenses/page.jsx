"use client"
import React, { useState, useEffect } from 'react'
import ExpenseListTable from './_components/ExpenseListTable'
import { db } from '../../../../utils/dbConfig'
import { Expenses } from '../../../../utils/schema'

const ExpensesPage = () => {
    const [expensesList, setExpensesList] = useState([])

    const fetchExpenses = async () => {
        const expenses = await db.select().from(Expenses)
        setExpensesList(expenses)
    }

    useEffect(() => {
        fetchExpenses()
    }, [])

    return (
        <div>
            <h1>Expenses</h1>
            <ExpenseListTable expensesList={expensesList} refreshData={fetchExpenses} />
        </div>
    )
}

export default ExpensesPage
