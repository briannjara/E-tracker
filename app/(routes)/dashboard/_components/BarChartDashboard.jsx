import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import React from 'react'
import { Lock } from 'lucide-react'

function BarChartDashboard({ budgetList }) {
  return (
    <div className="relative h-80 w-full">
      <div className="opacity-50">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={budgetList} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '0.5rem' }}
              labelStyle={{ color: '#E5E7EB' }}
              itemStyle={{ color: '#9CA3AF' }}
            />
            <Legend wrapperStyle={{ color: '#9CA3AF' }} />
            <Bar dataKey="totalSpend" name="Spent" fill="#3B82F6" />
            <Bar dataKey="amount" name="Budget" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
        <div className="text-center">
          <Lock className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
          <p className="text-white text-sm">Premium feature</p>
        </div>
      </div>
    </div>
  )
}

export default BarChartDashboard
