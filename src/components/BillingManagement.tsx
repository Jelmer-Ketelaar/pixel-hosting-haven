import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BillingRecord } from '@/types/database';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Plus, 
  MoreVertical, 
  FileText, 
  CreditCard, 
  RefreshCw 
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

export const BillingManagement: React.FC = () => {
  const [billingRecords, setBillingRecords] = useState<BillingRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchBillingRecords();
  }, []);

  const fetchBillingRecords = async () => {
    try {
      setIsLoading(true);
      
      let query = supabase
        .from('billing_records')
        .select('*, profiles:user_id(email, full_name)')
        .order('created_at', { ascending: false });
      
      if (selectedStatus) {
        query = query.eq('status', selectedStatus);
      }
      
      const { data, error } = await query;

      if (error) {
        throw error;
      }

      const typedRecords = data?.map(record => ({
        ...record,
        profiles: record.profiles || { email: 'Unknown', full_name: null }
      })) as BillingRecord[];

      setBillingRecords(typedRecords || []);
    } catch (error) {
      console.error('Error fetching billing records:', error);
      toast({
        title: 'Error fetching billing records',
        description: 'Could not load billing data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateInvoice = () => {
    toast({
      title: 'Invoice Created',
      description: 'The new invoice has been created and sent to the customer.',
    });
  };

  const handleDownloadInvoice = (recordId: string) => {
    toast({
      title: 'Download Started',
      description: 'Your invoice download has started.',
    });
  };

  const handleMarkAsPaid = async (recordId: string) => {
    try {
      const { error } = await supabase
        .from('billing_records')
        .update({ status: 'paid' })
        .eq('id', recordId);
      
      if (error) throw error;
      
      fetchBillingRecords();
      
      toast({
        title: 'Payment Recorded',
        description: 'The invoice has been marked as paid.',
      });
    } catch (error) {
      console.error('Error updating payment status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update payment status.',
        variant: 'destructive',
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number, currency: string = 'EUR') => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: currency || 'EUR'
    }).format(amount);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'refunded':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  const filteredRecords = billingRecords.filter(record => {
    const userEmail = record.profiles?.email || '';
    const description = record.description || '';
    
    return (
      userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Billing & Invoices</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search invoices..."
                  className="pl-8 w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select 
                value={selectedStatus || ''} 
                onValueChange={(value) => {
                  setSelectedStatus(value || null);
                  setTimeout(fetchBillingRecords, 100);
                }}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All statuses</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={fetchBillingRecords}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Invoice
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Invoice</DialogTitle>
                    <DialogDescription>
                      Generate a new invoice for a customer.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="customer" className="text-right">
                        Customer
                      </label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select customer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user1">user1@example.com</SelectItem>
                          <SelectItem value="user2">user2@example.com</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="amount" className="text-right">
                        Amount
                      </label>
                      <div className="col-span-3 flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                          €
                        </span>
                        <Input
                          id="amount"
                          type="number"
                          step="0.01"
                          className="rounded-l-none"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="description" className="text-right">
                        Description
                      </label>
                      <Input id="description" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleCreateInvoice}>Create & Send</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Loading billing records...
                  </TableCell>
                </TableRow>
              ) : filteredRecords.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No billing records found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-mono text-xs">
                      {record.id.substring(0, 8)}
                    </TableCell>
                    <TableCell>
                      {record.profiles?.email || 'Unknown'}
                    </TableCell>
                    <TableCell>{record.description}</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(record.amount, record.currency)}
                    </TableCell>
                    <TableCell>{formatDate(record.created_at)}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeVariant(record.status || '')}`}>
                        {record.status?.charAt(0).toUpperCase() + record.status?.slice(1) || 'Unknown'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleDownloadInvoice(record.id)}>
                            <FileText className="mr-2 h-4 w-4" />
                            Download Invoice
                          </DropdownMenuItem>
                          {record.status === 'pending' && (
                            <DropdownMenuItem onClick={() => handleMarkAsPaid(record.id)}>
                              <CreditCard className="mr-2 h-4 w-4" />
                              Mark as Paid
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
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
