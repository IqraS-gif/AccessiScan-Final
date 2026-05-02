import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import PageTransition from '../components/layout/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Mail, Lock, Key, ArrowRight, X, Info, ExternalLink } from 'lucide-react';

export default function Auth() {
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tokenInput, setTokenInput] = useState('');
  
  const { login, setGithubToken } = useAuthStore();
  const navigate = useNavigate();

  const handleInitialLogin = (e) => {
    e.preventDefault();
    // Simulate authentication success
    setShowTokenModal(true);
  };

  const handleFinalSubmit = () => {
    if (tokenInput.trim()) {
      setGithubToken(tokenInput.trim());
    }
    login();
    navigate('/dashboard');
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-dark p-6 relative overflow-hidden font-sans selection:bg-primary/30">
        
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full mix-blend-screen -z-10"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-slate-900/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-slate-700/50 w-full max-w-md relative z-10"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-slate-400">Sign in to continue to AccessiScan AI</p>
          </div>

          {/* Social Login */}
          <button 
            type="button"
            onClick={handleInitialLogin}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-900 font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-md mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-1 7.28-2.69l-3.57-2.77c-.99.69-2.26 1.1-3.71 1.1-2.87 0-5.3-1.94-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.11c-.22-.69-.35-1.43-.35-2.11s.13-1.42.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.51 6.16-4.51z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative flex items-center justify-center mb-6">
            <span className="absolute bg-slate-900 px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">Or email login</span>
            <div className="w-full h-px bg-slate-700/50"></div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleInitialLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-slate-900 font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-primary/25 flex justify-center items-center gap-2"
              >
                Sign In
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </motion.div>

        {/* GitHub Token Modal wrapper with Fragment to prevent layout break */}
        <AnimatePresence>
          {showTokenModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative"
              >
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/30">
                  <div className="flex items-center gap-3">
                    <Github className="text-white" size={20} />
                    <h2 className="text-lg font-bold text-white">GitHub Integration</h2>
                  </div>
                  <button 
                    onClick={handleFinalSubmit} 
                    className="text-slate-400 hover:text-white transition-colors p-1"
                    title="Skip"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex gap-3 text-sm text-slate-300">
                    <Info className="text-primary shrink-0 mt-0.5" size={18} />
                    <p>To automatically create GitHub Issues for accessibility violations, please provide a Fine-Grained Personal Access Token.</p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-slate-200 font-semibold mb-2">How to generate a token?</h3>
                    <ol className="list-decimal list-inside text-sm text-slate-400 space-y-2 ml-1">
                      <li>Go to <a href="https://github.com/settings/tokens?type=beta" target="_blank" rel="noreferrer" className="text-secondary hover:underline inline-flex items-center gap-1">GitHub Developer Settings <ExternalLink size={12}/></a></li>
                      <li>Click <strong>Generate new token</strong> (Fine-grained).</li>
                      <li>Select the repositories you want to audit.</li>
                      <li>Under Repository permissions, grant dropdown access <strong>Read and Write</strong> to <strong>Issues</strong>.</li>
                      <li>Copy the generated token and paste it below.</li>
                    </ol>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Personal Access Token</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <Key size={18} />
                      </div>
                      <input 
                        type="password" 
                        value={tokenInput}
                        onChange={(e) => setTokenInput(e.target.value)}
                        placeholder="github_pat_11A..."
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono text-sm shadow-inner"
                      />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-800 bg-slate-800/30 flex justify-end gap-3">
                  <button 
                    onClick={handleFinalSubmit}
                    className="px-5 py-2.5 rounded-xl font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
                  >
                    Skip for now
                  </button>
                  <button 
                    onClick={handleFinalSubmit}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-slate-900 font-bold shadow-lg shadow-primary/25"
                  >
                    Save & Continue
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
