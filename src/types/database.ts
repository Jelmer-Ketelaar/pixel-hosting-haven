
export interface ServerInstance {
  id: string;
  user_id: string;
  name: string;
  plan: string;
  status: 'offline' | 'starting' | 'online' | 'stopping' | 'error' | string;
  ip_address: string | null;
  port: number;
  created_at: string;
  updated_at: string;
  ram_gb: number;
  cpu_cores: number;
  storage_gb: number;
  max_players: number;
  version: string;
  auto_restart: boolean;
  profiles?: any; // Add this to allow for joined profile data
}

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface ServerBackup {
  id: string;
  server_id: string;
  name: string;
  size_mb: number | null;
  created_at: string;
  path: string;
}

export interface ServerMod {
  id: string;
  server_id: string;
  name: string;
  version: string;
  type: 'mod' | 'plugin';
  enabled: boolean;
  installed_at: string;
}

export interface BillingRecord {
  id: string;
  user_id: string;
  server_id: string | null;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'refunded' | string;
  description: string;
  period_start: string | null;
  period_end: string | null;
  created_at: string;
  profiles?: any; // Add this to allow for joined profile data
}
