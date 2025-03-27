
import React, { useState, useEffect } from 'react';
import { ArrowUpDown, BarChart2, Play, PowerOff, RefreshCw, Terminal, Upload } from 'lucide-react';
import Button from './Button';
import FeatureCard from './FeatureCard';
import { useAuth } from '@/contexts/AuthContext';
import { ServerInstance } from '@/types/database';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const ServerControl: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [server, setServer] = useState<ServerInstance | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserServer();
    }
  }, [user]);

  const fetchUserServer = async () => {
    try {
      const { data, error } = await supabase
        .from('server_instances')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        setServer(data[0] as ServerInstance);
      }
    } catch (error) {
      console.error('Error fetching server:', error);
    }
  };

  const handleToggleServer = async () => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to manage servers',
        variant: 'destructive',
      });
      navigate('/auth');
      return;
    }

    if (!server) {
      navigate('/dashboard');
      return;
    }

    setIsLoading(true);
    
    try {
      const newStatus = server.status === 'offline' ? 'starting' : 'stopping';
      
      const { error } = await supabase
        .from('server_instances')
        .update({ status: newStatus })
        .eq('id', server.id);
        
      if (error) throw error;
      
      fetchUserServer();
      
      // Simulate server startup/shutdown
      setTimeout(async () => {
        const finalStatus = server.status === 'offline' ? 'online' : 'offline';
        const ipAddress = server.status === 'offline' ? '123.45.67.89' : null;
        
        const { error: updateError } = await supabase
          .from('server_instances')
          .update({ 
            status: finalStatus,
            ip_address: ipAddress 
          })
          .eq('id', server.id);
          
        if (updateError) throw updateError;
        
        fetchUserServer();
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error toggling server:', error);
      setIsLoading(false);
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
        {user && server ? (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">{server.name}</h3>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    server.status === 'online' ? 'bg-minecraft-green' : 
                    server.status === 'starting' ? 'bg-minecraft-orange' : 'bg-red-500'
                  }`}></div>
                  <span className="text-muted-foreground">
                    Status: {server.status === 'online' ? 'Online' : server.status === 'starting' ? 'Starting...' : 'Offline'}
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                <Button 
                  variant={server.status === 'online' ? 'outline' : 'primary'}
                  size="lg"
                  isLoading={isLoading}
                  onClick={handleToggleServer}
                  leftIcon={server.status === 'online' ? <PowerOff size={18} /> : <Play size={18} />}
                >
                  {server.status === 'online' ? 'Stop Server' : 'Start Server'}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  disabled={server.status !== 'online'}
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
                  <span className="text-sm text-primary">1.2GB / {server.ram_gb}GB</span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div className="bg-secondary/20 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Storage</h4>
                  <span className="text-sm text-minecraft-purple">8.4GB / {server.storage_gb}GB</span>
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
                  <p className="text-gray-400">[08:15:32] [Server thread/INFO]: Starting minecraft server version {server.version}</p>
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
                  <p className="text-4xl font-bold mb-2">0 / {server.max_players}</p>
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
        ) : (
          <div className="text-center py-12">
            {user ? (
              <div>
                <h3 className="text-2xl font-bold mb-4">No Server Found</h3>
                <p className="text-muted-foreground mb-8">
                  You don't have any Minecraft servers yet. Create your first server to get started.
                </p>
                <Button 
                  size="lg" 
                  onClick={() => navigate('/dashboard')}
                >
                  Create a Server
                </Button>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-bold mb-4">Server Control Demo</h3>
                <p className="text-muted-foreground mb-8">
                  Sign in or create an account to start managing your own Minecraft servers.
                </p>
                <Button 
                  size="lg" 
                  onClick={() => navigate('/auth')}
                >
                  Sign In
                </Button>
              </div>
            )}
          </div>
        )}
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
