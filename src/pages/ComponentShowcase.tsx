import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Play, Heart, Star, Download } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { Input, SearchInput } from '../components/ui/Input'
import { Modal } from '../components/ui/Modal'
import { Tabs } from '../components/ui/Tabs'
import { Select } from '../components/ui/Select'
import { useToast } from '../components/ui/Toast'

interface ComponentDemoProps {
  title: string
  description: string
  children: React.ReactNode
  code: string
}

const ComponentDemo: React.FC<ComponentDemoProps> = ({ title, description, children, code }) => {
  const [copied, setCopied] = useState(false)
  const { addToast } = useToast()

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    addToast({
      type: 'success',
      title: 'コードをコピーしました',
      description: 'クリップボードにコピーされました',
      duration: 2000
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card variant="elevated" className="mb-8">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl mb-2">{title}</CardTitle>
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyCode}
            leftIcon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          >
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Demo */}
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700">
            {children}
          </div>
          
          {/* Code */}
          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{code}</code>
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export const ComponentShowcase: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState('')
  const { addToast } = useToast()

  const selectOptions = [
    { value: 'react', label: 'React', icon: '⚛️' },
    { value: 'vue', label: 'Vue.js', icon: '💚' },
    { value: 'angular', label: 'Angular', icon: '🅰️' },
    { value: 'svelte', label: 'Svelte', icon: '🧡' },
  ]

  const showToast = (type: 'success' | 'error' | 'warning' | 'info') => {
    const messages = {
      success: { title: '成功しました！', description: '操作が正常に完了しました。' },
      error: { title: 'エラーが発生しました', description: '何かが間違っています。' },
      warning: { title: '警告', description: '注意が必要です。' },
      info: { title: '情報', description: '新しい情報があります。' }
    }
    
    addToast({
      type,
      ...messages[type],
      duration: 3000
    })
  }

  return (
    <section id="components" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Component
            </span>
            <span className="text-gray-900 dark:text-white"> Showcase</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            次世代のUIコンポーネントを実際に体験してください。
            すべてのコンポーネントは完全にカスタマイズ可能で、美しいアニメーションを備えています。
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Buttons */}
          <ComponentDemo
            title="Buttons"
            description="様々なスタイルとアニメーションを持つボタンコンポーネント"
            code={`<Button variant="default">Default</Button>
<Button variant="premium">Premium</Button>
<Button variant="neon">Neon</Button>
<Button variant="glass">Glass</Button>
<Button variant="destructive" loading>Loading</Button>`}
          >
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="premium">Premium</Button>
              <Button variant="neon">Neon</Button>
              <Button variant="glass">Glass</Button>
              <Button variant="destructive" loading>Loading</Button>
              <Button variant="success" leftIcon={<Heart className="w-4 h-4" />}>
                With Icon
              </Button>
              <Button variant="warning" rightIcon={<Star className="w-4 h-4" />}>
                Right Icon
              </Button>
            </div>
          </ComponentDemo>

          {/* Cards */}
          <ComponentDemo
            title="Cards"
            description="柔軟で美しいカードコンポーネント"
            code={`<Card variant="elevated" className="p-6">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here...</p>
  </CardContent>
</Card>`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card variant="default" className="p-6">
                <h3 className="font-semibold mb-2">Default Card</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  シンプルで使いやすいデフォルトカード
                </p>
              </Card>
              <Card variant="gradient" className="p-6">
                <h3 className="font-semibold mb-2">Gradient Card</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  美しいグラデーション背景
                </p>
              </Card>
              <Card variant="neon" className="p-6">
                <h3 className="font-semibold mb-2 text-cyan-400">Neon Card</h3>
                <p className="text-sm text-gray-300">
                  未来的なネオンエフェクト
                </p>
              </Card>
            </div>
          </ComponentDemo>

          {/* Inputs */}
          <ComponentDemo
            title="Inputs"
            description="高機能で美しい入力コンポーネント"
            code={`<Input 
  placeholder="Enter your name" 
  label="Name"
  helperText="This is a helper text"
/>
<SearchInput placeholder="Search..." />
<Input 
  type="password" 
  placeholder="Password"
  floating
  label="Password"
/>`}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  placeholder="Enter your name" 
                  label="Name"
                  helperText="This is a helper text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <SearchInput placeholder="Search components..." />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  type="password" 
                  placeholder="Password"
                  floating
                  label="Password"
                />
                <Input 
                  variant="neon"
                  placeholder="Neon input"
                  label="Neon Style"
                />
              </div>
            </div>
          </ComponentDemo>

          {/* Select */}
          <ComponentDemo
            title="Select"
            description="高度な選択コンポーネント"
            code={`<Select
  options={options}
  placeholder="Select a framework"
  searchable
  clearable
  value={selectValue}
  onValueChange={setSelectValue}
/>`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                options={selectOptions}
                placeholder="Select a framework"
                searchable
                clearable
                value={selectValue}
                onValueChange={(value) => setSelectValue(value as string)}
              />
              <Select
                options={selectOptions}
                placeholder="Multiple selection"
                multiple
                searchable
              />
            </div>
          </ComponentDemo>

          {/* Tabs */}
          <ComponentDemo
            title="Tabs"
            description="アニメーション付きタブコンポーネント"
            code={`<Tabs defaultValue="tab1" variant="pills">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
    <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">
    Content for Tab 1
  </Tabs.Content>
</Tabs>`}
          >
            <Tabs defaultValue="overview" variant="pills">
              <Tabs.List>
                <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
                <Tabs.Trigger value="features">Features</Tabs.Trigger>
                <Tabs.Trigger value="pricing">Pricing</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="overview">
                <Card className="p-6">
                  <h3 className="font-semibold mb-2">Overview</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    このタブには概要情報が表示されます。美しいアニメーションと共に
                    コンテンツが切り替わります。
                  </p>
                </Card>
              </Tabs.Content>
              <Tabs.Content value="features">
                <Card className="p-6">
                  <h3 className="font-semibold mb-2">Features</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• 美しいアニメーション</li>
                    <li>• 完全にカスタマイズ可能</li>
                    <li>• アクセシビリティ対応</li>
                    <li>• TypeScript サポート</li>
                  </ul>
                </Card>
              </Tabs.Content>
              <Tabs.Content value="pricing">
                <Card className="p-6">
                  <h3 className="font-semibold mb-2">Pricing</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    完全無料でオープンソース！
                  </p>
                </Card>
              </Tabs.Content>
            </Tabs>
          </ComponentDemo>

          {/* Modal */}
          <ComponentDemo
            title="Modal"
            description="美しいモーダルダイアログ"
            code={`<Modal 
  open={modalOpen} 
  onOpenChange={setModalOpen}
  title="Modal Title"
  description="Modal description"
>
  <p>Modal content goes here...</p>
</Modal>`}
          >
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button onClick={() => setModalOpen(true)}>
                  Open Modal
                </Button>
              </div>
              
              <Modal 
                open={modalOpen} 
                onOpenChange={setModalOpen}
                title="Beautiful Modal"
                description="This is a next-generation modal with smooth animations"
              >
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    このモーダルは美しいアニメーションと共に表示されます。
                    完全にカスタマイズ可能で、様々なバリアントが利用できます。
                  </p>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setModalOpen(false)}>
                      Confirm
                    </Button>
                  </div>
                </div>
              </Modal>
            </div>
          </ComponentDemo>

          {/* Toast */}
          <ComponentDemo
            title="Toast Notifications"
            description="エレガントな通知システム"
            code={`const { addToast } = useToast()

addToast({
  type: 'success',
  title: 'Success!',
  description: 'Operation completed successfully.',
  duration: 3000
})`}
          >
            <div className="flex flex-wrap gap-4">
              <Button variant="success" onClick={() => showToast('success')}>
                Success Toast
              </Button>
              <Button variant="destructive" onClick={() => showToast('error')}>
                Error Toast
              </Button>
              <Button variant="warning" onClick={() => showToast('warning')}>
                Warning Toast
              </Button>
              <Button variant="ghost" onClick={() => showToast('info')}>
                Info Toast
              </Button>
            </div>
          </ComponentDemo>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-16"
        >
          <Card variant="gradient" className="p-12">
            <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              これらの美しいコンポーネントを使って、次世代のWebアプリケーションを構築しましょう。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="premium"
                leftIcon={<Download className="w-5 h-5" />}
              >
                Download Now
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                leftIcon={<Play className="w-5 h-5" />}
              >
                View Documentation
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
} 