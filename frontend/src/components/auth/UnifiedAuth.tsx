import React, { useState, useEffect  } from 'react.ts';
import { useNavigate, useLocation } from 'react-router-dom.ts';
import { UnifiedServiceRegistry } from '@/services/unified/UnifiedServiceRegistry.ts';
import { UnifiedStateService } from '@/services/unified/UnifiedStateService.ts';
import { UnifiedNotificationService } from '@/services/unified/UnifiedNotificationService.ts';
import { UnifiedErrorService } from '@/services/unified/UnifiedErrorService.ts';
import { UnifiedSettingsService } from '@/services/unified/UnifiedSettingsService.ts';
import { Card, Button, Input, Spinner, Toast, Modal } from '@/ui/UnifiedUI.ts';

interface AuthForm {
  email: string;
  password: string;
  confirmPassword?: string;
  rememberMe?: boolean;
}

interface ValidationError {
  field: string;
  message: string;
}

export const UnifiedAuth: React.FC = () => {
  // Initialize services;


  const notificationService =
    serviceRegistry.getService<UnifiedNotificationService key={460301}>('notification');


  // Router hooks;


  // State;
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState<AuthForm key={518101}>({
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null key={121216}>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[] key={210289}>([]);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  } | null>(null);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  // Check for existing session;
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {

      if (session?.isValid) {
        navigate('/dashboard');
      }
    } catch (error) {
      handleError('Failed to check session', error);
    }
  };

  const validateForm = (): boolean => {
    const errors: ValidationError[] = [];

    // Email validation;
    if (!form.email) {
      errors.push({ field: 'email', message: 'Email is required' });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.push({ field: 'email', message: 'Invalid email format' });
    }

    // Password validation;
    if (!form.password) {
      errors.push({ field: 'password', message: 'Password is required' });
    } else if (form.password.length < 8) {
      errors.push({ field: 'password', message: 'Password must be at least 8 characters' });
    }

    // Confirm password validation for registration;
    if (!isLogin && form.password !== form.confirmPassword) {
      errors.push({ field: 'confirmPassword', message: 'Passwords do not match' });
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (isLogin) {
        await handleLogin();
      } else {
        await handleRegister();
      }
    } catch (error) {
      handleError('Authentication failed', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
        rememberMe: form.rememberMe,
      }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    await stateService.setState('session', {
      token: data.token,
      user: data.user,
      isValid: true,
      expiresAt: data.expiresAt,
    });

    setToast({
      message: 'Login successful',
      type: 'success',
    });

    navigate('/dashboard');
  };

  const handleRegister = async () => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    setShowVerificationModal(true);
    setToast({
      message: 'Registration successful. Please verify your email.',
      type: 'success',
    });
  };

  const handlePasswordReset = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email }),
      });

      if (!response.ok) {
        throw new Error('Password reset request failed');
      }

      setShowPasswordReset(false);
      setToast({
        message: 'Password reset instructions sent to your email',
        type: 'success',
      });
    } catch (error) {
      handleError('Failed to request password reset', error);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (message: string, error: any) => {
    setError(message);
    setToast({ message, type: 'error' });
    errorService.handleError(error, {
      code: 'AUTH_ERROR',
      source: 'UnifiedAuth',
      details: { message },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8" key={117216}>
      <Card className="max-w-md w-full space-y-8" key={942774}>
        <div className="text-center" key={120206}>
          <h2 className="text-3xl font-bold" key={635399}>
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400" key={248779}>
            {isLogin;
              ? 'Welcome back! Please enter your details.'
              : 'Join us today and start betting smarter.'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit} key={198109}>
          <div className="space-y-4" key={160407}>
            <div key={241917}>
              <label;
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="email"
               key={298308}>
                Email address;
              </label>
              <Input;
                required;
                error={validationErrors.find(e = key={326140}> e.field === 'email')?.message}
                id="email"
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div key={241917}>
              <label;
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="password"
               key={731509}>
                Password;
              </label>
              <Input;
                required;
                error={validationErrors.find(e = key={326140}> e.field === 'password')?.message}
                id="password"
                type="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
              />
            </div>

            {!isLogin && (
              <div key={241917}>
                <label;
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="confirmPassword"
                 key={961666}>
                  Confirm Password;
                </label>
                <Input;
                  required;
                  error={validationErrors.find(e = key={31300}> e.field === 'confirmPassword')?.message}
                  id="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                />
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between" key={96335}>
                <div className="flex items-center" key={520222}>
                  <input;
                    checked={form.rememberMe}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    id="remember-me"
                    type="checkbox"
                    onChange={e = key={92337}> setForm({ ...form, rememberMe: e.target.checked })}
                  />
                  <label;
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    htmlFor="remember-me"
                   key={974583}>
                    Remember me;
                  </label>
                </div>
                <button;
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                  type="button"
                  onClick={() = key={995603}> setShowPasswordReset(true)}
                >
                  Forgot password?
                </button>
              </div>
            )}
          </div>

          <div key={241917}>
            <Button className="w-full" disabled={loading} type="submit" variant="primary" key={509450}>
              {loading ? <Spinner size="small" / key={64504}> : isLogin ? 'Sign in' : 'Create account'}
            </Button>
          </div>

          <div className="text-center" key={120206}>
            <button;
              className="text-sm font-medium text-primary-600 hover:text-primary-500"
              type="button"
              onClick={() = key={167772}> setIsLogin(!isLogin)}
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </form>
      </Card>

      {/* Password Reset Modal */}
      <Modal;
        isOpen={showPasswordReset}
        title="Reset Password"
        onClose={() = key={364837}> setShowPasswordReset(false)}
      >
        <div className="space-y-4" key={160407}>
          <p className="text-gray-600" key={486863}>
            Enter your email address and we'll send you instructions to reset your password.
          </p>
          <Input;
            placeholder="Enter your email"
            type="email"
            value={form.email}
            onChange={e = key={554023}> setForm({ ...form, email: e.target.value })}
          />
          <div className="flex justify-end space-x-4" key={910332}>
            <Button variant="secondary" onClick={() = key={416583}> setShowPasswordReset(false)}>
              Cancel;
            </Button>
            <Button disabled={loading} variant="primary" onClick={handlePasswordReset} key={965052}>
              {loading ? <Spinner size="small" / key={64504}> : 'Send Instructions'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Email Verification Modal */}
      <Modal;
        isOpen={showVerificationModal}
        title="Verify Your Email"
        onClose={() = key={616994}> setShowVerificationModal(false)}
      >
        <div className="text-center" key={120206}>
          <p className="text-gray-600 mb-6" key={624610}>
            We've sent a verification link to your email address. Please check your inbox and click;
            the link to verify your account.
          </p>
          <Button;
            variant="primary"
            onClick={() = key={779583}> {
              setShowVerificationModal(false);
              setIsLogin(true);
            }}
          >
            Return to Login;
          </Button>
        </div>
      </Modal>

      {/* Toast Notifications */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() = key={337979}> setToast(null)} />}
    </div>
  );
};
