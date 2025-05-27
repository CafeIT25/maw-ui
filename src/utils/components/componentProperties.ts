export interface ComponentProperty {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
  examples?: string[];
}

export const getComponentProperties = (componentId: string): ComponentProperty[] => {
  const properties: Record<string, ComponentProperty[]> = {
    button: [
      {
        name: 'variant',
        type: '"default" | "premium" | "neon" | "glass" | "destructive" | "success" | "warning" | "outline" | "ghost" | "link" | "gradient"',
        required: false,
        default: '"default"',
        description: 'The visual style variant of the button',
        examples: ['default', 'premium', 'neon']
      },
      {
        name: 'size',
        type: '"sm" | "md" | "lg" | "icon-sm" | "icon-md" | "icon-lg"',
        required: false,
        default: '"md"',
        description: 'The size of the button',
        examples: ['sm', 'md', 'lg']
      },
      {
        name: 'loading',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Shows loading spinner when true'
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Disables the button when true'
      }
    ],
    card: [
      {
        name: 'variant',
        type: '"default" | "elevated" | "outline" | "ghost" | "gradient" | "glass" | "neon" | "premium"',
        required: false,
        default: '"default"',
        description: 'The visual style variant of the card',
        examples: ['default', 'elevated', 'gradient']
      },
      {
        name: 'interactive',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Adds hover effects when true'
      }
    ],
    tooltip: [
      {
        name: 'content',
        type: 'React.ReactNode',
        required: true,
        description: 'The content to display inside the tooltip'
      },
      {
        name: 'side',
        type: '"top" | "bottom" | "left" | "right"',
        required: false,
        default: '"top"',
        description: 'The position of the tooltip relative to its trigger',
        examples: ['top', 'bottom', 'left', 'right']
      },
      {
        name: 'align',
        type: '"start" | "center" | "end"',
        required: false,
        default: '"center"',
        description: 'How to align the tooltip relative to its trigger',
        examples: ['start', 'center', 'end']
      },
      {
        name: 'variant',
        type: '"default" | "dark" | "light" | "neon" | "glass" | "gradient"',
        required: false,
        default: '"default"',
        description: 'The visual style variant of the tooltip',
        examples: ['default', 'dark', 'light', 'neon']
      },
      {
        name: 'size',
        type: '"sm" | "md" | "lg"',
        required: false,
        default: '"md"',
        description: 'The size of the tooltip',
        examples: ['sm', 'md', 'lg']
      },
      {
        name: 'delay',
        type: 'number',
        required: false,
        default: '200',
        description: 'Delay in milliseconds before showing the tooltip'
      },
      {
        name: 'interactive',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Whether the tooltip can be hovered and interacted with'
      },
      {
        name: 'arrow',
        type: 'boolean',
        required: false,
        default: 'true',
        description: 'Whether to show an arrow pointing to the trigger'
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Whether the tooltip is disabled'
      },
      {
        name: 'maxWidth',
        type: 'number',
        required: false,
        default: '300',
        description: 'Maximum width of the tooltip in pixels'
      }
    ],
    dropdown: [
      {
        name: 'children',
        type: 'React.ReactNode',
        required: true,
        description: 'The content of the dropdown (Trigger and Content components)'
      },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        required: false,
        description: 'Callback fired when the dropdown open state changes'
      },
      {
        name: 'defaultOpen',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Whether the dropdown is open by default'
      },
      {
        name: 'modal',
        type: 'boolean',
        required: false,
        default: 'true',
        description: 'Whether the dropdown should behave as a modal'
      }
    ]
  };

  return properties[componentId] || [];
}; 