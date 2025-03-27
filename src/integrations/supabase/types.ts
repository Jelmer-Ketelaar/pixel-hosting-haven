export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      billing_records: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          description: string
          id: string
          period_end: string | null
          period_start: string | null
          server_id: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          description: string
          id?: string
          period_end?: string | null
          period_start?: string | null
          server_id?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          description?: string
          id?: string
          period_end?: string | null
          period_start?: string | null
          server_id?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "billing_records_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "server_instances"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      server_backups: {
        Row: {
          created_at: string
          id: string
          name: string
          path: string
          server_id: string
          size_mb: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          path: string
          server_id: string
          size_mb?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          path?: string
          server_id?: string
          size_mb?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "server_backups_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "server_instances"
            referencedColumns: ["id"]
          },
        ]
      }
      server_instances: {
        Row: {
          auto_restart: boolean | null
          cpu_cores: number
          created_at: string
          id: string
          ip_address: string | null
          max_players: number
          name: string
          plan: string
          port: number | null
          ram_gb: number
          status: string
          storage_gb: number
          updated_at: string
          user_id: string
          version: string | null
        }
        Insert: {
          auto_restart?: boolean | null
          cpu_cores: number
          created_at?: string
          id?: string
          ip_address?: string | null
          max_players: number
          name: string
          plan: string
          port?: number | null
          ram_gb: number
          status?: string
          storage_gb: number
          updated_at?: string
          user_id: string
          version?: string | null
        }
        Update: {
          auto_restart?: boolean | null
          cpu_cores?: number
          created_at?: string
          id?: string
          ip_address?: string | null
          max_players?: number
          name?: string
          plan?: string
          port?: number | null
          ram_gb?: number
          status?: string
          storage_gb?: number
          updated_at?: string
          user_id?: string
          version?: string | null
        }
        Relationships: []
      }
      server_mods: {
        Row: {
          enabled: boolean | null
          id: string
          installed_at: string
          name: string
          server_id: string
          type: string
          version: string
        }
        Insert: {
          enabled?: boolean | null
          id?: string
          installed_at?: string
          name: string
          server_id: string
          type: string
          version: string
        }
        Update: {
          enabled?: boolean | null
          id?: string
          installed_at?: string
          name?: string
          server_id?: string
          type?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "server_mods_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "server_instances"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
