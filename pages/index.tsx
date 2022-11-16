import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { PostCard, Categories, PostWidget, Loader } from '../components';
import { getPosts } from '../services';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';


// The body of the blog, containing:
//    The Head with the title of the page
//    The Posts which are called with a map function
//    The PostWidget
//    The Categories
// Takes the param posts from getStaticProps()
export default function Home({ posts }) {
  // TODO: use a hook to grab new posts 
  // TODO: make posts show in reverse order
  // FIXME: make it so that the github page auto updates with new posts without 
  // having to rerun workflow
  const router = useRouter();

    if (router.isFallback) {
        return <Loader/>;
    }
    const [thePosts, setThePosts] = useState(posts);

    useEffect(() => {
      getPosts()
      .then((newPosts) => setThePosts(newPosts));
    }, [posts])

  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Cool Blog</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="https://media.graphassets.com/YpBdwj1QQBSwUNDSLbG6"/>
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {thePosts.map((post, index) => {
            if (!post.node.hiddenPost)
            {
              return (
                  <PostCard post={post.node} key={post.title}/>
                )
            }
          })}
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
            <PostWidget categories={thePosts.categories} slug={thePosts.slug} key={thePosts.title}/>
            <Categories/>
          </div>
          {/* // TODO: make a custom page work */}
          {/* <Link href={`/test`}>Test link</Link> */}

      </div>
      </div>

    </div>
  )
}

// Default function calling props from the graphQL CMS 
export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts },
    revalidate: 10,
  }
}
