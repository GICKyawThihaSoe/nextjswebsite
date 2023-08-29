import Layout from "@/compas/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';

const DynamicPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const fetchDetailBlog = async () => {
    const response = await fetch(`http://localhost:8080/blogs/blog/${id}`);
    const data = await response.json();
    return data; // Return both values in an object
  };
  const { data, error, isLoading } = useQuery("detailBlogs", fetchDetailBlog);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen">
      <Layout>
        <div className="container mx-auto px-5">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
            <Link href="/blogs" className="hover:underline">
              Blog
            </Link>
          </h2>
          <article className="mb-32">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
              {data.title}
            </h1>
            <div className="hidden md:block md:mb-12">
              <div className="flex items-center">
                <img
                  src="/assets/jj.jpeg"
                  className="w-12 h-12 rounded-full mr-4"
                  alt="JJ Kasper"
                ></img>
                <div className="text-xl font-bold">JJ Kasper</div>
              </div>
            </div>
            <div className="mb-8 md:mb-16">
              <div className="sm:mx-0">
                <div className="relative aspect-w-2 aspect-h-1">
                  <div className="pb-[50%]"></div>
                  <img
                    src="/assets/cover.webp"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="block md:hidden mb-6">
                <div className="flex items-center">
                  <img
                    src="/assets/jj.jpeg"
                    className="w-12 h-12 rounded-full mr-4"
                    alt="JJ Kasper"
                  ></img>
                  <div className="text-xl font-bold">JJ Kasper</div>
                </div>
              </div>
              <div className="mb-6 text-lg">
                <time dateTime={data.time}>
                  {new Date(data.time).toDateString()}
                </time>
              </div>
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="text-xl leading-9">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{data.description}</ReactMarkdown>
              </div>
            </div>
          </article>
        </div>
      </Layout>
    </div>
  );
};

export default DynamicPost;
