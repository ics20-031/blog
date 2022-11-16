import React from 'react'
import { RichText } from '@graphcms/rich-text-react-renderer';


const Author = ({ author }) => {
  // TODO: change author bio into richtext and display as such
  return (
    <div className='text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20'>
      <div className='absolute left-0 right-0 -top-14'>
        <img
          alt={author.name}
          height="100"
          width="100"
          className="align-middle rounded-full"
          src={author.photo.url}
        />
      </div>
        <h3 className='my-4 text-xl font-bold'>{author.name}</h3>
        <p className='text-lg'><RichText content={author.richbio.raw}/></p>
    </div>
  )
}

export default Author