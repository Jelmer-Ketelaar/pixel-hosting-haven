
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ServerInstance } from '@/types/database';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  MoreVertical, 
  Play, 
  PowerOff, 
  Settings, 
  Trash2, 
  RefreshCw,
  HardDrive
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export const ServerManagement: React.FC = () => {
  const [servers, setServers] = useState<ServerInstance[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingServerId, setLoadingServerId] = useState<string | null>(null);

  useEffect(() => {
    fetchServers();
  }, []);

  const fetchServers = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('server_instances')
        .select('*, profiles:user_id(email, full_name)')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Cast the data to our ServerInstance type
      const typedServers = data?.map(server => ({
        ...server,
        profiles: server.profiles || { email: 'Unknown', full_name: null }
      })) as ServerInstance[];

      setServers(typedServers || []);
    } catch (error) {
      console.error('Error fetching servers:', error);
      toast({
        title: 'Error fetching servers',
        description: 'Could not load server data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
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
          description: `Server "${server.name}" is now ${finalStatus}.`,
        });
      }, 2000);
      
    } catch (error) {
      console.error('Error toggling server:', error);
      setLoadingServerId(null);
      toast({
        title: 'Failed to update server',
        description: 'There was a problem updating the server. Please try again.',
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
        description: 'The server has been permanently deleted.',
      });
      
      fetchServers();
    } catch (error) {
      console.error('Error deleting server:', error);
      toast({
        title: 'Failed to delete server',
        description: 'There was a problem deleting the server. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoadingServerId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const filteredServers = servers.filter(server => 
    server.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    server.plan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Server Management</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search servers..."
                  className="pl-8 w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button onClick={fetchServers}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Server</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Resources</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Loading servers...
                  </TableCell>
                </TableRow>
              ) : filteredServers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No servers found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredServers.map((server) => (
                  <TableRow key={server.id}>
                    <TableCell className="font-medium">{server.name}</TableCell>
                    <TableCell>
                      {server.profiles?.email || 'Unknown'}
                    </TableCell>
                    <TableCell>{server.plan}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className={`w-2.5 h-2.5 rounded-full mr-2 ${
                          server.status === 'online' ? 'bg-green-500' :
                          server.status === 'starting' || server.status === 'stopping' ? 'bg-amber-500' :
                          'bg-red-500'
                        }`} />
                        <span className="capitalize">{server.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center text-xs">
                          <HardDrive className="h-3 w-3 mr-1" />
                          <span>{server.ram_gb}GB RAM, {server.cpu_cores} vCores</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <span>{server.storage_gb}GB SSD, {server.max_players} Players</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(server.created_at)}</TableCell>
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
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Settings className="mr-2 h-4 w-4" />
                              Edit Server
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteServer(server.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Server
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
