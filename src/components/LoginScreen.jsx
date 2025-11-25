import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Chrome } from 'lucide-react';
import { motion } from 'framer-motion';
import { signUp, signIn, signInWithGoogle, checkUserExists } from '../lib/auth';

export default function LoginScreen({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false); // Default to sign in
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);
    
    try {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setErrorMessage('Please enter a valid email address');
        setIsLoading(false);
        return;
      }
      
      if (isSignUp) {
        // Sign up validation
        if (!formData.fullName.trim()) {
          setErrorMessage('Please enter your full name');
          setIsLoading(false);
          return;
        }
        if (formData.fullName.trim().length < 2) {
          setErrorMessage('Full name must be at least 2 characters');
          setIsLoading(false);
          return;
        }
        if (!formData.email || !formData.password) {
          setErrorMessage('Please fill in all fields');
          setIsLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          setErrorMessage('Password must be at least 6 characters');
          setIsLoading(false);
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setErrorMessage('Passwords do not match');
          setIsLoading(false);
          return;
        }

        // Check if email already exists
        const existsCheck = await checkUserExists(formData.email);
        if (existsCheck.exists) {
          setErrorMessage('This email is already registered. Please sign in instead.');
          setTimeout(() => {
            setIsSignUp(false);
            setErrorMessage('');
          }, 2500);
          setIsLoading(false);
          return;
        }

        // Call sign up API (always create as user role)
        const result = await signUp(formData.email, formData.password, formData.fullName.trim(), 'user');
        
        console.log('Sign up result:', result);
        
        if (result.success) {
          if (result.needsEmailConfirmation) {
            setSuccessMessage('Account created! Please check your email to confirm your address.');
            setIsLoading(false);
          } else {
            setSuccessMessage('Account created successfully! 🎉');
            // Wait a moment before redirecting
            setTimeout(() => {
              onLogin('user', {
                fullName: formData.fullName.trim(),
                email: formData.email,
                ...result.user
              });
            }, 1000);
          }
        } else {
          // Better error messages
          if (result.error?.includes('already exists') || result.error?.includes('duplicate')) {
            setErrorMessage('This email is already registered. Please sign in instead.');
            setTimeout(() => {
              setIsSignUp(false);
              setErrorMessage('');
            }, 2500);
          } else {
            setErrorMessage(result.error || 'Sign up failed. Please try again.');
          }
          setIsLoading(false); // Stop loading on error
        }
        
      } else {
        // Sign in validation
        if (!formData.email || !formData.password) {
          setErrorMessage('Please fill in all fields');
          setIsLoading(false);
          return;
        }

        // Call sign in API
        const result = await signIn(formData.email, formData.password);
        
        console.log('Sign in result:', result);
        
        if (result.success) {
          setSuccessMessage('Welcome back! 👋');
          // Wait a moment before redirecting
          setTimeout(() => {
            onLogin(result.user.role, {
              fullName: result.user.full_name,
              email: result.user.email,
              ...result.user
            });
          }, 800);
        } else {
          if (result.needsSignUp) {
            setErrorMessage('No account found with this email. Please sign up first.');
            // Auto-switch to sign up
            setTimeout(() => {
              setIsSignUp(true);
              setErrorMessage('');
            }, 2500);
          } else if (result.error?.includes('Invalid')) {
            setErrorMessage('Invalid email or password. Please try again.');
          } else {
            setErrorMessage(result.error || 'Sign in failed. Please check your credentials.');
          }
          setIsLoading(false); // Stop loading on error
        }
      }
    } catch (error) {
      console.error('Unexpected error in handleSubmit:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    console.log('Starting Google sign-in...');
    const result = await signInWithGoogle();
    console.log('Google sign-in result:', result);
    
    if (result.success) {
      // Google OAuth will redirect, keep loading state
      setSuccessMessage('Redirecting to Google...');
      // Don't stop loading - user will be redirected
    } else {
      setErrorMessage(result.error || 'Google sign in failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 p-8 rounded-3xl shadow-2xl max-w-md w-full border border-purple-500/20"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div 
            className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            U
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back!'}
          </h1>
          <p className="text-slate-400 text-sm">
            {isSignUp ? 'Start your learning journey' : 'Continue your learning journey'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name (Sign Up Only) */}
          {isSignUp && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required={isSignUp}
              />
            </motion.div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl pl-11 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password (Sign Up Only) */}
          {isSignUp && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl pl-11 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required={isSignUp}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>
          )}

          {/* Success Message */}
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2"
            >
              <span>✓</span> {successMessage}
            </motion.div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2"
            >
              <span>⚠</span> {errorMessage}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {isSignUp ? 'Creating Account...' : 'Signing In...'}
              </div>
            ) : (
              isSignUp ? 'Sign Up' : 'Sign In'
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-slate-900 text-slate-400">Or continue with</span>
          </div>
        </div>

        {/* Google Sign In */}
        <motion.button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          className={`w-full bg-white text-gray-800 p-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-gray-100 transition-all ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <Chrome size={20} className="text-red-500" />
          Sign {isSignUp ? 'up' : 'in'} with Google
        </motion.button>

        {/* Toggle Sign In/Sign Up */}
        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setFormData({ fullName: '', email: formData.email, password: '', confirmPassword: '' });
                setErrorMessage('');
                setSuccessMessage('');
                setShowPassword(false);
                setShowConfirmPassword(false);
              }}
              disabled={isLoading}
              className="ml-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors disabled:opacity-50"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
