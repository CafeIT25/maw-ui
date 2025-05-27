import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Loader2, 
  Eye, 
  EyeOff, 
  Calendar,
  MapPin,
  User,
  Mail,
  Phone,
  Lock,
  CreditCard,
  Globe,
  Zap,
  Brain,
  Sparkles,
  Search,
  X,
  Check,
  Star
} from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';

// Form field types
export type FieldType = 
  | 'text' 
  | 'email' 
  | 'password' 
  | 'number' 
  | 'tel' 
  | 'url' 
  | 'search'
  | 'textarea'
  | 'select'
  | 'multiselect'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'time'
  | 'datetime'
  | 'file'
  | 'range'
  | 'color'
  | 'address'
  | 'creditcard'
  | 'rating'
  | 'tags';

export interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: string | number | RegExp;
  message: string;
  validator?: (value: unknown) => boolean | Promise<boolean>;
}

export interface FieldOption {
  value: string | number;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  group?: string;
}

export interface SmartFieldConfig {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  hidden?: boolean;
  validation?: ValidationRule[];
  options?: FieldOption[];
  defaultValue?: unknown;
  min?: number;
  max?: number;
  step?: number;
  rows?: number;
  cols?: number;
  multiple?: boolean;
  accept?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  tabIndex?: number;
  className?: string;
  style?: React.CSSProperties;
  dependencies?: string[];
  conditionalLogic?: {
    field: string;
    operator: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan';
    value: unknown;
    action: 'show' | 'hide' | 'enable' | 'disable' | 'require';
  }[];
  aiSuggestions?: boolean;
  smartValidation?: boolean;
  progressiveDisclosure?: boolean;
  adaptiveUI?: boolean;
}

export interface SmartFormConfig {
  id: string;
  title?: string;
  description?: string;
  fields: SmartFieldConfig[];
  submitText?: string;
  resetText?: string;
  showProgress?: boolean;
  showValidationSummary?: boolean;
  autoSave?: boolean;
  aiAssistance?: boolean;
  adaptiveLayout?: boolean;
  multiStep?: boolean;
  steps?: {
    id: string;
    title: string;
    description?: string;
    fields: string[];
  }[];
  onSubmit?: (data: Record<string, unknown>) => void | Promise<void>;
  onFieldChange?: (fieldId: string, value: unknown, allData: Record<string, unknown>) => void;
  onValidate?: (data: Record<string, unknown>) => Record<string, string> | Promise<Record<string, string>>;
}

export interface SmartFormProps extends VariantProps<typeof formVariants> {
  config: SmartFormConfig;
  initialData?: Record<string, unknown>;
  className?: string;
  onSubmit?: (data: Record<string, unknown>) => void;
  onFieldChange?: (fieldId: string, value: unknown) => void;
}

const formVariants = cva(
  "w-full max-w-2xl mx-auto",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg",
        minimal: "bg-transparent",
        card: "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6",
        floating: "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-xl",
        gradient: "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-700 rounded-xl shadow-lg",
        glass: "bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl",
        neon: "bg-gray-900 border-2 border-cyan-400 rounded-xl shadow-lg shadow-cyan-400/25",
        premium: "bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-xl shadow-xl"
      },
      size: {
        sm: "max-w-md",
        md: "max-w-2xl",
        lg: "max-w-4xl",
        xl: "max-w-6xl",
        full: "max-w-full"
      },
      spacing: {
        compact: "space-y-4",
        normal: "space-y-6",
        relaxed: "space-y-8"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      spacing: "normal"
    }
  }
);

const fieldVariants = cva(
  "w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2",
  {
    variants: {
      variant: {
        default: "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-blue-500 focus:ring-blue-500/20",
        floating: "border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur focus:border-blue-500 focus:ring-blue-500/20",
        minimal: "border-0 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent rounded-none focus:border-blue-500",
        neon: "border-cyan-400 bg-gray-900 text-cyan-100 focus:border-cyan-300 focus:ring-cyan-400/20",
        gradient: "border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 focus:border-purple-500 focus:ring-purple-500/20"
      },
      state: {
        default: "",
        valid: "border-green-500 focus:border-green-500 focus:ring-green-500/20",
        invalid: "border-red-500 focus:border-red-500 focus:ring-red-500/20",
        loading: "border-blue-500 focus:border-blue-500 focus:ring-blue-500/20"
      }
    },
    defaultVariants: {
      variant: "default",
      state: "default"
    }
  }
);

