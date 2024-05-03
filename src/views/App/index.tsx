import React from "react";

import { useTodoStore } from "../../data/store/usetodoStore";

import styles from "./index.module.scss";

import { InputPlus } from "../components/InputPlus";
import { InputTask } from "../components/InputTask";

export const App: React.FC = () => {
  const [tasks, createTask, updateTask, removeTask] = useTodoStore((state) => [
    state.tasks,
    state.createTask,
    state.updateTask,
    state.removeTask,
  ]);

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>To Do App</h1>
      <section className={styles.articleSection}>
        <InputPlus
          onAdd={(title) => {
            if (title) {
              createTask(title);
            }
          }}
        />
      </section>
      <section className={styles.articleSection}>
        {tasks.length > 0 ? (
          tasks.map((task) => {
            return (
              <InputTask
                title={task.title}
                id={task.id}
                key={task.createdAt}
                onDone={removeTask}
                onEdited={updateTask}
                onRemoved={removeTask}
              />
            );
          })
        ) : (
          <p className={styles.articleText}>There is no one task</p>
        )}
      </section>
    </article>
  );
};
