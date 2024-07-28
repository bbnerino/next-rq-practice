// pages/index.js
import { useQuery, dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchPosts } from "@/libs/api";
import Link from "next/link";

const PostsPage = ({ posts, dehydratedState, message }) => {
  // useQuery 훅을 사용하여 "posts" 쿼리 키를 가진 데이터를 가져옴
  // const { data: posts, isLoading } = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: fetchPosts,
  // });

  // 로딩 상태 처리
  // if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{message}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {/* 각 게시물에 대한 링크 생성 */}
            <Link href={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getServerSideProps() {
  // React Query 클라이언트 생성
  const queryClient = new QueryClient();
  // 서버에서 미리 쿼리 실행하여 데이터 패칭
  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  return {
    props: {
      // 클라이언트에 상태 전달
      dehydratedState: dehydrate(queryClient),
      posts: queryClient.getQueryData(["posts"]),
      message: "Hello World",
    },
  };
}

export default PostsPage;
