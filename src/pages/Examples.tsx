import React from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Code, Rocket } from 'lucide-react'
import { Card } from '../components/ui/Card'

export const Examples: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Examples
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            実際のプロジェクトで使用できるMAW UIの実装例とテンプレート。
          </p>
        </motion.div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto"
        >
          <Card variant="gradient" className="p-12 text-center">
            <div className="mb-8">
              <div className="inline-flex p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl mb-6">
                <Rocket className="w-12 h-12" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                実用的なサンプルアプリケーションとテンプレートを準備中です。
                ダッシュボード、Eコマース、ブログなど、様々なユースケースに対応した
                実装例を提供予定です。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <Lightbulb className="w-6 h-6 text-yellow-500" />
                <span className="font-medium">Dashboard Templates</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <Code className="w-6 h-6 text-green-500" />
                <span className="font-medium">Code Snippets</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 