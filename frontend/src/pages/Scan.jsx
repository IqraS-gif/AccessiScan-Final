import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, Chrome, Upload, Download, CheckCircle, Loader2, ArrowRight } from 'lucide-react';
import { useScanStore } from '../store/useScanStore';
import PageTransition from '../components/layout/PageTransition';
import ExtensionManagement from '../components/sections/ExtensionManagement';

export default function Scan() {
  const navigate = useNavigate();
  const { isScanning, scanProgress, startScan, url, setUrl } = useScanStore();
  const [activeTab, setActiveTab] = useState('url');
  const [wcagLevel, setWcagLevel] = useState('AA');

  // Auto-trigger scan if url is provided via store (e.g. from Navigation Discovery)
  React.useEffect(() => {
    if (url && !isScanning) {
      handleScan();
    }
  }, []);

  const handleScan = async (e) => {
    if (e) e.preventDefault();
    if (!url) return;
    
    const targetUrl = url;
    // Clear the store URL immediately so it doesn't re-trigger on back navigation
    if (!e) setUrl(''); 

    try {
      await startScan(targetUrl, wcagLevel);
      navigate('/report/current');
    } catch (err) {
      alert(`Scan failed: ${err}`);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
      navigate('/report/m-123'); // Redirect to report ID
    }
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto space-y-8 font-sans">
        <div>
          <h1 className="text-3xl font-bold text-main mb-2">Accessibility Scanner</h1>
          <p className="text-muted">Audit your web applications for WCAG compliance.</p>
        </div>

        {/* Tabs Header */}
        <div className="flex p-1 bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50 w-full sm:w-fit">
          <button
            onClick={() => setActiveTab('url')}
            className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors w-full sm:w-auto overflow-hidden ${
              activeTab === 'url' ? 'text-primary' : 'text-muted hover:text-main'
            }`}
          >
            {activeTab === 'url' && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-slate-700/80 border border-slate-600 rounded-xl -z-10 shadow-sm"
              />
            )}
            <Globe size={18} />
            URL Scanner
          </button>
          
          <button
            onClick={() => setActiveTab('extension')}
            className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors w-full sm:w-auto overflow-hidden ${
              activeTab === 'extension' ? 'text-primary' : 'text-muted hover:text-main'
            }`}
          >
            {activeTab === 'extension' && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-slate-700/80 border border-slate-600 rounded-xl -z-10 shadow-sm"
              />
            )}
            <Chrome size={18} />
            Chrome Extension
          </button>
        </div>

        {/* Tabs Content */}
        <div className="relative mt-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {/* URL SCANNER TAB */}
            {activeTab === 'url' && (
              <motion.div
                key="url"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-surface border border-border-subtle p-6 sm:p-10 rounded-3xl shadow-xl"
              >
                <div className="max-w-xl mx-auto text-center space-y-8">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto text-primary border border-primary/20 shadow-inner">
                    <Search size={32} />
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold text-main mb-2">Scan Live URL</h2>
                    <p className="text-muted">Enter any public URL to initiate a comprehensive WCAG accessibility audit in the cloud.</p>
                  </div>

                  <form onSubmit={handleScan} className="relative mt-8">
                    <div className="relative flex items-center">
                      <Globe className="absolute left-4 text-slate-500" size={20} />
                      <input 
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        required
                        disabled={isScanning}
                        className="w-full bg-surface-deep border border-border-subtle rounded-2xl pl-12 pr-36 py-4 text-main placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner disabled:opacity-50"
                      />
                      <button 
                        type="submit"
                        disabled={isScanning || !url}
                        className="absolute right-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 disabled:opacity-50 text-slate-900 font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
                      >
                        {isScanning ? 'Scanning' : 'Scan Now'}
                        {!isScanning && <ArrowRight size={18} />}
                      </button>
                    </div>
                  </form>

                  {/* WCAG Level Picker */}
                  {!isScanning && url && (
                    <div className="mt-2">
                      <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-3">WCAG Conformance Level</p>
                      <div className="flex gap-3 justify-center">
                        {['A', 'AA', 'AAA'].map((level) => (
                          <button
                            key={level}
                            type="button"
                            onClick={() => setWcagLevel(level)}
                            className={`flex-1 py-3 rounded-xl border font-black text-sm transition-all duration-200 ${
                              wcagLevel === level
                              ? 'bg-primary border-primary text-slate-900 shadow-lg shadow-primary/30'
                              : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
                            }`}
                          >
                            {level}
                            <span className="block text-[9px] font-normal mt-0.5 opacity-70">
                              {level === 'A' ? 'Basic' : level === 'AA' ? 'Standard' : 'Enhanced'}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mock Loading State */}
                  <AnimatePresence>
                    {isScanning && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-8"
                      >
                        <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6 text-left shadow-inner">
                          <div className="flex justify-between items-center mb-4 text-sm font-medium">
                            <span className="text-main flex items-center gap-3">
                              <Loader2 className="animate-spin text-primary" size={18} />
                              Analyzing DOM structures & contrast...
                            </span>
                            <span className="text-primary font-bold">{scanProgress}%</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700/50">
                            <motion.div 
                              className="bg-gradient-to-r from-primary to-secondary h-full rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${scanProgress}%` }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Preset Websites for Quick Scan */}
                  {!isScanning && (
                    <div className="mt-12 pt-8 border-t border-border-subtle/30">
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em] mb-6">Or simply choose from these websites</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          { name: 'APSIT Moodle', url: 'https://elearn.apsit.edu.in/moodle/' },
                          { name: 'MedLab AI', url: 'https://medlab-ai.web.app/' },
                          { name: 'AI Career Coach', url: 'https://aicareer-coach.github.io/AI-Career-coach/index.html' }
                        ].map((site) => (
                          <button
                            key={site.url}
                            type="button"
                            onClick={async () => {
                              setUrl(site.url);
                              try {
                                await startScan(site.url, wcagLevel);
                                navigate('/report/current');
                              } catch (err) {
                                alert(`Scan failed: ${err}`);
                              }
                            }}
                            className="group p-4 bg-slate-900/40 border border-slate-700/50 rounded-2xl text-left hover:border-primary/50 transition-all hover:-translate-y-1 shadow-sm relative overflow-hidden"
                          >
                            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 blur-xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-all"></div>
                            <p className="text-xs font-black text-main group-hover:text-primary transition-colors truncate relative z-10">{site.name}</p>
                            <p className="text-[10px] text-muted truncate mt-1 relative z-10">{new URL(site.url).host}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </motion.div>
            )}

            {/* EXTENSION TAB */}
            {activeTab === 'extension' && (
              <motion.div
                key="extension"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <ExtensionManagement onFileUpload={handleFileUpload} />
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
