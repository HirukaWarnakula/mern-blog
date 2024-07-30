import {Button, Select, TextInput,FileInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
    <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
    <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput type='text'placeholder='Title 'required id='title'className='flex-1'/>
            <Select>
                <option value='uncatrgorized'>Select a category</option>
                <option value='javascript'>JavaScript</option>
                <option value='react js'>React.js</option>
                <option value='next js'>Next.js</option>
            </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-spacing-0dotted p-3' >
            <FileInput type='file' accept='image/*'/>
            <Button type='button' style={{ background: 'linear-gradient(to right, #8A2BE2, #1E90FF)' }} size='sm' outline>upload image</Button>
        </div> 
        <ReactQuill
         theme="snow"
        placeholder="Write something amazing..."
        style={{ height: '400px' }} // Set your desired height here
        required
         />
       
       <div className='mt-10'> {/* Adjust the mt value as needed */}
          <Button type='submit' className='w-full' style={{ background: 'linear-gradient(to right, #8A2BE2, #1E90FF)' }}>
            Publish
          </Button>
        </div>
        
    
   </form>
    </div>
  )
}