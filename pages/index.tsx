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

      <div>
        {posts.map((post) => (
          <Link key={post._id} href={post.slug.current}>
            <div>
              <img
                className="object-contain w-48"
                src={urlFor(post.mainImage).url()!}
                alt=""
              />
              <div>
                <div>
                  <p>{post.title}</p>
                  <p>
                    {post.description}
                    <span className="font-bold"> by {post.author.name}</span>
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
