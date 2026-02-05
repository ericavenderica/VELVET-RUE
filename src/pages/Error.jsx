import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="min-h-70vh flex flex-col items-center justify-center text-center px-4">
      <div className="relative">
        <h1 
          className="text-huge leading-none font-heading text-gray-100 select-none"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl md:text-3xl font-serif italic text-black tracking-widest bg-white px-4">
            Page Not Found
          </span>
        </div>
      </div>
      
      <p className="text-gray-500 mt-4 mb-8 max-w-md mx-auto font-light">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      
      <Link 
        to="/" 
        className="btn-black inline-flex items-center gap-2 px-8 py-4 uppercase tracking-widest text-xs hover:bg-gray-800 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Error;
