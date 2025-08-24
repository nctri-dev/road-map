import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Post {
  id: string;
  title: string;
  subreddit: string;
  url: string;
  ups: string;
}

export interface SubredditState {
  name: string;
  posts: Post[];
}

interface SubredditStoreState {
  subreddits: SubredditState[];
  addSubreddit: (newSubreddit: SubredditState) => void;
  removeSubreddit: (subreddit: SubredditState) => void;
  refreshSubreddit: (
    oldSubreddit: SubredditState,
    newSubreddit: SubredditState
  ) => void;
}

export const useSubredditStore = create<SubredditStoreState>()(
  persist(
    (set) => ({
      subreddits: [],
      addSubreddit: (newSubreddit) =>
        set((state) => ({ subreddits: [...state.subreddits, newSubreddit] })),
      removeSubreddit: (subreddit) =>
        set((state) => ({
          subreddits: state.subreddits.filter((sub) => sub !== subreddit),
        })),
      refreshSubreddit: (oldSubreddit, newSubreddit) =>
        set((state) => {
          return {
            subreddits: state.subreddits.map((item) =>
              oldSubreddit === item ? newSubreddit : item
            ),
          };
        }),
    }),
    { name: "subreddit" }
  )
);
