import Link from "next/link";
import { useQuery } from "react-query";
import Layout from "@/compas/Layout";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function home() {
  const fetchLatestBlog = async () => {
    const response = await fetch("http://localhost:8080/blogs/blog");
    const data = await response.json();
    const latestBlog = data[data.length - 1]; // Get the latest blog
    return { data, latestBlog }; // Return both values in an object
  };
  const { data, error, isLoading } = useQuery("latestBlog", fetchLatestBlog);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  function truncateText(text, maxLength) {
    const words = text.split(" ");

    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(" ") + "...";
    }

    return text;
  }

  const { data: blogs, latestBlog } = data;
  console.log("blogs", blogs);
  return (
    <>
      <div className="min-h-screen">
        <Layout>
          <div className="container mx-auto px-5">
            <section>
              <div className="mt-16 mb-16 md:mb-12">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
                  Blog.
                </h1>
              </div>
            </section>
            <section>
              <div className="mb-8 md:mb-16">
                <div className="sm:mx-0">
                  <Link href={`/blogs/${latestBlog._id}`}>
                    <div className="relative aspect-w-2 aspect-h-1">
                      <div className="pb-[50%]"></div>
                      <img
                        src="/assets/cover.webp"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
                <div>
                  <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
                    <Link
                      href={`/blogs/${latestBlog._id}`}
                      className="hover:underline"
                    >
                      {latestBlog.title}
                    </Link>
                  </h3>
                  <div className="mb-4 md:mb-0 text-lg">
                    <time dateTime={latestBlog.time}>
                      {new Date(latestBlog.time).toDateString()}
                    </time>
                  </div>
                </div>
                <div>
                  <p className="text-lg leading-relaxed mb-4">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                      {truncateText(latestBlog.description, 50)}
                    </ReactMarkdown>
                  </p>
                  <div className="flex items-center">
                    <img
                      src="/assets/jj.jpeg"
                      className="w-12 h-12 rounded-full mr-4"
                      alt="JJ Kasper"
                    ></img>
                    <div className="text-xl font-bold">JJ Kasper</div>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
                More Stories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
                {blogs.map((blog) => (
                  <div key={blog._id}>
                    <div className="mb-5">
                      <div className="sm:mx-0">
                        <Link href={`/blogs/${blog._id}`}>
                          <div className="relative overflow-hidden">
                            <div className="relative pb-[50%]">
                              <img
                                src="/assets/cover (1).webp"
                                className="absolute inset-0 w-full h-full object-cover"
                                alt={blog.title}
                              />
                            </div>
                          </div>
                        </Link>
                        <h3 className="text-3xl mt-5 mb-3 leading-snug">
                          <Link
                            className="hover:underline"
                            href={`/blogs/${blog._id}`}
                          >
                            {blog.title}
                          </Link>
                          <div className="text-lg mb-4">
                            <time dateTime={blog.time}>
                              {new Date(blog.time).toDateString()}
                            </time>
                          </div>
                          <p className="text-lg leading-relaxed mb-4">
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                              {truncateText(blog.description, 50)}
                            </ReactMarkdown>{" "}
                          </p>
                          <div className="flex items-center">
                            <img
                              src="/assets/tim.jpeg"
                              className="w-12 h-12 rounded-full mr-4"
                              alt="Author"
                            />
                            <div className="text-xl font-bold">
                              Tim Neutkens
                            </div>
                          </div>
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </Layout>
      </div>
    </>
  );
}
