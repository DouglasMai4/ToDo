import { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const getUser = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session?.user) {
      setUser(data.session.user);
      return;
    }

    return redirect('/login');
  };
  
  useEffect(() => {
    try {
      getUser();
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <>
      <h1>Todo</h1>
      <h2>
        {user && user.user_metadata.username}
      </h2>
    </>
  )
}