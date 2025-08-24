export const getSubreddit = async (formData: FormData) => {
  const name = formData.get("name");
  const response = await fetch(`https://www.reddit.com/r/${name}.json`);

  if (!response.ok) {
    throw new Error("Failed to fetch subreddit data");
  }

  const data = await response.json();

  return data;
};
