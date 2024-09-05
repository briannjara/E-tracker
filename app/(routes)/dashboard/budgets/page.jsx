"use client";
import React from 'react'
import BudgetList from './_components/BudgetList'

const Dashboard = () => {
  return (
    <div className='p-10 '>
      <h2 className='text-2xl font-bold'>My Budgets</h2>
        <BudgetList />
    </div>
  )
}

export default Dashboard