import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import GradientBackground from "@/components/GradientBackground";
import Nav from "@/components/Nav";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <GradientBackground />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center px-4"
        >
          <div className="glass p-12 max-w-2xl mx-auto">
            <h1 className="text-8xl md:text-9xl font-title font-bold gradient-text mb-6">404</h1>
            <h2 className="text-3xl md:text-4xl font-title font-bold mb-4 text-ink">
              Page Not Found
            </h2>
            <p className="text-xl text-ink/80 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/"
                className="glass-dark px-8 py-4 font-semibold text-ice-200 hover:scale-105 transition-transform inline-flex items-center gap-2"
              >
                <Home size={20} /> Back to Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="glass px-8 py-4 font-semibold text-ink hover:scale-105 transition-transform inline-flex items-center gap-2"
              >
                <ArrowLeft size={20} /> Go Back
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
