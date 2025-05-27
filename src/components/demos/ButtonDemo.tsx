import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { 
  Heart, 
  Star, 
  Download, 
  Upload, 
  Settings, 
  Send, 
  PlayCircle, 
  PauseCircle,
  ShoppingCart,
  Plus,
  Minus,
  RefreshCw
} from 'lucide-react';

export const ButtonDemo: React.FC = () => {
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const handleLoadingDemo = async (key: string) => {
    setLoading(prev => ({ ...prev, [key]: true }));
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(prev => ({ ...prev, [key]: false }));
  };

  return (
    <div className="space-y-8">
      {/* Button Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">Basic</Badge>
            Button Variants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="premium">Premium</Button>
              <Button variant="neon">Neon</Button>
              <Button variant="glass">Glass</Button>
              <Button variant="secondary">Secondary</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="destructive">Destructive</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Button Sizes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">Sizes</Badge>
            Button Sizes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </div>
        </CardContent>
      </Card>

      {/* Icon Buttons */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">Icons</Badge>
            Buttons with Icons
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Button leftIcon={<Download />}>Download</Button>
              <Button rightIcon={<Upload />}>Upload</Button>
              <Button leftIcon={<Heart />} variant="outline">Like</Button>
              <Button rightIcon={<Star />} variant="ghost">Favorite</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button leftIcon={<Settings />} variant="premium">Settings</Button>
              <Button rightIcon={<Send />} variant="success">Send Message</Button>
              <Button leftIcon={<ShoppingCart />} variant="neon">Add to Cart</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading States */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">States</Badge>
            Loading & Disabled States
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Button 
                loading={loading.demo1}
                onClick={() => handleLoadingDemo('demo1')}
                leftIcon={<Download />}
              >
                {loading.demo1 ? 'Downloading...' : 'Download File'}
              </Button>
              <Button 
                loading={loading.demo2}
                onClick={() => handleLoadingDemo('demo2')}
                variant="premium"
                rightIcon={<Send />}
              >
                {loading.demo2 ? 'Sending...' : 'Send Email'}
              </Button>
              <Button 
                loading={loading.demo3}
                onClick={() => handleLoadingDemo('demo3')}
                variant="success"
              >
                {loading.demo3 ? 'Processing...' : 'Process Order'}
              </Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button disabled>Disabled Button</Button>
              <Button disabled variant="outline">Disabled Outline</Button>
              <Button disabled variant="ghost">Disabled Ghost</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Icon Only Buttons */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">Icon Only</Badge>
            Icon-Only Buttons
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Button size="icon-sm" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="default">
                <Minus className="w-4 h-4" />
              </Button>
              <Button size="icon-lg" variant="premium">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="icon-sm" variant="neon">
                <PlayCircle className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="glass">
                <PauseCircle className="w-4 h-4" />
              </Button>
              <Button size="icon-lg" variant="secondary">
                <RefreshCw className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-world Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="premium">Examples</Badge>
            Real-world Button Combinations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Call to Action</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Typical CTA button combinations for landing pages
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" variant="premium" leftIcon={<Star />}>
                  Get Started Free
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Form Actions */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Form Actions</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Common form button patterns
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="success" leftIcon={<Send />}>
                  Submit
                </Button>
                <Button variant="outline">
                  Cancel
                </Button>
                <Button variant="ghost">
                  Save as Draft
                </Button>
              </div>
            </div>

            {/* E-commerce Actions */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">E-commerce Actions</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Shopping and purchase related buttons
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="neon" leftIcon={<ShoppingCart />}>
                  Add to Cart
                </Button>
                <Button variant="premium" rightIcon={<Heart />}>
                  Add to Wishlist
                </Button>
                <Button variant="warning">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ButtonDemo; 