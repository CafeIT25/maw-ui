import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Zap, Palette, Code, Shield, Rocket, Github, Download } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { Hero } from '../components/Hero'

export const Home: React.FC = () => {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Next-Generation Design',
      description: '最新のデザイントレンドを取り入れた美しいコンポーネント。Glass morphism、Neon effects、Premium gradientsなど、次世代のUIパターンを実装。',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'High Performance',
      description: 'Framer Motionによる60FPSの滑らかなアニメーション。最適化されたレンダリングとメモ化により、大規模アプリケーションでも高速動作。',
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Fully Customizable',
      description: '豊富なバリアントとテーマシステム。CVA（Class Variance Authority）により、型安全なスタイリングとカスタマイズが可能。',
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Developer Experience',
      description: 'TypeScript完全対応、IntelliSenseサポート、包括的なドキュメント。開発者の生産性を最大化する設計。',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Accessibility First',
      description: 'WCAG 2.1準拠のアクセシビリティ。キーボードナビゲーション、スクリーンリーダー対応、適切なARIA属性を実装。',
      gradient: 'from-indigo-500 to-blue-600'
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Production Ready',
      description: 'エンタープライズレベルの品質。包括的なテスト、パフォーマンス最適化、本番環境での実績。',
      gradient: 'from-purple-500 to-pink-600'
    }
  ]

  const stats = [
    { number: '50+', label: 'Components', description: '豊富なコンポーネント' },
    { number: '200+', label: 'Variants', description: 'カスタマイズオプション' },
    { number: '100%', label: 'TypeScript', description: '型安全性' },
    { number: '60fps', label: 'Animations', description: '滑らかなアニメーション' }
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
                Why Choose
              </span>
              <span className="text-gray-900 dark:text-white"> MAW UI?</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              次世代のWebアプリケーション開発に必要なすべてを提供する、
              革新的なUIコンポーネントライブラリです。
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
              Numbers That Matter
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              MAW UIの実績と品質を数字で表現
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
              Beautiful Code,{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Beautiful UI
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              シンプルで直感的なAPIで、美しいUIを簡単に構築
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
        Welcome to MAW UI
      </h1>
      
      <div className="space-y-4">
        <Input 
          variant="neon"
          placeholder="Enter your email"
          floating
          label="Email Address"
        />
        
        <Button 
          variant="premium" 
          size="lg"
          className="w-full"
        >
          Get Started
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
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Build the Future?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              MAW UIで次世代のWebアプリケーションを構築しましょう。
              今すぐ始めて、開発体験の違いを実感してください。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="xl"
                variant="glass"
                leftIcon={<Download className="w-6 h-6" />}
                className="text-lg px-12 py-6"
              >
                Install MAW UI
              </Button>
              <Button
                size="xl"
                variant="outline"
                leftIcon={<Github className="w-6 h-6" />}
                className="text-lg px-12 py-6 border-white text-white hover:bg-white hover:text-purple-600"
              >
                View on GitHub
              </Button>
            </div>

            <div className="mt-12 text-blue-100">
              <code className="bg-black/20 px-4 py-2 rounded-lg">
                npm install @maw-ui/react
              </code>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 