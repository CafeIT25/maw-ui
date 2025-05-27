import React, { useState } from 'react';
import { Slider } from '../ui/Slider';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Volume2, VolumeX, Sun, Settings, Music } from 'lucide-react';

export const SliderDemo: React.FC = () => {
  const [volumeValue, setVolumeValue] = useState(50);
  const [brightnessValue, setBrightnessValue] = useState(75);
  const [rangeValue, setRangeValue] = useState<[number, number]>([20, 80]);
  const [settingsValues, setSettingsValues] = useState({
    quality: 80,
    performance: 60,
    security: 90
  });

  return (
    <div className="space-y-8">
      {/* Basic Slider Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">Basic</Badge>
            Slider Variants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div>
              <label className="text-sm font-medium mb-3 block">Default Slider</label>
              <Slider
                value={25}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-3 block">Success Slider</label>
              <Slider
                value={75}
                max={100}
                step={1}
                variant="success"
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-3 block">Warning Slider</label>
              <Slider
                value={45}
                max={100}
                step={1}
                variant="warning"
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-3 block">Danger Slider</label>
              <Slider
                value={15}
                max={100}
                step={1}
                variant="danger"
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Sliders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="primary">Interactive</Badge>
            Interactive Sliders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  {volumeValue === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  Volume
                </label>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {volumeValue}%
                </span>
              </div>
              <Slider
                value={volumeValue}
                onChange={(value) => setVolumeValue(value as number)}
                max={100}
                step={1}
                variant="primary"
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Sun className="w-4 h-4" />
                  Brightness
                </label>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {brightnessValue}%
                </span>
              </div>
              <Slider
                value={brightnessValue}
                onChange={(value) => setBrightnessValue(value as number)}
                max={100}
                step={1}
                variant="primary"
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Music className="w-4 h-4" />
                  Audio Range
                </label>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {rangeValue[0]} - {rangeValue[1]}
                </span>
              </div>
              <Slider
                value={rangeValue}
                onChange={(value) => setRangeValue(value as [number, number])}
                max={100}
                step={1}
                variant="glass"
                range={true}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="success">Dashboard</Badge>
            Settings Panel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Quality
                  </label>
                  <span className="text-sm text-blue-600 dark:text-blue-400">
                    {settingsValues.quality}%
                  </span>
                </div>
                <Slider
                  value={settingsValues.quality}
                  onChange={(value) => setSettingsValues(prev => ({ ...prev, quality: value as number }))}
                  max={100}
                  step={1}
                  variant="primary"
                  className="w-full"
                />
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-green-700 dark:text-green-300">
                    Performance
                  </label>
                  <span className="text-sm text-green-600 dark:text-green-400">
                    {settingsValues.performance}%
                  </span>
                </div>
                <Slider
                  value={settingsValues.performance}
                  onChange={(value) => setSettingsValues(prev => ({ ...prev, performance: value as number }))}
                  max={100}
                  step={1}
                  variant="primary"
                  className="w-full"
                />
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-purple-700 dark:text-purple-300">
                    Security
                  </label>
                  <span className="text-sm text-purple-600 dark:text-purple-400">
                    {settingsValues.security}%
                  </span>
                </div>
                <Slider
                  value={settingsValues.security}
                  onChange={(value) => setSettingsValues(prev => ({ ...prev, security: value as number }))}
                  max={100}
                  step={1}
                  variant="primary"
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button 
                variant="default" 
                leftIcon={<Settings />}
                onClick={() => {
                  console.log('Settings saved:', settingsValues);
                }}
              >
                Save Settings
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  setSettingsValues({
                    quality: 80,
                    performance: 60,
                    security: 90
                  });
                }}
              >
                Reset to Defaults
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SliderDemo; 