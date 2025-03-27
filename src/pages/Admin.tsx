
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from '@/components/ui/use-toast';
import {
  Users,
  Server,
  CreditCard,
  Settings,
  Activity,
  RefreshCw,
  Search,
  Plus,
  ChevronDown,
  Trash2,
} from 'lucide-react';
import { Profile, ServerInstance, BillingRecord } from '@/types/database';
import { AdminMetrics } from '@/components/AdminMetrics';
import { UserManagement } from '@/components/UserManagement';
import { ServerManagement } from '@/components/ServerManagement';
import { BillingManagement } from '@/components/BillingManagement';
import { SystemSettings } from '@/components/SystemSettings';

const Admin: React.FC = () => {
  const { user, profile, isLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // In a real app, you would check if user has admin role
    // For now, we'll simulate this for any logged-in user
    if (user) {
      checkAdminStatus();
    }
  }, [user]);

  const checkAdminStatus = async () => {
    // In a real implementation, you would check admin status from the database
    // For demo purposes, we'll mark the user as admin
    setIsAdmin(true);
    
    // In a real implementation:
    // const { data, error } = await supabase
    //   .from('user_roles')
    //   .select('*')
    //   .eq('user_id', user.id)
    //   .eq('role', 'admin')
    //   .single();
    
    // if (data) {
    //   setIsAdmin(true);
    // }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If not authenticated or not admin, redirect to home
  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <RefreshCw size={16} />
              Refresh
            </Button>
            <Button size="sm" className="gap-1">
              <Settings size={16} />
              Settings
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-4xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="servers">Servers</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="settings">System</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AdminMetrics />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="servers">
            <ServerManagement />
          </TabsContent>

          <TabsContent value="billing">
            <BillingManagement />
          </TabsContent>

          <TabsContent value="settings">
            <SystemSettings />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
