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
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted?: boolean
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted?: boolean
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      inventory: {
        Row: {
          created_at: string
          deleted: boolean
          id: string
          item_id: string
          location_id: string | null
          unit_count: number
          updated_at: string
          whole_count: number
        }
        Insert: {
          created_at?: string
          deleted?: boolean
          id?: string
          item_id: string
          location_id?: string | null
          unit_count?: number
          updated_at?: string
          whole_count?: number
        }
        Update: {
          created_at?: string
          deleted?: boolean
          id?: string
          item_id?: string
          location_id?: string | null
          unit_count?: number
          updated_at?: string
          whole_count?: number
        }
        Relationships: [
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
        ]
      }
      items: {
        Row: {
          barcode: string | null
          category_id: string | null
          created_at: string
          deleted: boolean
          id: string
          is_active: boolean
          name: string
          selling_type: string
          sku: string
          sub_unit_id: string | null
          supplier_id: string | null
          unit_buying_price: number
          unit_selling_price: number
          units_per_whole: number
          updated_at: string
          whole_buying_price: number
          whole_selling_price: number
          whole_unit_id: string | null
        }
        Insert: {
          barcode?: string | null
          category_id?: string | null
          created_at?: string
          deleted?: boolean
          id?: string
          is_active?: boolean
          name: string
          selling_type?: string
          sku: string
          sub_unit_id?: string | null
          supplier_id?: string | null
          unit_buying_price?: number
          unit_selling_price?: number
          units_per_whole?: number
          updated_at?: string
          whole_buying_price?: number
          whole_selling_price?: number
          whole_unit_id?: string | null
        }
        Update: {
          barcode?: string | null
          category_id?: string | null
          created_at?: string
          deleted?: boolean
          id?: string
          is_active?: boolean
          name?: string
          selling_type?: string
          sku?: string
          sub_unit_id?: string | null
          supplier_id?: string | null
          unit_buying_price?: number
          unit_selling_price?: number
          units_per_whole?: number
          updated_at?: string
          whole_buying_price?: number
          whole_selling_price?: number
          whole_unit_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "items_sub_unit_id_fkey"
            columns: ["sub_unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "items_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "items_whole_unit_id_fkey"
            columns: ["whole_unit_id"]
            isOneToOne: false
            referencedRelation: "units"
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
      people: {
        Row: {
          address1: string
          address2: string
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
          state: string
          updated_at: string
          zip: string
        }
        Insert: {
          address1: string
          address2: string
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
          state: string
          updated_at?: string
          zip: string
        }
        Update: {
          address1?: string
          address2?: string
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
          state?: string
          updated_at?: string
          zip?: string
        }
        Relationships: []
      }
      suppliers: {
        Row: {
          account_number: string | null
          agency_name: string
          company_name: string
          created_at: string
          deleted: boolean
          person_id: string
          updated_at: string
        }
        Insert: {
          account_number?: string | null
          agency_name: string
          company_name: string
          created_at?: string
          deleted?: boolean
          person_id: string
          updated_at?: string
        }
        Update: {
          account_number?: string | null
          agency_name?: string
          company_name?: string
          created_at?: string
          deleted?: boolean
          person_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "suppliers_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: true
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
        ]
      }
      units: {
        Row: {
          created_at: string
          deleted: boolean
          id: string
          name: string
          symbol: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted?: boolean
          id?: string
          name: string
          symbol?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted?: boolean
          id?: string
          name?: string
          symbol?: string | null
          updated_at?: string
        }
        Relationships: []
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
