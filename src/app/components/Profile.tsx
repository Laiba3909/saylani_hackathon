'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface ProfileProps {
  user_prop: User;
}


interface User {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  designation: string;
}

const Profile = ({user_prop}:ProfileProps) => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/user/${id}`);
      const data = await res.json();
      setUser(data.user);
    };
    if (id) fetchUser();
  }, [id]);

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="p-6 bg-white shadow rounded-lg w-full">
      <h2 className="text-xl font-semibold text-blue-900 mb-4">Profile</h2>
      <ul className="text-gray-700 space-y-2">
        <li><strong>ID:</strong> {user._id}</li>
        <li><strong>Full Name:</strong> {user.fullName}</li>
        <li><strong>Email:</strong> {user.email}</li>
        <li><strong>Phone:</strong> {user.phone}</li>
        <li><strong>Address:</strong> {user.address}</li>
        <li><strong>Designation:</strong> {user.designation}</li>
     
      </ul>
    </div>
  );
};

export default Profile;
