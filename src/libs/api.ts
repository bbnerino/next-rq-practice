import axios from "axios";

export const fetchPosts = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/photos?_limit=10"
  );
  return data;
};

export const fetchPost = async (id) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/photos/${id}`
  );
  return data;
};
