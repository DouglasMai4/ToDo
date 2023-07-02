import { useEffect, useState } from 'react';

import { supabase } from '../../supabaseClient';

import styles from './account.module.scss';

export default function Account() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      console.log(user);

      setUsername(user?.user_metadata.username);
      setEmail(user?.email || '');
    }

    getUser();
  }, [])
  return (
    <>
      <section className={ styles.container }>
        <h1>Conta</h1>
        <div>
          <h2>Informações</h2>

          <h3>Nome de Usuário: <span>{username}</span></h3>
          <h3>Email: <span>{email}</span></h3>
        </div>

        <button>
          Sair
        </button>
      </section>
    </>
  )
}