import React, { useState } from 'react';
import { Tabs } from '../ui/Tabs';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  Code,
  Settings,
  User,
  BarChart3,
  FileText,
  Folder,
  Calendar,
  Clock,
  Star,
  Download,
  Share,
  Edit,
  Trash2,
  Plus,
  Grid3X3,
  List,
  Palette,
  Layers,
  Zap,
  Sparkles,
  Shield,
  Globe,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';

export const TabsDemo: React.FC = () => {
  const [dashboardTab, setDashboardTab] = useState('analytics');
  const [projectTab, setProjectTab] = useState('files');

  // Sample data for demonstrations
  const projectFiles = [
    { name: 'index.tsx', size: '2.4KB', modified: '2 hours ago', type: 'typescript' },
    { name: 'styles.css', size: '1.8KB', modified: '4 hours ago', type: 'css' },
    { name: 'components/', size: '—', modified: '1 day ago', type: 'folder' },
    { name: 'README.md', size: '956B', modified: '3 days ago', type: 'markdown' }
  ];

  const teamMembers = [
    { name: 'Alice Johnson', role: 'Frontend Developer', avatar: '👩‍💻', status: 'online' },
    { name: 'Bob Smith', role: 'Backend Developer', avatar: '👨‍💻', status: 'busy' },
    { name: 'Carol Davis', role: 'UI/UX Designer', avatar: '🎨', status: 'offline' },
    { name: 'David Wilson', role: 'Product Manager', avatar: '📊', status: 'online' }
  ];

  const tasks = [
    { title: 'Implement new login flow', status: 'in-progress', priority: 'high', assignee: 'Alice' },
    { title: 'Design dashboard wireframes', status: 'completed', priority: 'medium', assignee: 'Carol' },
    { title: 'API documentation update', status: 'todo', priority: 'low', assignee: 'Bob' },
    { title: 'User testing session', status: 'in-progress', priority: 'high', assignee: 'David' }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card variant="gradient" className="overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <Layers className="w-8 h-8 text-white animate-pulse" />
              <Badge variant="glass">Advanced Tab Navigation</Badge>
              <Grid3X3 className="w-8 h-8 text-white animate-bounce" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Smart Tabs System
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Experience intelligent tab navigation with keyboard shortcuts, 
              lazy loading, and enterprise-grade organization features.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-white text-2xl font-bold">⌨️</div>
                <div className="text-white/80 text-sm">Keyboard Nav</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-white text-2xl font-bold">🎨</div>
                <div className="text-white/80 text-sm">Multiple Styles</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-white text-2xl font-bold">⚡</div>
                <div className="text-white/80 text-sm">Lazy Loading</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                <div className="text-white text-2xl font-bold">♿</div>
                <div className="text-white/80 text-sm">Accessible</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">Basic</Badge>
            Standard Tab Navigation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <Tabs.List className="grid w-full grid-cols-4">
              <Tabs.Trigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Overview
              </Tabs.Trigger>
              <Tabs.Trigger value="users" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Users
              </Tabs.Trigger>
              <Tabs.Trigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Tabs.Trigger>
              <Tabs.Trigger value="code" className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                Code
              </Tabs.Trigger>
            </Tabs.List>
            
            <Tabs.Content value="overview" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">1,247</p>
                      <p className="text-sm text-blue-700 dark:text-blue-300">Total Users</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                    <span className="text-sm text-blue-700 dark:text-blue-300">+12%</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-900 dark:text-green-100">$24.5K</p>
                      <p className="text-sm text-green-700 dark:text-green-300">Revenue</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-sm text-green-700 dark:text-green-300">+28%</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">4.8</p>
                      <p className="text-sm text-purple-700 dark:text-purple-300">Rating</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-purple-500 text-purple-500" />
                    ))}
                  </div>
                </div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="users" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">User Management</h3>
                  <Button size="sm" className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add User
                  </Button>
                </div>
                <div className="space-y-3">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{member.avatar}</div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={member.status === 'online' ? 'success' : member.status === 'busy' ? 'warning' : 'default'}>
                          {member.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="settings" className="mt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Palette className="w-5 h-5" />
                        Appearance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Theme</label>
                        <div className="grid grid-cols-3 gap-2">
                          <Button variant="outline" size="sm">Light</Button>
                          <Button variant="outline" size="sm">Dark</Button>
                          <Button variant="outline" size="sm">Auto</Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Color Scheme</label>
                        <div className="flex gap-2">
                          <div className="w-8 h-8 bg-blue-500 rounded-full cursor-pointer"></div>
                          <div className="w-8 h-8 bg-green-500 rounded-full cursor-pointer"></div>
                          <div className="w-8 h-8 bg-purple-500 rounded-full cursor-pointer"></div>
                          <div className="w-8 h-8 bg-red-500 rounded-full cursor-pointer"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Security
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Two-factor authentication</span>
                        <Button variant="outline" size="sm">Enable</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Login notifications</span>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Password policy</span>
                        <Button variant="outline" size="sm">Update</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="code" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">Component Code</h3>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{`<Tabs defaultValue="overview">
  <Tabs.List>
    <Tabs.Trigger value="overview">
      Overview
    </Tabs.Trigger>
    <Tabs.Trigger value="users">
      Users
    </Tabs.Trigger>
  </Tabs.List>
  
  <Tabs.Content value="overview">
    {/* Content */}
  </Tabs.Content>
</Tabs>`}</code>
                  </pre>
                </div>
              </div>
            </Tabs.Content>
          </Tabs>
        </CardContent>
      </Card>

      {/* Advanced Dashboard Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="premium">Advanced</Badge>
            Dashboard Navigation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={dashboardTab} onValueChange={setDashboardTab} className="w-full">
            <Tabs.List className="grid w-full grid-cols-4">
              <Tabs.Trigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Analytics
                <Badge variant="success" size="sm">Live</Badge>
              </Tabs.Trigger>
              <Tabs.Trigger value="reports" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Reports
              </Tabs.Trigger>
              <Tabs.Trigger value="insights" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Insights
                <Badge variant="neon" size="sm">AI</Badge>
              </Tabs.Trigger>
              <Tabs.Trigger value="export" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="analytics" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Monitor className="w-5 h-5" />
                    Real-time Metrics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">156</div>
                      <div className="text-sm text-blue-600">Active Sessions</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">98.2%</div>
                      <div className="text-sm text-green-600">Uptime</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Global Traffic
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">United States</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Europe</span>
                      <span className="text-sm font-medium">32%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="reports" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Generated Reports</h3>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    New Report
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {['Monthly Performance', 'User Engagement', 'Revenue Analysis', 'Security Audit'].map((report, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="font-medium">{report}</p>
                          <p className="text-sm text-gray-500">Generated today</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="insights" className="mt-6">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                    <h3 className="text-lg font-semibold">AI-Powered Insights</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">User engagement increased by 23% this week</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Peak traffic hours: 2-4 PM EST</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm">Recommended: Optimize mobile experience</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm">Conversion rate improved on landing page</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-sm">High bounce rate on checkout page</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        <span className="text-sm">Social media referrals trending up</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="export" className="mt-6">
              <div className="max-w-md space-y-4">
                <h3 className="text-lg font-semibold">Export Data</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <span className="text-sm">Analytics Data (CSV)</span>
                    <Button variant="outline" size="sm">Export</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <span className="text-sm">User Reports (PDF)</span>
                    <Button variant="outline" size="sm">Export</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <span className="text-sm">Full Dataset (JSON)</span>
                    <Button variant="outline" size="sm">Export</Button>
                  </div>
                </div>
              </div>
            </Tabs.Content>
          </Tabs>
        </CardContent>
      </Card>

      {/* Project Management Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="success">Project</Badge>
            Project Management Interface
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={projectTab} onValueChange={setProjectTab} orientation="vertical" className="flex gap-6">
            <Tabs.List className="flex flex-col w-48 h-fit">
              <Tabs.Trigger value="files" className="w-full justify-start gap-2">
                <Folder className="w-4 h-4" />
                Files
              </Tabs.Trigger>
              <Tabs.Trigger value="tasks" className="w-full justify-start gap-2">
                <Calendar className="w-4 h-4" />
                Tasks
              </Tabs.Trigger>
              <Tabs.Trigger value="team" className="w-full justify-start gap-2">
                <User className="w-4 h-4" />
                Team
              </Tabs.Trigger>
              <Tabs.Trigger value="activity" className="w-full justify-start gap-2">
                <Clock className="w-4 h-4" />
                Activity
              </Tabs.Trigger>
            </Tabs.List>

            <div className="flex-1">
              <Tabs.Content value="files">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Project Files</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Grid3X3 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <List className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {projectFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded">
                            {file.type === 'folder' ? <Folder className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                          </div>
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-gray-500">{file.size} • {file.modified}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Tabs.Content>

              <Tabs.Content value="tasks">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Task Board</h3>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Task
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {tasks.map((task, index) => (
                      <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{task.title}</h4>
                          <div className="flex gap-2">
                            <Badge variant={task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'default'}>
                              {task.priority}
                            </Badge>
                            <Badge variant={task.status === 'completed' ? 'success' : task.status === 'in-progress' ? 'warning' : 'outline'}>
                              {task.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                          <span>Assigned to {task.assignee}</span>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Tabs.Content>

              <Tabs.Content value="team">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Team Members</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teamMembers.map((member, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="text-3xl">{member.avatar}</div>
                        <div className="flex-1">
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                        </div>
                        <Badge variant={member.status === 'online' ? 'success' : member.status === 'busy' ? 'warning' : 'default'}>
                          {member.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </Tabs.Content>

              <Tabs.Content value="activity">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Recent Activity</h3>
                  <div className="space-y-3">
                    {[
                      { action: 'Alice updated task "Implement new login flow"', time: '2 minutes ago', type: 'task' },
                      { action: 'Bob pushed code to main branch', time: '15 minutes ago', type: 'code' },
                      { action: 'Carol uploaded design assets', time: '1 hour ago', type: 'file' },
                      { action: 'David scheduled team meeting', time: '2 hours ago', type: 'meeting' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <div className="p-1 bg-blue-500 rounded-full">
                          <Clock className="w-3 h-3 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Tabs.Content>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Responsive Device Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="neon">Responsive</Badge>
            Device Preview Tabs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="desktop" className="w-full">
            <Tabs.List className="grid w-full grid-cols-3">
              <Tabs.Trigger value="desktop" className="flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                Desktop
              </Tabs.Trigger>
              <Tabs.Trigger value="tablet" className="flex items-center gap-2">
                <Tablet className="w-4 h-4" />
                Tablet
              </Tabs.Trigger>
              <Tabs.Trigger value="mobile" className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                Mobile
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="desktop" className="mt-6">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-4xl mx-auto">
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <Monitor className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Desktop Preview</h3>
                      <p className="text-gray-600 dark:text-gray-400">Optimized for large screens (1200px+)</p>
                    </div>
                  </div>
                </div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="tablet" className="mt-6">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-2xl mx-auto">
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <Tablet className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Tablet Preview</h3>
                      <p className="text-gray-600 dark:text-gray-400">Optimized for medium screens (768px+)</p>
                    </div>
                  </div>
                </div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="mobile" className="mt-6">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-sm mx-auto">
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <Smartphone className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Mobile Preview</h3>
                      <p className="text-gray-600 dark:text-gray-400">Optimized for small screens (320px+)</p>
                    </div>
                  </div>
                </div>
              </div>
            </Tabs.Content>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TabsDemo; 