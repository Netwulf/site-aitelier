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
    const { username } = await req.json();
    
    if (!username) {
      throw new Error("Username é obrigatório");
    }

    // Clean username (remove @ if present)
    const cleanUsername = username.replace("@", "").trim();
    
    console.log(`Scraping Instagram profile: ${cleanUsername}`);

    const APIFY_API_KEY = Deno.env.get("APIFY_API_KEY");
    if (!APIFY_API_KEY) {
      throw new Error("APIFY_API_KEY não configurada");
    }

    // Call Apify Instagram Profile Scraper (melhor para dados de perfil)
    const apifyInput = {
      usernames: [cleanUsername],
    };

    console.log("Calling Apify Instagram Profile Scraper...");
    
    const apifyResponse = await fetch(
      "https://api.apify.com/v2/acts/apify~instagram-profile-scraper/run-sync-get-dataset-items",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${APIFY_API_KEY}`,
        },
        body: JSON.stringify(apifyInput),
      }
    );

    if (!apifyResponse.ok) {
      const errorText = await apifyResponse.text();
      console.error("Apify API error:", apifyResponse.status, errorText);
      throw new Error(`Erro na API do Apify: ${apifyResponse.status}`);
    }

    const apifyData = await apifyResponse.json();
    console.log(`Received ${apifyData.length} profiles from Apify`);
    
    // Log completo para debug
    if (apifyData.length > 0) {
      console.log("Apify raw profile data:", JSON.stringify(apifyData[0], null, 2));
    }

    if (!apifyData || apifyData.length === 0) {
      throw new Error("Perfil não encontrado ou privado");
    }

    // Extract profile data from response
    const profile = apifyData[0];
    
    // Verificar se perfil é privado
    if (profile.private) {
      throw new Error("Este perfil é privado e não pode ser analisado");
    }
    
    // Mapear dados do perfil corretamente
    const profileData = {
      username: cleanUsername,
      name: profile.fullName || profile.username || cleanUsername,
      bio: profile.biography || "",
      profilePicture: profile.profilePicUrlHD || profile.profilePicUrl || "",
      followersCount: profile.followersCount || 0,
      followingCount: profile.followsCount || 0,
      postsCount: profile.postsCount || 0,
      isVerified: profile.verified || false,
    };

    console.log("Mapped profile data:", JSON.stringify(profileData, null, 2));

    // Extract posts from latestPosts
    const latestPosts = profile.latestPosts || [];
    const posts: any[] = [];
    const reels: any[] = [];

    latestPosts.forEach((item: any) => {
      const postData = {
        id: item.id || item.shortCode,
        type: item.type || "Image",
        caption: item.caption || "",
        likesCount: item.likesCount || 0,
        commentsCount: item.commentsCount || 0,
        timestamp: item.timestamp,
        displayUrl: item.displayUrl || item.url || "",
        videoUrl: item.videoUrl || null,
        videoViewCount: item.videoViewCount || 0,
        hashtags: item.hashtags || [],
        mentions: item.mentions || [],
      };

      // Check if it's a reel (video or clips)
      if (item.type === "Video" || item.productType === "clips" || item.videoUrl) {
        reels.push(postData);
      } else {
        posts.push(postData);
      }
    });

    console.log(`Processed: ${posts.length} posts, ${reels.length} reels`);

    // Save to database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: diagnosis, error: insertError } = await supabase
      .from("instagram_diagnoses")
      .insert({
        instagram_username: cleanUsername,
        profile_name: profileData.name,
        profile_bio: profileData.bio,
        profile_picture: profileData.profilePicture,
        followers_count: profileData.followersCount,
        posts_data: posts,
        reels_data: reels,
        processing_status: "scraped",
      })
      .select()
      .single();

    if (insertError) {
      console.error("Database insert error:", insertError);
      throw new Error("Erro ao salvar dados do perfil");
    }

    console.log(`Diagnosis created with ID: ${diagnosis.id}`);

    return new Response(
      JSON.stringify({
        success: true,
        diagnosisId: diagnosis.id,
        profile: profileData,
        postsCount: posts.length,
        reelsCount: reels.length,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in scrape-instagram:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : "Erro desconhecido" 
      }),
      { 
        status: 400, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
