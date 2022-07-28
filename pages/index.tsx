import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Banner from "../components/Banner";
import Header from "../components/Header";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: [Post];
}

const Home: NextPage<Props> = ({ posts }: Props) => {
  console.log(posts);
  return (
    <div className="max-w-5xl mx-auto">
      <Head>
        <title>Medium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />

      {/* Posts */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6
      p-2 md:p-6"
      >
        {posts.map((post) => (
          <Link key={post._id} href={`post/${post.slug.current}`}>
            <div
              className="group cursor-pointer border rounded-lg overflow-hidden
            shadow-md hover:shadow-xl transition-all duration-200 ease-in-out"
            >
              <img
                className="h-60 w-full object-cover group-hover:scale-105
                transition-transform duration-200 ease-in-out"
                src={urlFor(post.mainImage).url()!}
                alt=""
              />
              <div className="flex space-x-1 justify-between p-5 bg-white">
                <div className="flex flex-col space-y-2">
                  <p className="font-bold text-lg">{post.title}</p>
                  <p className="text-xs">
                    {post.description}
                    <span className="font-semibold">
                      {" "}
                      by {post.author.name}
                    </span>
                  </p>
                </div>
                <img
                  className="h-12 w-12 object-cover rounded-full"
                  src={urlFor(post.author.image).url()!}
                  alt=""
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Home;

export const getServerSideProps = async () => {
  const query = `
  *[_type=="post"]{
    _id,
    title,
    slug,
    mainImage,
    description,
    author -> {
    name,
    image
  }
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
