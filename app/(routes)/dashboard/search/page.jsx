'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2, DollarSign, Calendar, PiggyBank } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SearchResults() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data.results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Search Results for "{query}"
      </h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
        </div>
      ) : results.length > 0 ? (
        <motion.ul 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {results.map((item, index) => (
            <motion.li 
              key={item.id} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link href={item.type === 'budget' ? `/dashboard/budgets/${item.id}` : `/dashboard/expenses/${item.budgetId}`} className="block">
                <h2 className={`text-xl font-semibold ${item.type === 'budget' ? 'text-green-600 hover:text-green-800 uppercase' : 'text-blue-600 hover:text-blue-800 lowercase'} transition-colors duration-300`}>
                  {item.name}
                </h2>
                <div className="mt-2 flex items-center text-gray-600">
                  {item.type === 'budget' ? (
                    <PiggyBank className="w-5 h-5 mr-2" />
                  ) : (
                    <DollarSign className="w-5 h-5 mr-2" />
                  )}
                  <span className="font-medium">${parseFloat(item.amount).toFixed(2)}</span>
                </div>
                <div className="mt-1 flex items-center text-gray-500">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <motion.p 
          className="text-center text-gray-600 mt-8 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No results found for "{query}". Try a different search term.
        </motion.p>
      )}
    </div>
  );
}