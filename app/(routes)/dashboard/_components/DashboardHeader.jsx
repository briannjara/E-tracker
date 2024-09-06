import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Lock } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import SearchBar from '../../../_components/SearchBar'
import Logo from '../../../_components/Logo'

function DashboardHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const menuList = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Budget", path: "/dashboard/budgets" },
    { name: "Expenses", path: "/dashboard/expenses" },
    { name: "Chat AI", path: "/dashboard/chatai", premium: true },
    { name: "Upgrade", path: "/dashboard/upgrade" }
  ]

  const handleSearch = async (searchTerm) => {
    if (searchTerm.trim()) {
      router.push(`/dashboard/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className='md:hidden sticky top-0 z-10 bg-gray-900 p-4 shadow-md'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-4'>
          <button
            className='text-gray-300 hover:text-white'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Logo />
        </div>
        <div className='flex items-center gap-4'>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      
      {isMenuOpen && (
        <div className='mt-4'>
          <div className='mb-4'>
            <SearchBar onSearch={handleSearch} />
          </div>
          {menuList.map((item, index) => (
            item.premium ? (
              <div 
                key={index}
                className={`block py-2 px-4 rounded-md text-gray-500 cursor-not-allowed flex items-center justify-between`}
              >
                <span>{item.name}</span>
                <Lock className="h-4 w-4 text-yellow-400" />
              </div>
            ) : (
              <Link 
                key={index} 
                href={item.path}
                className={`block py-2 px-4 rounded-md ${pathname === item.path ? 'bg-blue-600 text-white font-medium' : 'text-gray-300 hover:bg-gray-800'} flex items-center justify-between`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{item.name}</span>
              </Link>
            )
          ))}
        </div>
      )}
    </div>
  )
}

export default DashboardHeader
