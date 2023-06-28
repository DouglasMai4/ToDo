import { ChangeEvent } from 'react';

import styles from './input.module.scss';

type Props = {
  type: string,
  id: string,
  label: string,
  placeholder: string,
  value: string,
  minLength?: number,
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void,
}

export default function Input({ type, id, label, placeholder, value, handleInput, minLength }: Props) {
  return (
    <label
      htmlFor={ id }
      className={ styles.label }
    >
      <span className={ styles.labelText }>{label}</span>
      <input
        id={ id }
        type={ type }
        placeholder={ placeholder }
        className={ styles.input }
        value={ value }
        onChange={ handleInput }
        minLength={ minLength }
      />
    </label>
  )
}
