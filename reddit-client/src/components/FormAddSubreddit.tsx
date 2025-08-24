import { useState, type FormEvent } from "react";
import { addSubredditAction } from "../services/action.service";
import { useSubredditStore } from "../store/subreddit";

type FormActionProps = {
  onClose: () => void;
};

const FormAddSubreddit = ({ onClose }: FormActionProps) => {
  const { addSubreddit } = useSubredditStore();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    setIsLoading(true);
    setError("");

    const subreddit = await addSubredditAction(formData);
    if (subreddit?.success && subreddit.data) {
      addSubreddit(subreddit.data);
      onClose();
    } else {
      setError(subreddit?.message || "");
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[400px]">
      <label htmlFor="name" className="text-left">
        Enter the name of subreddit
      </label>
      <input
        id="name"
        name="name"
        type="text"
        className="border rounded-lg px-4 py-2"
      />
      {error && <p className="text-red-700 text-center">{error}</p>}
      <button
        type="submit"
        className="bg-gray-800 text-white rounded-lg px-4 py-2 disabled:opacity-70"
        disabled={isLoading}
      >
        Add Subreddit
      </button>
    </form>
  );
};

export default FormAddSubreddit;
