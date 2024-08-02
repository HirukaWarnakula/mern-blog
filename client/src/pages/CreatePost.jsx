import {Button, Select, TextInput,FileInput, Alert } from 'flowbite-react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import{getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



export default function CreatePost() {
  const [file, setFile] = React.useState(null);
  const[imageUploadProgress,setImageUploadProgress] = useState(null);
  const[imageUploadError,setImageUploadError] = useState(null);
  const[formData,setFormData] = useState({});

  const handleUploadImage = async () => {
    try{
      if(!file){
        setImageUploadError('please select an image');
        return ;
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime() +'-'+file.name;
      const storageRef = ref(storage,fileName)
      const uploadTask = uploadBytesResumable(storageRef,file);
      uploadTask.on(
        'state_change',
         (snapshot) =>{ 

          const progress = 
             (snapshot.bytesTransferred / snapshot.totalBytes)*100;
             setImageUploadProgress(progress.toFixed(0)); 

      },
      (_error) => {
        setImageUploadError('Image upload faild');
        setImageUploadProgress(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setImageUploadProgress(null);
          setImageUploadError(null);
          setFormData({...formData,image:downloadURL});

        });
      }

    )

    }catch(error){
      setImageUploadError('Image upload Faild');
      setImageUploadProgress(null);
      console.log(error);
    }


  };
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
            <FileInput type='file' accept='image/*'onChange={(e)=>setFile(e.target.files[0])}/>
            <Button type='button' style={{ background: 'linear-gradient(to right, #8A2BE2, #1E90FF)' }} size='sm' outline onClick={handleUploadImage} disabled={imageUploadProgress}>

              {
                imageUploadProgress ? (
                  <div className='w-16 h-16'>
                    <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                   
                  </div>
                ) : 'Upload Image'
              }
            </Button>
        </div> 
        {imageUploadError && <Alert color='failure'>{imageUploadError} </Alert>}
        {formData.image && (
          <img 
          src={formData.image}
          alt='uploaded'
          className='w-full h-64 object-cover'
          />
        )
      }
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