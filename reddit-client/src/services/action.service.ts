import { getSubreddit } from "../api/subreddit.api";

export const addSubredditAction = async (formData: FormData) => {
  const name = formData.get("name")?.toString() || "";
  try {
    const data = await getSubreddit(formData);

    return {
      success: true,
      data: {
        posts:
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.data.children.map((child: any) => ({
            id: child.data.id,
            title: child.data.title,
            subreddit: child.data.subreddit,
            url: child.data.url,
            ups: child.data.ups,
          })) || [],
        name: name,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: `Failed to fetch subreddit data`,
    };
  }
};
