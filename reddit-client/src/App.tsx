import { useState } from "react";
import "./App.css";
import FormAddSubreddit from "./components/FormAddSubreddit";
import CardSubreddit from "./components/CardSubreddit";
import Modal from "./components/ui/Modal";
import { useSubredditStore } from "./store/subreddit";

function App() {
  const { subreddits } = useSubredditStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <main className="flex flex-col gap-10">
      <button
        onClick={handleOpen}
        className="bg-gray-800 text-white w-12 h-12 flex border-2 rounded-full items-center justify-center text-2xl hover:opacity-90"
      >
        +
      </button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <FormAddSubreddit onClose={handleClose} />
      </Modal>

      <div className="flex gap-10">
        {subreddits.map((subreddit, index) => (
          <CardSubreddit key={index} subreddit={subreddit} />
        ))}
      </div>
    </main>
  );
}

export default App;
