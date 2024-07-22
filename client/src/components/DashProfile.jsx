import React, { useState, useRef, useEffect } from 'react';
import { Alert, Button, TextInput } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage';
import { app } from '../firebase.js';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure } from '../redux/user/userSlice.js';

const FILE_SIZE_LIMIT = 2 * 1024 * 1024; // 2MB

export default function DashProfile() {
  const { currentUser, error } = useSelector(state => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [updateSuccessMessage, setUpdateSuccessMessage] = useState(null);
  const [formData, setFormData] = useState({});
  const filepickerRef = useRef(null);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size < FILE_SIZE_LIMIT) {
        setImageFile(file);
        setImageFileUrl(URL.createObjectURL(file));
        setImageFileUploadError(null);
      } else {
        setImageFileUploadError('File must be less than 2MB');
      }
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
      },
      (error) => {
        let errorMessage = 'Could not upload image. Please try again.';
        if (error.code === 'storage/unauthorized') {
          errorMessage = 'You are not authorized to perform this operation.';
        } else if (error.code === 'storage/canceled') {
          errorMessage = 'Upload was canceled.';
        }
        setImageFileUploadError(errorMessage);
        setImageUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        const errorMessage = data.message || 'An unknown error occurred';
        dispatch(updateFailure(errorMessage));
      } else {
        dispatch(updateSuccess(data));
        setUpdateSuccessMessage("User's profile updated successfully");
        setTimeout(() => setUpdateSuccessMessage(null), 3000); // Clear success message after 3 seconds
      }
    } catch (error) {
      dispatch(updateFailure(error.message || 'An unexpected error occurred'));
    }
  };

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='file' accept='image/*' onChange={handleImageChange} ref={filepickerRef} hidden />
        <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full relative' onClick={() => filepickerRef.current.click()}>
          {imageUploadProgress && (
            <CircularProgressbar
              value={imageUploadProgress || 0}
              text={`${imageUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: { width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 },
                path: { stroke: `rgba(62, 152, 199, ${imageUploadProgress / 100})` },
                text: { fill: '#f88', fontSize: '24px' },
              }}
            />
          )}
          <img 
            src={imageFileUrl || currentUser.profilePicture} 
            alt="user" 
            className={`rounded-full w-full h-full border-8 border-[lightgray] ${imageUploadProgress && imageUploadProgress < 100 ? 'opacity-60' : ''}`} 
          />
        </div>
        {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}
        {error && <Alert color='failure'>{error}</Alert>}
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username || currentUser.username} onChange={handleChange} />
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email || currentUser.email} onChange={handleChange} />
        <TextInput type='password' id='password' placeholder='password' onChange={handleChange} />
        <Button type='submit' style={{ background: 'linear-gradient(to right, #8A2BE2, #1E90FF)' }}>Update</Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
      {imageUploadProgress && <div className='mt-2'>Upload Progress: {imageUploadProgress}%</div>}
      {updateSuccessMessage && (<Alert color='success' className='mt-5'>{updateSuccessMessage}</Alert>)}
    </div>
  );
}
