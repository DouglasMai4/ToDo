import { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';
import { Icon } from '@iconify-icon/react';

import { supabase } from '../../supabaseClient';

import TodosContainer from '../../components/todos';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    id: '',
  });

  const getUser = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        // console.log(data.session.user);
        setUser(data.session.user);
        return;
      }

      return redirect('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {
        loading && (
          <Icon icon="svg-spinners:pulse-2" />
        )
      }
      {
        !loading && (
          <TodosContainer
            userId={user.id}
          />
        )
      }
    </>
  )
}