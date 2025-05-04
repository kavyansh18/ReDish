import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import ReDish from './components/ReDish';
import QuickStudy from './components/QuickStudy';
import OneClickMotivation from './components/OneClickMotivation';
import CodeDebugger from './components/CodeDebugger';
import redishLogo from './assets/chef.png';
import quickstudyLogo from './assets/book.png';
import motivationLogo from './assets/fire.png';
import debuggerLogo from './assets/code.png';
import './font.css';
import './index.css';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoVariants = {
    hover: { scale: 1.2, transition: { duration: 0.3 } },
  };

  const menuVariants = {
    open: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    closed: { opacity: 0, x: '100%', transition: { duration: 0.3 } },
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <nav className="bg-gray-800/50 backdrop-blur-lg p-4 shadow-lg border-b border-gray-700/50 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
              <Link to="/" className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                DailyAI
              </Link>
              {/* Desktop Navbar */}
              <div className="hidden md:flex space-x-6 items-center">
                <motion.div variants={logoVariants} whileHover="hover">
                  <Link to="/redish">
                    <img
                      src={redishLogo}
                      alt="ReDish"
                      className="w-10 h-10 hover:shadow-[0_0_10px_rgba(117,133,112,0.7)] rounded-full transition-all"
                    />
                  </Link>
                </motion.div>
                <motion.div variants={logoVariants} whileHover="hover">
                  <Link to="/quickstudy">
                    <img
                      src={quickstudyLogo}
                      alt="QuickStudy"
                      className="w-10 h-10 hover:shadow-[0_0_10px_rgba(90,124,155,0.7)] rounded-full transition-all"
                    />
                  </Link>
                </motion.div>
                <motion.div variants={logoVariants} whileHover="hover">
                  <Link to="/oneclickmotivation">
                    <img
                      src={motivationLogo}
                      alt="OneClickMotivation"
                      className="w-10 h-10 hover:shadow-[0_0_10px_rgba(217,119,6,0.7)] rounded-full transition-all"
                    />
                  </Link>
                </motion.div>
                <motion.div variants={logoVariants} whileHover="hover">
                  <Link to="/codedebugger">
                    <img
                      src={debuggerLogo}
                      alt="CodeDebugger"
                      className="w-10 h-10 hover:shadow-[0_0_10px_rgba(124,58,237,0.7)] rounded-full transition-all"
                    />
                  </Link>
                </motion.div>
              </div>
              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-white focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                  />
                </svg>
              </button>
            </div>
            {/* Mobile Menu */}
            <motion.div
              {...{ className: "md:hidden bg-gray-800/90 backdrop-blur-lg absolute top-16 right-0 w-48 p-4 rounded-lg shadow-lg" }}
              initial="closed"
              animate={isMenuOpen ? 'open' : 'closed'}
              variants={menuVariants}
            >
              <div className="flex flex-col space-y-4">
                <Link
                  to="/redish"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 hover:bg-gray-700/50 p-2 rounded"
                >
                  <img src={redishLogo} alt="ReDish" className="w-8 h-8 rounded-full" />
                  <span className="text-redish-accent">ReDish</span>
                </Link>
                <Link
                  to="/quickstudy"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 hover:bg-gray-700/50 p-2 rounded"
                >
                  <img src={quickstudyLogo} alt="QuickStudy" className="w-8 h-8 rounded-full" />
                  <span className="text-quickstudy-accent">QuickStudy</span>
                </Link>
                <Link
                  to="/oneclickmotivation"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 hover:bg-gray-700/50 p-2 rounded"
                >
                  <img src={motivationLogo} alt="OneClickMotivation" className="w-8 h-8 rounded-full" />
                  <span className="text-motivation-accent">OneClickMotivation</span>
                </Link>
                <Link
                  to="/codedebugger"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 hover:bg-gray-700/50 p-2 rounded"
                >
                  <img src={debuggerLogo} alt="CodeDebugger" className="w-8 h-8 rounded-full" />
                  <span className="text-debugger-accent">CodeDebugger</span>
                </Link>
              </div>
            </motion.div>
          </nav>
        </motion.nav>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/redish" element={<ReDish />} />
          <Route path="/quickstudy" element={<QuickStudy />} />
          <Route path="/oneclickmotivation" element={<OneClickMotivation />} />
          <Route path="/codedebugger" element={<CodeDebugger />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;