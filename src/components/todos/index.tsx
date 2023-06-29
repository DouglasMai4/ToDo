import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { supabase } from '../../supabaseClient'
import Input from '../input';

import styles from './todos.module.scss';

type Props = {
  userId: string,
}

export default function TodosContainer({ userId }: Props) {
  const [title, setTitle] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const getTodos = async () => {
    const { data } = await supabase
                            .from('Todo')
                            .select('*')
                            .eq('user', userId);
    console.log(data);
  }

  useEffect(() => {
    getTodos();
  });

  const addTodo = async () => {
    const { data, error } = await supabase
      .from('Todo')
      .insert([
        { title: title, finished: false, user: userId },
      ])
      .select();

      console.log('Data: ', data);
      console.log('Error: ', error);
      
  }
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title) {
      setErrorMsg('Título é obrigatório');
      return
    }

    setErrorMsg('');

    addTodo();
  };

  return (
    <section className={ styles.container }>
      <h1>Todos</h1>
      <form onSubmit={ handleSubmit }>
        <Input
          id="title"
          type="text"
          label="Tarefa"
          placeholder="Lavar a louça"
          value={ title }
          handleInput={ (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value);
          }}
        />
        {errorMsg && (
          <span className={ styles.errorMsg }>{errorMsg}</span>
        )}
        <button type="submit">Adicionar</button>
      </form>
    </section>
  )
}