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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
