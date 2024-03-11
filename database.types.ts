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
      districts: {
        Row: {
          en: string
          id: number
          is_active: boolean | null
          lo: string
          prov_id: number | null
        }
        Insert: {
          en: string
          id?: number
          is_active?: boolean | null
          lo: string
          prov_id?: number | null
        }
        Update: {
          en?: string
          id?: number
          is_active?: boolean | null
          lo?: string
          prov_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "districts_prov_id_fkey"
            columns: ["prov_id"]
            isOneToOne: false
            referencedRelation: "provinces"
            referencedColumns: ["id"]
          }
        ]
      }
      provinces: {
        Row: {
          en: string
          id: number
          is_active: boolean | null
          lo: string
        }
        Insert: {
          en: string
          id?: number
          is_active?: boolean | null
          lo: string
        }
        Update: {
          en?: string
          id?: number
          is_active?: boolean | null
          lo?: string
        }
        Relationships: []
      }
      term: {
        Row: {
          active: boolean
          created_at: string | null
          group_id: number | null
          id: number
          name: string
          parent_id: number | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean
          created_at?: string | null
          group_id?: number | null
          id?: number
          name: string
          parent_id?: number | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean
          created_at?: string | null
          group_id?: number | null
          id?: number
          name?: string
          parent_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "term_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "term"
            referencedColumns: ["id"]
          }
        ]
      }
      term_meta: {
        Row: {
          created_at: string | null
          id: number
          key: string
          term_id: number
          updated_at: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          key: string
          term_id: number
          updated_at?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          id?: number
          key?: string
          term_id?: number
          updated_at?: string | null
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "term_meta_term_id_fkey"
            columns: ["term_id"]
            isOneToOne: false
            referencedRelation: "term"
            referencedColumns: ["id"]
          }
        ]
      }
      todo: {
        Row: {
          created_at: string
          id: number
          is_complete: boolean
          title: string
          updated_at: string
          user_email: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          is_complete?: boolean
          title: string
          updated_at?: string
          user_email?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          is_complete?: boolean
          title?: string
          updated_at?: string
          user_email?: string | null
        }
        Relationships: []
      }
      villages: {
        Row: {
          dist_id: number | null
          en: string
          id: number
          is_active: boolean | null
          lo: string
        }
        Insert: {
          dist_id?: number | null
          en: string
          id?: number
          is_active?: boolean | null
          lo: string
        }
        Update: {
          dist_id?: number | null
          en?: string
          id?: number
          is_active?: boolean | null
          lo?: string
        }
        Relationships: [
          {
            foreignKeyName: "villages_dist_id_fkey"
            columns: ["dist_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          }
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
