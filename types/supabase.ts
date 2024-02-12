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
      awb: {
        Row: {
          awb_id: number
          awb_number: string
          charge_id: number | null
          consignee_declaration_id: number | null
          consignee_id: number | null
          date_of_issue: string | null
          flight_id: number | null
          handling_id: number | null
          shipper_declaration_id: number | null
          shipper_id: number | null
        }
        Insert: {
          awb_id?: number
          awb_number: string
          charge_id?: number | null
          consignee_declaration_id?: number | null
          consignee_id?: number | null
          date_of_issue?: string | null
          flight_id?: number | null
          handling_id?: number | null
          shipper_declaration_id?: number | null
          shipper_id?: number | null
        }
        Update: {
          awb_id?: number
          awb_number?: string
          charge_id?: number | null
          consignee_declaration_id?: number | null
          consignee_id?: number | null
          date_of_issue?: string | null
          flight_id?: number | null
          handling_id?: number | null
          shipper_declaration_id?: number | null
          shipper_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "awb_charge_id_fkey"
            columns: ["charge_id"]
            isOneToOne: false
            referencedRelation: "charges"
            referencedColumns: ["charge_id"]
          },
          {
            foreignKeyName: "awb_consignee_declaration_id_fkey"
            columns: ["consignee_declaration_id"]
            isOneToOne: false
            referencedRelation: "consigneedeclaration"
            referencedColumns: ["declaration_id"]
          },
          {
            foreignKeyName: "awb_consignee_id_fkey"
            columns: ["consignee_id"]
            isOneToOne: false
            referencedRelation: "consignee"
            referencedColumns: ["consignee_id"]
          },
          {
            foreignKeyName: "awb_flight_id_fkey"
            columns: ["flight_id"]
            isOneToOne: false
            referencedRelation: "flight"
            referencedColumns: ["flight_id"]
          },
          {
            foreignKeyName: "awb_handling_id_fkey"
            columns: ["handling_id"]
            isOneToOne: false
            referencedRelation: "handlinginformation"
            referencedColumns: ["handling_id"]
          },
          {
            foreignKeyName: "awb_shipper_declaration_id_fkey"
            columns: ["shipper_declaration_id"]
            isOneToOne: false
            referencedRelation: "shipperdeclaration"
            referencedColumns: ["declaration_id"]
          },
          {
            foreignKeyName: "awb_shipper_id_fkey"
            columns: ["shipper_id"]
            isOneToOne: false
            referencedRelation: "shipper"
            referencedColumns: ["shipper_id"]
          }
        ]
      }
      charges: {
        Row: {
          charge_id: number
          freight_charges: number | null
          other_charges: number | null
          total_charges: number | null
        }
        Insert: {
          charge_id?: number
          freight_charges?: number | null
          other_charges?: number | null
          total_charges?: number | null
        }
        Update: {
          charge_id?: number
          freight_charges?: number | null
          other_charges?: number | null
          total_charges?: number | null
        }
        Relationships: []
      }
      consignee: {
        Row: {
          address: string
          consignee_id: number
          contact_info: string | null
          name: string
        }
        Insert: {
          address: string
          consignee_id?: number
          contact_info?: string | null
          name: string
        }
        Update: {
          address?: string
          consignee_id?: number
          contact_info?: string | null
          name?: string
        }
        Relationships: []
      }
      consigneedeclaration: {
        Row: {
          consignee_id: number | null
          date: string | null
          declaration_id: number
          declaration_text: string | null
          signature: string | null
        }
        Insert: {
          consignee_id?: number | null
          date?: string | null
          declaration_id?: number
          declaration_text?: string | null
          signature?: string | null
        }
        Update: {
          consignee_id?: number | null
          date?: string | null
          declaration_id?: number
          declaration_text?: string | null
          signature?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consigneedeclaration_consignee_id_fkey"
            columns: ["consignee_id"]
            isOneToOne: false
            referencedRelation: "consignee"
            referencedColumns: ["consignee_id"]
          }
        ]
      }
      flight: {
        Row: {
          departure_airport: string
          destination_airport: string
          flight_id: number
          flight_number: string
          scheduled_arrival: string | null
          scheduled_departure: string | null
        }
        Insert: {
          departure_airport: string
          destination_airport: string
          flight_id?: number
          flight_number: string
          scheduled_arrival?: string | null
          scheduled_departure?: string | null
        }
        Update: {
          departure_airport?: string
          destination_airport?: string
          flight_id?: number
          flight_number?: string
          scheduled_arrival?: string | null
          scheduled_departure?: string | null
        }
        Relationships: []
      }
      handlinginformation: {
        Row: {
          dimensions: string | null
          handling_id: number
          nature_of_goods: string | null
          packaging: string | null
          quantity: number | null
          special_handling: string | null
          weight: number | null
        }
        Insert: {
          dimensions?: string | null
          handling_id?: number
          nature_of_goods?: string | null
          packaging?: string | null
          quantity?: number | null
          special_handling?: string | null
          weight?: number | null
        }
        Update: {
          dimensions?: string | null
          handling_id?: number
          nature_of_goods?: string | null
          packaging?: string | null
          quantity?: number | null
          special_handling?: string | null
          weight?: number | null
        }
        Relationships: []
      }
      shipper: {
        Row: {
          address: string
          agent_city: string | null
          agent_country: string | null
          agent_iata_code: string | null
          agent_name: string | null
          contact_info: string | null
          name: string
          shipper_id: number
        }
        Insert: {
          address: string
          agent_city?: string | null
          agent_country?: string | null
          agent_iata_code?: string | null
          agent_name?: string | null
          contact_info?: string | null
          name: string
          shipper_id?: number
        }
        Update: {
          address?: string
          agent_city?: string | null
          agent_country?: string | null
          agent_iata_code?: string | null
          agent_name?: string | null
          contact_info?: string | null
          name?: string
          shipper_id?: number
        }
        Relationships: []
      }
      shipperdeclaration: {
        Row: {
          date: string | null
          declaration_id: number
          declaration_text: string | null
          shipper_id: number | null
          signature: string | null
        }
        Insert: {
          date?: string | null
          declaration_id?: number
          declaration_text?: string | null
          shipper_id?: number | null
          signature?: string | null
        }
        Update: {
          date?: string | null
          declaration_id?: number
          declaration_text?: string | null
          shipper_id?: number | null
          signature?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shipperdeclaration_shipper_id_fkey"
            columns: ["shipper_id"]
            isOneToOne: false
            referencedRelation: "shipper"
            referencedColumns: ["shipper_id"]
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
