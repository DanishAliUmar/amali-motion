import React from 'react';

export default function Loader() {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600"></div>
    </div>
  );
}



// height: 500%;
// filter: blur(15px);
// object-position: 0 129%;