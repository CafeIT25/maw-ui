import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Carousel, ThumbnailCarousel, Carousel3D } from '../components/ui/Carousel';
import type { CarouselItem } from '../components/ui/Carousel';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { 
  Play,
  Pause,
  Image,
  Video,
  Layers,
  Zap,
  Sparkles,
  Rocket,
  Eye,
  Code,
  Copy,
  Cpu,
  Database,
  TrendingUp,
  Shield,
  Target,
  Palette,
  Settings,
  Users,
  ShoppingCart,
  Star,
  Heart,
  Camera,
  Film,
  Music,
  Headphones,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  RotateCcw,
  Maximize,
  Volume2,
  BookOpen,
  Award,
  Globe,
  Smartphone,
  Laptop,
  BarChart3,
} from 'lucide-react';

// Image error handling utility
const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const target = e.target as HTMLImageElement;
  // Use a reliable placeholder service as fallback
  target.src = `https://via.placeholder.com/${target.width || 400}x${target.height || 300}/6366f1/ffffff?text=Image+Loading...`;
};

// Component navigation order
const componentOrder = [
  { id: 'button', title: 'Button', path: '/components/button' },
  { id: 'input', title: 'Input', path: '/components/input' },
  { id: 'carousel', title: 'Carousel', path: '/components/carousel' },
  { id: 'select', title: 'Select', path: '/components/select' },
  { id: 'slider', title: 'Slider', path: '/components/slider' },
  { id: 'smartform', title: 'SmartForm', path: '/examples/smartform' },
];

// Extended Demo data with more variety
const portfolioItems: CarouselItem[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    title: 'Modern Architecture',
    description: 'Contemporary building design with innovative materials and sustainable features.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    title: 'Interior Design',
    description: 'Luxurious interior spaces that blend comfort with sophisticated aesthetics.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    title: 'Landscape Architecture',
    description: 'Harmonious integration of natural elements with modern urban planning.',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    title: 'Urban Planning',
    description: 'Smart city solutions for sustainable and livable urban environments.',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
    title: 'Residential Projects',
    description: 'Innovative housing solutions that prioritize community and sustainability.',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
    title: 'Commercial Spaces',
    description: 'Dynamic workspaces that foster collaboration and productivity.',
  },
];

const productItems: CarouselItem[] = [
  {
    id: 1,
    content: (
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-500 to-purple-600 text-white p-8">
        <Headphones className="w-16 h-16 mb-4" />
        <h3 className="text-2xl font-bold mb-2">Wireless Headphones</h3>
        <p className="text-blue-100 text-center mb-4">Premium audio experience with active noise cancellation</p>
        <Button variant="secondary" size="lg">
          <ShoppingCart className="w-4 h-4 mr-2" />
          $299.99
        </Button>
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-8">
        <Camera className="w-16 h-16 mb-4" />
        <h3 className="text-2xl font-bold mb-2">Digital Camera</h3>
        <p className="text-emerald-100 text-center mb-4">Professional photography with AI-powered features</p>
        <Button variant="secondary" size="lg">
          <ShoppingCart className="w-4 h-4 mr-2" />
          $1,299.99
        </Button>
      </div>
    ),
  },
  {
    id: 3,
    content: (
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-orange-500 to-red-600 text-white p-8">
        <Music className="w-16 h-16 mb-4" />
        <h3 className="text-2xl font-bold mb-2">Smart Speaker</h3>
        <p className="text-orange-100 text-center mb-4">Voice-controlled music and smart home integration</p>
        <Button variant="secondary" size="lg">
          <ShoppingCart className="w-4 h-4 mr-2" />
          $199.99
        </Button>
      </div>
    ),
  },
  {
    id: 4,
    content: (
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-purple-500 to-pink-600 text-white p-8">
        <Film className="w-16 h-16 mb-4" />
        <h3 className="text-2xl font-bold mb-2">Action Camera</h3>
        <p className="text-purple-100 text-center mb-4">4K recording with waterproof design for adventures</p>
        <Button variant="secondary" size="lg">
          <ShoppingCart className="w-4 h-4 mr-2" />
          $449.99
        </Button>
      </div>
    ),
  },
  {
    id: 5,
    content: (
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-8">
        <Laptop className="w-16 h-16 mb-4" />
        <h3 className="text-2xl font-bold mb-2">Gaming Laptop</h3>
        <p className="text-cyan-100 text-center mb-4">High-performance gaming with RGB backlit keyboard</p>
        <Button variant="secondary" size="lg">
          <ShoppingCart className="w-4 h-4 mr-2" />
          $2,199.99
        </Button>
      </div>
    ),
  },
  {
    id: 6,
    content: (
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-green-500 to-emerald-600 text-white p-8">
        <Smartphone className="w-16 h-16 mb-4" />
        <h3 className="text-2xl font-bold mb-2">Smartphone Pro</h3>
        <p className="text-green-100 text-center mb-4">Latest flagship with triple camera system</p>
        <Button variant="secondary" size="lg">
          <ShoppingCart className="w-4 h-4 mr-2" />
          $999.99
        </Button>
      </div>
    ),
  },
];

