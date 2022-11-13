import { setegid } from 'process';
import React, { useRef, useState, useEffect } from 'react'

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  const handleCommentSubmission = () => {
    setError(false);
    const { value: comment } = commentEl.current.value;
    const { value: name } = nameEl.current.value;
    const { value: email } = emailEl.current.value;
    const { value: storeData } = storeDataEl.current.value;


    if(!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = { name, email, comment, slug };

    if (storeData) {
      localStorage.setItem('name', name);
      localStorage.setItem('email', comment);
    } else {
      localStorage.remove('name', name);
      localStorage.remove('email', email);
    }
  };

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Comments</h3>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        {/* Comment textbox */}
        <textarea ref={commentEl} 
          className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
          placeholder='Comment'
          name='comment'
        />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
        {/* Name textbox */}  
        <input type='text'
          ref={nameEl}
          className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
          placeholder='Name'
          name='name'
        />
        {/* Email textbox */}
        <input type='text'
          ref={emailEl}
          className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
          placeholder='Email'
        name='email'
        />
      </div>
      {/* Save data checkbox */}
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <div>
          <input ref={storeDataEl} type='checkbox' id='storeData' name='storeData'/>
          <label className='text-gray-500 cursor-pointer ml-2' htmlFor='storeData'>Save my e-mail and name for the next time I comment</label>
        </div>
      </div>
      {error && <p className='text-xs text-red-500'>All fields are required.</p>}
      <div className='mt-8'>
        <button 
          type='button' 
          onClick={handleCommentSubmission}
          className='transition duration-500 ease bg-[#7F8DB0] hover:bg-[#282828] inline-block text-lg rounded-md px-8 py-3 cursor-pointer text-white'
        >
          Post Comment
        </button>
        {showSuccessMessage && <span className='text-xl float-right font-semibold mt-3 text-green-500'>Comment submitted for review!</span>}
      </div>
    </div>
  )
}

export default CommentsForm