import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { PostCard, Categories, PostWidget } from '../components'
import { getPosts } from '../services'

// The body of the blog, containing:
//    The Head with the title of the page
//    The Posts which are called with a map function
//    The PostWidget
//    The Categories
// Takes the param posts from getStaticProps()
export default function Home({ posts }) {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Cool Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {posts.map((post, index) => ( <PostCard post={post.node} key={post.title}/> ))}
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
            <PostWidget/>
            <Categories/>
          </div>
      </div>
      </div>

    </div>
  )
}

// Default function calling props from the graphQL CMS 
export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts }
  }
}
