'use client';
import { useState, useEffect } from 'react';

const CheckIn = () => {
  const [loginTime, setLoginTime] = useState('');
  

  useEffect(()=>{
    const now = new Date();
    const formatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLoginTime(formatted);
  })
   

  return (
   
      <div className="space-y-4">
        <p className="text-gray-700">You logged in at: <strong>{loginTime}</strong></p>
      
      </div>
  
  );
};

export default CheckIn;
