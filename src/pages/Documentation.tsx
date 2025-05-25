import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Book, Code, Palette, Settings, Zap, Shield, Search, ChevronRight, Copy, Check } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Tabs } from '../components/ui/Tabs'
import { useToast } from '../components/ui/Toast'

interface ComponentDocProps {
  name: string
  description: string
  props: Array<{
    name: string
    type: string
    default?: string
    description: string
    required?: boolean
  }>
  variants?: Array<{
    name: string
    description: string
    example: string
  }>
  examples: Array<{
    title: string
    code: string
    description: string
  }>
}

const ComponentDoc: React.FC<ComponentDocProps> = ({ name, description, props, variants, examples }) => {
  const [copied, setCopied] = useState<string | null>(null)
  const { addToast } = useToast()

  const copyCode = (code: string, title: string) => {
    navigator.clipboard.writeText(code)
    setCopied(title)
    addToast({
      type: 'success',
      title: 'コードをコピーしました',
      description: `${title}のコードがクリップボードにコピーされました`,
      duration: 2000
    })
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <Card variant="elevated" className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Code className="w-6 h-6 text-blue-600" />
          {name}
        </CardTitle>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{description}</p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="props" variant="underline">
          <Tabs.List>
            <Tabs.Trigger value="props">Props</Tabs.Trigger>
            {variants && <Tabs.Trigger value="variants">Variants</Tabs.Trigger>}
            <Tabs.Trigger value="examples">Examples</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="props">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold">Prop</th>
                    <th className="text-left py-3 px-4 font-semibold">Type</th>
                    <th className="text-left py-3 px-4 font-semibold">Default</th>
                    <th className="text-left py-3 px-4 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {props.map((prop, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-4">
                        <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                          {prop.name}
                          {prop.required && <span className="text-red-500 ml-1">*</span>}
                        </code>
                      </td>
                      <td className="py-3 px-4">
                        <code className="text-blue-600 dark:text-blue-400 text-sm">{prop.type}</code>
                      </td>
                      <td className="py-3 px-4">
                        {prop.default ? (
                          <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                            {prop.default}
                          </code>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {prop.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tabs.Content>

          {variants && (
            <Tabs.Content value="variants">
              <div className="space-y-4">
                {variants.map((variant, index) => (
                  <Card key={index} variant="outlined" className="p-4">
                    <h4 className="font-semibold mb-2">{variant.name}</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{variant.description}</p>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <code className="text-gray-300 text-sm">{variant.example}</code>
                    </div>
                  </Card>
                ))}
              </div>
            </Tabs.Content>
          )}

          <Tabs.Content value="examples">
            <div className="space-y-6">
              {examples.map((example, index) => (
                <Card key={index} variant="outlined" className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-lg">{example.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">{example.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyCode(example.code, example.title)}
                      leftIcon={copied === example.title ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    >
                      {copied === example.title ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-gray-300 text-sm">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                </Card>
              ))}
            </div>
          </Tabs.Content>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export const Documentation: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const designPrinciples = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Design System First',
      description: '一貫性のあるデザインシステムに基づいた設計。すべてのコンポーネントが調和し、統一感のあるUIを実現。',
      details: [
        'トークンベースのデザインシステム',
        'カラーパレットとタイポグラフィの統一',
        'スペーシングとサイジングの一貫性',
        'ダークモード完全対応'
      ]
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Developer Experience',
      description: '開発者の生産性を最大化する設計。TypeScript完全対応、直感的なAPI、包括的なドキュメント。',
      details: [
        'TypeScript完全対応',
        'IntelliSense自動補完',
        'Tree-shaking対応',
        'Zero-config setup'
      ]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Performance Optimized',
      description: '高性能なアニメーションと最適化されたレンダリング。60FPSの滑らかな動作を保証。',
      details: [
        'Framer Motion最適化',
        'Lazy loading対応',
        'Bundle size最小化',
        'メモ化とキャッシュ戦略'
      ]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Accessibility First',
      description: 'WCAG 2.1準拠のアクセシビリティ。すべてのユーザーが利用できるインクルーシブな設計。',
      details: [
        'キーボードナビゲーション',
        'スクリーンリーダー対応',
        '適切なARIA属性',
        'カラーコントラスト準拠'
      ]
    }
  ]

  const componentDocs = [
    {
      name: 'Button',
      description: '多様なスタイルとアニメーションを持つボタンコンポーネント。11種類のバリアントと豊富なカスタマイズオプション。',
      props: [
        { name: 'variant', type: '"default" | "premium" | "neon" | "glass" | "destructive" | "success" | "warning" | "outline" | "secondary" | "ghost" | "link"', default: '"default"', description: 'ボタンの外観バリアント' },
        { name: 'size', type: '"sm" | "default" | "lg" | "xl" | "icon" | "icon-sm" | "icon-lg"', default: '"default"', description: 'ボタンのサイズ' },
        { name: 'loading', type: 'boolean', default: 'false', description: 'ローディング状態の表示' },
        { name: 'leftIcon', type: 'ReactNode', description: '左側に表示するアイコン' },
        { name: 'rightIcon', type: 'ReactNode', description: '右側に表示するアイコン' },
        { name: 'ripple', type: 'boolean', default: 'true', description: 'リップルエフェクトの有効/無効' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'ボタンの無効化' }
      ],
      variants: [
        { name: 'premium', description: 'プレミアムグラデーションとシャインエフェクト', example: '<Button variant="premium">Premium Button</Button>' },
        { name: 'neon', description: 'サイバーパンク風ネオンエフェクト', example: '<Button variant="neon">Neon Button</Button>' },
        { name: 'glass', description: 'ガラスモーフィズム効果', example: '<Button variant="glass">Glass Button</Button>' }
      ],
      examples: [
        {
          title: 'Basic Usage',
          description: '基本的なボタンの使用方法',
          code: `import { Button } from '@maw-ui/react'

function App() {
  return (
    <Button variant="default" onClick={() => console.log('clicked')}>
      Click me
    </Button>
  )
}`
        },
        {
          title: 'With Icons',
          description: 'アイコン付きボタン',
          code: `import { Button } from '@maw-ui/react'
import { Download, ArrowRight } from 'lucide-react'

function App() {
  return (
    <div className="space-x-4">
      <Button leftIcon={<Download />}>Download</Button>
      <Button rightIcon={<ArrowRight />}>Next</Button>
    </div>
  )
}`
        },
        {
          title: 'Loading State',
          description: 'ローディング状態の表示',
          code: `import { Button } from '@maw-ui/react'

function App() {
  const [loading, setLoading] = useState(false)
  
  return (
    <Button 
      loading={loading} 
      onClick={() => setLoading(true)}
    >
      Submit
    </Button>
  )
}`
        }
      ]
    },
    {
      name: 'Card',
      description: '柔軟で美しいカードコンポーネント。8種類のバリアントと複合コンポーネントパターン。',
      props: [
        { name: 'variant', type: '"default" | "elevated" | "outlined" | "ghost" | "gradient" | "glass" | "neon" | "premium"', default: '"default"', description: 'カードの外観バリアント' },
        { name: 'size', type: '"sm" | "default" | "lg" | "xl"', default: '"default"', description: 'カードのパディングサイズ' },
        { name: 'hover', type: '"none" | "lift" | "scale" | "glow" | "tilt"', default: '"lift"', description: 'ホバーエフェクトの種類' },
        { name: 'interactive', type: 'boolean', default: 'false', description: 'インタラクティブ機能の有効化' },
        { name: 'loading', type: 'boolean', default: 'false', description: 'ローディング状態の表示' },
        { name: 'shimmer', type: 'boolean', default: 'false', description: 'シマーエフェクトの有効化' }
      ],
      examples: [
        {
          title: 'Basic Card',
          description: '基本的なカードの使用方法',
          code: `import { Card, CardHeader, CardTitle, CardContent } from '@maw-ui/react'

function App() {
  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card content goes here...</p>
      </CardContent>
    </Card>
  )
}`
        },
        {
          title: 'Interactive Card',
          description: 'クリック可能なインタラクティブカード',
          code: `import { Card } from '@maw-ui/react'

function App() {
  return (
    <Card 
      variant="gradient" 
      interactive 
      hover="scale"
      onClick={() => console.log('Card clicked')}
      className="cursor-pointer"
    >
      <div className="p-6">
        <h3>Interactive Card</h3>
        <p>Click me!</p>
      </div>
    </Card>
  )
}`
        }
      ]
    },
    {
      name: 'Input',
      description: '高機能で美しい入力コンポーネント。フローティングラベル、バリデーション、アイコンサポート。',
      props: [
        { name: 'variant', type: '"default" | "filled" | "outlined" | "ghost" | "gradient" | "neon" | "glass"', default: '"default"', description: '入力フィールドの外観バリアント' },
        { name: 'size', type: '"sm" | "default" | "lg" | "xl"', default: '"default"', description: '入力フィールドのサイズ' },
        { name: 'state', type: '"default" | "error" | "success" | "warning"', default: '"default"', description: '入力フィールドの状態' },
        { name: 'label', type: 'string', description: 'ラベルテキスト' },
        { name: 'floating', type: 'boolean', default: 'false', description: 'フローティングラベルの有効化' },
        { name: 'leftIcon', type: 'ReactNode', description: '左側に表示するアイコン' },
        { name: 'rightIcon', type: 'ReactNode', description: '右側に表示するアイコン' },
        { name: 'clearable', type: 'boolean', default: 'false', description: 'クリアボタンの表示' },
        { name: 'loading', type: 'boolean', default: 'false', description: 'ローディング状態の表示' },
        { name: 'errorText', type: 'string', description: 'エラーメッセージ' },
        { name: 'helperText', type: 'string', description: 'ヘルパーテキスト' }
      ],
      examples: [
        {
          title: 'Floating Label',
          description: 'フローティングラベル付き入力フィールド',
          code: `import { Input } from '@maw-ui/react'

function App() {
  return (
    <Input
      floating
      label="Email Address"
      type="email"
      placeholder="Enter your email"
    />
  )
}`
        },
        {
          title: 'With Validation',
          description: 'バリデーション機能付き',
          code: `import { Input } from '@maw-ui/react'

function App() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  
  const validateEmail = (value: string) => {
    if (!value.includes('@')) {
      setError('Valid email required')
    } else {
      setError('')
    }
  }
  
  return (
    <Input
      value={email}
      onChange={(e) => {
        setEmail(e.target.value)
        validateEmail(e.target.value)
      }}
      label="Email"
      errorText={error}
      state={error ? 'error' : 'default'}
    />
  )
}`
        }
      ]
    }
  ]

  const filteredDocs = componentDocs.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
              Documentation
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            MAW UIの設計思想、アーキテクチャ、各コンポーネントの詳細仕様を学びましょう。
          </p>
        </motion.div>

        {/* Design Principles */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8 flex items-center gap-3"
          >
            <Book className="w-8 h-8 text-blue-600" />
            Design Principles
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {designPrinciples.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="elevated" className="h-full p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl">
                      {principle.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-3">{principle.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{principle.description}</p>
                      <ul className="space-y-2">
                        {principle.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <ChevronRight className="w-4 h-4 text-blue-600" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Component Documentation */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Settings className="w-8 h-8 text-blue-600" />
              Component API Reference
            </h2>
            
            <div className="max-w-md">
              <Input
                leftIcon={<Search className="w-4 h-4" />}
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                clearable
              />
            </div>
          </motion.div>

          <div className="space-y-8">
            {filteredDocs.map((doc, index) => (
              <motion.div
                key={doc.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ComponentDoc {...doc} />
              </motion.div>
            ))}
          </div>

          {filteredDocs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 dark:text-gray-400">
                検索条件に一致するコンポーネントが見つかりませんでした。
              </p>
            </motion.div>
          )}
        </section>
      </div>
    </div>
  )
} 