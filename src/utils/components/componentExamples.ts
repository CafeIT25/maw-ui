export interface CodeExample {
  title: string;
  description: string;
  code: string;
  language: 'tsx' | 'jsx' | 'css' | 'json';
  category: 'basic' | 'advanced' | 'custom' | 'integration';
}

export const getComponentExamples = (componentId: string): CodeExample[] => {
  const examples: Record<string, CodeExample[]> = {
    button: [
      {
        title: 'Basic Usage',
        description: 'Simple button with different variants',
        language: 'tsx',
        category: 'basic',
        code: `import { Button } from '@/components/ui/Button';

export function BasicButtons() {
  return (
    <div className="flex gap-4">
      <Button variant="default">Default</Button>
      <Button variant="premium">Premium</Button>
      <Button variant="neon">Neon</Button>
      <Button variant="glass">Glass</Button>
    </div>
  );}`
      },
      {
        title: 'With Icons and Loading',
        description: 'Buttons with icons and loading states',
        language: 'tsx',
        category: 'advanced',
        code: `import { Button } from '@/components/ui/Button';
import { Download, Heart, Star } from 'lucide-react';

export function IconButtons() {
  const [loading, setLoading] = useState(false);
  
  const handleDownload = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <div className="flex gap-4">
      <Button 
        leftIcon={<Download />}
        onClick={handleDownload}
        loading={loading}
      >
        Download
      </Button>
      <Button variant="outline" rightIcon={<Heart />}>
        Like
      </Button>
      <Button variant="ghost" leftIcon={<Star />}>
        Favorite
      </Button>
    </div>
  );}`
      }
    ],
    card: [
      {
        title: 'Basic Card Layout',
        description: 'Standard card with header and content',
        language: 'tsx',
        category: 'basic',
        code: `import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export function BasicCard() {
  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is the card content area where you can place any content.</p>
      </CardContent>
    </Card>
  );}`
      }
    ],
    datepicker: [
      {
        title: 'Basic Date Pickers',
        description: 'Simple date pickers with different styles',
        language: 'tsx',
        category: 'basic',
        code: `import { DatePicker } from '@/components/ui/DatePicker';

export function BasicDatePickers() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h4 className="font-semibold text-lg">Basic Date Pickers</h4>
          <div className="space-y-4">
            <DatePicker placeholder="Select date" />
            <DatePicker 
              variant="neon"
              placeholder="Neon date picker"
            />
            <DatePicker 
              range
              placeholder="Select date range"
            />
          </div>
        </div>
      </div>
    </div>
  );}`
      }
    ],
    dropdown: [
      {
        title: 'Basic Dropdown',
        description: 'Simple dropdown menu with basic items',
        language: 'tsx',
        category: 'basic',
        code: `import { Dropdown } from '@/components/ui/Dropdown';
import { ChevronDown, Settings, Users, Mail } from 'lucide-react';

export function BasicDropdown() {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        Menu
        <ChevronDown className="w-4 h-4" />
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item leftIcon={<Settings className="w-4 h-4" />}>
          Settings
        </Dropdown.Item>
        <Dropdown.Item leftIcon={<Users className="w-4 h-4" />}>
          Team
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item leftIcon={<Mail className="w-4 h-4" />}>
          Invite users
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );}`
      },
      {
        title: 'Dropdown Variants',
        description: 'Different visual styles for dropdown triggers',
        language: 'tsx',
        category: 'basic',
        code: `import { Dropdown } from '@/components/ui/Dropdown';
import { ChevronDown } from 'lucide-react';

export function DropdownVariants() {
  const variants = ['default', 'outline', 'ghost', 'neon', 'glass'];
  
  return (
    <div className="flex gap-4 flex-wrap">
      {variants.map((variant) => (
        <Dropdown key={variant}>
          <Dropdown.Trigger variant={variant}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
            <ChevronDown className="w-4 h-4" />
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Edit</Dropdown.Item>
            <Dropdown.Item>Copy</Dropdown.Item>
            <Dropdown.Item>Delete</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      ))}
    </div>
  );}`
      },
      {
        title: 'Advanced Dropdown Menu',
        description: 'Feature-rich dropdown with labels, shortcuts, and icons',
        language: 'tsx',
        category: 'advanced',
        code: `import { Dropdown } from '@/components/ui/Dropdown';
import { Avatar } from '@/components/ui/Avatar';
import { 
  ChevronDown, 
  User, 
  Settings, 
  CreditCard, 
  LogOut,
  Plus,
  Mail
} from 'lucide-react';

export function AdvancedDropdown() {
  return (
    <Dropdown>
      <Dropdown.Trigger variant="ghost" className="flex items-center gap-2">
        <Avatar fallback="JD" size="sm" />
        <span>John Doe</span>
        <ChevronDown className="w-4 h-4" />
      </Dropdown.Trigger>
      <Dropdown.Content align="end" className="w-56">
        <Dropdown.Label>My Account</Dropdown.Label>
        <Dropdown.Item leftIcon={<User className="w-4 h-4" />} shortcut="⌘⇧P">
          Profile
        </Dropdown.Item>
        <Dropdown.Item leftIcon={<CreditCard className="w-4 h-4" />} shortcut="⌘B">
          Billing
        </Dropdown.Item>
        <Dropdown.Item leftIcon={<Settings className="w-4 h-4" />} shortcut="⌘S">
          Settings
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Label>Team</Dropdown.Label>
        <Dropdown.Item leftIcon={<Plus className="w-4 h-4" />}>
          New Team
        </Dropdown.Item>
        <Dropdown.Item leftIcon={<Mail className="w-4 h-4" />} shortcut="⌘⇧I">
          Invite members
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item 
          leftIcon={<LogOut className="w-4 h-4" />} 
          destructive
        >
          Sign out
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );}`
      },
      {
        title: 'Status Selector Dropdown',
        description: 'Dropdown for selecting status with visual indicators',
        language: 'tsx',
        category: 'advanced',
        code: `import { Dropdown } from '@/components/ui/Dropdown';
import { ChevronDown, Check } from 'lucide-react';
import { useState } from 'react';

const statusOptions = [
  { value: 'active', label: 'Active', color: 'bg-green-500' },
  { value: 'pending', label: 'Pending', color: 'bg-yellow-500' },
  { value: 'inactive', label: 'Inactive', color: 'bg-red-500' },
  { value: 'draft', label: 'Draft', color: 'bg-gray-500' }
];

export function StatusSelector() {
  const [selectedStatus, setSelectedStatus] = useState('active');
  const currentStatus = statusOptions.find(s => s.value === selectedStatus);
  
  return (
    <Dropdown>
      <Dropdown.Trigger variant="outline">
        <div className={\`w-2 h-2 rounded-full \${currentStatus?.color}\`}></div>
        {currentStatus?.label}
        <ChevronDown className="w-4 h-4" />
      </Dropdown.Trigger>
      <Dropdown.Content>
        {statusOptions.map((status) => (
          <Dropdown.Item
            key={status.value}
            leftIcon={<div className={\`w-2 h-2 rounded-full \${status.color}\`}></div>}
            rightIcon={selectedStatus === status.value ? <Check className="w-4 h-4" /> : undefined}
            selected={selectedStatus === status.value}
            onSelect={() => setSelectedStatus(status.value)}
          >
            {status.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown>
  );}`
      }
    ],
    tooltip: [
      {
        title: 'Basic Tooltips',
        description: 'Simple tooltips with different positions',
        language: 'tsx',
        category: 'basic',
        code: `import { Tooltip } from '@/components/ui/Tooltip';
import { Button } from '@/components/ui/Button';

export function BasicTooltips() {
  return (
    <div className="flex gap-4 justify-center">
      <Tooltip content="Tooltip on top" side="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      
      <Tooltip content="Tooltip on bottom" side="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
      
      <Tooltip content="Tooltip on left" side="left">
        <Button variant="outline">Left</Button>
      </Tooltip>
      
      <Tooltip content="Tooltip on right" side="right">
        <Button variant="outline">Right</Button>
      </Tooltip>
    </div>
  );
}`
      },
      {
        title: 'Tooltip Variants',
        description: 'Different visual styles for tooltips',
        language: 'tsx',
        category: 'basic',
        code: `import { Tooltip } from '@/components/ui/Tooltip';
import { Button } from '@/components/ui/Button';

export function TooltipVariants() {
  const variants = ['default', 'dark', 'light', 'neon', 'glass', 'gradient'];
  
  return (
    <div className="flex gap-4 flex-wrap justify-center">
      {variants.map((variant) => (
        <Tooltip 
          key={variant}
          content={\`This is a \${variant} tooltip\`}
          variant={variant}
        >
          <Button variant="outline">
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}`
      }
    ]
  };

  return examples[componentId] || [];
}; 