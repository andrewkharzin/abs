// useFollowProfile.ts

import { useState } from 'react';
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const useFollowProfile = () => {
  // Function to follow a profile
  const followProfile = async (followerId: string, followedId: string) => {
    try {
      const { error } = await supabase
        .from('followers')
        .insert({ follower_id: followerId, followed_id: followedId });
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error following profile:', error.message);
      throw error;
    }
  };

  // Function to unfollow a profile
  const unfollowProfile = async (followerId: string, followedId: string) => {
    try {
      const { error } = await supabase
        .from('followers')
        .delete()
        .eq('follower_id', followerId)
        .eq('followed_id', followedId);
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error unfollowing profile:', error.message);
      throw error;
    }
  };

  // Function to check if a user is following a profile
  const isFollowingProfile = async (followerId: string, followedId: string) => {
    try {
      const { data, error } = await supabase
        .from('followers')
        .select()
        .eq('follower_id', followerId)
        .eq('followed_id', followedId);
      if (error) {
        throw error;
      }
      return data.length > 0;
    } catch (error) {
      console.error('Error checking follow status:', error.message);
      throw error;
    }
  };

  return {
    followProfile,
    unfollowProfile,
    isFollowingProfile,
  };
};
