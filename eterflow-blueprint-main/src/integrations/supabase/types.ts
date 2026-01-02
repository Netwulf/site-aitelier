export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          cargo: string | null
          created_at: string | null
          desafio_principal: string | null
          email: string
          faturamento: string | null
          id: string
          instagram: string | null
          investimento_disponivel: string | null
          momento_negocio: string | null
          motivacao: string | null
          negocio: string | null
          nome: string
          status: string | null
          submitted_at: string | null
          whatsapp: string
        }
        Insert: {
          cargo?: string | null
          created_at?: string | null
          desafio_principal?: string | null
          email: string
          faturamento?: string | null
          id?: string
          instagram?: string | null
          investimento_disponivel?: string | null
          momento_negocio?: string | null
          motivacao?: string | null
          negocio?: string | null
          nome: string
          status?: string | null
          submitted_at?: string | null
          whatsapp: string
        }
        Update: {
          cargo?: string | null
          created_at?: string | null
          desafio_principal?: string | null
          email?: string
          faturamento?: string | null
          id?: string
          instagram?: string | null
          investimento_disponivel?: string | null
          momento_negocio?: string | null
          motivacao?: string | null
          negocio?: string | null
          nome?: string
          status?: string | null
          submitted_at?: string | null
          whatsapp?: string
        }
        Relationships: []
      }
      heatmap_data: {
        Row: {
          avg_time_spent_seconds: number | null
          created_at: string | null
          date: string | null
          element_selector: string | null
          id: string
          interaction_count: number | null
          page_path: string
          x_position: number
          y_position: number
        }
        Insert: {
          avg_time_spent_seconds?: number | null
          created_at?: string | null
          date?: string | null
          element_selector?: string | null
          id?: string
          interaction_count?: number | null
          page_path: string
          x_position: number
          y_position: number
        }
        Update: {
          avg_time_spent_seconds?: number | null
          created_at?: string | null
          date?: string | null
          element_selector?: string | null
          id?: string
          interaction_count?: number | null
          page_path?: string
          x_position?: number
          y_position?: number
        }
        Relationships: []
      }
      instagram_diagnoses: {
        Row: {
          created_at: string | null
          followers_count: number | null
          full_diagnosis: Json | null
          id: string
          initial_observation: string | null
          instagram_username: string
          posts_data: Json | null
          processing_status: string | null
          profile_bio: string | null
          profile_name: string | null
          profile_picture: string | null
          reels_analysis: Json | null
          reels_data: Json | null
        }
        Insert: {
          created_at?: string | null
          followers_count?: number | null
          full_diagnosis?: Json | null
          id?: string
          initial_observation?: string | null
          instagram_username: string
          posts_data?: Json | null
          processing_status?: string | null
          profile_bio?: string | null
          profile_name?: string | null
          profile_picture?: string | null
          reels_analysis?: Json | null
          reels_data?: Json | null
        }
        Update: {
          created_at?: string | null
          followers_count?: number | null
          full_diagnosis?: Json | null
          id?: string
          initial_observation?: string | null
          instagram_username?: string
          posts_data?: Json | null
          processing_status?: string | null
          profile_bio?: string | null
          profile_name?: string | null
          profile_picture?: string | null
          reels_analysis?: Json | null
          reels_data?: Json | null
        }
        Relationships: []
      }
      page_views: {
        Row: {
          id: string
          page_path: string
          page_title: string | null
          scroll_depth_percentage: number | null
          session_id: string
          time_on_page_seconds: number | null
          viewed_at: string | null
        }
        Insert: {
          id?: string
          page_path: string
          page_title?: string | null
          scroll_depth_percentage?: number | null
          session_id: string
          time_on_page_seconds?: number | null
          viewed_at?: string | null
        }
        Update: {
          id?: string
          page_path?: string
          page_title?: string | null
          scroll_depth_percentage?: number | null
          session_id?: string
          time_on_page_seconds?: number | null
          viewed_at?: string | null
        }
        Relationships: []
      }
      user_interactions: {
        Row: {
          element_class: string | null
          element_id: string | null
          element_text: string | null
          id: string
          interaction_type: string
          page_path: string
          session_id: string
          timestamp: string | null
          x_position: number | null
          y_position: number | null
        }
        Insert: {
          element_class?: string | null
          element_id?: string | null
          element_text?: string | null
          id?: string
          interaction_type: string
          page_path: string
          session_id: string
          timestamp?: string | null
          x_position?: number | null
          y_position?: number | null
        }
        Update: {
          element_class?: string | null
          element_id?: string | null
          element_text?: string | null
          id?: string
          interaction_type?: string
          page_path?: string
          session_id?: string
          timestamp?: string | null
          x_position?: number | null
          y_position?: number | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          created_at: string | null
          duration_seconds: number | null
          entry_time: string | null
          exit_time: string | null
          id: string
          ip_address: string | null
          landing_page: string | null
          page_views: number | null
          referrer: string | null
          session_id: string
          user_agent: string | null
          visitor_id: string | null
        }
        Insert: {
          created_at?: string | null
          duration_seconds?: number | null
          entry_time?: string | null
          exit_time?: string | null
          id?: string
          ip_address?: string | null
          landing_page?: string | null
          page_views?: number | null
          referrer?: string | null
          session_id: string
          user_agent?: string | null
          visitor_id?: string | null
        }
        Update: {
          created_at?: string | null
          duration_seconds?: number | null
          entry_time?: string | null
          exit_time?: string | null
          id?: string
          ip_address?: string | null
          landing_page?: string | null
          page_views?: number | null
          referrer?: string | null
          session_id?: string
          user_agent?: string | null
          visitor_id?: string | null
        }
        Relationships: []
      }
      workshop_leads: {
        Row: {
          created_at: string
          email: string
          id: string
          nome: string
          opcao_escolhida: string | null
          whatsapp: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          nome: string
          opcao_escolhida?: string | null
          whatsapp: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          nome?: string
          opcao_escolhida?: string | null
          whatsapp?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: { user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
