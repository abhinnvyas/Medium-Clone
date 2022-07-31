import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import PortableText from "react-portable-text";

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  return (
    <main>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <img
        className="w-full h-60 object-cover"
        src={urlFor(post.mainImage).url()!} //! -> make sure the image is there
        alt=""
      />

      <article className="max-w-3xl mx-auto p-3">
        <h1 className="text-2xl md:text-3xl mt-5 mb-2">{post.title}</h1>
        <h1 className="text-xl font-light text-gray-800 mb-2">
          {post.description}
        </h1>

        <div className="flex items-center space-x-3">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={urlFor(post.author.image).url()!}
            alt=""
          />
          <p className="font-extralight text-sm">
            Blog post by{" "}
            <span className="text-black font-light">{post.author.name}</span> -
            Published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-5">
          <PortableText
            content={post.body}
            className=""
            serializers={{
              h1: (props: any) => (
                <h1 className="text-3xl font-bold my-5" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="text-xl font-bold my-5" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a className="text-blue-500 hover:underline" href={href}>
                  {children}
                </a>
              ),
            }}
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
          />
        </div>
        <hr className="max-w-lg mt-5 mx-auto border border-yellow-500 " />
      </article>

      <form className="flex flex-col p-5 max-w-2xl mx-auto mb-10">
        <h3 className="text-sm text-yellow-500 font-bold">
          Enjoyed this article?
        </h3>
        <h4 className="text-3xl font-bold">Leave a comment down below!</h4>
        <hr className="py-2 mt-2" />
        <label className="block mb-5">
          <span className="text-gray-800">Name</span>
          <input
            className="block shadow border rounded py-2 px-3 mt-1 w-full form-input 
            focus:ring ring-yellow-500 outline-none"
            placeholder="Full Name"
            type="text"
          />
        </label>
        <label className="block mb-5">
          <span className="text-gray-800">Email</span>
          <input
            className="block shadow border rounded py-2 px-3 mt-1 w-full form-input
            focus:ring ring-yellow-500 outline-none"
            placeholder="Email"
            type="text"
          />
        </label>
        <label className="block mb-5">
          <span className="text-gray-800">Comment</span>
          <textarea
            className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full
            focus:ring ring-yellow-500 outline-none"
            placeholder="Comment"
            rows={8}
          />
        </label>
      </form>
    </main>
  );
}

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `
  *[_type=="post"]{
    _id,
    slug {
        current
    }
  }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking", //Show 404 page if the page doesnt exists, else show the page.
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
    *[_type=="post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author -> {
          name,
          image
    },
        slug,
        mainImage,
        description,
        body
    }`;

  const post = await sanityClient.fetch(query, { slug: params?.slug });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60, // update the old cached version after every 60 seconds. ISR
    // Incremental Static Regeneration.
  };
};
