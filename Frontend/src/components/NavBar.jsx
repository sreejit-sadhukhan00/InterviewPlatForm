import { UserButton } from '@clerk/clerk-react';
import { BookOpen, BookOpenIcon, LayoutDashboardIcon, SparkleIcon, SparklesIcon } from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router'

function NavBar() {
    const location=useLocation();

    console.log(location.pathname);
const isActive=(path)=>{
    return location.pathname===path;
};

  return (
    <nav className='bg-base-100/70 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50
    shadow-lg'>
         <div className='max-w-7xl mx-auto p-4 flex items-center justify-between '>
             {/* LOGO */}
             <Link to="/" 
              className='group flex items-center gap-3 hover:scale-105 transition-transform duration-200 '
             >
                  <div className='size-10 bg-linear-to-r from-primary via-secondary to-accent flex items-center shadow-lg rounded-xl'>
                     <SparklesIcon className='size-6 text-white'/>
                  </div>

                  <div className='flex flex-col'>
                    <span
                  className="font-black 
                     bg-linear-to-r from-primary via-secondary to-accent text-2xl  bg-clip-text text-transparent font-mono tracking-wider"
                >
                  Interview Platform
                </span>
                <span className="text-xs text-base-content/60 font-medium -mt-1">
                  Code Together
                </span>
                  </div>
              </Link>

              <div  className='flex items-center gap-1'>
                    {/* problems page link  */}
                    <Link to={'/problem'}
                    className={`px-4 py-2.6 rounded-lg transition-all duration-200 
                        ${isActive("/problem")?"bg-primary text-primary-content":"hover:bg-base-200 text-base-content/70 hover:text-base-content"}
                        `}
                    >
                         <div className='flex items-center gap-x-2.5 p-2'>
                              <BookOpenIcon className='size-4'/>
                              <span className=' hidden sm:inline font-mono text-lg font-bold'>Problems</span>
                         </div>
                     </Link>
                   {/* dashboard page link  */}

                    <Link to={'/dashboard'}
                    className={`px-4 py-2.6 rounded-lg transition-all duration-200 
                        ${isActive("/dashboard")?"bg-primary text-primary-content":"hover:bg-base-200 text-base-content/70 hover:text-base-content"}
                        `}
                    >
                         <div className='flex items-center gap-x-2.5 p-2'>
                              <LayoutDashboardIcon className='size-4'/>
                              <span className=' hidden sm:inline font-mono text-lg font-bold'>Dashboard</span>
                         </div>
                     </Link>

                     <div className='ml-3 mt-2'>
                         
                     <UserButton/>
                     </div>
                         
              </div>
         </div>
    </nav>
  )
}

export default NavBar;