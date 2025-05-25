import React from 'react'
import { motion } from 'framer-motion'
import { Github, Twitter, Heart, Code } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from './ui/Button'

export const Footer: React.FC = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const links = {
    product: [
      { name: t('nav.components'), href: '#components' },
      { name: t('footer.documentation'), href: '#docs' },
      { name: t('footer.examples'), href: '#examples' },
      { name: 'Changelog', href: '#changelog' },
    ],
    community: [
      { name: t('footer.github'), href: '#github' },
      { name: t('footer.discord'), href: '#discord' },
      { name: t('footer.twitter'), href: '#twitter' },
      { name: t('footer.blog'), href: '#blog' },
    ],
    resources: [
      { name: 'Getting Started', href: '#getting-started' },
      { name: 'API Reference', href: '#api' },
      { name: 'Tutorials', href: '#tutorials' },
      { name: t('footer.support'), href: '#support' },
    ],
  }

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  MAW UI
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                {t('footer.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex space-x-4"
            >
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-gray-400 hover:text-white"
              >
                <Github size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-gray-400 hover:text-white"
              >
                <Twitter size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-gray-400 hover:text-white"
              >
                <Code size={20} />
              </Button>
            </motion.div>
          </div>

          {/* Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {t('footer.quickLinks')}
              </h3>
              <ul className="space-y-3">
                {links.product.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {t('footer.community')}
              </h3>
              <ul className="space-y-3">
                {links.community.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {t('footer.resources')}
              </h3>
              <ul className="space-y-3">
                {links.resources.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} MAW UI. {t('footer.allRightsReserved')}
            </p>
            <div className="flex items-center space-x-1 text-gray-400 text-sm mt-4 md:mt-0">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>by developers, for developers</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
} 