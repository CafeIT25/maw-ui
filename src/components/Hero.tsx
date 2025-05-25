import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, Palette } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from './ui/Button'
import { Card } from './ui/Card'

export const Hero: React.FC = () => {
  const { t } = useTranslation()

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Next-Gen Design',
      description: t('desc.nextGenDesign', 'Beautiful components with the latest design trends')
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'High Performance',
      description: t('desc.highPerformance', 'Smooth animations with Framer Motion and optimized performance')
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'Customizable',
      description: t('desc.customizable', 'Fully customizable with rich variants and themes')
    }
  ]

  return (
    <section id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Content */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t('hero.title')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              size="lg"
              variant="premium"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="text-lg px-8 py-4"
            >
              {t('hero.getStarted')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4"
            >
              {t('hero.viewComponents')}
            </Button>
          </motion.div>

          {/* Demo Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            {features.map((feature, index) => (
              <Card
                key={index}
                variant="glass"
                className="p-6 text-center hover:scale-105 transition-transform duration-300"
                interactive
              >
                <div className="flex justify-center mb-4 text-blue-600 dark:text-blue-400">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.description}
                </p>
              </Card>
            ))}
          </motion.div>
        </div>

        {/* Interactive Demo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <Card
            variant="elevated"
            className="p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Interactive Component Preview
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t('hero.tryComponents', 'Try out the actual components')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="default">Default</Button>
              <Button variant="premium">Premium</Button>
              <Button variant="neon">Neon</Button>
              <Button variant="glass">Glass</Button>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card variant="gradient" className="p-4">
                <h3 className="font-semibold mb-2">Gradient Card</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Beautiful gradient backgrounds
                </p>
              </Card>
              <Card variant="neon" className="p-4">
                <h3 className="font-semibold mb-2 text-cyan-400">Neon Card</h3>
                <p className="text-sm text-gray-300">
                  Futuristic neon effects
                </p>
              </Card>
            </div>
          </Card>

          {/* Floating Elements */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-purple-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 -right-8 w-6 h-6 bg-pink-500 rounded-full opacity-20 animate-pulse delay-500"></div>
        </motion.div>
      </div>
    </section>
  )
} 