import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Sparkles, Zap, Palette, Code, Shield, Rocket, Github, Download } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { Hero } from '../components/Hero'

export const Home: React.FC = () => {
  const { t } = useTranslation()

  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: t('feature.nextGenDesign'),
      description: t('feature.nextGenDesignDesc'),
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('feature.performant'),
      description: t('feature.performantDesc'),
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: t('feature.customizable'),
      description: t('feature.customizableDesc'),
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: t('feature.developerExperience'),
      description: t('feature.developerExperienceDesc'),
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('feature.accessible'),
      description: t('feature.accessibleDesc'),
      gradient: 'from-indigo-500 to-blue-600'
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: t('feature.productionReady'),
      description: t('feature.productionReadyDesc'),
      gradient: 'from-purple-500 to-pink-600'
    }
  ]

  const stats = [
    { number: '50+', label: t('nav.components'), description: t('stats.richComponents') },
    { number: '200+', label: t('stats.variants'), description: t('stats.customizationOptions') },
    { number: '100%', label: t('feature.typescript'), description: t('stats.typeSafety') },
    { number: '60fps', label: t('stats.animations'), description: t('stats.smoothAnimations') }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t('home.whyChoose')}
              </span>
              <span className="text-gray-900 dark:text-white"> MAW UI?</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('home.whyChooseDesc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <Card 
                  variant="elevated" 
                  className="h-full p-8 hover:scale-[1.02] transition-transform duration-200"
                  interactive
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} text-white mb-6`}>
                    {feature.icon}
                  </div>
                  <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              {t('home.numbersThatMatter')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('home.numbersDesc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="text-center"
              >
                <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Preview Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {t('home.beautifulCode')},{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t('home.beautifulUI')}
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              {t('home.beautifulCodeDesc')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-gray-800 rounded-2xl p-8 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-gray-400 text-sm">App.tsx</div>
            </div>
            <pre className="text-gray-300 text-sm leading-relaxed overflow-x-auto">
              <code>{`import { Button, Card, Input, Modal } from '@maw-ui/react'

function App() {
  return (
    <Card variant="glass" className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        ${t('home.welcomeToMAW')}
      </h1>
      
      <div className="space-y-4">
        <Input 
          placeholder="${t('home.enterYourName')}" 
          variant="floating" 
        />
        
        <Button 
          variant="premium" 
          size="lg"
          className="w-full"
        >
          ${t('hero.getStarted')}
        </Button>
      </div>
    </Card>
  )
}`}</code>
            </pre>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('home.readyToStart')}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              {t('home.readyToStartDesc')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="glass"
                size="lg"
                leftIcon={<Download className="w-5 h-5" />}
                className="text-white border-white/30 hover:bg-white/10"
              >
                {t('action.download')} MAW UI
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Github className="w-5 h-5" />}
                className="border-white/30 text-white hover:bg-white/10"
              >
                {t('action.view')} {t('footer.github')}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 