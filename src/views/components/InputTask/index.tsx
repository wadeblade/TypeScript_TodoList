import React, { useEffect, useRef, useState } from "react";

import styles from "./index.module.scss";

interface InputTaskProps {
  id: string;
  title: string;
  onDone: (id: string) => void;
  onEdited: (id: string, value: string) => void;
  onRemoved: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({
  id,
  title,
  onDone,
  onEdited,
  onRemoved,
}) => {
  const [checked, setChecked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState("Зміна завдання");

  const editTitleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditMode) {
      editTitleInputRef?.current?.focus();
    }
  }, [isEditMode]);

  return (
    <div className={styles.inputTask}>
      <label className={styles.inputTaskLabel}>
        <input
          type="checkbox"
          disabled={isEditMode}
          className={styles.inputTaskCheckbox}
          checked={checked}
          onChange={(event) => {
            setChecked(event.target.checked);
            if (event.target.checked) {
              onDone(id);
            }
          }}
        />
        {isEditMode ? (
          <input
            type="text"
            value={value}
            ref={editTitleInputRef}
            onChange={(event) => {
              setValue(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key == "Enter") {
                onEdited(id, value);
                setIsEditMode(false);
              }
            }}
            className={styles.inputTaskTitleEdit}
          />
        ) : (
          <h3 className={styles.inputTaskTitle}>{title}</h3>
        )}
      </label>

      {isEditMode ? (
        <button
          aria-label="Save"
          className={styles.inputTaskSave}
          onClick={() => {
            onEdited(id, value);
            setIsEditMode(false);
          }}
        />
      ) : (
        <button
          aria-label="Edit"
          className={styles.inputTaskEdit}
          onClick={() => {
            setIsEditMode(true);
          }}
        />
      )}
      <button
        aria-label="Delete"
        className={styles.inputTaskRemove}
        onClick={() => {
          if (confirm("Are you sure?")) {
            onRemoved(id);
          }
        }}
      />
    </div>
  );
};
