import { Link } from 'react-router-dom';
import { Label, TextInput, Button } from 'flowbite-react';

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-3 max-w-3xl w-full flex flex-col items-center mt-0">
        {/* left */}
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
        {/* right */}
        <div className="w-full max-w-md">
          <form className="flex flex-col gap-6">
            <div>
              <Label htmlFor="username" value="Your username" />
              <TextInput type="text" placeholder="username" id="username" className="mt-1 block w-full" />
            </div>
            <div>
              <Label htmlFor="email" value="Your email" />
              <TextInput type="text" placeholder="name@company.com" id="email" className="mt-1 block w-full" />
            </div>
            <div>
              <Label htmlFor="password" value="Your password" />
              <TextInput type="password" placeholder="password" id="password" className="mt-1 block w-full" />
            </div>
            <Button className='w-50 h-12 px-1 py-2' style={{ background: 'linear-gradient(to right, #8A2BE2, #1E90FF)'}} type="submit">
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
            Sign In
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}

