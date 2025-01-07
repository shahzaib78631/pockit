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
      categories: {
        Row: {
          created_at: string
          deleted: boolean
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted?: boolean
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted?: boolean
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      inventory: {
        Row: {
          change_type: string | null
          created_at: string
          created_by: string | null
          id: string
          item_id: string
          location_id: string | null
          quantity: number
          reason: string | null
          unit_id: string | null
        }
        Insert: {
          change_type?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          item_id: string
          location_id?: string | null
          quantity?: number
          reason?: string | null
          unit_id?: string | null
        }
        Update: {
          change_type?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          item_id?: string
          location_id?: string | null
          quantity?: number
          reason?: string | null
          unit_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      item_prices: {
        Row: {
          buying_price: number | null
          created_at: string
          deleted: boolean
          id: string
          item_id: string | null
          price_list_id: string | null
          selling_price: number | null
          unit_id: string | null
          updated_at: string
        }
        Insert: {
          buying_price?: number | null
          created_at?: string
          deleted?: boolean
          id?: string
          item_id?: string | null
          price_list_id?: string | null
          selling_price?: number | null
          unit_id?: string | null
          updated_at?: string
        }
        Update: {
          buying_price?: number | null
          created_at?: string
          deleted?: boolean
          id?: string
          item_id?: string | null
          price_list_id?: string | null
          selling_price?: number | null
          unit_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "item_prices_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_prices_price_list_id_fkey"
            columns: ["price_list_id"]
            isOneToOne: false
            referencedRelation: "price_lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_prices_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      item_units: {
        Row: {
          conversion_factor: number
          created_at: string
          deleted: boolean
          id: string
          is_base_unit: boolean | null
          item_id: string | null
          unit_id: string | null
          updated_at: string
        }
        Insert: {
          conversion_factor?: number
          created_at?: string
          deleted?: boolean
          id?: string
          is_base_unit?: boolean | null
          item_id?: string | null
          unit_id?: string | null
          updated_at?: string
        }
        Update: {
          conversion_factor?: number
          created_at?: string
          deleted?: boolean
          id?: string
          is_base_unit?: boolean | null
          item_id?: string | null
          unit_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "item_units_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_units_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      items: {
        Row: {
          barcode: string | null
          category_id: string | null
          created_at: string
          deleted: boolean
          id: string
          image_url: string | null
          name: string
          sku: string
          updated_at: string
        }
        Insert: {
          barcode?: string | null
          category_id?: string | null
          created_at?: string
          deleted?: boolean
          id?: string
          image_url?: string | null
          name: string
          sku: string
          updated_at?: string
        }
        Update: {
          barcode?: string | null
          category_id?: string | null
          created_at?: string
          deleted?: boolean
          id?: string
          image_url?: string | null
          name?: string
          sku?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          address: string | null
          created_at: string
          deleted: boolean
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          deleted?: boolean
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          deleted?: boolean
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          deleted: boolean
          discount: number | null
          id: string
          item_id: string | null
          order_id: string | null
          quantity: number
          unit_id: string | null
          unit_price: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted?: boolean
          discount?: number | null
          id?: string
          item_id?: string | null
          order_id?: string | null
          quantity: number
          unit_id?: string | null
          unit_price: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted?: boolean
          discount?: number | null
          id?: string
          item_id?: string | null
          order_id?: string | null
          quantity?: number
          unit_id?: string | null
          unit_price?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_id: string | null
          deleted: boolean
          id: string
          order_date: string
          order_type: string
          status: string | null
          supplier_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          deleted?: boolean
          id?: string
          order_date?: string
          order_type: string
          status?: string | null
          supplier_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          deleted?: boolean
          id?: string
          order_date?: string
          order_type?: string
          status?: string | null
          supplier_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
        ]
      }
      people: {
        Row: {
          address1: string
          address2: string | null
          city: string
          comments: string | null
          country: string
          created_at: string
          deleted: boolean
          email: string
          first_name: string
          gender: number | null
          id: string
          last_name: string
          phone_number: string
          state: string | null
          updated_at: string
          zip: string | null
        }
        Insert: {
          address1: string
          address2?: string | null
          city: string
          comments?: string | null
          country: string
          created_at?: string
          deleted?: boolean
          email: string
          first_name: string
          gender?: number | null
          id?: string
          last_name: string
          phone_number: string
          state?: string | null
          updated_at?: string
          zip?: string | null
        }
        Update: {
          address1?: string
          address2?: string | null
          city?: string
          comments?: string | null
          country?: string
          created_at?: string
          deleted?: boolean
          email?: string
          first_name?: string
          gender?: number | null
          id?: string
          last_name?: string
          phone_number?: string
          state?: string | null
          updated_at?: string
          zip?: string | null
        }
        Relationships: []
      }
      person_roles: {
        Row: {
          created_at: string
          deleted: boolean
          id: string
          person_id: string | null
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted?: boolean
          id?: string
          person_id?: string | null
          role: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted?: boolean
          id?: string
          person_id?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "person_roles_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
        ]
      }
      price_lists: {
        Row: {
          created_at: string
          deleted: boolean
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted?: boolean
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted?: boolean
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      units: {
        Row: {
          base_unit: boolean | null
          category: string | null
          created_at: string
          deleted: boolean
          id: string
          name: string
          symbol: string | null
          updated_at: string
        }
        Insert: {
          base_unit?: boolean | null
          category?: string | null
          created_at?: string
          deleted?: boolean
          id?: string
          name: string
          symbol?: string | null
          updated_at?: string
        }
        Update: {
          base_unit?: boolean | null
          category?: string | null
          created_at?: string
          deleted?: boolean
          id?: string
          name?: string
          symbol?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_permissions: {
        Row: {
          created_at: string
          deleted: boolean
          id: string
          permission: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          deleted?: boolean
          id?: string
          permission: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          deleted?: boolean
          id?: string
          permission?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_permissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          deleted: boolean
          id: string
          password_hash: string
          person_id: string | null
          role: string | null
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          deleted?: boolean
          id?: string
          password_hash: string
          person_id?: string | null
          role?: string | null
          updated_at?: string
          username: string
        }
        Update: {
          created_at?: string
          deleted?: boolean
          id?: string
          password_hash?: string
          person_id?: string | null
          role?: string | null
          updated_at?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
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
