'use client';

import clsx from "clsx";

const Home = () => {

  return (
    <div className={clsx(
      'w-full h-full flex flex-col', 
    
    )}>
    <div className="h-16 bg-zinc-700 flex justify-center items-center text-white font-bold text-3xl shadow-md">
      <h3>Dashboard</h3>
    </div>
    </div>
  )
}

export default Home;
