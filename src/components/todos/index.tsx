import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { supabase } from '../../supabaseClient'

import Input from '../input';
import Task from '../task';

import styles from './todos.module.scss';

type Props = {
  userId: string,
}

export default function TodosContainer({ userId }: Props) {
  const [title, setTitle] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [tasks, setTasks] = useState(['']);

  useEffect(() => {
    const getTodos = async () => {
      const { data } = await supabase
                              .from('Todo')
                              .select('*')
                              .eq('user', userId);
      setTasks(data || []);
    }

    getTodos();
  }, [userId]);

  const addTodo = async () => {
    const { data, error } = await supabase
      .from('Todo')
      .insert([
        { title: title, finished: false, user: userId },
      ])
      .select();
      
      if (!error) {
        setTasks((prev) => ({
          ...prev,
          data,
        }));
      }
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

  const generateElements = () => (
    tasks.map((task, index) => (
      <Task
        key={ index }
        id={ Object(task).id }
        title={ Object(task).title }
        finished={ Object(task).finished }
      />
    ))
  )

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
        <button
          type="submit"
          disabled={ title.length === 0 }
        >
          Adicionar
        </button>
      </form>

      <hr />

      {
        !tasks ? <h2>Nenhuma tarefa adicionada</h2> : generateElements()
      }
    </section>
  )
}