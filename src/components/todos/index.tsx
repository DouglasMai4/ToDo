import { useEffect, useState, ChangeEvent, FormEvent, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify-icon/react';

import { supabase } from '../../supabaseClient';

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

  const getTodos = useCallback(async () => {
    const { data } = await supabase
                            .from('Todo')
                            .select('*')
                            .eq('user', userId);
    setTasks(data || []);
  }, [userId]);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const addTodo = async () => {
    const { error } = await supabase
      .from('Todo')
      .insert([
        { title: title, finished: false, user: userId },
      ])
      
      if (!error) {
        getTodos();
      }
  }
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title) {
      setErrorMsg('Título é obrigatório');
      return
    }

    setErrorMsg('');
    setTitle('');
    addTodo();
  };

  const handleCheck = async (id: number, finished: boolean) => {
    await supabase
      .from('Todo')
      .update({ 'finished': !finished })
      .eq('id', id)
      .select()
    getTodos();
  }

  const handleDelete = async (id: number) => {
    await supabase
      .from('Todo')
      .delete()
      .eq('id', id)

    getTodos();
  }

  const generateElements = () => (
    tasks.map((task, index) => (
      <Task
        key={ index }
        id={ Object(task).id }
        title={ Object(task).title }
        finished={ Object(task).finished }
        handleCheck={ handleCheck }
        handleDelete={ handleDelete }
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

      <div className={ styles.tasks }>
        {
          tasks.length === 0 ? <h2>Nenhuma tarefa adicionada</h2> : generateElements()
        }
      </div>

      <Link className={ styles.account } to="/account">
        <Icon icon="fa6-regular:user" />
      </Link>
    </section>
  )
}