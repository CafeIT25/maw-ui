import React from 'react';

export interface UsageExample {
  title: string;
  description: string;
  scenario: string;
  code: string;
  preview?: React.ReactNode;
}

export const getUsageExamples = (componentId: string): UsageExample[] => {
  const examples: Record<string, UsageExample[]> = {
    button: [
      {
        title: 'Form Submission',
        description: 'Using buttons in forms with loading states',
        scenario: 'User submits a form and needs visual feedback',
        code: `const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    await submitForm(formData);
    // Success handling
  } catch (error) {
    // Error handling
  } finally {
    setIsSubmitting(false);
  }
};

return (
  <form onSubmit={handleSubmit}>
    {/* Form fields */}
    <Button 
      type="submit" 
      loading={isSubmitting}
      variant="premium"
    >
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </Button>
  </form>
);`
      }
    ],
    tooltip: [
      {
        title: 'Help Information',
        description: 'Providing contextual help information in forms',
        scenario: 'User needs additional information about form fields',
        code: `import { Tooltip } from '@/components/ui/Tooltip';
import { Input } from '@/components/ui/Input';
import { HelpCircle } from 'lucide-react';

const FormWithTooltips = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <label htmlFor="password">Password</label>
        <Tooltip 
          content="Password must be at least 8 characters with uppercase, lowercase, and numbers"
          variant="light"
          maxWidth={250}
        >
          <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
        </Tooltip>
      </div>
      <Input type="password" id="password" />
    </div>
  );
};`
      },
      {
        title: 'Interactive Content',
        description: 'Rich tooltip content with interactive elements',
        scenario: 'Displaying user profile information with actionable content',
        code: `import { Tooltip } from '@/components/ui/Tooltip';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

const UserProfile = () => {
  const profileCard = (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-3">
        <Avatar fallback="JD" size="md" />
        <div>
          <div className="font-semibold text-white">John Doe</div>
          <div className="text-sm text-gray-300">Senior Developer</div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button size="xs" variant="outline">Follow</Button>
        <Button size="xs" variant="ghost">Message</Button>
      </div>
    </div>
  );
  
  return (
    <Tooltip 
      content={profileCard}
      variant="dark"
      interactive={true}
      maxWidth={280}
    >
      <Avatar fallback="JD" size="lg" className="cursor-pointer" />
    </Tooltip>
  );
};`
      }
    ],
    dropdown: [
      {
        title: 'Navigation Menu',
        description: 'Dropdown menu for navigation with user actions',
        scenario: 'User needs quick access to profile and account actions',
        code: `import { Dropdown } from '@/components/ui/Dropdown';
import { Avatar } from '@/components/ui/Avatar';
import { ChevronDown, User, Settings, LogOut } from 'lucide-react';

const NavigationDropdown = () => {
  const handleSignOut = () => {
    // Handle sign out logic
    console.log('Signing out...');
  };

  return (
    <Dropdown>
      <Dropdown.Trigger variant="ghost" className="flex items-center gap-2">
        <Avatar fallback="JD" size="sm" />
        <span>John Doe</span>
        <ChevronDown className="w-4 h-4" />
      </Dropdown.Trigger>
      <Dropdown.Content align="end">
        <Dropdown.Label>My Account</Dropdown.Label>
        <Dropdown.Item leftIcon={<User className="w-4 h-4" />}>
          Profile
        </Dropdown.Item>
        <Dropdown.Item leftIcon={<Settings className="w-4 h-4" />}>
          Settings
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item 
          leftIcon={<LogOut className="w-4 h-4" />} 
          destructive
          onSelect={handleSignOut}
        >
          Sign out
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
};`
      },
      {
        title: 'Status Filter',
        description: 'Dropdown for filtering items by status with visual indicators',
        scenario: 'User needs to filter a list of items by their status',
        code: `import { Dropdown } from '@/components/ui/Dropdown';
import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const statusOptions = [
  { value: 'all', label: 'All Statuses', color: 'bg-gray-500' },
  { value: 'active', label: 'Active', color: 'bg-green-500' },
  { value: 'pending', label: 'Pending', color: 'bg-yellow-500' },
  { value: 'inactive', label: 'Inactive', color: 'bg-red-500' }
];

const StatusFilter = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const currentStatus = statusOptions.find(s => s.value === selectedStatus);
  
  return (
    <Dropdown>
      <Dropdown.Trigger variant="outline">
        <div className="flex items-center gap-2">
          <div className={\`w-2 h-2 rounded-full \${currentStatus?.color}\`}></div>
          {currentStatus?.label}
        </div>
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
  );
};`
      }
    ]
  };

  return examples[componentId] || [];
}; 