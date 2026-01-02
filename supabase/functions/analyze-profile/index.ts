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

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY não configurada");
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

    let prompt = "";

    if (analysisType === "initial") {
      prompt = `Você é um especialista em personal branding carismático e perspicaz. Seu tom é leve, inteligente e empático.

Baseado neste perfil do Instagram, gere UMA observação inicial curta (máximo 2 frases). Seja simpático, perspicaz e demonstre que você realmente "viu" algo interessante no perfil. Pode fazer uma piadinha leve ou uma pergunta curiosa.

DADOS DO PERFIL:
- Nome: ${diagnosis.profile_name}
- Bio: ${diagnosis.profile_bio || "Sem bio"}
- Seguidores: ${diagnosis.followers_count}
- Quantidade de posts analisados: ${posts.length}
- Quantidade de reels analisados: ${reels.length}

Responda APENAS com a observação, sem formatação especial, sem "aspas", sem markdown.`;

    } else {
      prompt = `Você é um especialista em personal branding que analisa perfis do Instagram de forma profunda e perspicaz. Você identifica padrões de comunicação, posicionamento e potencial de marca pessoal.

Analise este perfil do Instagram e gere um diagnóstico completo de marca pessoal.

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

IMPORTANTE: Responda APENAS com um JSON válido no seguinte formato (sem markdown, sem \`\`\`json):
{
  "quem_voce_parece_ser": "Descrição em 2-3 frases de quem a pessoa aparenta ser",
  "o_que_seu_brand_demonstra": "O que a marca pessoal atual comunica",
  "caracteristicas_fortes": ["característica 1", "característica 2", "característica 3"],
  "ponto_travado": "Algo que parece estar segurando a evolução da marca pessoal",
  "potencial_identificado": "Uma oportunidade clara de diferenciação ou crescimento",
  "insights_dos_reels": {
    "estilo_comunicacao": "estilo identificado",
    "presenca_visual": "como a pessoa se apresenta visualmente",
    "temas_recorrentes": ["tema 1", "tema 2"]
  }
}`;
    }

    console.log(`Calling Gemini API for ${analysisType} analysis...`);

    // Build request parts for Gemini
    const parts: any[] = [{ text: prompt }];

    // Add images for full analysis (Gemini supports inline images)
    if (analysisType === "full") {
      // Add profile picture
      if (diagnosis.profile_picture) {
        try {
          const imgResponse = await fetch(diagnosis.profile_picture);
          if (imgResponse.ok) {
            const imgBuffer = await imgResponse.arrayBuffer();
            const base64 = btoa(String.fromCharCode(...new Uint8Array(imgBuffer)));
            const mimeType = imgResponse.headers.get("content-type") || "image/jpeg";
            parts.push({
              inline_data: {
                mime_type: mimeType,
                data: base64
              }
            });
            console.log("Added profile picture to analysis");
          }
        } catch (e) {
          console.log("Could not fetch profile picture:", e);
        }
      }

      // Add top post images (limit to 2 to avoid quota issues)
      for (const post of topPosts.slice(0, 2)) {
        if (post.imageUrl) {
          try {
            const imgResponse = await fetch(post.imageUrl);
            if (imgResponse.ok) {
              const imgBuffer = await imgResponse.arrayBuffer();
              const base64 = btoa(String.fromCharCode(...new Uint8Array(imgBuffer)));
              const mimeType = imgResponse.headers.get("content-type") || "image/jpeg";
              parts.push({
                inline_data: {
                  mime_type: mimeType,
                  data: base64
                }
              });
              console.log("Added post image to analysis");
            }
          } catch (e) {
            console.log("Could not fetch post image:", e);
          }
        }
      }
    }

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: parts
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          }
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error("Gemini API error:", geminiResponse.status, errorText);
      throw new Error(`Erro na API do Gemini: ${geminiResponse.status}`);
    }

    const geminiData = await geminiResponse.json();
    const aiContent = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiContent) {
      console.error("Empty response from Gemini:", JSON.stringify(geminiData));
      throw new Error("Resposta vazia da IA");
    }

    console.log("Gemini response received");

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
      // Parse full diagnosis from JSON response
      let parsedDiagnosis;

      try {
        // Clean the response - remove markdown code blocks if present
        let cleanContent = aiContent.trim();
        if (cleanContent.startsWith("```json")) {
          cleanContent = cleanContent.replace(/^```json\s*/, "").replace(/\s*```$/, "");
        } else if (cleanContent.startsWith("```")) {
          cleanContent = cleanContent.replace(/^```\s*/, "").replace(/\s*```$/, "");
        }

        // Try to find JSON object in the response
        const jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedDiagnosis = JSON.parse(jsonMatch[0]);
          console.log("Successfully parsed JSON from Gemini response");
        }
      } catch (parseError) {
        console.error("Failed to parse JSON from Gemini:", parseError, aiContent);
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
