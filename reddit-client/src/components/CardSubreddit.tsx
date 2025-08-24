import { useState } from "react";
import { useSubredditStore, type SubredditState } from "../store/subreddit";
import { addSubredditAction } from "../services/action.service";

type CardSubredditProps = {
  subreddit: SubredditState;
};

const CardSubreddit = ({ subreddit }: CardSubredditProps) => {
  const { removeSubreddit, refreshSubreddit } = useSubredditStore();
  const [isLoading, setIsLoading] = useState(false);
  const handleRemove = () => {
    removeSubreddit(subreddit);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.set("name", subreddit.name);
    const newData = await addSubredditAction(formData);
    if (newData.success && newData.data) {
      refreshSubreddit(subreddit, newData.data);
    }
    setIsLoading(false);
  };

  return (
    <div className="border bg-white rounded-xl flex flex-col flex-1 min-w-[400px]">
      <div className="flex gap-10 justify-between items-center p-5">
        <p>/r/{subreddit.name}</p>
        <div className="flex gap-2">
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="bg-gray-800 text-white py-1 px-2 rounded disabled:opacity-50"
          >
            Refresh
          </button>
          <button
            onClick={handleRemove}
            className="bg-red-800 text-white py-1 px-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
      <div
        className={`flex flex-col ${
          isLoading ? "appearance-none blur-xs" : ""
        }`}
      >
        {subreddit.posts.map((post, index) => (
          <div key={index} className="flex gap-5 p-5 border-b last:border-b-0">
            <div>{post.ups}</div>
            <div>{post.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSubreddit;
