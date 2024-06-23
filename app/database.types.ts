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
          },
        ]
      }
      favorite: {
        Row: {
          created_at: string
          id: number
          is_favorite: boolean
          service_id: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_favorite?: boolean
          service_id: number
          updated_at?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          is_favorite?: boolean
          service_id?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorite_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "providing_service"
            referencedColumns: ["id"]
          },
        ]
      }
      freelancer: {
        Row: {
          created_at: string
          description: string | null
          email: string | null
          firstname: string
          id: number
          is_available: boolean | null
          lastname: string
          phone: string | null
          profile_url: string | null
          updated_at: string | null
          user_id: string | null
          username: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          email?: string | null
          firstname: string
          id?: number
          is_available?: boolean | null
          lastname: string
          phone?: string | null
          profile_url?: string | null
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          email?: string | null
          firstname?: string
          id?: number
          is_available?: boolean | null
          lastname?: string
          phone?: string | null
          profile_url?: string | null
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
        }
        Relationships: []
      }
      freelancer_occupation: {
        Row: {
          created_at: string
          description: string | null
          id: number
          seller_id: number | null
          term_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          seller_id?: number | null
          term_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          seller_id?: number | null
          term_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "freelancer_occupation_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "freelancer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "freelancer_occupation_term_id_fkey"
            columns: ["term_id"]
            isOneToOne: false
            referencedRelation: "term"
            referencedColumns: ["id"]
          },
        ]
      }
      language: {
        Row: {
          created_at: string
          freelancer_id: number | null
          id: number
          name: string | null
          term_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          freelancer_id?: number | null
          id?: number
          name?: string | null
          term_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          freelancer_id?: number | null
          id?: number
          name?: string | null
          term_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "language_freelancer_id_fkey"
            columns: ["freelancer_id"]
            isOneToOne: false
            referencedRelation: "freelancer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "language_term_id_fkey"
            columns: ["term_id"]
            isOneToOne: false
            referencedRelation: "term"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          created_at: string
          id: number
          message: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          message?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          message?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      order: {
        Row: {
          buyer_id: number
          created_at: string
          detail: string
          id: number
          on_date: string
          price: number
          pricing_id: number
          updated_at: string
        }
        Insert: {
          buyer_id: number
          created_at?: string
          detail: string
          id?: number
          on_date: string
          price: number
          pricing_id: number
          updated_at?: string
        }
        Update: {
          buyer_id?: number
          created_at?: string
          detail?: string
          id?: number
          on_date?: string
          price?: number
          pricing_id?: number
          updated_at?: string
        }
        Relationships: []
      }
      payment: {
        Row: {
          amount: number | null
          created_at: string
          description: string | null
          id: number
          method: string | null
          on_date: string | null
          order_id: number | null
          refund_info: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          description?: string | null
          id?: number
          method?: string | null
          on_date?: string | null
          order_id?: number | null
          refund_info?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          description?: string | null
          id?: number
          method?: string | null
          on_date?: string | null
          order_id?: number | null
          refund_info?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "order"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio: {
        Row: {
          created_at: string
          description: string | null
          freelancer_id: number | null
          id: number
          title: string | null
          updated_at: string
          url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          freelancer_id?: number | null
          id?: number
          title?: string | null
          updated_at?: string
          url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          freelancer_id?: number | null
          id?: number
          title?: string | null
          updated_at?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_freelancer_id_fkey"
            columns: ["freelancer_id"]
            isOneToOne: false
            referencedRelation: "freelancer"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing: {
        Row: {
          created_at: string
          delivery_timeframe: string | null
          description: string | null
          id: number
          meta_data: Json | null
          package_name: string | null
          price: number | null
          service_id: number | null
          type_id: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          delivery_timeframe?: string | null
          description?: string | null
          id?: number
          meta_data?: Json | null
          package_name?: string | null
          price?: number | null
          service_id?: number | null
          type_id?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          delivery_timeframe?: string | null
          description?: string | null
          id?: number
          meta_data?: Json | null
          package_name?: string | null
          price?: number | null
          service_id?: number | null
          type_id?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pricing_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "providing_service"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pricing_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "term"
            referencedColumns: ["id"]
          },
        ]
      }
      providing_service: {
        Row: {
          created_at: string
          delivery_format: Json | null
          description: string | null
          freelancer_id: number | null
          id: number
          service_duration: string | null
          term_id: number | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          delivery_format?: Json | null
          description?: string | null
          freelancer_id?: number | null
          id?: number
          service_duration?: string | null
          term_id?: number | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          delivery_format?: Json | null
          description?: string | null
          freelancer_id?: number | null
          id?: number
          service_duration?: string | null
          term_id?: number | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "providing_service_freelancer_id_fkey"
            columns: ["freelancer_id"]
            isOneToOne: false
            referencedRelation: "freelancer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "providing_service_term_id_fkey"
            columns: ["term_id"]
            isOneToOne: false
            referencedRelation: "term"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "providing_service_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
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
      rating: {
        Row: {
          buyer_id: string
          created_at: string
          description: string | null
          freelancer_id: number
          id: number
          picture: Json | null
          service_id: number
          star: number
          updated_at: string | null
        }
        Insert: {
          buyer_id: string
          created_at?: string
          description?: string | null
          freelancer_id: number
          id?: number
          picture?: Json | null
          service_id: number
          star: number
          updated_at?: string | null
        }
        Update: {
          buyer_id?: string
          created_at?: string
          description?: string | null
          freelancer_id?: number
          id?: number
          picture?: Json | null
          service_id?: number
          star?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rating_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rating_freelancer_id_fkey"
            columns: ["freelancer_id"]
            isOneToOne: false
            referencedRelation: "freelancer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rating_servide_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "providing_service"
            referencedColumns: ["id"]
          },
        ]
      }
      skill: {
        Row: {
          created_at: string
          description: string | null
          freelancer_id: number | null
          id: number
          level: string | null
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          freelancer_id?: number | null
          id?: number
          level?: string | null
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          freelancer_id?: number | null
          id?: number
          level?: string | null
          name?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skill_freelancer_id_fkey"
            columns: ["freelancer_id"]
            isOneToOne: false
            referencedRelation: "freelancer"
            referencedColumns: ["id"]
          },
        ]
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
          },
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
          },
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
