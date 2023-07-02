import styles from './task.module.scss';

type Props = {
  id: number,
  title: string,
  finished: boolean,
}

export default function Task({ id, title, finished }: Props) {
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
      <button>
        C
      </button>
      <button>
        D
      </button>
    </div>
  )
}