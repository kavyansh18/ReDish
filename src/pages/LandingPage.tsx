import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import redishLogo from '../assets/chef.png';
import quickstudyLogo from '../assets/book.png';
import motivationLogo from '../assets/fire.png';
import debuggerLogo from '../assets/code.png';

const LandingPage = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="container mx-auto p-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16 pt-12">
            <h1 className="text-5xl md:text-7xl font-bold font-sans mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              DailyAI: Your Smart Companion
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8">
              Empower your day with AI-driven tools for cooking, studying, motivation, and coding—built for students and bachelors.
            </p>
            {/* <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                to="/redish"
                className="bg-gradient-to-r from-gray-700 to-gray-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-gray-600 hover:to-gray-500 transition-all"
              >
                Explore Now
              </Link>
            </motion.div> */}
          </div>
        </motion.div>

        {/* Chatbot Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Link to="/redish">
              <div className="relative bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 hover:scale-105 hover:shadow-[0_0_20px_rgba(117,133,112,0.5)] transition-all duration-300">
                <img src={redishLogo} alt="ReDish Logo" className="w-16 h-16 mb-4 mx-auto" />
                <h2 className="text-2xl font-semibold text-redish-accent mb-3">ReDish</h2>
                <p className="text-gray-300">
                  Turn your leftover ingredients into delicious Indian recipes with ease.
                </p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <Link to="/quickstudy">
              <div className="relative bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 hover:scale-105 hover:shadow-[0_0_20px_rgba(90,124,155,0.5)] transition-all duration-300">
                <img src={quickstudyLogo} alt="QuickStudy Logo" className="w-16 h-16 mb-4 mx-auto" />
                <h2 className="text-2xl font-semibold text-quickstudy-accent mb-3">QuickStudy</h2>
                <p className="text-gray-300">
                  Get concise study notes for any academic topic in seconds.
                </p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <Link to="/oneclickmotivation">
              <div className="relative bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 hover:scale-105 hover:shadow-[0_0_20px_rgba(217,119,6,0.5)] transition-all duration-300">
                <img src={motivationLogo} alt="OneClickMotivation Logo" className="w-16 h-16 mb-4 mx-auto" />
                <h2 className="text-2xl font-semibold text-motivation-accent mb-3">OneClickMotivation</h2>
                <p className="text-gray-300">
                  Boost your mood with personalized motivational quotes.
                </p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <Link to="/codedebugger">
              <div className="relative bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 hover:scale-105 hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all duration-300">
                <img src={debuggerLogo} alt="CodeDebugger Logo" className="w-16 h-16 mb-4 mx-auto" />
                <h2 className="text-2xl font-semibold text-debugger-accent mb-3">CodeDebugger</h2>
                <p className="text-gray-300">
                  Fix your code errors with clear explanations and corrected snippets.
                </p>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;