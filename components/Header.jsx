import React, { useContext } from 'react'
import Link from 'next/link'

const categories = [
    {
        name: 'React', slug: 'react'
    },
    {
        name: 'Games', slug: 'games'
    }
];

const Header = () => {
  return (
    <div className='headerwbg mb-8'>
        {/* Navbar */}
        <div className='container px-10 mx-auto'>
            <div className='border-b w-full inline-block border-white-400'>
                <div className='md:float-left block'>
                    <Link href={"/"}>
                        <span className='cursor-pointer font-bold text-4xl text-white'>
                            My Blog
                        </span>
                    </Link>
                </div>
                <div className='hidden md:float-left md:contents'>
                    {categories.map((category) => (
                        <Link key={category.slug} href={`/category/${category.slug}`}>
                            <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
        {/* Banner Image */}
        <div className='container mx-0 min-w-full max-h-29 overflow-hidden bannerwbg'>
            {/* TODO: make it the gif of them walking instead */}
        </div>
    </div>
  );
}

export default Header