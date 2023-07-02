import styles from './task.module.scss';

type Props = {
  id: number,
  title: string,
  finished: boolean,
  handleCheck: (id: number, finished: boolean) => void,
  handleDelete: (id: number) => void,
}

export default function Task({ id, title, finished, handleCheck, handleDelete }: Props) {
  return (
    <div
      id={ String(id) }
      className={ styles.task }
    >
      <span
        className={ finished ? styles.finished : '' }
      >
        {title}
      </span>
      <button
        className={ styles.check }
        onClick={ () => handleCheck(id, finished) }
      >
        C
      </button>
      <button
        className={ styles.delete }
        onClick={ () => handleDelete(id) }
      >
        D
      </button>
    </div>
  )
}