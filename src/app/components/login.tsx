'use client';
import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || `HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (data.success) {
        router.push(`/dashboard/${data.userId}`);
      } else {
        setErrorMessage(data.message || 'Login failed');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message || 'Unexpected error occurred.');
      } else {
        setErrorMessage('Unexpected error occurred.');
      }
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex min-h-screen">
      
      <div className="flex-1 flex items-center justify-center ">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto  p-6 bg-white shadow rounded-lg space-y-4 relative"
        >
          {errorMessage && (
            <div className="absolute top-[-60px] left-0 w-full bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded shadow">
              {errorMessage}
            </div>
          )}
          <h1 className="text-blue-600 text-2xl font-bold">WorkFlow Pro</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-900 text-white p-2 rounded"
          >
            Login
          </button>
          <p>
            Don't have an account?{' '}
            <button className="bg-blue-600 w-44 ml-2 rounded-2xl h-10">
              <span className=" text-white">
                <Link href={'/Signup'}>Signup now</Link>
              </span>
            </button>
          </p>
        </form>
      </div>

      
      <div className="flex-1 hidden md:flex -ml-16 items-center justify-center ">
        <img
          src="/login.png" 
          alt="WorkFlow Pro Illustration"
          className="max-w-full h-auto p-10"
        />
      </div>
    </div>
  );
};

export default Login;


