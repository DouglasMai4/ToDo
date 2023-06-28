import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, redirect } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

import Input from '../../components/input';

import styles from './register.module.scss';

export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState({
    email: '',
    username: '',
    password: '',
    register: '',
  });

  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });
    
    if (!error) {
      return redirect('/login');
    }
    
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!username) {
      setErrorMsg({
        email: '',
        username: 'Usuário é obrigatório!',
        password: '',
        register: '',
      });
      return;
    }

    if (!email) {
      setErrorMsg({
        email: 'Email é obrigatório!',
        username: '',
        password: '',
        register: '',
      });
      return;
    }

    if (password.length < 6) {
      setErrorMsg({
        email: '',
        username: '',
        password: 'A senha deve ter o tamanho de >= 6!',
        register: '',
      });
      return;
    }

    setErrorMsg({
      email: '',
      username: '',
      password: '',
      register: '',
    });

    signUp();
  }

  return (
    <>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <h1>Cadastrar</h1>

        <Input
          id="username"
          type="text"
          label="Usuário"
          placeholder="DouglasMai4"
          value={ username }
          handleInput={ (e: ChangeEvent<HTMLInputElement>) => {
            setUsername(e.currentTarget.value);
          }}
        />
        {errorMsg.username && (
          <span className={ styles.errorMsg }>{errorMsg.username}</span>
        )}

<Input
          id="email"
          type="email"
          label="Email"
          placeholder="exemplo@email.com"
          value={ email }
          handleInput={ (e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.currentTarget.value);
          }}
        />
        {errorMsg.email && (
          <span className={ styles.errorMsg }>{errorMsg.email}</span>
        )}

        <Input
          id="password"
          type="password"
          label="Senha"
          placeholder="********"
          minLength={ 6 }
          value={ password }
          handleInput={ (e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.currentTarget.value);
          }}
        />
        {errorMsg.password && (
          <span className={ styles.errorMsg }>{errorMsg.password}</span>
        )}

        <button
          type="submit"
          className={styles.button}
        >
          Registrar
        </button>

        <span className={ styles.errorMsg }>{errorMsg.register}</span>
      </form>

      <section className={styles.container}>
        Já possuí uma conta?
        Então <Link to="/login">Clique Aqui</Link> faça login!
      </section>
    </>
  )
}