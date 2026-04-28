'use client';

import styles from '@styles/page.module.css';
import { v4 as uuidv4 } from 'uuid';
import { useAtom } from 'jotai';
import { useRef } from 'react';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

const storage = createJSONStorage<{id: string; todo: string}[]>(() => localStorage);
const todoListAtom = atomWithStorage<{id: string; todo: string}[]>('todoList', [], storage);

export default function Index() {
  const [todoList, setTodoList] = useAtom(todoListAtom);
  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = () => {
    const inputValue = inputRef.current?.value.trim();
    if (!inputValue)
      return;

    setTodoList(todoList.concat({ id: uuidv4(), todo: inputValue }));
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.input}>
          <input ref={inputRef} placeholder='Type TODO...' />
          <button onClick={addTodo}>Add</button>
        </div>
        <hr />
        <div className={styles.list}>
          {
            todoList.map((item) => (
              <div key={item.id} className={styles.todo}>
                <span>{item.todo}</span>
                <button
                  onClick={() => setTodoList(todoList.filter(todo => todo.id !== item.id))}
                  className={styles.delete}
                >
                  Delete
                </button>
              </div>
            ))
          }
        </div>
      </main>
    </div>
  );
}
