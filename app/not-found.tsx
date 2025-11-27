import Link from 'next/link';
import { Home, BarChart2 } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-soft-white flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center relative">
        <div className="mb-8 relative">
          <h1 className="text-9xl font-heading font-bold text-primary/5 select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
             <span className="text-6xl animate-bounce">🤔</span>
          </div>
        </div>
        
        <h2 className="text-3xl font-heading font-bold text-primary mb-4">
          Page Not Found
        </h2>
        <p className="text-slate-light mb-8 text-lg">
          Oops! It seems you've ventured into uncharted territory. The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-y-4 max-w-xs mx-auto">
          <Link 
            href="/" 
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          
          <Link 
            href="/indicators/hdro" 
            className="btn-secondary w-full flex items-center justify-center gap-2"
          >
            <BarChart2 className="w-5 h-5" />
            Explore Indicators
          </Link>
        </div>
      </div>
    </div>
  );
}
