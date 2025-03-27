
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Activity, 
  Users, 
  Server, 
  CreditCard, 
  Cpu, 
  HardDrive 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const AdminMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalServers: 0,
    activeServers: 0,
    monthlyRevenue: 0,
    totalStorage: 0,
    totalRam: 0
  });

  const [revenueData, setRevenueData] = useState([
    { name: 'Jan', amount: 4000 },
    { name: 'Feb', amount: 3000 },
    { name: 'Mar', amount: 5000 },
    { name: 'Apr', amount: 8000 },
    { name: 'May', amount: 7000 },
    { name: 'Jun', amount: 9000 },
  ]);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      // Fetch total users
      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Fetch server stats
      const { data: servers } = await supabase
        .from('server_instances')
        .select('*');

      const activeServers = servers?.filter(s => s.status === 'online') || [];
      
      // Calculate resource usage
      let totalStorage = 0;
      let totalRam = 0;
      
      if (servers) {
        totalStorage = servers.reduce((sum, server) => sum + server.storage_gb, 0);
        totalRam = servers.reduce((sum, server) => sum + server.ram_gb, 0);
      }

      // Fetch billing data for monthly revenue
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      
      const { data: billingRecords } = await supabase
        .from('billing_records')
        .select('amount')
        .eq('status', 'paid')
        .gte('created_at', `${currentYear}-${currentMonth}-01`);

      const monthlyRevenue = billingRecords?.reduce((sum, record) => sum + Number(record.amount), 0) || 0;

      setMetrics({
        totalUsers: userCount || 0,
        totalServers: servers?.length || 0,
        activeServers: activeServers.length,
        monthlyRevenue,
        totalStorage,
        totalRam
      });
    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Registered accounts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Servers</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalServers}</div>
            <p className="text-xs text-muted-foreground">{metrics.activeServers} online</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{metrics.monthlyRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Resource Usage</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalStorage}GB</div>
            <p className="text-xs text-muted-foreground">{metrics.totalRam}GB RAM</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`€${value}`, 'Revenue']} />
                <Legend />
                <Bar dataKey="amount" name="Monthly Revenue" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
