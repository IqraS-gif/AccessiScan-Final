import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Maximize2, Minimize2, Send, TerminalSquare, Copy, CheckCircle2 } from 'lucide-react';

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', type: 'text', content: 'Scan complete! I found 3 accessibility violations. Select an issue to see automated remediation code, or ask me anything.' }
  ]);

  const handleSendMessage = (text) => {
    const userText = text || chatInput;
    if (!userText.trim()) return;

    setMessages(prev => [...prev, { role: 'user', type: 'text', content: userText }]);
    setChatInput('');

    // Mock AI Response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        type: 'code',
        content: 'Here is the fix for the missing alt attribute.',
        code: `<img \n  src="/bg.png" \n  class="hero-bg" \n  alt="Description"\n/>`
      }]);
    }, 1000);
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const maxWidth = isExpanded ? '1000px' : '380px';

  return (
    <>
      <div className={`fixed z-50 ${isExpanded ? 'inset-4 lg:inset-10 flex items-center justify-center' : 'bottom-6 right-6 lg:bottom-10 lg:right-10 flex flex-col items-end'}`}>
        
        {/* Chat Window */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={isExpanded ? { opacity: 0, scale: 0.95 } : { opacity: 0, y: 20, scale: 0.95, originX: 1, originY: 1 }}
              animate={isExpanded ? { opacity: 1, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={isExpanded ? { opacity: 0, scale: 0.95 } : { opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.1 } }}
              transition={{ duration: 0.25, type: 'spring', damping: 25, stiffness: 200 }}
              style={{ width: isExpanded ? '100%' : '380px', height: isExpanded ? '100%' : '650px', maxWidth }}
              className={`bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 shadow-2xl flex flex-col overflow-hidden ${isExpanded ? 'rounded-2xl' : 'rounded-3xl mb-4 max-h-[calc(100vh-120px)]'}`}
            >
              {/* Header */}
              <div className="p-4 border-b border-slate-700/50 bg-slate-800/80 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary p-[1px]">
                    <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                      <TerminalSquare size={14} className="text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm leading-tight">Remediation AI</h3>
                    <p className="text-[10px] text-secondary font-medium">Online</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => setIsExpanded(!isExpanded)} 
                    className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-700 transition-colors"
                  >
                    {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                  </button>
                  <button 
                    onClick={() => { setIsOpen(false); setIsExpanded(false); }} 
                    className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-700 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.map((msg, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={i} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl p-3.5 ${
                      msg.role === 'user' 
                      ? 'bg-primary text-white rounded-br-sm shadow-md' 
                      : 'bg-slate-800/80 text-slate-200 rounded-bl-sm border border-slate-700 shadow-md'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      {msg.type === 'code' && (
                        <div className="mt-3 bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
                          <div className="flex justify-between items-center px-3 py-1.5 bg-slate-900 border-b border-slate-800">
                            <span className="text-[10px] text-slate-500 font-mono">HTML</span>
                            <button onClick={() => copyToClipboard(msg.code)} className="text-slate-500 hover:text-white">
                              {copiedCode ? <CheckCircle2 size={14} className="text-emerald-400"/> : <Copy size={14}/>}
                            </button>
                          </div>
                          <pre className="p-3 text-[11px] font-mono text-emerald-300 overflow-x-auto">
                            <code>{msg.code}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-3.5 bg-slate-800/80 border-t border-slate-700/50 shrink-0">
                {messages.length < 3 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    <button onClick={() => handleSendMessage('Fix the missing alt attributes')} className="text-xs px-3 py-1.5 rounded-full bg-slate-700/80 hover:bg-slate-600 text-slate-300 border border-slate-600 transition-colors">
                      Fix alt attributes
                    </button>
                    <button onClick={() => handleSendMessage('Improve accessibility score')} className="text-xs px-3 py-1.5 rounded-full bg-slate-700/80 hover:bg-slate-600 text-slate-300 border border-slate-600 transition-colors">
                      Improve score
                    </button>
                  </div>
                )}
                <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="relative flex items-center">
                  <input 
                    type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Message AI Assistant..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 shadow-inner"
                  />
                  <button type="submit" disabled={!chatInput.trim()} className="absolute right-1.5 p-2 rounded-lg bg-primary text-white disabled:opacity-50 transition-opacity hover:opacity-90">
                    <Send size={14} />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Toggle Button */}
        {!isExpanded && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`w-14 h-14 rounded-full shadow-[0_5px_25px_rgba(108,99,255,0.4)] flex items-center justify-center transition-all duration-300 z-50 ${isOpen ? 'bg-slate-700 text-white shadow-none' : 'bg-primary text-white'}`}
          >
            {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
          </motion.button>
        )}
      </div>

      {/* Full screen backdrop */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40"
            onClick={() => { setIsExpanded(false); setIsOpen(false); }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