// AI Suggestion Hook
const useAISuggestions = (fieldType: FieldType, value: string) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!value || value.length < 2) {
      setSuggestions([]);
      return;
    }

    const getSuggestions = async () => {
      setLoading(true);
      
      // Simulate AI suggestions based on field type
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let mockSuggestions: string[] = [];
      
      switch (fieldType) {
        case 'email':
          mockSuggestions = [
            `${value}@gmail.com`,
            `${value}@outlook.com`,
            `${value}@company.com`
          ];
          break;
        case 'address':
          mockSuggestions = [
            `${value} Street, New York, NY`,
            `${value} Avenue, Los Angeles, CA`,
            `${value} Boulevard, Chicago, IL`
          ];
          break;
        case 'text':
          if (value.toLowerCase().includes('name')) {
            mockSuggestions = ['John Doe', 'Jane Smith', 'Alex Johnson'];
          } else {
            mockSuggestions = [`${value} suggestion 1`, `${value} suggestion 2`];
          }
          break;
        default:
          mockSuggestions = [];
      }
      
      setSuggestions(mockSuggestions);
      setLoading(false);
    };

    const debounceTimer = setTimeout(getSuggestions, 500);
    return () => clearTimeout(debounceTimer);
  }, [value, fieldType]);

  return { suggestions, loading };
};

