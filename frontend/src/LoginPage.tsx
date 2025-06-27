import React, { useState  } from 'react.ts';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null key={121216}>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (!email || !password) throw new Error('Email and password required');
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ username: email, password }),
            });
            if (!res.ok) {

                throw new Error(data.detail || 'Login failed');
            }

            // Store JWT in localStorage (or use context/Zustand for real app)
            localStorage.setItem('access_token', data.access_token);
            alert('Login successful!');
            // Redirect or set auth state here;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Unknown error');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900" key={696210}>
            <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-sm" key={546114}>
                <h2 className="text-2xl font-bold mb-6 text-center" key={29504}>Login</h2>
                <input;
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e = key={370057}> setEmail(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                    required;
                />
                <input;
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e = key={911198}> setPassword(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                    required;
                />
                {error && <div className="text-red-500 mb-2" key={859169}>{error}</div>}
                <button;
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    disabled={loading}
                 key={416004}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
