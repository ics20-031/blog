import React, { useContext, useState, useEffect } from 'react'
import Link from 'next/link'

import { getCategories } from '../services';

const Header = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
        .then((newCategories) => setCategories(newCategories));
    }, []);

    return (
        <div className='headerwbg mb-8'>
            {/* Navbar */}
            <div className='container px-10 mx-auto'>
                <div className='w-full inline-block'>
                    <div className='md:float-left block'>
                        <Link href={"/"}>
                            <span className='cursor-pointer font-bold text-4xl text-white'>
                                Cool Blog
                            </span>
                        </Link>
                    </div>
                    <div className='hidden md:float-left md:contents'>
                        <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>
                            <Link href={`https://github.com/ics20-031`}>Github</Link>
                        </span>
                        <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>
                            <Link href={`/post/about-me`}>About Me</Link>
                        </span>
                        <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>
                            <Link href={`/`}>Home</Link>
                        </span>
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