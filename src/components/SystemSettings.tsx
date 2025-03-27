
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

export const SystemSettings: React.FC = () => {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [domainSettings, setDomainSettings] = useState({
    mainDomain: 'mc.yourdomain.com',
    customDomainEnabled: true
  });
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: 'smtp.example.com',
    smtpPort: '587',
    smtpUsername: 'noreply@example.com',
    smtpPassword: '••••••••••',
    fromEmail: 'support@example.com'
  });
  const [systemInfo, setSystemInfo] = useState({
    version: '1.5.2',
    nodeVersion: '18.16.0',
    cpuUsage: '23%',
    memoryUsage: '47%',
    diskUsage: '38%',
    uptime: '24 days, 5 hours'
  });

  const handleSaveEmailSettings = () => {
    toast({
      title: 'Settings Saved',
      description: 'Email configuration has been updated successfully.',
    });
  };

  const handleSaveDomainSettings = () => {
    toast({
      title: 'Settings Saved',
      description: 'Domain configuration has been updated successfully.',
    });
  };

  const handleDatabaseBackup = () => {
    toast({
      title: 'Backup Initiated',
      description: 'Database backup has been started. You will be notified when it completes.',
    });
  };

  const toggleMaintenanceMode = () => {
    setIsMaintenanceMode(!isMaintenanceMode);
    toast({
      title: isMaintenanceMode ? 'Maintenance Mode Disabled' : 'Maintenance Mode Enabled',
      description: isMaintenanceMode 
        ? 'The system is now accessible to users.' 
        : 'The system is now in maintenance mode. Only admins can access it.',
    });
  };

  return (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="email">Email</TabsTrigger>
        <TabsTrigger value="domains">Domains</TabsTrigger>
        <TabsTrigger value="backups">Backups</TabsTrigger>
        <TabsTrigger value="system">System Info</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Manage the general settings for your Minecraft hosting platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    When enabled, only administrators can access the system.
                  </p>
                </div>
                <Switch
                  id="maintenance"
                  checked={isMaintenanceMode}
                  onCheckedChange={toggleMaintenanceMode}
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" defaultValue="Your Minecraft Hosting" />
              <p className="text-sm text-muted-foreground">
                This name will appear on invoices and system emails.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="support-email">Support Email</Label>
              <Input id="support-email" type="email" defaultValue="support@yourminecraft.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currency">Default Currency</Label>
              <select 
                id="currency" 
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="EUR">Euro (€)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="GBP">British Pound (£)</option>
              </select>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="email">
        <Card>
          <CardHeader>
            <CardTitle>Email Configuration</CardTitle>
            <CardDescription>
              Configure the email settings for sending system notifications and user communications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-server">SMTP Server</Label>
                <Input 
                  id="smtp-server" 
                  value={emailSettings.smtpServer}
                  onChange={(e) => setEmailSettings({...emailSettings, smtpServer: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-port">SMTP Port</Label>
                <Input 
                  id="smtp-port" 
                  value={emailSettings.smtpPort}
                  onChange={(e) => setEmailSettings({...emailSettings, smtpPort: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-username">SMTP Username</Label>
                <Input 
                  id="smtp-username" 
                  value={emailSettings.smtpUsername}
                  onChange={(e) => setEmailSettings({...emailSettings, smtpUsername: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-password">SMTP Password</Label>
                <Input 
                  id="smtp-password" 
                  type="password" 
                  value={emailSettings.smtpPassword}
                  onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="from-email">From Email Address</Label>
              <Input 
                id="from-email" 
                type="email" 
                value={emailSettings.fromEmail}
                onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
              />
              <p className="text-sm text-muted-foreground">
                This address will be used as the sender for all system emails.
              </p>
            </div>
            
            <div className="pt-4">
              <Button onClick={handleSaveEmailSettings}>Save Email Settings</Button>
              <Button variant="outline" className="ml-2">Test Connection</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="domains">
        <Card>
          <CardHeader>
            <CardTitle>Domain Settings</CardTitle>
            <CardDescription>
              Configure domain settings for your Minecraft hosting service.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="main-domain">Main Domain</Label>
              <Input 
                id="main-domain" 
                value={domainSettings.mainDomain}
                onChange={(e) => setDomainSettings({...domainSettings, mainDomain: e.target.value})}
              />
              <p className="text-sm text-muted-foreground">
                The main domain for your hosting service. Used for admin and user interfaces.
              </p>
            </div>
            
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="custom-domains">Custom User Domains</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow users to setup custom domains for their Minecraft servers.
                  </p>
                </div>
                <Switch
                  id="custom-domains"
                  checked={domainSettings.customDomainEnabled}
                  onCheckedChange={(checked) => setDomainSettings({...domainSettings, customDomainEnabled: checked})}
                />
              </div>
            </div>
            
            <div className="pt-4">
              <Button onClick={handleSaveDomainSettings}>Save Domain Settings</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="backups">
        <Card>
          <CardHeader>
            <CardTitle>Backup Settings</CardTitle>
            <CardDescription>
              Configure system and database backup settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Automated Backups</Label>
              <div className="flex items-center space-x-2">
                <Switch id="auto-backup" defaultChecked />
                <Label htmlFor="auto-backup">Enable automated daily backups</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                System will automatically create backups of all user servers and database.
              </p>
            </div>
            
            <div className="space-y-2 pt-2">
              <Label htmlFor="backup-retention">Backup Retention (days)</Label>
              <Input id="backup-retention" type="number" defaultValue="14" />
              <p className="text-sm text-muted-foreground">
                Number of days to keep automated backups before deleting them.
              </p>
            </div>
            
            <div className="space-y-2 pt-2">
              <Label htmlFor="backup-time">Backup Time</Label>
              <Input id="backup-time" type="time" defaultValue="03:00" />
              <p className="text-sm text-muted-foreground">
                Time of day to run automated backups (24-hour format).
              </p>
            </div>
            
            <div className="pt-4 space-y-4">
              <Button>Save Backup Settings</Button>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium">Manual Backup</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create a manual backup of the database and all server configurations.
                </p>
                <Button onClick={handleDatabaseBackup}>
                  Create Backup Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="system">
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>
              View system status and information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">System Version</h3>
                <p className="text-lg font-semibold flex items-center">
                  {systemInfo.version}
                  <Badge variant="outline" className="ml-2">Latest</Badge>
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Node.js Version</h3>
                <p className="text-lg font-semibold">{systemInfo.nodeVersion}</p>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Resource Usage</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">CPU</p>
                  <div className="flex items-center">
                    <div className="w-full bg-secondary h-2 rounded-full mr-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: systemInfo.cpuUsage }} />
                    </div>
                    <span className="text-sm font-medium">{systemInfo.cpuUsage}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Memory</p>
                  <div className="flex items-center">
                    <div className="w-full bg-secondary h-2 rounded-full mr-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: systemInfo.memoryUsage }} />
                    </div>
                    <span className="text-sm font-medium">{systemInfo.memoryUsage}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Disk</p>
                  <div className="flex items-center">
                    <div className="w-full bg-secondary h-2 rounded-full mr-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: systemInfo.diskUsage }} />
                    </div>
                    <span className="text-sm font-medium">{systemInfo.diskUsage}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">System Uptime</h3>
              <p className="text-lg font-semibold">{systemInfo.uptime}</p>
            </div>
            
            <div className="pt-4">
              <Button variant="outline">Check for Updates</Button>
              <Button variant="destructive" className="ml-2">Restart System</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
