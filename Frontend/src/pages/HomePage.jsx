import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'
import React from 'react'
import toast from 'react-hot-toast'

const HomePage = () => {
  return ( 
    <>
    <div>HomePage</div> 
     <button onClick={()=>toast.success("hey its working")}>click me</button>
      <SignedOut>
           <SignInButton mode='modal'>
              <button>
                   Log In
                 </button>
           </SignInButton>
      </SignedOut>

         <SignedIn>
             <SignInButton mode='modal'/>
         </SignedIn>
    </>
  )
}

export default HomePage