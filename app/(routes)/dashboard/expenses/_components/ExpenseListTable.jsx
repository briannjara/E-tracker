import { Trash } from 'lucide-react'
import React from 'react'
import { db } from '../../../../../utils/dbConfig'
import { and, eq } from 'drizzle-orm'
import { Expenses } from '../../../../../utils/schema'
import { toast } from 'sonner'

function ExpenseListTable({ expensesList, refreshData, onDeleteExpense, userEmail }) {

    const deleteExpense = async (expense) => {
        try {
            const result = await db.delete(Expenses)
                .where(
                    and(
                        eq(Expenses.id, expense.id),
                        eq(Expenses.createdBy, userEmail)
                    )
                )
                .returning()

            if (result.length > 0) {
                toast.success('Expense deleted successfully', {
                    style: {
                        background: '#FF4136',
                        color: 'white',
                    },
                    icon: '🗑️',
                })
                if (typeof onDeleteExpense === 'function') {
                    onDeleteExpense(expense.id);
                }
                if (typeof refreshData === 'function') {
                    refreshData();
                }
            } else {
                toast.error('Failed to delete expense')
            }
        } catch (error) {
            console.error('Error deleting expense:', error)
            toast.error('An error occurred while deleting the expense')
        }
    }

    return (
        <div className='mt-3'>
            <div className='grid grid-cols-4 bg-gray-700 rounded-lg p-3 text-gray-300 font-medium'>
                <h2>Name</h2>
                <h2>Amount</h2>
                <h2>Date</h2>
                <h2>Action</h2>   
            </div>

            {expensesList.length > 0 ? (
                expensesList.map((expense) => (
                    <div key={expense.id} className='grid grid-cols-4 bg-gray-800 rounded-lg p-3 mt-2 items-center'>
                        <h2 className="text-gray-300">{expense.name}</h2>
                        <h2 className="text-green-400">ksh {expense.amount}</h2>
                        <h2 className="text-gray-400">{expense.createdAt}</h2>
                        <button onClick={() => deleteExpense(expense)} className='bg-red-500 hover:bg-red-600 w-8 h-8 rounded-full flex items-center justify-center transition duration-300'>
                            <Trash className='text-white' size={14} />
                        </button>
                    </div>
                ))
            ) : (
                <div className='text-center py-4 text-gray-400'>No expenses found</div>
            )}
        </div>
    )
}

export default ExpenseListTable
