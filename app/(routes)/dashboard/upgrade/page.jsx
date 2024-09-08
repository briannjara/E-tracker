"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight, Check } from "lucide-react"
import { Button } from "../../../../@/components/ui/button"

export default function Upgrade() {
  const [hoveredCard, setHoveredCard] = useState(null)

  const plans = [
    {
      name: "Free Plan",
      description: "Great for getting started",
      price: "coming soon",
      features: [
        "Manage up to 3 budgets",
        "Track expenses manually",
        "Basic analytics",
         
        
      ],
      buttonText: "Current Plan",
      buttonColor: "bg-blue-500 hover:bg-blue-600",
      bgColor: "bg-gray-800",
    },
    {
      name: "Premium Plan",
      description: "For serious financial management",
      price: "coming soon",
      features: [
        "Unlimited budgets",
        "Automated expense tracking",
        "Advanced analytics & reports",
        "Priority customer support",
        "Customizable categories",
        "Data export options",
        "AI chat assistant"
      ],
      buttonText: "coming soon!",
      buttonColor: "bg-green-500 hover:bg-green-600",
      bgColor: "bg-gray-700",
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Upgrade Your FinanSmart Experience</h1>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Take your financial management to the next level with our Premium Plan. Enjoy advanced features and unlimited possibilities.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`${plan.bgColor} border border-gray-600 rounded-lg p-8 transition-all duration-300 ease-in-out transform hover:scale-105 flex flex-col justify-between`}
              onMouseEnter={() => setHoveredCard(plan.name)}
              onMouseLeave={() => setHoveredCard(null)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div>
                <h2 className="text-2xl font-bold text-center mb-2">{plan.name}</h2>
                <p className="text-center text-gray-400 mb-4">{plan.description}</p>
                <p className="text-3xl font-bold text-center mb-6">{plan.price}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={feature}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={hoveredCard === plan.name ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                    >
                      <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <Button 
                className={`w-full ${plan.buttonColor} text-white font-semibold py-3 px-4 rounded-lg text-lg transition duration-300`}
              >
                {plan.buttonText}
              </Button>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-gray-500 mt-12 text-sm">
          You can switch plans at any time. Choose the best option for your financial management needs.
        </p>
      </div>
    </div>
  )
}
