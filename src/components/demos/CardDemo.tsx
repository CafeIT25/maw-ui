import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { 
  Heart, 
  MessageCircle, 
  Share, 
  Star, 
  ShoppingCart, 
  User, 
  Calendar, 
  MapPin, 
  TrendingUp,
  Activity,
  DollarSign,
  Users,
  MoreHorizontal,
  Play,
  Bookmark,
  Zap,
  Award,
  Clock
} from 'lucide-react';

export const CardDemo: React.FC = () => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8">
      {/* Basic Card Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">Basic</Badge>
            Card Variants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="default">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Default Card</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The default card variant with standard styling
                </p>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Elevated Card</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Elevated card with enhanced shadow
                </p>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Outlined Card</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Outlined card with border styling
                </p>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Filled Card</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Filled card with background color
                </p>
              </CardContent>
            </Card>

            <Card variant="gradient">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Gradient Card</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Beautiful gradient background card
                </p>
              </CardContent>
            </Card>

            <Card variant="glass">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-white">Glass Card</h3>
                <p className="text-sm text-gray-300">
                  Glass morphism effect card
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Content Cards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="premium">Content</Badge>
            Content Cards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card variant="elevated">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar>
                    <User className="w-6 h-6" />
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">Sarah Johnson</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      UI/UX Designer
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Creating beautiful and functional user experiences
                </p>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="premium">
                    Connect
                  </Button>
                  <Button size="sm" variant="outline">
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card variant="gradient">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Revenue</h3>
                    <p className="text-3xl font-bold text-white">$12,345</p>
                  </div>
                  <div className="p-2 bg-white/20 rounded-lg">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-300" />
                  <span className="text-sm text-green-300">+12.5%</span>
                  <span className="text-sm text-white/80">vs last month</span>
                </div>
              </CardContent>
            </Card>

            {/* Event Card */}
            <Card variant="outlined">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="premium">Tech Conference</Badge>
                  <Button 
                    size="icon-sm" 
                    variant="ghost"
                    onClick={() => toggleBookmark('event1')}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarks.event1 ? 'fill-current text-blue-600' : ''}`} />
                  </Button>
                </div>
                <h3 className="font-semibold mb-2">Design Systems Summit 2024</h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>March 15-17, 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>San Francisco, CA</span>
                  </div>
                </div>
                <Button size="sm" variant="success" className="mt-4">
                  Register Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Cards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="neon">Interactive</Badge>
            Interactive Cards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Social Media Card */}
            <Card variant="elevated">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <User className="w-5 h-5" />
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-sm">Alex Chen</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <Button size="icon-sm" variant="ghost">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm mb-4">
                  Just launched our new design system! 🎉 Amazing collaboration 
                  with the team. Check out the components library.
                </p>
                <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-4 flex items-center justify-center">
                  <Play className="w-8 h-8 text-white" />
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-4">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => toggleFavorite('post1')}
                      leftIcon={
                        <Heart className={`w-4 h-4 ${favorites.post1 ? 'fill-current text-red-500' : ''}`} />
                      }
                    >
                      24
                    </Button>
                    <Button size="sm" variant="ghost" leftIcon={<MessageCircle className="w-4 h-4" />}>
                      8
                    </Button>
                    <Button size="sm" variant="ghost" leftIcon={<Share className="w-4 h-4" />}>
                      Share
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>

            {/* Product Card */}
            <Card variant="elevated">
              <CardContent className="p-0">
                <div className="aspect-square bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-t-lg relative">
                  <div className="absolute top-3 right-3">
                    <Badge variant="success">New</Badge>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Button 
                      size="icon-sm" 
                      variant="glass"
                      onClick={() => toggleFavorite('product1')}
                    >
                      <Heart className={`w-4 h-4 ${favorites.product1 ? 'fill-current text-red-500' : 'text-white'}`} />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-current text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                      (124)
                    </span>
                  </div>
                  <h3 className="font-semibold mb-1">Premium Headphones</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    High-quality wireless headphones with noise cancellation
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">$199</span>
                      <span className="text-sm text-gray-500 line-through">$299</span>
                    </div>
                    <Button size="sm" variant="premium" leftIcon={<ShoppingCart className="w-4 h-4" />}>
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Cards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="success">Dashboard</Badge>
            Dashboard Cards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card variant="elevated">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Total Users
                    </p>
                    <p className="text-2xl font-bold">2,543</p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">+5.4%</span>
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Performance
                    </p>
                    <p className="text-2xl font-bold">98.5%</p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <Zap className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">Excellent</span>
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Achievements
                    </p>
                    <p className="text-2xl font-bold">47</p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">This month</span>
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Response Time
                    </p>
                    <p className="text-2xl font-bold">1.2s</p>
                  </div>
                  <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">-0.3s</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardDemo; 