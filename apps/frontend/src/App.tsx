import React from 'react'

export const App = () => {
  return (
    <div>
      <button onClick={async () => {
        const response = await fetch('/api');
        const data = await response.text();
        console.log(data);
        
      }}>Click me</button>
    </div>
  )
}
