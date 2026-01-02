import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { diagnosisId, analysisType } = await req.json();

    if (!diagnosisId) {
      throw new Error("diagnosisId é obrigatório");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get diagnosis data
    const { data: diagnosis, error: fetchError } = await supabase
      .from("instagram_diagnoses")
      .select("*")
      .eq("id", diagnosisId)
      .single();

    if (fetchError || !diagnosis) {
      throw new Error("Diagnóstico não encontrado");
    }

    console.log(`Analyzing profile: ${diagnosis.instagram_username}`);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY não configurada");
    }

    // Prepare data for analysis
    const posts = diagnosis.posts_data || [];
    const reels = diagnosis.reels_data || [];

    // Sort posts and reels by engagement (likes + comments)
    const sortedPosts = [...posts].sort((a: any, b: any) => 
      ((b.likesCount || 0) + (b.commentsCount || 0)) - ((a.likesCount || 0) + (a.commentsCount || 0))
    );
    
    const sortedReels = [...reels].sort((a: any, b: any) => 
      (b.videoViewCount || 0) - (a.videoViewCount || 0)
    );

    // Get top 5 posts with images for visual analysis
    const topPosts = sortedPosts.slice(0, 5).map((p: any) => ({
      caption: p.caption?.substring(0, 300) || "",
      likes: p.likesCount,
      comments: p.commentsCount,
      hashtags: p.hashtags?.slice(0, 5) || [],
      imageUrl: p.displayUrl || p.images?.[0] || null,
    }));

    // Get top 5 reels with thumbnails for visual analysis
    const topReels = sortedReels.slice(0, 5).map((r: any) => ({
      caption: r.caption?.substring(0, 300) || "",
      views: r.videoViewCount,
      likes: r.likesCount,
      comments: r.commentsCount,
      hashtags: r.hashtags?.slice(0, 5) || [],
      thumbnailUrl: r.displayUrl || null,
    }));

    console.log(`Analyzing top ${topPosts.length} posts and ${topReels.length} reels`);
    console.log("Top reel thumbnails:", topReels.map(r => r.thumbnailUrl));

    let prompt = "";
    let systemPrompt = "";
    let userContent: any = "";

    if (analysisType === "initial") {
      // First analysis - just initial observation
      systemPrompt = `Você é um especialista em personal branding carismático e perspicaz. Seu tom é leve, inteligente e empático. Você vai fazer uma observação inicial sobre o perfil de alguém.`;
      
      prompt = `Baseado neste perfil do Instagram, gere UMA observação inicial curta (máximo 2 frases). Seja simpático, perspicaz e demonstre que você realmente "viu" algo interessante no perfil. Pode fazer uma piadinha leve ou uma pergunta curiosa.

DADOS DO PERFIL:
- Nome: ${diagnosis.profile_name}
- Bio: ${diagnosis.profile_bio || "Sem bio"}
- Seguidores: ${diagnosis.followers_count}
- Quantidade de posts analisados: ${posts.length}
- Quantidade de reels analisados: ${reels.length}

Responda APENAS com a observação, sem formatação especial, sem "aspas", sem markdown.`;

      userContent = prompt;

    } else {
      // Full analysis with visual content
      systemPrompt = `Você é um especialista em personal branding que analisa perfis do Instagram de forma profunda e perspicaz. Você identifica padrões de comunicação, posicionamento e potencial de marca pessoal. Você também analisa elementos visuais como fotos, thumbnails e estética geral.`;

      // Build image content for multimodal analysis
      const imageContents: any[] = [];
      
      // Add profile picture
      if (diagnosis.profile_picture) {
        imageContents.push({
          type: "image_url",
          image_url: { url: diagnosis.profile_picture }
        });
      }
      
      // Add top post images (limit to 3 to avoid too many)
      topPosts.slice(0, 3).forEach((p: any) => {
        if (p.imageUrl) {
          imageContents.push({
            type: "image_url", 
            image_url: { url: p.imageUrl }
          });
        }
      });
      
      // Add top reel thumbnails (limit to 3)
      topReels.slice(0, 3).forEach((r: any) => {
        if (r.thumbnailUrl) {
          imageContents.push({
            type: "image_url",
            image_url: { url: r.thumbnailUrl }
          });
        }
      });

      console.log(`Including ${imageContents.length} images for visual analysis`);

      const textPrompt = `Analise este perfil do Instagram e gere um diagnóstico completo de marca pessoal. Analise tanto os textos quanto as IMAGENS que estou enviando (foto de perfil, posts e thumbnails de reels).

DADOS DO PERFIL:
- Nome: ${diagnosis.profile_name}
- Bio: ${diagnosis.profile_bio || "Sem bio"}
- Seguidores: ${diagnosis.followers_count}

TOP 5 POSTS MAIS ENGAJADOS:
${topPosts.map((p: any, i: number) => `${i + 1}. "${p.caption}" (${p.likes} likes, ${p.comments} comments)`).join("\n")}

TOP 5 REELS MAIS VISUALIZADOS:
${topReels.length > 0 
  ? topReels.map((r: any, i: number) => `${i + 1}. "${r.caption}" (${r.views} views, ${r.likes} likes)`).join("\n")
  : "Nenhum reel encontrado"
}

HASHTAGS MAIS USADAS:
${[...new Set([...posts, ...reels].flatMap((p: any) => p.hashtags || []))].slice(0, 10).join(", ") || "Nenhuma"}

IMPORTANTE: Analise as imagens que estou enviando para identificar:
- Estética visual predominante (cores, estilo, ambientação)
- Expressões e postura da pessoa nos vídeos/fotos
- Qualidade e consistência visual
- Elementos visuais recorrentes

Use a função submit_diagnosis para retornar o diagnóstico.`;

      // Build the user message with text and images for multimodal
      if (imageContents.length > 0) {
        userContent = [
          { type: "text", text: textPrompt },
          ...imageContents
        ];
      } else {
        userContent = textPrompt;
      }

      prompt = textPrompt; // for logging
    }

    console.log(`Calling Lovable AI for ${analysisType} analysis...`);

    // Define tool for structured output on full analysis
    const diagnosisTool = {
      type: "function",
      function: {
        name: "submit_diagnosis",
        description: "Submete o diagnóstico completo de marca pessoal do perfil analisado",
        parameters: {
          type: "object",
          properties: {
            quem_voce_parece_ser: { 
              type: "string",
              description: "Descrição em 2-3 frases de quem a pessoa aparenta ser, baseado nos textos e imagens"
            },
            o_que_seu_brand_demonstra: { 
              type: "string",
              description: "O que a marca pessoal atual comunica visualmente e textualmente"
            },
            caracteristicas_fortes: { 
              type: "array", 
              items: { type: "string" },
              description: "Lista de 3-5 características fortes identificadas"
            },
            ponto_travado: { 
              type: "string",
              description: "Algo que parece estar segurando a evolução da marca pessoal"
            },
            potencial_identificado: { 
              type: "string",
              description: "Uma oportunidade clara de diferenciação ou crescimento"
            },
            insights_dos_reels: {
              type: "object",
              properties: {
                estilo_comunicacao: { type: "string" },
                presenca_visual: { type: "string" },
                temas_recorrentes: { type: "array", items: { type: "string" } }
              },
              required: ["estilo_comunicacao", "presenca_visual", "temas_recorrentes"]
            }
          },
          required: ["quem_voce_parece_ser", "o_que_seu_brand_demonstra", "caracteristicas_fortes", "ponto_travado", "potencial_identificado"],
          additionalProperties: false
        }
      }
    };

    const requestBody: any = {
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
    };

    // Use tool calling for full analysis to get structured output
    if (analysisType === "full") {
      requestBody.tools = [diagnosisTool];
      requestBody.tool_choice = { type: "function", function: { name: "submit_diagnosis" } };
    }

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI API error:", aiResponse.status, errorText);
      throw new Error(`Erro na API de IA: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const message = aiData.choices?.[0]?.message;
    const aiContent = message?.content;
    const toolCalls = message?.tool_calls;

    // For full analysis, we expect tool_calls; for initial, we expect content
    if (analysisType === "initial" && !aiContent) {
      throw new Error("Resposta vazia da IA");
    }
    
    if (analysisType === "full" && !toolCalls && !aiContent) {
      console.error("No tool_calls or content in response:", JSON.stringify(aiData));
      throw new Error("Resposta vazia da IA");
    }

    console.log("AI response received", analysisType === "full" ? "(tool calling)" : "(text)");

    if (analysisType === "initial") {
      // Update with initial observation
      await supabase
        .from("instagram_diagnoses")
        .update({
          initial_observation: aiContent.trim(),
          processing_status: "initial_done",
        })
        .eq("id", diagnosisId);

      return new Response(
        JSON.stringify({
          success: true,
          type: "initial",
          observation: aiContent.trim(),
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );

    } else {
      // Parse full diagnosis from tool call response
      let parsedDiagnosis;
      
      // Check if response used tool calling
      if (toolCalls?.[0]?.function?.arguments) {
        try {
          parsedDiagnosis = JSON.parse(toolCalls[0].function.arguments);
          console.log("Successfully parsed tool call response");
        } catch (toolParseError) {
          console.error("Failed to parse tool call arguments:", toolCalls[0].function.arguments);
        }
      }
      
      // Fallback: try to extract JSON from content if tool calling didn't work
      if (!parsedDiagnosis && aiContent) {
        try {
          // Try to find JSON object in the response
          const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            parsedDiagnosis = JSON.parse(jsonMatch[0]);
            console.log("Successfully extracted JSON from content");
          }
        } catch (contentParseError) {
          console.error("Failed to extract JSON from content:", aiContent);
        }
      }
      
      // Final fallback: create empty structure
      if (!parsedDiagnosis) {
        console.error("All parsing attempts failed, using fallback");
        parsedDiagnosis = {
          quem_voce_parece_ser: "Não foi possível processar o diagnóstico. Por favor, tente novamente.",
          o_que_seu_brand_demonstra: "",
          caracteristicas_fortes: [],
          ponto_travado: "",
          potencial_identificado: "",
          insights_dos_reels: null,
        };
      }

      await supabase
        .from("instagram_diagnoses")
        .update({
          full_diagnosis: parsedDiagnosis,
          processing_status: "completed",
        })
        .eq("id", diagnosisId);

      return new Response(
        JSON.stringify({
          success: true,
          type: "full",
          diagnosis: parsedDiagnosis,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

  } catch (error) {
    console.error("Error in analyze-profile:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
