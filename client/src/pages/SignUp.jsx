import { Link, useNavigate } from 'react-router-dom';
import { Label, TextInput, Button, Alert, Spinner } from 'flowbite-react';
import { useState } from 'react';
import OAuth from '../components/OAuth';

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Use the useNavigate hook

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password) {
            setErrorMessage('All fields are required');
            return;
        }

        try {
            setLoading(true);
            setErrorMessage(null);

            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                setErrorMessage(data.message);
            } else if (res.ok) {
                navigate('/sign-in'); // Use navigate to redirect
            }
            setLoading(false);
        } catch (error) {
            setErrorMessage(error.message);
            setLoading(false);
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
                        This is a demo project. You can sign up with your email and password or with Google.
                    </p>
                </div>
                <div className="w-full max-w-md">
                    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="username" value="Your username" />
                            <TextInput
                                type="text"
                                placeholder="username"
                                id="username"
                                className="mt-1 block w-full"
                                value={formData.username || ''}
                                onChange={handleChange}
                            />
                        </div>
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
                                placeholder="password"
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
                            ) : 'Sign Up'}
                        </Button>
                        <OAuth/>
                    </form>
                    <div className="flex gap-2 text-sm mt-5">
                        <span>Have an account?</span>
                        <Link to="/sign-in" className="text-blue-500">
                            Sign In
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
