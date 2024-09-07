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
        <div className='mt-3 overflow-x-auto'>
            <table className='w-full min-w-[600px]'>
                <thead>
                    <tr className='bg-gray-700 text-gray-300 font-medium'>
                        <th className='p-3 text-left'>Name</th>
                        <th className='p-3 text-left'>Amount</th>
                        <th className='p-3 text-left'>Date</th>
                        <th className='p-3 text-left'>Budget</th>
                        <th className='p-3 text-left'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {expensesList.length > 0 ? (
                        expensesList.map((expense) => (
                            <tr key={expense.id} className='bg-gray-800 border-b border-gray-700'>
                                <td className='p-3 text-gray-300'>{expense.name}</td>
                                <td className='p-3 text-green-400'>ksh {expense.amount}</td>
                                <td className='p-3 text-gray-400'>{expense.createdAt}</td>
                                <td className='p-3 text-gray-300'>{expense.budgetName}</td>
                                <td className='p-3'>
                                    <button onClick={() => deleteExpense(expense)} className='bg-red-500 hover:bg-red-600 w-8 h-8 rounded-full flex items-center justify-center transition duration-300'>
                                        <Trash className='text-white' size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className='text-center py-4 text-gray-400'>No expenses found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ExpenseListTable
