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
      airports: {
        Row: {
          cntr_code: string | null
          iata: string | null
          id: number
          name: string | null
        }
        Insert: {
          cntr_code?: string | null
          iata?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          cntr_code?: string | null
          iata?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      awbs: {
        Row: {
          awb_number: string
          awb_prefix: string
          book_type: Database["public"]["Enums"]["book_type"] | null
          consignee_id: string | null
          date_created: string | null
          flight_id: string | null
          id: string
          shipment_id: string | null
          shipper_id: string | null
          status: string | null
        }
        Insert: {
          awb_number: string
          awb_prefix: string
          book_type?: Database["public"]["Enums"]["book_type"] | null
          consignee_id?: string | null
          date_created?: string | null
          flight_id?: string | null
          id?: string
          shipment_id?: string | null
          shipper_id?: string | null
          status?: string | null
        }
        Update: {
          awb_number?: string
          awb_prefix?: string
          book_type?: Database["public"]["Enums"]["book_type"] | null
          consignee_id?: string | null
          date_created?: string | null
          flight_id?: string | null
          id?: string
          shipment_id?: string | null
          shipper_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_awb_shipper_id_fkey"
            columns: ["shipper_id"]
            isOneToOne: false
            referencedRelation: "shippers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_awbs_consignee_id_fkey"
            columns: ["consignee_id"]
            isOneToOne: false
            referencedRelation: "consignees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_awbs_flight_id_fkey"
            columns: ["flight_id"]
            isOneToOne: false
            referencedRelation: "flights"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_awbs_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_awbs_status_fkey"
            columns: ["status"]
            isOneToOne: false
            referencedRelation: "bookstatus"
            referencedColumns: ["id"]
          }
        ]
      }
      bookstatus: {
        Row: {
          description: string | null
          id: string
          status: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          status?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          status?: string | null
        }
        Relationships: []
      }
      charges: {
        Row: {
          freight_charges: number | null
          id: string
          other_charges: number | null
          total_charges: number | null
        }
        Insert: {
          freight_charges?: number | null
          id?: string
          other_charges?: number | null
          total_charges?: number | null
        }
        Update: {
          freight_charges?: number | null
          id?: string
          other_charges?: number | null
          total_charges?: number | null
        }
        Relationships: []
      }
      consignee_declaration: {
        Row: {
          consignee_id: number | null
          date: string | null
          declaration_text: string | null
          id: string
          signature: string | null
        }
        Insert: {
          consignee_id?: number | null
          date?: string | null
          declaration_text?: string | null
          id?: string
          signature?: string | null
        }
        Update: {
          consignee_id?: number | null
          date?: string | null
          declaration_text?: string | null
          id?: string
          signature?: string | null
        }
        Relationships: []
      }
      consignees: {
        Row: {
          account_number: string | null
          address: string | null
          city: string | null
          fido: string
          id: string
          phone: string | null
          state: string | null
          zip: string | null
        }
        Insert: {
          account_number?: string | null
          address?: string | null
          city?: string | null
          fido?: string
          id?: string
          phone?: string | null
          state?: string | null
          zip?: string | null
        }
        Update: {
          account_number?: string | null
          address?: string | null
          city?: string | null
          fido?: string
          id?: string
          phone?: string | null
          state?: string | null
          zip?: string | null
        }
        Relationships: []
      }
      dgr_classes: {
        Row: {
          description: string | null
          emergency_actions: string | null
          examples: string | null
          iata_code: string | null
          icao_class: string | null
          id: string
          label: string | null
          label_link: string | null
          un_id: string | null
        }
        Insert: {
          description?: string | null
          emergency_actions?: string | null
          examples?: string | null
          iata_code?: string | null
          icao_class?: string | null
          id?: string
          label?: string | null
          label_link?: string | null
          un_id?: string | null
        }
        Update: {
          description?: string | null
          emergency_actions?: string | null
          examples?: string | null
          iata_code?: string | null
          icao_class?: string | null
          id?: string
          label?: string | null
          label_link?: string | null
          un_id?: string | null
        }
        Relationships: []
      }
      dgr_un_list: {
        Row: {
          class_devision: string | null
          dgr_class_link: string | null
          drg_id: string | null
          excepted_qnty: string | null
          id: string
          limited_quantities: string | null
          name_description: string | null
          special_provision: string | null
          sub_risk: string | null
          un_number: number | null
          un_packing_group: string | null
        }
        Insert: {
          class_devision?: string | null
          dgr_class_link?: string | null
          drg_id?: string | null
          excepted_qnty?: string | null
          id?: string
          limited_quantities?: string | null
          name_description?: string | null
          special_provision?: string | null
          sub_risk?: string | null
          un_number?: number | null
          un_packing_group?: string | null
        }
        Update: {
          class_devision?: string | null
          dgr_class_link?: string | null
          drg_id?: string | null
          excepted_qnty?: string | null
          id?: string
          limited_quantities?: string | null
          name_description?: string | null
          special_provision?: string | null
          sub_risk?: string | null
          un_number?: number | null
          un_packing_group?: string | null
        }
        Relationships: []
      }
      flights: {
        Row: {
          airport_transfer: string | null
          departure_airport: string
          destination_airport: string
          flight_number: string
          flight_number2: string | null
          id: string
          scheduled_arrival: string | null
          scheduled_departure: string | null
        }
        Insert: {
          airport_transfer?: string | null
          departure_airport: string
          destination_airport: string
          flight_number: string
          flight_number2?: string | null
          id?: string
          scheduled_arrival?: string | null
          scheduled_departure?: string | null
        }
        Update: {
          airport_transfer?: string | null
          departure_airport?: string
          destination_airport?: string
          flight_number?: string
          flight_number2?: string | null
          id?: string
          scheduled_arrival?: string | null
          scheduled_departure?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      shc: {
        Row: {
          code: string | null
          description: string | null
          id: string
        }
        Insert: {
          code?: string | null
          description?: string | null
          id?: string
        }
        Update: {
          code?: string | null
          description?: string | null
          id?: string
        }
        Relationships: []
      }
      shipments: {
        Row: {
          dgr_id: string | null
          gross_weight: string | null
          id: string
          number_of_pieces: number | null
          proper_name: string
          shc_id: string | null
          un_id: string | null
          volume: string | null
        }
        Insert: {
          dgr_id?: string | null
          gross_weight?: string | null
          id?: string
          number_of_pieces?: number | null
          proper_name?: string
          shc_id?: string | null
          un_id?: string | null
          volume?: string | null
        }
        Update: {
          dgr_id?: string | null
          gross_weight?: string | null
          id?: string
          number_of_pieces?: number | null
          proper_name?: string
          shc_id?: string | null
          un_id?: string | null
          volume?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_shipments_dgr_id_fkey"
            columns: ["dgr_id"]
            isOneToOne: false
            referencedRelation: "dgr_classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_shipments_shc_id_fkey"
            columns: ["shc_id"]
            isOneToOne: false
            referencedRelation: "shc"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_shipments_un_id_fkey"
            columns: ["un_id"]
            isOneToOne: false
            referencedRelation: "dgr_un_list"
            referencedColumns: ["id"]
          }
        ]
      }
      shipper_declaration: {
        Row: {
          date: string | null
          declaration_text: string | null
          id: string
          signature: string | null
        }
        Insert: {
          date?: string | null
          declaration_text?: string | null
          id: string
          signature?: string | null
        }
        Update: {
          date?: string | null
          declaration_text?: string | null
          id?: string
          signature?: string | null
        }
        Relationships: []
      }
      shippers: {
        Row: {
          account_number: string | null
          address: string | null
          city: string | null
          fido: string
          id: string
          phone: string | null
          state: string | null
          zip: string | null
        }
        Insert: {
          account_number?: string | null
          address?: string | null
          city?: string | null
          fido?: string
          id?: string
          phone?: string | null
          state?: string | null
          zip?: string | null
        }
        Update: {
          account_number?: string | null
          address?: string | null
          city?: string | null
          fido?: string
          id?: string
          phone?: string | null
          state?: string | null
          zip?: string | null
        }
        Relationships: []
      }
      todos: {
        Row: {
          category: Database["public"]["Enums"]["note_category"] | null
          content: string | null
          id: number
          inserted_at: string
          is_complete: boolean | null
          tags: string | null
          title: string | null
          user_id: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["note_category"] | null
          content?: string | null
          id?: number
          inserted_at?: string
          is_complete?: boolean | null
          tags?: string | null
          title?: string | null
          user_id: string
        }
        Update: {
          category?: Database["public"]["Enums"]["note_category"] | null
          content?: string | null
          id?: number
          inserted_at?: string
          is_complete?: boolean | null
          tags?: string | null
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "todos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
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
      "book status": "KK" | "CC" | "NR"
      book_type: "TRANSFER" | "ONE_LEG"
      note_category: "URGENT" | "COMMON" | "SHIFT" | "REMINDER"
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
