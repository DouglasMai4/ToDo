import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, redirect } from "react-router-dom";

import { supabase } from '../../supabaseClient';

import Input from '../../components/input';

import styles from './login.module.scss';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState({
    email: '',
    password: '',
    login: '',
  });

  const signIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!data.user || error) {
        setErrorMsg((prev) => ({
          ...prev,
          login: 'Não foi possível entrar, por favor verifique seu email ou tente novamente mais tarde',
        }));
      }

      return redirect('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setErrorMsg((prev) => ({
        ...prev,
        email: 'Email é obrigatório!',
      }));
      return;
    }

    if (password.length < 6) {
      setErrorMsg((prev) => ({
        ...prev,
        password: 'A senha deve ter o tamanho de >= 6!',
      }));
      return;
    }

    setErrorMsg({
      email: '',
      password: '',
      login: '',
    });

    signIn();
  }

  return (
    <>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <h1>Login</h1>

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
          Entrar
        </button>

        {errorMsg.login && (
          <span className={ styles.errorMsg }>{errorMsg.login}</span>
        )}
      </form>

      <section className={styles.container}>
        Não possuí uma conta?
        Sem problemas <Link to="/register">Clique Aqui</Link> e crie sua conta!
      </section>
    </>
  )
}