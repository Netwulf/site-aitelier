import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

// Generate or get persistent visitor ID
const getVisitorId = (): string => {
  const key = "aitelier_visitor_id";
  let visitorId = localStorage.getItem(key);

  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    localStorage.setItem(key, visitorId);
  }

  return visitorId;
};

// Local storage fallback for likes
const getLocalLikes = (): Record<string, { count: number; userLiked: boolean }> => {
  try {
    const stored = localStorage.getItem("aitelier_artwork_likes");
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const setLocalLikes = (likes: Record<string, { count: number; userLiked: boolean }>) => {
  localStorage.setItem("aitelier_artwork_likes", JSON.stringify(likes));
};

interface UseLikesReturn {
  likes: number;
  userLiked: boolean;
  toggleLike: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useLikes = (artworkId: string): UseLikesReturn => {
  const [likes, setLikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useLocalStorage, setUseLocalStorage] = useState(false);

  const visitorId = getVisitorId();

  // Fetch likes from Supabase or localStorage
  const fetchLikes = useCallback(async () => {
    if (!artworkId) return;

    try {
      // Try Supabase first
      const { data: likesData, error: likesError } = await supabase
        .from("artwork_likes")
        .select("*")
        .eq("artwork_id", artworkId);

      if (likesError) {
        throw likesError;
      }

      const totalLikes = likesData?.length || 0;
      const hasUserLiked = likesData?.some((like) => like.visitor_id === visitorId) || false;

      setLikes(totalLikes);
      setUserLiked(hasUserLiked);
      setUseLocalStorage(false);
    } catch (err) {
      // Fallback to localStorage
      console.warn("Supabase not available, using localStorage:", err);
      setUseLocalStorage(true);

      const localLikes = getLocalLikes();
      const artworkLikes = localLikes[artworkId] || { count: 0, userLiked: false };
      setLikes(artworkLikes.count);
      setUserLiked(artworkLikes.userLiked);
    }
  }, [artworkId, visitorId]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  const toggleLike = useCallback(async () => {
    if (!artworkId || isLoading) return;

    setIsLoading(true);
    setError(null);

    const newUserLiked = !userLiked;
    const newLikes = newUserLiked ? likes + 1 : likes - 1;

    // Optimistic update
    setUserLiked(newUserLiked);
    setLikes(newLikes);

    try {
      if (useLocalStorage) {
        // LocalStorage fallback
        const localLikes = getLocalLikes();
        localLikes[artworkId] = { count: newLikes, userLiked: newUserLiked };
        setLocalLikes(localLikes);
      } else {
        // Supabase
        if (newUserLiked) {
          // Add like
          const { error: insertError } = await supabase
            .from("artwork_likes")
            .insert({
              artwork_id: artworkId,
              visitor_id: visitorId,
            });

          if (insertError) throw insertError;
        } else {
          // Remove like
          const { error: deleteError } = await supabase
            .from("artwork_likes")
            .delete()
            .eq("artwork_id", artworkId)
            .eq("visitor_id", visitorId);

          if (deleteError) throw deleteError;
        }
      }
    } catch (err) {
      // Revert optimistic update
      setUserLiked(userLiked);
      setLikes(likes);
      setError("Failed to update like");
      console.error("Error toggling like:", err);

      // Try localStorage as fallback
      if (!useLocalStorage) {
        setUseLocalStorage(true);
        const localLikes = getLocalLikes();
        localLikes[artworkId] = { count: newLikes, userLiked: newUserLiked };
        setLocalLikes(localLikes);
        setUserLiked(newUserLiked);
        setLikes(newLikes);
      }
    } finally {
      setIsLoading(false);
    }
  }, [artworkId, userLiked, likes, isLoading, visitorId, useLocalStorage]);

  return {
    likes,
    userLiked,
    toggleLike,
    isLoading,
    error,
  };
};

// Hook to get all likes counts for multiple artworks
export const useAllLikes = (artworkIds: string[]): Record<string, number> => {
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchAllLikes = async () => {
      if (!artworkIds.length) return;

      try {
        const { data, error } = await supabase
          .from("artwork_likes")
          .select("artwork_id")
          .in("artwork_id", artworkIds);

        if (error) throw error;

        // Count likes per artwork
        const counts: Record<string, number> = {};
        data?.forEach((like) => {
          counts[like.artwork_id] = (counts[like.artwork_id] || 0) + 1;
        });

        setLikesMap(counts);
      } catch (err) {
        // Fallback to localStorage
        const localLikes = getLocalLikes();
        const counts: Record<string, number> = {};
        artworkIds.forEach((id) => {
          counts[id] = localLikes[id]?.count || 0;
        });
        setLikesMap(counts);
      }
    };

    fetchAllLikes();
  }, [artworkIds.join(",")]);

  return likesMap;
};
