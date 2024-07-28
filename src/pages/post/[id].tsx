// pages/post/[id].js
import { useRouter } from "next/router";
import { useQuery, dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchPost } from "@/libs/api";

const PostDetailPage = ({ post }) => {
  const router = useRouter();

  return (
    <div>
      <h1>{post.title}</h1>
      <img src={post.url} alt={post.title} />
      <p>{post.title}</p>
      <button onClick={() => router.back()}>Back</button>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["post", params.id],
    queryFn: () => fetchPost(params.id),
  });

  return {
    props: {
      post: queryClient.getQueryData(["post", params.id]),
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default PostDetailPage;
