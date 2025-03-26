
import React, { useState } from 'react';
import { ArrowUpDown, BarChart2, Play, PowerOff, RefreshCw, Terminal, Upload } from 'lucide-react';
import Button from './Button';
import FeatureCard from './FeatureCard';

const ServerControl: React.FC = () => {
  const [serverStatus, setServerStatus] = useState<'offline' | 'starting' | 'online'>('offline');
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleServer = () => {
    if (serverStatus === 'offline') {
      setIsLoading(true);
      setServerStatus('starting');
      
      // Simulate server startup
      setTimeout(() => {
        setServerStatus('online');
        setIsLoading(false);
      }, 2000);
    } else if (serverStatus === 'online') {
      setIsLoading(true);
      
      // Simulate server shutdown
      setTimeout(() => {
        setServerStatus('offline');
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <section id="control-panel" className="section-container">
      <div className="text-center mb-16">
        <div className="inline-block glass-effect px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          Real Server Control
        </div>
        <h2 className="section-title">Run Your <span className="text-gradient">Minecraft Server</span> With Ease</h2>
        <p className="section-subtitle">
          Take full control of your Minecraft server with our easy-to-use control panel. Start, stop, and manage your server in real-time.
        </p>
      </div>

      <div className="glass-effect rounded-xl p-8 max-w-5xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">My Minecraft Server</h3>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                serverStatus === 'online' ? 'bg-minecraft-green' : 
                serverStatus === 'starting' ? 'bg-minecraft-orange' : 'bg-red-500'
              }`}></div>
              <span className="text-muted-foreground">
                Status: {serverStatus === 'online' ? 'Online' : serverStatus === 'starting' ? 'Starting...' : 'Offline'}
              </span>
            </div>
          </div>
          <div className="flex gap-4">
            <Button 
              variant={serverStatus === 'online' ? 'outline' : 'primary'}
              size="lg"
              isLoading={isLoading}
              onClick={handleToggleServer}
              leftIcon={serverStatus === 'online' ? <PowerOff size={18} /> : <Play size={18} />}
            >
              {serverStatus === 'online' ? 'Stop Server' : 'Start Server'}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              disabled={serverStatus !== 'online'}
              leftIcon={<RefreshCw size={18} />}
            >
              Restart
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-secondary/20 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">CPU Usage</h4>
              <span className="text-sm text-minecraft-green">12%</span>
            </div>
            <div className="w-full bg-background/50 rounded-full h-2">
              <div className="bg-minecraft-green h-2 rounded-full" style={{ width: '12%' }}></div>
            </div>
          </div>
          <div className="bg-secondary/20 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">RAM Usage</h4>
              <span className="text-sm text-primary">1.2GB / 4GB</span>
            </div>
            <div className="w-full bg-background/50 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '30%' }}></div>
            </div>
          </div>
          <div className="bg-secondary/20 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Storage</h4>
              <span className="text-sm text-minecraft-purple">8.4GB / 25GB</span>
            </div>
            <div className="w-full bg-background/50 rounded-full h-2">
              <div className="bg-minecraft-purple h-2 rounded-full" style={{ width: '34%' }}></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-effect dark:bg-secondary/10 rounded-lg p-4">
            <h4 className="font-medium flex items-center gap-2 mb-4">
              <Terminal size={18} />
              Console Output
            </h4>
            <div className="bg-background/80 rounded-lg p-3 text-sm font-mono h-48 overflow-y-auto">
              <p className="text-gray-400">[08:15:32] [Server thread/INFO]: Starting minecraft server version 1.19.2</p>
              <p className="text-gray-400">[08:15:33] [Server thread/INFO]: Loading properties</p>
              <p className="text-gray-400">[08:15:33] [Server thread/INFO]: Default game type: SURVIVAL</p>
              <p className="text-gray-400">[08:15:34] [Server thread/INFO]: Preparing level "world"</p>
              <p className="text-gray-400">[08:15:35] [Server thread/INFO]: Preparing start region for dimension minecraft:overworld</p>
              <p className="text-minecraft-green">[08:15:38] [Server thread/INFO]: Done (5.724s)! For help, type "help"</p>
              <p className="text-minecraft-green">[08:15:38] [Server thread/INFO]: Server is running and ready for connections</p>
            </div>
          </div>
          <div className="glass-effect dark:bg-secondary/10 rounded-lg p-4">
            <h4 className="font-medium flex items-center gap-2 mb-4">
              <BarChart2 size={18} />
              Players Online
            </h4>
            <div className="bg-background/80 rounded-lg p-4 h-48 flex flex-col justify-center items-center">
              <p className="text-4xl font-bold mb-2">0 / 20</p>
              <p className="text-muted-foreground text-sm">No players currently online</p>
              <div className="mt-4">
                <Button size="sm" leftIcon={<ArrowUpDown size={16} />}>
                  View Player History
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <FeatureCard
          title="One-Click Mod Installation"
          description="Install popular mods and modpacks with just one click."
          icon={<Upload size={24} />}
          iconClassName="bg-primary/10 text-primary"
        />
        <FeatureCard
          title="Real-Time Backups"
          description="Automatic backups of your world with one-click restore options."
          icon={<RefreshCw size={24} />}
          iconClassName="bg-minecraft-green/10 text-minecraft-green"
        />
        <FeatureCard
          title="Performance Monitoring"
          description="Real-time statistics and alerts to keep your server running smoothly."
          icon={<BarChart2 size={24} />}
          iconClassName="bg-minecraft-purple/10 text-minecraft-purple"
        />
      </div>
    </section>
  );
};

export default ServerControl;
