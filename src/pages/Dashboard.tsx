
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { ServerInstance } from '@/types/database';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Server, 
  BarChart2, 
  HardDrive, 
  CreditCard, 
  Settings, 
  Play, 
  PowerOff, 
  RefreshCw, 
  Trash2,
  AlertTriangle
} from 'lucide-react';
import Footer from '@/components/Footer';
import { toast } from '@/components/ui/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { PricingPlan, pricingPlans } from '@/data/pricingPlans';

const Dashboard: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [servers, setServers] = useState<ServerInstance[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [serverName, setServerName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingServerId, setLoadingServerId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchServers();
    }
  }, [user]);

  async function fetchServers() {
    try {
      const { data, error } = await supabase
        .from('server_instances')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setServers(data as ServerInstance[]);
    } catch (error) {
      console.error('Error fetching servers:', error);
      toast({
        title: 'Failed to load servers',
        description: 'There was a problem loading your servers. Please try again.',
        variant: 'destructive',
      });
    }
  }

  const handleCreateServer = async () => {
    if (!selectedPlan || !serverName.trim() || !user) {
      toast({
        title: 'Invalid input',
        description: 'Please provide a server name and select a plan.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsCreating(true);

      // Fix: Convert string values to numbers and add user_id
      const newServer = {
        name: serverName.trim(),
        plan: selectedPlan.name,
        ram_gb: parseInt(selectedPlan.resources.ram.replace('GB', '').trim()),
        cpu_cores: parseInt(selectedPlan.resources.cpu.replace('vCores', '').trim()),
        storage_gb: parseInt(selectedPlan.resources.storage.replace('GB SSD', '').trim()),
        max_players: parseInt(selectedPlan.resources.players.replace('Up to ', '').trim()),
        user_id: user.id
      };

      const { data, error } = await supabase
        .from('server_instances')
        .insert(newServer)
        .select();

      if (error) {
        throw error;
      }

      toast({
        title: 'Server created!',
        description: `Your new server "${serverName}" has been created.`,
      });

      setIsModalOpen(false);
      setServerName('');
      setSelectedPlan(null);
      fetchServers();
    } catch (error) {
      console.error('Error creating server:', error);
      toast({
        title: 'Failed to create server',
        description: 'There was a problem creating your server. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleToggleServer = async (server: ServerInstance) => {
    try {
      setLoadingServerId(server.id);
      
      const newStatus = server.status === 'offline' ? 'starting' : 'stopping';
      
      const { error } = await supabase
        .from('server_instances')
        .update({ status: newStatus })
        .eq('id', server.id);
        
      if (error) throw error;
      
      // Simulate the server starting/stopping process
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
        
        fetchServers();
        setLoadingServerId(null);
        
        toast({
          title: `Server ${finalStatus}`,
          description: `Your server "${server.name}" is now ${finalStatus}.`,
        });
      }, 2000);
      
      fetchServers();
    } catch (error) {
      console.error('Error toggling server:', error);
      setLoadingServerId(null);
      toast({
        title: 'Failed to update server',
        description: 'There was a problem updating your server. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleRestartServer = async (server: ServerInstance) => {
    if (server.status !== 'online') {
      toast({
        title: 'Cannot restart server',
        description: 'Your server must be online to restart it.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setLoadingServerId(server.id);
      
      const { error } = await supabase
        .from('server_instances')
        .update({ status: 'stopping' })
        .eq('id', server.id);
        
      if (error) throw error;
      
      // Simulate restart process
      setTimeout(async () => {
        const { error: updateError } = await supabase
          .from('server_instances')
          .update({ status: 'starting' })
          .eq('id', server.id);
          
        if (updateError) throw updateError;
        
        fetchServers();
        
        setTimeout(async () => {
          const { error: finalError } = await supabase
            .from('server_instances')
            .update({ status: 'online' })
            .eq('id', server.id);
            
          if (finalError) throw finalError;
          
          fetchServers();
          setLoadingServerId(null);
          
          toast({
            title: 'Server restarted',
            description: `Your server "${server.name}" has been restarted.`,
          });
        }, 2000);
      }, 2000);
      
      fetchServers();
    } catch (error) {
      console.error('Error restarting server:', error);
      setLoadingServerId(null);
      toast({
        title: 'Failed to restart server',
        description: 'There was a problem restarting your server. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteServer = async (serverId: string) => {
    try {
      setLoadingServerId(serverId);
      
      const { error } = await supabase
        .from('server_instances')
        .delete()
        .eq('id', serverId);
        
      if (error) throw error;
      
      toast({
        title: 'Server deleted',
        description: 'Your server has been deleted.',
      });
      
      fetchServers();
    } catch (error) {
      console.error('Error deleting server:', error);
      toast({
        title: 'Failed to delete server',
        description: 'There was a problem deleting your server. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoadingServerId(null);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Minecraft Servers</h1>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus size={16} />
                New Server
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Minecraft Server</DialogTitle>
                <DialogDescription>
                  Choose a plan and give your server a name to get started.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="server-name">Server Name</Label>
                  <Input 
                    id="server-name"
                    placeholder="My Awesome Server" 
                    value={serverName}
                    onChange={(e) => setServerName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Select a Plan</Label>
                  <div className="grid grid-cols-1 gap-4 pt-2">
                    {pricingPlans.map((plan) => (
                      <div 
                        key={plan.name}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedPlan?.name === plan.name 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedPlan(plan)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{plan.name}</p>
                            <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{plan.price}</p>
                            <p className="text-xs text-muted-foreground">per month</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          <div className="text-xs">
                            <p className="text-muted-foreground">RAM</p>
                            <p className="font-medium">{plan.resources.ram}</p>
                          </div>
                          <div className="text-xs">
                            <p className="text-muted-foreground">CPU</p>
                            <p className="font-medium">{plan.resources.cpu}</p>
                          </div>
                          <div className="text-xs">
                            <p className="text-muted-foreground">Storage</p>
                            <p className="font-medium">{plan.resources.storage}</p>
                          </div>
                          <div className="text-xs">
                            <p className="text-muted-foreground">Players</p>
                            <p className="font-medium">{plan.resources.players}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button 
                  onClick={handleCreateServer} 
                  disabled={!selectedPlan || !serverName.trim() || isCreating}
                >
                  {isCreating ? 'Creating...' : 'Create Server'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {servers.length === 0 ? (
          <div className="text-center py-16 bg-muted/30 rounded-lg border border-dashed border-muted-foreground/20">
            <Server className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">No servers yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              You haven't created any Minecraft servers yet. Create your first server to get started.
            </p>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create a Server
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-lg border border-border flex items-center">
              <AlertTriangle className="text-amber-500 mr-3 h-5 w-5" />
              <p className="text-sm">
                <span className="font-semibold">Demo Mode:</span> Server creation and management are simulated. In a production environment, these actions would interact with real server infrastructure.
              </p>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Server Name</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Resources</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {servers.map((server) => (
                  <TableRow key={server.id}>
                    <TableCell className="font-medium">{server.name}</TableCell>
                    <TableCell>{server.plan}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className={`w-2.5 h-2.5 rounded-full mr-2 ${
                          server.status === 'online' ? 'bg-minecraft-green' :
                          server.status === 'starting' || server.status === 'stopping' ? 'bg-amber-500' :
                          'bg-red-500'
                        }`} />
                        <span className="capitalize">{server.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {server.ip_address ? (
                        <div className="flex items-center">
                          {server.ip_address}:{server.port}
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-6 px-2 ml-1"
                            onClick={() => {
                              navigator.clipboard.writeText(`${server.ip_address}:${server.port}`);
                              toast({
                                title: "Copied to clipboard",
                                description: `Server address copied to clipboard.`,
                              });
                            }}
                          >
                            Copy
                          </Button>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Not available</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center text-xs">
                          <HardDrive className="h-3 w-3 mr-1" />
                          <span>{server.ram_gb}GB RAM, {server.cpu_cores} vCores</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <Server className="h-3 w-3 mr-1" />
                          <span>{server.storage_gb}GB SSD, {server.max_players} Players</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {server.status === 'offline' ? (
                          <Button 
                            size="sm" 
                            onClick={() => handleToggleServer(server)}
                            disabled={loadingServerId === server.id}
                          >
                            {loadingServerId === server.id ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-1" />
                                Start
                              </>
                            )}
                          </Button>
                        ) : server.status === 'online' ? (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleRestartServer(server)}
                              disabled={loadingServerId === server.id}
                            >
                              {loadingServerId === server.id ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  <RefreshCw className="h-4 w-4 mr-1" />
                                  Restart
                                </>
                              )}
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleToggleServer(server)}
                              disabled={loadingServerId === server.id}
                            >
                              {loadingServerId === server.id ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  <PowerOff className="h-4 w-4 mr-1" />
                                  Stop
                                </>
                              )}
                            </Button>
                          </>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="outline"
                            disabled={true}
                          >
                            <RefreshCw className="h-4 w-4 animate-spin mr-1" />
                            {server.status === 'starting' ? 'Starting...' : 'Stopping...'}
                          </Button>
                        )}
                        
                        {server.status === 'offline' && (
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleDeleteServer(server.id)}
                            disabled={loadingServerId === server.id}
                          >
                            {loadingServerId === server.id ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4 text-destructive" />
                            )}
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                <Server className="h-6 w-6" />
                <span>Server Details</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                <BarChart2 className="h-6 w-6" />
                <span>Performance</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                <HardDrive className="h-6 w-6" />
                <span>Backups</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                <Settings className="h-6 w-6" />
                <span>Settings</span>
              </Button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
