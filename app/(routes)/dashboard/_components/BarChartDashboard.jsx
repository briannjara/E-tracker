import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import React from 'react'

function BarChartDashboard({ budgetList }) {
  return (
    <div className='border p-5 rounded-lg'>
        <h2 className='text-2xl font-bold'>Budget Overview</h2>
        <ResponsiveContainer width={'80%'} height={300}>
      <BarChart  margin={{ top: 5, right: 5, left: 5, bottom: 5 }} data={budgetList}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalSpend" stackId="a" fill="#4845d2" />
        <Bar dataKey="amount" stackId="a" fill="#c3c2ff" />
      </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartDashboard
