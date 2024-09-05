import { Trash } from 'lucide-react'
import React from 'react'
import { db } from '../../../../../utils/dbConfig'
import { eq } from 'drizzle-orm'
import { Expenses } from '../../../../../utils/schema'
import { toast } from 'sonner'

function ExpenseListTable({ expensesList, refreshData, onDeleteExpense }) {

    const deleteExpense = async (expense) => {
        try {
            const result = await db.delete(Expenses)
                .where(eq(Expenses.id, expense.id))
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
            <div className='grid grid-cols-4 bg-slate-200 rounded-lg p-2'>
                <h2>Name</h2>
                <h2>Amount</h2>
                <h2>Date</h2>
                <h2>Action</h2>   
            </div>

            {expensesList.length > 0 ? (
                expensesList.map((expense) => (
                    <div key={expense.id} className='grid grid-cols-4 bg-slate-50 rounded-lg p-2'>
                        <h2>{expense.name}</h2>
                        <h2>ksh {expense.amount}</h2>
                        <h2>{expense.createdAt}</h2>
                        <button onClick={() => deleteExpense(expense)} className='bg-red-500 w-10 h-10 rounded-full flex items-center justify-center'>
                            <Trash className='text-white' size={15} />
                        </button>
                    </div>
                ))
            ) : (
                <div className='text-center py-4'>No expenses found</div>
            )}
        </div>
    )
}

export default ExpenseListTable
