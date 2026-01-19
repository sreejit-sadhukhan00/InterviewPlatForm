import { useState } from 'react'
import './App.css'
import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/clerk-react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <SignedOut>
      <h1></h1>
      <SignInButton
       mode='model'
      />
     </SignedOut>

     <SignedIn>
      <SignOutButton/>
     </SignedIn>
    </>
  )
}

export default App
