import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Label, TextInput, Button, Alert, Spinner } from 'flowbite-react';
import { useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { signInSuccess,signInFailure,signInStart } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
    const [formData, setFormData] = useState({});
    const {loading,error:errorMessage} = useSelector(state =>state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Use the useNavigate hook

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            return dispatch(signInFailure('Please fill all the fields'));
        }
    
        try {
            dispatch(signInStart());
    
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const data = await res.json();
    
            if (!res.ok || data.success === false) {
                dispatch(signInFailure(data.message || 'Sign in failed'));
            } else {
                dispatch(signInSuccess(data));
                navigate('/');
            }
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-3 max-w-3xl w-full flex flex-col items-center mt-0">
                <div className="text-center mb-8">
                    <Link to="/" className="font-bold dark:text-white text-4xl">
                        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                            Hiruka's
                        </span>
                        Blog
                    </Link>
                    <p className="text-sm mt-5">
                        This is a demo project. You can sign in with your email and password or with Google.
                    </p>
                </div>
                <div className="w-full max-w-md">
                    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="email" value="Your email" />
                            <TextInput
                                type="email"
                                placeholder="name@company.com"
                                id="email"
                                className="mt-1 block w-full"
                                value={formData.email || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="password" value="Your password" />
                            <TextInput
                                type="password"
                                placeholder="*********"
                                id="password"
                                className="mt-1 block w-full"
                                value={formData.password || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <Button
                            className="w-50 h-12 px-1 py-2"
                            style={{ background: 'linear-gradient(to right, #8A2BE2, #1E90FF)' }}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner size="sm" />
                                    <span className="pl-3">Loading...</span>
                                </>
                            ) : 'Sign In'}
                        </Button>
                      <OAuth/>  
                    </form>
                    <div className="flex gap-2 text-sm mt-5">
                        <span> Don't Have an account?</span>
                        <Link to="/sign-up" className="text-blue-500">
                            Sign Up
                        </Link>
                    </div>
                    {errorMessage && (
                        <Alert color="failure" className="mt-5">
                            {errorMessage}
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
}