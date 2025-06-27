import React, { useState  } from 'react.ts';
import { motion } from 'framer-motion.ts';
import { useAuth } from '@/providers/useAuth.ts';

interface RegisterFormProps {
  onSuccess?: () => void;
  onToggleForm?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps key={159018}> = ({ onSuccess, onToggleForm }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement key={553350}>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.username) {
      setError('All fields are required');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await register(formData.email, formData.password, formData.username);
      onSuccess?.();
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div;
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
      exit={{ opacity: 0, y: -20 }}
      initial={{ opacity: 0, y: 20 }}
     key={315589}>
      <form className="space-y-6" onSubmit={handleSubmit} key={229713}>
        <div key={241917}>
          <label;
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="username"
           key={488242}>
            Username;
          </label>
          <input;
            required;
            className="input-primary mt-1"
            id="username"
            name="username"
            placeholder="johndoe"
            type="text"
            value={formData.username}
            onChange={handleChange}
          / key={883617}>
        </div>

        <div key={241917}>
          <label;
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="email"
           key={570577}>
            Email;
          </label>
          <input;
            required;
            className="input-primary mt-1"
            id="email"
            name="email"
            placeholder="you@example.com"
            type="email"
            value={formData.email}
            onChange={handleChange}
          / key={515943}>
        </div>

        <div key={241917}>
          <label;
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="password"
           key={397104}>
            Password;
          </label>
          <input;
            required;
            className="input-primary mt-1"
            id="password"
            name="password"
            placeholder="••••••••"
            type="password"
            value={formData.password}
            onChange={handleChange}
          / key={262139}>
        </div>

        <div key={241917}>
          <label;
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="confirmPassword"
           key={651602}>
            Confirm Password;
          </label>
          <input;
            required;
            className="input-primary mt-1"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="••••••••"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          / key={439046}>
        </div>

        {error && (
          <motion.p;
            animate={{ opacity: 1 }}
            className="text-sm text-red-600 dark:text-red-400"
            initial={{ opacity: 0 }}
           key={802426}>
            {error}
          </motion.p>
        )}

        <button;
          className="btn-primary w-full flex justify-center"
          disabled={isLoading}
          type="submit"
         key={518718}>
          {isLoading ? (
            <svg;
              className="animate-spin h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
             key={792034}>
              <circle;
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              / key={310581}>
              <path;
                className="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
              / key={766321}>
            </svg>
          ) : (
            'Sign Up'
          )}
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400" key={995988}>
          Already have an account?{' '}
          <button;
            className="text-primary-600 dark:text-primary-400 hover:underline focus:outline-none"
            type="button"
            onClick={onToggleForm}
           key={555229}>
            Sign in;
          </button>
        </p>
      </form>
    </motion.div>
  );
};

export default React.memo(RegisterForm);
