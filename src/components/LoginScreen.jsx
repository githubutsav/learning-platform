import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Chrome } from 'lucide-react';
import { motion } from 'framer-motion';
import { signIn, signInWithGoogle } from '../lib/auth';

export default function LoginScreen({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);
    
    try {
      // Validation
      if (!formData.email || !formData.password) {
        setErrorMessage('Please fill in all fields');
        setIsLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setErrorMessage('Please enter a valid email address');
        setIsLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setErrorMessage('Password must be at least 6 characters');
        setIsLoading(false);
        return;
      }

      // Call sign in API
      const result = await signIn(formData.email, formData.password);
      
      if (result.success) {
        setSuccessMessage('Welcome back! 👋');
        setTimeout(() => {
          onLogin(result.user.role, {
            fullName: result.user.full_name,
            email: result.user.email,
            ...result.user
          });
        }, 800);
      } else {
        setErrorMessage(result.error || 'Sign in failed. Please check your credentials.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    const result = await signInWithGoogle();
    
    if (result.success) {
      setSuccessMessage('Redirecting to Google...');
      // OAuth will redirect, keep loading
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
    if (errorMessage) setErrorMessage('');
    if (successMessage) setSuccessMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4">
            <span className="text-3xl">🚀</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome Back!
          </h1>
          <p className="text-slate-400">Sign in to continue your learning journey</p>
        </div>

        {/* Error/Success Messages */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm"
          >
            {errorMessage}
          </motion.div>
        )}
        
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm"
          >
            {successMessage}
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full bg-slate-900/50 text-white pl-12 pr-4 py-4 rounded-xl border border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none disabled:opacity-50"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full bg-slate-900/50 text-white pl-12 pr-12 py-4 rounded-xl border border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none disabled:opacity-50"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors disabled:opacity-50"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </form>

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
          Sign in with Google
        </motion.button>

        {/* Info Text */}
        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Sign in to access your learning dashboard
          </p>
        </div>
      </motion.div>
    </div>
  );
}
