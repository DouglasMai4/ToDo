import { useState, ChangeEvent, FormEvent } from 'react';

import Input from '../../components/input';

import styles from './login.module.scss';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!username) {
      setErrorMsg({
        username: 'Usuário é obrigatório!',
        password: '',
      });
      return;
    }

    if (password.length < 6) {
      setErrorMsg({
        username: '',
        password: 'A senha deve ter o tamanho de >= 6!',
      });
      return;
    }

    setErrorMsg({
      username: '',
      password: '',
    });
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
      {errorMsg.username && (
        <span className={ styles.errorMsg }>{errorMsg.username}</span>
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
    </form>
  )
}