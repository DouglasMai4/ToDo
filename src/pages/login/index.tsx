import { useState, ChangeEvent, FormEvent } from 'react';

import Input from '../../components/input';

import styles from './login.module.scss';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <h1>Login</h1>

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

      <button
        type="submit"
        className={styles.button}
      >
        Entrar
      </button>
    </form>
  )
}