// Smart Validation Hook
const useSmartValidation = (field: SmartFieldConfig, value: unknown) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isValidating, setIsValidating] = useState(false);

  const validate = useCallback(async () => {
    if (!field.validation || !value) {
      setIsValid(null);
      setErrors([]);
      return;
    }

    setIsValidating(true);
    const newErrors: string[] = [];

    for (const rule of field.validation) {
      let isRuleValid = true;

      switch (rule.type) {
        case 'required':
          isRuleValid = value !== '' && value !== null && value !== undefined;
          break;
        case 'email':
          isRuleValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value));
          break;
        case 'minLength':
          if (rule.value !== undefined) {
            isRuleValid = String(value).length >= Number(rule.value);
          }
          break;
        case 'maxLength':
          if (rule.value !== undefined) {
            isRuleValid = String(value).length <= Number(rule.value);
          }
          break;
        case 'pattern':
          if (rule.value !== undefined) {
            const pattern = rule.value instanceof RegExp ? rule.value : new RegExp(String(rule.value));
            isRuleValid = pattern.test(String(value));
          }
          break;
        case 'custom':
          if (rule.validator) {
            isRuleValid = await rule.validator(value);
          }
          break;
      }

      if (!isRuleValid) {
        newErrors.push(rule.message);
      }
    }

    setErrors(newErrors);
    setIsValid(newErrors.length === 0);
    setIsValidating(false);
  }, [field.validation, value]);

  useEffect(() => {
    if (value !== '' && value !== null && value !== undefined) {
      const debounceTimer = setTimeout(validate, 300);
      return () => clearTimeout(debounceTimer);
    } else {
      setIsValid(null);
      setErrors([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, field.validation]);

  return { isValid, errors, isValidating };
};

// Smart Field Component
const SmartField: React.FC<{
  field: SmartFieldConfig;
  value: unknown;
  onChange: (value: unknown) => void;
  variant?: 'default' | 'floating' | 'minimal' | 'neon' | 'gradient';
  formData: Record<string, unknown>;
}> = ({ field, value, onChange, variant = 'default', formData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>(Array.isArray(value) ? value : []);
  const [rating, setRating] = useState<number>(typeof value === 'number' ? value : 0);
  
  const { suggestions } = useAISuggestions(field.type, String(value) || '');
  const { isValid, errors, isValidating } = useSmartValidation(field, value);

  // Check conditional logic
  const isVisible = field.conditionalLogic?.every(logic => {
    const dependentValue = formData[logic.field];
    switch (logic.operator) {
      case 'equals':
        return dependentValue === logic.value;
      case 'notEquals':
        return dependentValue !== logic.value;
      case 'contains':
        return String(dependentValue).includes(String(logic.value));
      case 'greaterThan':
        return Number(dependentValue) > Number(logic.value);
      case 'lessThan':
        return Number(dependentValue) < Number(logic.value);
      default:
        return true;
    }
  }) ?? true;

  if (!isVisible) return null;

  const getFieldState = () => {
    if (isValidating) return 'loading';
    if (isValid === true) return 'valid';
    if (isValid === false) return 'invalid';
    return 'default';
  };

  const renderField = () => {
    const baseProps = {
      id: field.id,
      value: String(value || ''),
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => 
        onChange(e.target.value),
      onFocus: () => setIsFocused(true),
      onBlur: () => setIsFocused(false),
      placeholder: field.placeholder,
      disabled: field.disabled,
      readOnly: field.readonly,
      required: field.required,
      autoComplete: field.autoComplete,
      autoFocus: field.autoFocus,
      tabIndex: field.tabIndex,
      className: cn(
        fieldVariants({ variant, state: getFieldState() }),
        field.className
      )
    };

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            {...baseProps}
            rows={field.rows || 4}
            cols={field.cols}
          />
        );

      case 'select':
        return (
          <select {...baseProps}>
            <option value="">{field.placeholder || 'Select an option'}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'multiselect':
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Array.isArray(value) && value.includes(option.value)}
                  onChange={(e) => {
                    const currentValues = Array.isArray(value) ? value : [];
                    if (e.target.checked) {
                      onChange([...currentValues, option.value]);
                    } else {
                      onChange(currentValues.filter((v: unknown) => v !== option.value));
                    }
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={field.id}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange(e.target.value)}
                  className="border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(value)}
              onChange={(e) => onChange(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>{field.label}</span>
          </label>
        );

      case 'range':
        return (
          <div className="space-y-2">
            <input
              type="range"
              min={field.min || 0}
              max={field.max || 100}
              step={field.step || 1}
              value={typeof value === 'number' ? value : field.min || 0}
              onChange={(e) => onChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{field.min || 0}</span>
              <span className="font-medium">{typeof value === 'number' ? value : field.min || 0}</span>
              <span>{field.max || 100}</span>
            </div>
          </div>
        );

      case 'rating':
        return (
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => {
                  setRating(star);
                  onChange(star);
                }}
                className={cn(
                  "p-1 transition-colors",
                  star <= (rating || 0) ? "text-yellow-400" : "text-gray-300"
                )}
              >
                <Star className="w-6 h-6 fill-current" />
              </button>
            ))}
          </div>
        );

      case 'tags':
        return (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => {
                      const newTags = selectedTags.filter((_, i) => i !== index);
                      setSelectedTags(newTags);
                      onChange(newTags);
                    }}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <input
              type="text"
              placeholder="Type and press Enter to add tags"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                  e.preventDefault();
                  const newTag = e.currentTarget.value.trim();
                  if (!selectedTags.includes(newTag)) {
                    const newTags = [...selectedTags, newTag];
                    setSelectedTags(newTags);
                    onChange(newTags);
                  }
                  e.currentTarget.value = '';
                }
              }}
              className={cn(fieldVariants({ variant, state: getFieldState() }))}
            />
          </div>
        );

      case 'password':
        return (
          <div className="relative">
            <input
              {...baseProps}
              type={showPassword ? 'text' : 'password'}
              className={cn(baseProps.className, "pr-12")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        );

      case 'file':
        return (
          <input
            type="file"
            multiple={field.multiple}
            accept={field.accept}
            onChange={(e) => onChange(field.multiple ? Array.from(e.target.files || []) : e.target.files?.[0])}
            className={cn(
              "file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium",
              "file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100",
              "dark:file:bg-blue-900 dark:file:text-blue-300",
              baseProps.className
            )}
          />
        );

      default:
        return <input {...baseProps} type={field.type} />;
    }
  };

  const getFieldIcon = () => {
    switch (field.type) {
      case 'email': return <Mail className="w-5 h-5" />;
      case 'password': return <Lock className="w-5 h-5" />;
      case 'tel': return <Phone className="w-5 h-5" />;
      case 'date': return <Calendar className="w-5 h-5" />;
      case 'address': return <MapPin className="w-5 h-5" />;
      case 'creditcard': return <CreditCard className="w-5 h-5" />;
      case 'url': return <Globe className="w-5 h-5" />;
      case 'search': return <Search className="w-5 h-5" />;
      default: return <User className="w-5 h-5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-2"
    >
      {field.type !== 'checkbox' && (
        <label htmlFor={field.id} className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {getFieldIcon()}
          {field.label}
          {field.required && <span className="text-red-500">*</span>}
          {field.aiSuggestions && (
            <Badge variant="premium" size="sm" className="ml-auto">
              <Brain className="w-3 h-3 mr-1" />
              AI
            </Badge>
          )}
        </label>
      )}

      <div className="relative">
        {renderField()}
        
        {/* Validation Status */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {isValidating && <Loader2 className="w-4 h-4 animate-spin text-blue-500" />}
          {isValid === true && <CheckCircle className="w-4 h-4 text-green-500" />}
          {isValid === false && <AlertCircle className="w-4 h-4 text-red-500" />}
        </div>
      </div>

      {/* AI Suggestions */}
      <AnimatePresence>
        {field.aiSuggestions && isFocused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2 space-y-1"
          >
            <div className="flex items-center gap-2 px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
              <Sparkles className="w-3 h-3" />
              AI Suggestions
            </div>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onChange(suggestion)}
                className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                {suggestion}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Field Description */}
      {field.description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <Info className="w-3 h-3" />
          {field.description}
        </p>
      )}

      {/* Validation Errors */}
      <AnimatePresence>
        {errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-1"
          >
            {errors.map((error, index) => (
              <p key={index} className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {error}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main SmartForm Component
export const SmartForm: React.FC<SmartFormProps> = ({
  config,
  initialData = {},
  variant,
  size,
  spacing,
  className,
  onSubmit,
  onFieldChange
}) => {
  const [formData, setFormData] = useState<Record<string, unknown>>(initialData);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [globalErrors, setGlobalErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const autoSaveTimeoutRef = useRef<number | undefined>(undefined);

  // Auto-save functionality
  useEffect(() => {
    if (config.autoSave) {
      // Clear previous timeout
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      
      // Set new timeout
      autoSaveTimeoutRef.current = setTimeout(() => {
        localStorage.setItem(`smartform_${config.id}`, JSON.stringify(formData));
      }, 1000);
      
      return () => {
        if (autoSaveTimeoutRef.current !== undefined) {
          clearTimeout(autoSaveTimeoutRef.current);
        }
      };
    }
  }, [formData, config.autoSave, config.id]);

  // Load saved data - only run once on mount
  useEffect(() => {
    if (config.autoSave) {
      const savedData = localStorage.getItem(`smartform_${config.id}`);
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setFormData({ ...initialData, ...parsedData });
        } catch (error) {
          console.error('Failed to load saved form data:', error);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.autoSave, config.id]);

  const handleFieldChange = (fieldId: string, value: unknown) => {
    const newFormData = { ...formData, [fieldId]: value };
    setFormData(newFormData);
    
    onFieldChange?.(fieldId, value);
    config.onFieldChange?.(fieldId, value, newFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setGlobalErrors({});

    try {
      // Run global validation
      if (config.onValidate) {
        const validationErrors = await config.onValidate(formData);
        if (Object.keys(validationErrors).length > 0) {
          setGlobalErrors(validationErrors);
          setIsSubmitting(false);
          return;
        }
      }

      // Submit form
      await config.onSubmit?.(formData);
      onSubmit?.(formData);
      
      setSubmitSuccess(true);
      
      // Clear auto-saved data on successful submit
      if (config.autoSave) {
        localStorage.removeItem(`smartform_${config.id}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setGlobalErrors({ general: 'An error occurred while submitting the form.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getVisibleFields = () => {
    if (config.multiStep && config.steps) {
      const currentStepConfig = config.steps[currentStep];
      return config.fields.filter(field => currentStepConfig.fields.includes(field.id));
    }
    return config.fields;
  };

  const getFormProgress = () => {
    const totalFields = config.fields.length;
    const filledFields = config.fields.filter(field => {
      const value = formData[field.id];
      return value !== undefined && value !== null && value !== '';
    }).length;
    return Math.round((filledFields / totalFields) * 100);
  };

  if (submitSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(formVariants({ variant, size }), "p-8 text-center", className)}
      >
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-green-100 dark:bg-green-900/50 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Form Submitted Successfully!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Thank you for your submission. We'll get back to you soon.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setSubmitSuccess(false);
            setFormData(initialData);
            setCurrentStep(0);
          }}
        >
          Submit Another Form
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(formVariants({ variant, size }), className)}
    >
      <form ref={formRef} onSubmit={handleSubmit} className="p-6">
        {/* Form Header */}
        {(config.title || config.description) && (
          <div className="mb-8 text-center">
            {config.title && (
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {config.title}
              </h1>
            )}
            {config.description && (
              <p className="text-gray-600 dark:text-gray-400">
                {config.description}
              </p>
            )}
          </div>
        )}

        {/* Progress Bar */}
        {config.showProgress && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Progress
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {getFormProgress()}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getFormProgress()}%` }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
              />
            </div>
          </div>
        )}

        {/* Multi-step Navigation */}
        {config.multiStep && config.steps && (
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {config.steps.map((step, index) => (
                <div
                  key={step.id}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                    index === currentStep
                      ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                      : index < currentStep
                      ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                  )}
                >
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium",
                    index === currentStep
                      ? "bg-blue-500 text-white"
                      : index < currentStep
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                  )}>
                    {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
                  </div>
                  <span className="font-medium">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form Fields */}
        <div className={cn(spacing === 'compact' ? 'space-y-4' : spacing === 'relaxed' ? 'space-y-8' : 'space-y-6')}>
          <AnimatePresence>
            {getVisibleFields().map((field) => (
              <SmartField
                key={field.id}
                field={field}
                value={formData[field.id]}
                onChange={(value) => handleFieldChange(field.id, value)}
                variant={variant === 'neon' ? 'neon' : variant === 'gradient' ? 'gradient' : 'default'}
                formData={formData}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Global Errors */}
        <AnimatePresence>
          {Object.keys(globalErrors).length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
            >
              <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-medium mb-2">
                <AlertCircle className="w-5 h-5" />
                Please fix the following errors:
              </div>
              <ul className="space-y-1">
                {Object.entries(globalErrors).map(([field, error]) => (
                  <li key={field} className="text-sm text-red-600 dark:text-red-400">
                    • {error}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-2">
            {config.multiStep && currentStep > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Previous
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setFormData(initialData);
                if (config.autoSave) {
                  localStorage.removeItem(`smartform_${config.id}`);
                }
              }}
            >
              {config.resetText || 'Reset'}
            </Button>

            {config.multiStep && config.steps && currentStep < config.steps.length - 1 ? (
              <Button
                type="button"
                variant="default"
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                variant="premium"
                loading={isSubmitting}
                leftIcon={<Zap className="w-4 h-4" />}
              >
                {config.submitText || 'Submit'}
              </Button>
            )}
          </div>
        </div>

        {/* AI Assistance */}
        {config.aiAssistance && (
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700 rounded-lg">
            <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-medium mb-2">
              <Brain className="w-5 h-5" />
              AI Assistant
            </div>
            <p className="text-sm text-purple-600 dark:text-purple-400">
              Need help? Our AI assistant can provide suggestions and help you complete this form more efficiently.
            </p>
          </div>
        )}
      </form>
    </motion.div>
  );
};

export default SmartForm; 