const testimonialItems: CarouselItem[] = [
  {
    id: 1,
    content: (
      <div className="text-center p-8">
        <div className="mb-6">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
            alt="John Smith"
            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
          />
          <h4 className="text-lg font-semibold">John Smith</h4>
          <p className="text-gray-600 dark:text-gray-400">CEO, TechCorp</p>
        </div>
        <blockquote className="text-xl italic text-gray-700 dark:text-gray-300 mb-4">
          "This component library has revolutionized our development process. The quality and attention to detail is exceptional."
        </blockquote>
        <div className="flex justify-center">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <div className="text-center p-8">
        <div className="mb-6">
          <img
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
            alt="Sarah Johnson"
            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
          />
          <h4 className="text-lg font-semibold">Sarah Johnson</h4>
          <p className="text-gray-600 dark:text-gray-400">Design Lead, DesignCo</p>
        </div>
        <blockquote className="text-xl italic text-gray-700 dark:text-gray-300 mb-4">
          "The design system is incredibly cohesive and the animations add the perfect touch of polish to our interfaces."
        </blockquote>
        <div className="flex justify-center">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 3,
    content: (
      <div className="text-center p-8">
        <div className="mb-6">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
            alt="Michael Chen"
            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
          />
          <h4 className="text-lg font-semibold">Michael Chen</h4>
          <p className="text-gray-600 dark:text-gray-400">CTO, StartupXYZ</p>
        </div>
        <blockquote className="text-xl italic text-gray-700 dark:text-gray-300 mb-4">
          "Outstanding performance and accessibility features. Our development velocity has increased significantly."
        </blockquote>
        <div className="flex justify-center">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 4,
    content: (
      <div className="text-center p-8">
        <div className="mb-6">
          <img
            src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=100&h=100&fit=crop&crop=face"
            alt="Emma Wilson"
            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
          />
          <h4 className="text-lg font-semibold">Emma Wilson</h4>
          <p className="text-gray-600 dark:text-gray-400">Product Manager, InnovateCorp</p>
        </div>
        <blockquote className="text-xl italic text-gray-700 dark:text-gray-300 mb-4">
          "The carousel components are incredibly flexible and have helped us create stunning user experiences."
        </blockquote>
        <div className="flex justify-center">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
      </div>
    ),
  },
];

const featureItems: CarouselItem[] = [
  {
    id: 1,
    content: (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-8">
        <div className="text-center">
          <Zap className="w-20 h-20 mx-auto mb-6" />
          <h3 className="text-3xl font-bold mb-4">Lightning Fast</h3>
          <p className="text-cyan-100 text-lg leading-relaxed">
            Optimized for performance with virtual scrolling and smooth animations
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-emerald-500 to-green-600 text-white p-8">
        <div className="text-center">
          <Shield className="w-20 h-20 mx-auto mb-6" />
          <h3 className="text-3xl font-bold mb-4">Accessible</h3>
          <p className="text-emerald-100 text-lg leading-relaxed">
            WCAG 2.1 AA compliant with full keyboard navigation support
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    content: (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-8">
        <div className="text-center">
          <Palette className="w-20 h-20 mx-auto mb-6" />
          <h3 className="text-3xl font-bold mb-4">Customizable</h3>
          <p className="text-purple-100 text-lg leading-relaxed">
            Multiple variants and themes with extensive styling options
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    content: (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-orange-500 to-red-600 text-white p-8">
        <div className="text-center">
          <Globe className="w-20 h-20 mx-auto mb-6" />
          <h3 className="text-3xl font-bold mb-4">Responsive</h3>
          <p className="text-orange-100 text-lg leading-relaxed">
            Adapts perfectly to all screen sizes and device orientations
          </p>
        </div>
      </div>
    ),
  },
];

// New: Media Gallery Items
const mediaItems: CarouselItem[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    title: 'Nature Photography',
    description: 'Stunning landscapes and wildlife photography',
    content: (
      <div className="absolute top-4 left-4">
        <Badge variant="glass">4K Ultra HD</Badge>
      </div>
    ),
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop',
    title: 'Street Art',
    description: 'Urban art and graffiti collections',
    content: (
      <div className="absolute top-4 left-4">
        <Badge variant="neon">HD Video</Badge>
      </div>
    ),
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    title: 'Architecture',
    description: 'Modern and classical architecture',
    content: (
      <div className="absolute top-4 left-4">
        <Badge variant="premium">360° View</Badge>
      </div>
    ),
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
    title: 'Abstract Art',
    description: 'Digital and traditional abstract artwork',
    content: (
      <div className="absolute top-4 left-4">
        <Badge variant="glass">Digital Art</Badge>
      </div>
    ),
  },
];

// New: Team Member Items
const teamItems: CarouselItem[] = [
  {
    id: 1,
    content: (
      <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg">
        <img
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
          alt="Alex Thompson"
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
          onError={handleImageError}
        />
        <h4 className="text-xl font-bold mb-2">Alex Thompson</h4>
        <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">Lead Designer</p>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Passionate about creating beautiful and functional user experiences with over 8 years in design.
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <Badge variant="outline" size="sm">UI/UX</Badge>
          <Badge variant="outline" size="sm">Figma</Badge>
          <Badge variant="outline" size="sm">Prototyping</Badge>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg">
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
          alt="Maria Garcia"
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
        />
        <h4 className="text-xl font-bold mb-2">Maria Garcia</h4>
        <p className="text-green-600 dark:text-green-400 font-medium mb-3">Frontend Developer</p>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Expert in React and TypeScript, building scalable and performant web applications.
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <Badge variant="outline" size="sm">React</Badge>
          <Badge variant="outline" size="sm">TypeScript</Badge>
          <Badge variant="outline" size="sm">Next.js</Badge>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    content: (
      <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
          alt="David Kim"
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
        />
        <h4 className="text-xl font-bold mb-2">David Kim</h4>
        <p className="text-purple-600 dark:text-purple-400 font-medium mb-3">Backend Engineer</p>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Specializes in distributed systems and API design with strong DevOps background.
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <Badge variant="outline" size="sm">Node.js</Badge>
          <Badge variant="outline" size="sm">GraphQL</Badge>
          <Badge variant="outline" size="sm">Docker</Badge>
        </div>
      </div>
    ),
  },
];

// New: Statistics Items
const statsItems: CarouselItem[] = [
  {
    id: 1,
    content: (
      <div className="text-center p-8 bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
        <TrendingUp className="w-16 h-16 mx-auto mb-4" />
        <h3 className="text-4xl font-bold mb-2">99.9%</h3>
        <p className="text-xl mb-2">Uptime</p>
        <p className="text-cyan-100">Reliable performance you can count on</p>
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <div className="text-center p-8 bg-gradient-to-br from-emerald-500 to-green-600 text-white">
        <Users className="w-16 h-16 mx-auto mb-4" />
        <h3 className="text-4xl font-bold mb-2">50K+</h3>
        <p className="text-xl mb-2">Active Users</p>
        <p className="text-emerald-100">Growing community worldwide</p>
      </div>
    ),
  },
  {
    id: 3,
    content: (
      <div className="text-center p-8 bg-gradient-to-br from-purple-500 to-pink-600 text-white">
        <Award className="w-16 h-16 mx-auto mb-4" />
        <h3 className="text-4xl font-bold mb-2">15+</h3>
        <p className="text-xl mb-2">Awards</p>
        <p className="text-purple-100">Industry recognition and excellence</p>
      </div>
    ),
  },
  {
    id: 4,
    content: (
      <div className="text-center p-8 bg-gradient-to-br from-orange-500 to-red-600 text-white">
        <Globe className="w-16 h-16 mx-auto mb-4" />
        <h3 className="text-4xl font-bold mb-2">120+</h3>
        <p className="text-xl mb-2">Countries</p>
        <p className="text-orange-100">Global reach and impact</p>
      </div>
    ),
  },
];

// New: News Articles Items
const newsItems: CarouselItem[] = [
  {
    id: 1,
    content: (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <img
            src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=120&h=80&fit=crop"
            alt="Tech News"
            className="w-20 h-16 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <Badge variant="primary" size="sm" className="mb-2">Technology</Badge>
            <h4 className="font-bold text-lg mb-2 line-clamp-2">
              Next-Generation UI Components Transform Development Experience
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
              Revolutionary component library introduces advanced features that streamline the development process...
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Dec 15, 2024</span>
              <span>•</span>
              <span>5 min read</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <img
            src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=120&h=80&fit=crop"
            alt="Design News"
            className="w-20 h-16 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <Badge variant="secondary" size="sm" className="mb-2">Design</Badge>
            <h4 className="font-bold text-lg mb-2 line-clamp-2">
              Modern Design Principles in Component Libraries
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
              Exploring how modern design principles are reshaping the way we build user interfaces...
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Dec 12, 2024</span>
              <span>•</span>
              <span>3 min read</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    content: (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <img
            src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=80&fit=crop"
            alt="Business News"
            className="w-20 h-16 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <Badge variant="success" size="sm" className="mb-2">Business</Badge>
            <h4 className="font-bold text-lg mb-2 line-clamp-2">
              Enterprise Adoption of Modern UI Frameworks Surges
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
              Major enterprises are increasingly adopting modern UI component libraries for faster development...
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Dec 10, 2024</span>
              <span>•</span>
              <span>7 min read</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    content: (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <img
            src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=120&h=80&fit=crop"
            alt="Development News"
            className="w-20 h-16 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <Badge variant="warning" size="sm" className="mb-2">Development</Badge>
            <h4 className="font-bold text-lg mb-2 line-clamp-2">
              Performance Optimization in Modern Carousel Components
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
              Deep dive into performance optimization techniques for carousel components in large-scale applications...
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Dec 8, 2024</span>
              <span>•</span>
              <span>4 min read</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

const codeExamples = {
  basic: `<Carousel
  items={items}
  autoPlay
  showArrows
  showDots
  onSlideChange={(index) => console.log(index)}
/>`,
  advanced: `<Carousel
  items={portfolioItems}
  variant="premium"
  size="xl"
  effect="fade"
  autoPlay
  autoPlayInterval={4000}
  pauseOnHover
  showPlayPause
  swipeable
  responsive={[
    { breakpoint: 768, settings: { slidesToShow: 1 } },
    { breakpoint: 1024, settings: { slidesToShow: 2 } }
  ]}
/>`,
  thumbnail: `<ThumbnailCarousel
  items={mediaItems}
  showThumbnails
  thumbnailPosition="bottom"
  thumbnailSize="lg"
  variant="elevated"
  autoPlay
/>`,
  carousel3d: `<Carousel3D
  items={showcaseItems}
  perspective={1200}
  depth={300}
  autoPlay
  autoPlayInterval={5000}
/>`,
  effects: `<Carousel
  items={teamItems}
  effect="cube"
  variant="glass"
  size="lg"
  centerMode
  infinite
  autoPlay
  autoPlayInterval={3000}
/>`,
  responsive: `<Carousel
  items={statsItems}
  slidesToShow={3}
  slidesToScroll={1}
  responsive={[
    { breakpoint: 1200, settings: { slidesToShow: 3 } },
    { breakpoint: 992, settings: { slidesToShow: 2 } },
    { breakpoint: 768, settings: { slidesToShow: 1 } },
    { breakpoint: 576, settings: { slidesToShow: 1 } }
  ]}
  autoPlay
  infinite
/>`
};

// Expanded demo scenarios
const demoScenarios = [
  {
    id: 'portfolio',
    title: 'Portfolio Showcase',
    description: 'Image gallery with smooth transitions',
    icon: Image,
    color: 'from-blue-500 to-purple-600'
  },
  {
    id: 'product',
    title: 'Product Carousel',
    description: 'E-commerce product displays',
    icon: ShoppingCart,
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'testimonial',
    title: 'Customer Testimonials',
    description: 'Social proof and reviews',
    icon: Users,
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'feature',
    title: 'Feature Highlights',
    description: 'Key features presentation',
    icon: Star,
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'media',
    title: 'Media Gallery',
    description: 'Rich media content showcase',
    icon: Video,
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'team',
    title: 'Team Members',
    description: 'Meet the team presentations',
    icon: Users,
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'stats',
    title: 'Statistics',
    description: 'Data visualization and metrics',
    icon: BarChart3,
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'news',
    title: 'News & Articles',
    description: 'Content and blog posts',
    icon: BookOpen,
    color: 'from-amber-500 to-orange-600'
  }
];

export const CarouselDemo: React.FC = () => {
  const navigate = useNavigate();
  const [activeDemo, setActiveDemo] = useState('portfolio');
  const [codeVisible, setCodeVisible] = useState(false);
  const [selectedCodeExample, setSelectedCodeExample] = useState('basic');
  const [autoPlay, setAutoPlay] = useState(true);
  const [currentVariant, setCurrentVariant] = useState<'default' | 'elevated' | 'glass' | 'neon' | 'premium'>('default');
  
  const heroRef = useRef<HTMLDivElement>(null);

  // Navigation functions
  const getCurrentComponentIndex = () => {
    return componentOrder.findIndex(comp => comp.id === 'carousel');
  };

  const handlePrevious = () => {
    const currentIndex = getCurrentComponentIndex();
    if (currentIndex > 0) {
      const prevComponent = componentOrder[currentIndex - 1];
      navigate(prevComponent.path);
    }
  };

  const handleNext = () => {
    const currentIndex = getCurrentComponentIndex();
    if (currentIndex < componentOrder.length - 1) {
      const nextComponent = componentOrder[currentIndex + 1];
      navigate(nextComponent.path);
    }
  };

  const canNavigatePrevious = () => {
    const currentIndex = getCurrentComponentIndex();
    return currentIndex > 0;
  };

  const canNavigateNext = () => {
    const currentIndex = getCurrentComponentIndex();
    return currentIndex < componentOrder.length - 1;
  };

  const handleBackToComponents = () => {
    navigate('/components');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 space-y-12 px-4 py-8">
        {/* Navigation Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={handleBackToComponents}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back to Components
            </Button>
            
            <div className="flex gap-2">
              {canNavigatePrevious() && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  leftIcon={<ChevronLeft className="w-4 h-4" />}
                >
                  Previous
                </Button>
              )}
              {canNavigateNext() && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNext}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" size="sm">
              Component Demo
            </Badge>
            <Badge variant="primary" size="sm">
              Carousel
            </Badge>
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-12 h-12 text-blue-500" />
            </motion.div>
            <Badge variant="glass" className="text-lg px-6 py-2">
              Next-Generation Carousel Components
            </Badge>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Rocket className="w-12 h-12 text-purple-500" />
            </motion.div>
          </div>

          <motion.h1 
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Immersive Carousel System
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Experience the most advanced carousel components with 3D effects, 
            auto-play functionality, touch gestures, and premium animations for stunning visual presentations.
          </motion.p>

          {/* Live Demo Carousel */}
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card variant="glass" className="overflow-hidden">
              <CardContent className="p-2">
                <div className="flex items-center justify-between mb-4 px-4 pt-4">
                  <Badge variant="outline" className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Live Demo
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setAutoPlay(!autoPlay)}
                      className="text-xs"
                    >
                      {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const variants = ['default', 'elevated', 'glass', 'neon', 'premium'] as const;
                        const currentIndex = variants.indexOf(currentVariant);
                        const nextIndex = (currentIndex + 1) % variants.length;
                        setCurrentVariant(variants[nextIndex]);
                      }}
                      className="text-xs"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <Carousel
                  items={portfolioItems.slice(0, 3)}
                  variant={currentVariant}
                  size="lg"
                  effect="fade"
                  autoPlay={autoPlay}
                  autoPlayInterval={3000}
                  showArrows
                  showDots
                  pauseOnHover
                />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Interactive Demo Selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Layers className="w-6 h-6" />
                Interactive Demo Scenarios
                <Badge variant="outline">Choose Your Experience</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {demoScenarios.map((scenario) => (
                  <motion.button
                    key={scenario.id}
                    onClick={() => setActiveDemo(scenario.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      activeDemo === scenario.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${scenario.color} p-2 mb-4 mx-auto`}>
                      <scenario.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {scenario.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {scenario.description}
                    </p>
                  </motion.button>
                ))}
              </div>
              
              {/* Demo Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDemo}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeDemo === 'portfolio' && <PortfolioDemo />}
                  {activeDemo === 'product' && <ProductDemo />}
                  {activeDemo === 'testimonial' && <TestimonialDemo />}
                  {activeDemo === 'feature' && <FeatureDemo />}
                  {activeDemo === 'media' && <MediaDemo />}
                  {activeDemo === 'team' && <TeamDemo />}
                  {activeDemo === 'stats' && <StatsDemo />}
                  {activeDemo === 'news' && <NewsDemo />}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Carousel Variants Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Palette className="w-6 h-6" />
                Carousel Variants & Effects
                <Badge variant="primary">6 Variants</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <VariantsShowcase />
            </CardContent>
          </Card>
        </motion.div>

        {/* Advanced Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="w-6 h-6" />
                Advanced Features & Controls
                <Badge variant="outline">Enterprise Ready</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AdvancedFeaturesDemo />
            </CardContent>
          </Card>
        </motion.div>

        {/* Carousel Effects Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Zap className="w-6 h-6" />
                Transition Effects Showcase
                <Badge variant="primary">5 Effects</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EffectsShowcase />
            </CardContent>
          </Card>
        </motion.div>

        {/* Responsive & Layout Variations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Smartphone className="w-6 h-6" />
                Responsive & Layout Variations
                <Badge variant="success">Adaptive</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveDemo />
            </CardContent>
          </Card>
        </motion.div>

        {/* 3D Carousel Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Layers className="w-6 h-6" />
                3D Carousel Experience
                <Badge variant="glass">Next-Gen</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Carousel3DDemo />
            </CardContent>
          </Card>
        </motion.div>

        {/* Code Examples */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                  <Code className="w-6 h-6" />
                  Implementation Examples
                  <Badge variant="outline">Copy & Paste Ready</Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCodeVisible(!codeVisible)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {codeVisible ? 'Hide' : 'Show'} Code
                </Button>
              </CardTitle>
            </CardHeader>
            <AnimatePresence>
              {codeVisible && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <CardContent>
                    <CodeExamplesSection 
                      selectedExample={selectedCodeExample}
                      setSelectedExample={setSelectedCodeExample}
                      codeExamples={codeExamples}
                      copyToClipboard={copyToClipboard}
                    />
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7 }}
        >
          <PerformanceMetrics />
        </motion.div>
      </div>
    </div>
  );
};

// Sub-components for different demo scenarios
const PortfolioDemo: React.FC = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Image className="w-5 h-5" />
          Standard Image Gallery
        </h3>
        <Carousel
          items={portfolioItems}
          variant="elevated"
          size="lg"
          autoPlay
          showArrows
          showDots
          pauseOnHover
        />
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Video className="w-5 h-5" />
          Thumbnail Gallery
        </h3>
        <ThumbnailCarousel
          items={portfolioItems}
          variant="default"
          size="lg"
          showThumbnails
          thumbnailPosition="bottom"
          thumbnailSize="md"
          autoPlay
        />
      </div>
    </div>
    
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
      <h4 className="font-semibold mb-4 flex items-center gap-2">
        <Camera className="w-5 h-5" />
        Portfolio Showcase Features
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-blue-500" />
          <span>Lazy loading images</span>
        </div>
        <div className="flex items-center gap-2">
          <Maximize className="w-4 h-4 text-green-500" />
          <span>Fullscreen support</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-purple-500" />
          <span>SEO optimized</span>
        </div>
      </div>
    </div>
  </div>
);

const ProductDemo: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <ShoppingCart className="w-5 h-5" />
        E-commerce Product Showcase
      </h3>
      <Carousel
        items={productItems}
        variant="premium"
        size="xl"
        effect="scale"
        autoPlay
        autoPlayInterval={4000}
        showArrows
        showDots
        pauseOnHover
        centerMode
      />
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { label: 'Conversion Rate', value: '+23%', icon: TrendingUp, color: 'text-green-500' },
        { label: 'Engagement', value: '+45%', icon: Heart, color: 'text-red-500' },
        { label: 'Click-through', value: '+31%', icon: Target, color: 'text-blue-500' },
      ].map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <metric.icon className={`w-8 h-8 mx-auto mb-3 ${metric.color}`} />
          <div className={`text-2xl font-bold ${metric.color} mb-1`}>
            {metric.value}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {metric.label}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const TestimonialDemo: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Users className="w-5 h-5" />
        Customer Testimonials
      </h3>
      <Carousel
        items={testimonialItems}
        variant="glass"
        size="lg"
        effect="fade"
        autoPlay
        autoPlayInterval={5000}
        showDots
        pauseOnHover
      />
    </div>
    
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
      <h4 className="font-semibold mb-4 flex items-center gap-2">
        <Star className="w-5 h-5" />
        Social Proof Impact
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <div>
          <div className="text-2xl font-bold text-green-600 mb-1">4.9/5</div>
          <div className="text-gray-600 dark:text-gray-400">Average Rating</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-blue-600 mb-1">10,000+</div>
          <div className="text-gray-600 dark:text-gray-400">Happy Customers</div>
        </div>
      </div>
    </div>
  </div>
);

const FeatureDemo: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Star className="w-5 h-5" />
        Key Features Presentation
      </h3>
      <Carousel
        items={featureItems}
        variant="neon"
        size="xl"
        effect="cube"
        autoPlay
        autoPlayInterval={3500}
        showArrows
        showPlayPause
        pauseOnHover
      />
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        'High Performance', 'Touch Gestures', 'Responsive Design',
        'Custom Effects', 'Auto-play Control', 'Keyboard Navigation'
      ].map((feature, index) => (
        <motion.div
          key={feature}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border border-purple-200 dark:border-purple-700"
        >
          <div className="font-medium text-purple-800 dark:text-purple-200">{feature}</div>
        </motion.div>
      ))}
    </div>
  </div>
);

const MediaDemo: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Video className="w-5 h-5" />
        Media Gallery
      </h3>
      <Carousel
        items={mediaItems}
        variant="elevated"
        size="lg"
        autoPlay
        showArrows
        showDots
        pauseOnHover
      />
    </div>
    
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
      <h4 className="font-semibold mb-4 flex items-center gap-2">
        <Video className="w-5 h-5" />
        Media Gallery Features
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-blue-500" />
          <span>Lazy loading images</span>
        </div>
        <div className="flex items-center gap-2">
          <Maximize className="w-4 h-4 text-green-500" />
          <span>Fullscreen support</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-purple-500" />
          <span>SEO optimized</span>
        </div>
      </div>
    </div>
  </div>
);

const TeamDemo: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Users className="w-5 h-5" />
        Team Members
      </h3>
      <Carousel
        items={teamItems}
        variant="glass"
        size="lg"
        effect="fade"
        autoPlay
        autoPlayInterval={5000}
        showDots
        pauseOnHover
      />
    </div>
    
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
      <h4 className="font-semibold mb-4 flex items-center gap-2">
        <Star className="w-5 h-5" />
        Team Member Impact
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <div>
          <div className="text-2xl font-bold text-green-600 mb-1">4.9/5</div>
          <div className="text-gray-600 dark:text-gray-400">Average Rating</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-blue-600 mb-1">10,000+</div>
          <div className="text-gray-600 dark:text-gray-400">Happy Customers</div>
        </div>
      </div>
    </div>
  </div>
);

const StatsDemo: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5" />
        Statistics
      </h3>
      <Carousel
        items={statsItems}
        variant="elevated"
        size="lg"
        autoPlay
        showArrows
        showDots
        pauseOnHover
      />
    </div>
    
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
      <h4 className="font-semibold mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5" />
        Statistics Features
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-blue-500" />
          <span>Lazy loading images</span>
        </div>
        <div className="flex items-center gap-2">
          <Maximize className="w-4 h-4 text-green-500" />
          <span>Fullscreen support</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-purple-500" />
          <span>SEO optimized</span>
        </div>
      </div>
    </div>
  </div>
);

const NewsDemo: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5" />
        News & Articles
      </h3>
      <Carousel
        items={newsItems}
        variant="elevated"
        size="lg"
        autoPlay
        showArrows
        showDots
        pauseOnHover
      />
    </div>
    
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
      <h4 className="font-semibold mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5" />
        News & Articles Features
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-blue-500" />
          <span>Real-time updates</span>
        </div>
        <div className="flex items-center gap-2">
          <Maximize className="w-4 h-4 text-green-500" />
          <span>Category filtering</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-purple-500" />
          <span>Content validation</span>
        </div>
      </div>
    </div>
  </div>
);

const VariantsShowcase: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[
      { variant: 'default' as const, title: 'Default', bg: 'bg-white dark:bg-gray-800' },
      { variant: 'elevated' as const, title: 'Elevated', bg: 'bg-white dark:bg-gray-800' },
      { variant: 'glass' as const, title: 'Glass', bg: 'bg-gradient-to-r from-purple-600 to-pink-600' },
      { variant: 'neon' as const, title: 'Neon', bg: 'bg-black' },
      { variant: 'premium' as const, title: 'Premium', bg: 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950' },
      { variant: 'minimal' as const, title: 'Minimal', bg: 'bg-transparent' },
    ].map((item, index) => (
      <motion.div
        key={item.variant}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        className={`p-4 rounded-xl ${item.bg} border border-gray-200 dark:border-gray-700 ${item.variant === 'neon' ? 'border-cyan-400' : ''}`}
      >
        <div className="mb-4">
          <Badge variant="outline" className="mb-3">{item.title}</Badge>
          <Carousel
            items={portfolioItems.slice(0, 2)}
            variant={item.variant}
            size="sm"
            autoPlay
            showDots
            autoPlayInterval={2000 + index * 500}
          />
        </div>
      </motion.div>
    ))}
  </div>
);

const AdvancedFeaturesDemo: React.FC = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5" />
          3D Carousel
        </h4>
        <Carousel3D
          items={featureItems.slice(0, 3)}
          perspective={1200}
          depth={250}
          autoPlay
          autoPlayInterval={4000}
        />
      </div>

      <div>
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Volume2 className="w-5 h-5" />
          Multi-slide View
        </h4>
        <Carousel
          items={productItems}
          variant="elevated"
          size="lg"
          slidesToShow={2}
          slidesToScroll={1}
          autoPlay
          showArrows
          centerMode
          responsive={[
            { breakpoint: 768, settings: { slidesToShow: 1 } }
          ]}
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { title: 'Touch Support', desc: 'Swipe gestures on mobile', icon: Settings },
        { title: 'Lazy Loading', desc: 'Optimized image loading', icon: Zap },
        { title: 'Responsive', desc: 'Adapts to all screen sizes', icon: Target },
        { title: 'Accessible', desc: 'WCAG 2.1 AA compliant', icon: Shield },
      ].map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl text-center"
        >
          <feature.icon className="w-8 h-8 mx-auto mb-3 text-blue-500" />
          <h5 className="font-semibold mb-2">{feature.title}</h5>
          <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const CodeExamplesSection: React.FC<{
  selectedExample: string;
  setSelectedExample: (example: string) => void;
  codeExamples: Record<string, string>;
  copyToClipboard: (text: string) => void;
}> = ({ selectedExample, setSelectedExample, codeExamples, copyToClipboard }) => (
  <div className="space-y-6">
    <div className="flex flex-wrap gap-2">
      {Object.keys(codeExamples).map((key) => (
        <Button
          key={key}
          variant={selectedExample === key ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedExample(key)}
          className="capitalize"
        >
          {key}
        </Button>
      ))}
    </div>

    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyToClipboard(codeExamples[selectedExample])}
        >
          <Copy className="w-4 h-4" />
        </Button>
      </div>
      <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
        <code>{codeExamples[selectedExample]}</code>
      </pre>
    </div>
  </div>
);

const PerformanceMetrics: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-3">
        <TrendingUp className="w-6 h-6" />
        Performance Metrics
        <Badge variant="primary">Optimized</Badge>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Bundle Size', value: '18.7kb', icon: Database, color: 'text-green-500' },
          { label: 'Render Time', value: '2.1ms', icon: Zap, color: 'text-blue-500' },
          { label: 'Memory Usage', value: '3.8MB', icon: Cpu, color: 'text-purple-500' },
          { label: 'Accessibility', value: '100%', icon: Shield, color: 'text-emerald-500' }
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl"
          >
            <metric.icon className={`w-8 h-8 mx-auto mb-3 ${metric.color}`} />
            <div className={`text-2xl font-bold ${metric.color} mb-1`}>
              {metric.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {metric.label}
            </div>
          </motion.div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// New: Effects Showcase Component
const EffectsShowcase: React.FC = () => {
  const [selectedEffect, setSelectedEffect] = useState('slide');
  
  const effects = [
    { id: 'slide', name: 'Slide', description: 'Classic sliding transition' },
    { id: 'fade', name: 'Fade', description: 'Smooth opacity transition' },
    { id: 'scale', name: 'Scale', description: 'Zoom in/out effect' },
    { id: 'cube', name: 'Cube', description: '3D cube rotation' },
    { id: 'flip', name: 'Flip', description: 'Card flip animation' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {effects.map((effect) => (
          <Button
            key={effect.id}
            variant={selectedEffect === effect.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedEffect(effect.id)}
          >
            {effect.name}
          </Button>
        ))}
      </div>
      
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
        <div className="mb-4">
          <h4 className="font-semibold text-lg mb-2">
            {effects.find(e => e.id === selectedEffect)?.name} Effect
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            {effects.find(e => e.id === selectedEffect)?.description}
          </p>
        </div>
        
        <Carousel
          items={portfolioItems}
          variant="premium"
          size="lg"
          effect={selectedEffect as 'slide' | 'fade' | 'scale' | 'cube' | 'flip'}
          autoPlay
          autoPlayInterval={3000}
          showDots
          pauseOnHover
        />
      </div>
    </div>
  );
};

// New: Responsive Demo Component
const ResponsiveDemo: React.FC = () => {
  const [breakpoint, setBreakpoint] = useState('desktop');
  
  const breakpoints = [
    { id: 'mobile', name: 'Mobile', width: '375px', slides: 1 },
    { id: 'tablet', name: 'Tablet', width: '768px', slides: 2 },
    { id: 'desktop', name: 'Desktop', width: '100%', slides: 3 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {breakpoints.map((bp) => (
          <Button
            key={bp.id}
            variant={breakpoint === bp.id ? "default" : "outline"}
            size="sm"
            onClick={() => setBreakpoint(bp.id)}
          >
            {bp.name} ({bp.slides} slide{bp.slides > 1 ? 's' : ''})
          </Button>
        ))}
      </div>
      
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
        <div className="mb-4">
          <h4 className="font-semibold text-lg mb-2">
            Responsive Breakpoint: {breakpoints.find(b => b.id === breakpoint)?.name}
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            Automatically adjusts slides per view based on screen size
          </p>
        </div>
        
        <div 
          className="mx-auto transition-all duration-500"
          style={{ 
            width: breakpoints.find(b => b.id === breakpoint)?.width,
            maxWidth: '100%'
          }}
        >
          <Carousel
            items={productItems}
            variant="glass"
            size="lg"
            slidesToShow={breakpoints.find(b => b.id === breakpoint)?.slides}
            autoPlay
            autoPlayInterval={4000}
            showArrows
            showDots
            responsive={[
              { breakpoint: 1200, settings: { slidesToShow: 3 } },
              { breakpoint: 768, settings: { slidesToShow: 2 } },
              { breakpoint: 480, settings: { slidesToShow: 1 } },
            ]}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {breakpoints.map((bp, index) => (
          <motion.div
            key={bp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <Smartphone className="w-8 h-8 mx-auto mb-3 text-blue-500" />
            <div className="text-xl font-bold text-blue-600 mb-1">
              {bp.slides}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {bp.name} View
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// New: 3D Carousel Demo Component
const Carousel3DDemo: React.FC = () => {
  const [perspective, setPerspective] = useState(1200);
  const [depth, setDepth] = useState(300);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Perspective: {perspective}px
          </label>
          <input
            type="range"
            min="800"
            max="2000"
            step="100"
            value={perspective}
            onChange={(e) => setPerspective(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Depth: {depth}px
          </label>
          <input
            type="range"
            min="100"
            max="500"
            step="50"
            value={depth}
            onChange={(e) => setDepth(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6">
        <div className="mb-6">
          <h4 className="font-semibold text-lg mb-2">3D Carousel Experience</h4>
          <p className="text-gray-600 dark:text-gray-400">
            Immersive 3D perspective with adjustable depth and perspective controls
          </p>
        </div>
        
        <Carousel3D
          items={mediaItems}
          perspective={perspective}
          depth={depth}
          autoPlay
          autoPlayInterval={5000}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Perspective', value: `${perspective}px`, icon: Eye },
          { label: 'Depth', value: `${depth}px`, icon: Layers },
          { label: 'Performance', value: '60fps', icon: Zap },
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <metric.icon className="w-8 h-8 mx-auto mb-3 text-purple-500" />
            <div className="text-xl font-bold text-purple-600 mb-1">
              {metric.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {metric.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CarouselDemo; 