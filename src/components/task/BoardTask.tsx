import React, { useState, useEffect } from "react";
import useMenu from "@/hooks/useMenu";
import { TaskWithAssignee } from "@/types/types";
import { getInitials } from "../UI/UserCard";
import { useDeleteTask, useUpdateTask } from "@/hooks/TaskHooks";
import { taskPriorityClassName } from "./OneTaskRow";
import { format } from "date-fns";
import EditTaskModal from "./EditTaskModal";
import { useModalStore, useUserStore } from "store/user";
import ReactDatePicker from "react-datepicker";
import { Client, User } from "@prisma/client";
import { useWorkspaceMembers } from "@/hooks/WorkspaceHooks";
import usePlaceHolder from "@/hooks/usePlaceHolder";

export const formatDueDate = (taskDueDate: Date) => {
  return format(new Date(taskDueDate), "MMM dd");
};

const BoardTask = ({ task }: { task: TaskWithAssignee }) => {
  // Todo: Add updation mudations
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  const { mutate: deleteTask } = useDeleteTask();
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const [dueDate, setDueDate] = useState(
    task.dueDate ? new Date(task.dueDate).toLocaleDateString() : new Date()
  );

  return (
    <>
      {isTaskDetailOpen && (
        <EditTaskModal
          task={task}
          isOpen={isTaskDetailOpen}
          setIsOpen={setIsTaskDetailOpen}
        />
      )}

      <div
        className="board-task"
        key={task.id}
        onClick={() => {
          setIsTaskDetailOpen(true);
        }}
      >
        <div className="board-task__header">
          <div className="board-task__name">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="check-icon"
            >
              <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{task.name}</span>
          </div>
          <div
            className={`header__more-btn-container ${
              isMenuOpen ? "active" : ""
            }`}
          >
            <div
              ref={btnRef}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="board-task__more-btn"
              role="button"
            >
              <svg className="board-task__more-icon" viewBox="0 0 16 16">
                <path d="M2,6C0.896,6,0,6.896,0,8s0.896,2,2,2s2-0.896,2-2S3.104,6,2,6z M8,6C6.896,6,6,6.896,6,8s0.896,2,2,2s2-0.896,2-2  S9.104,6,8,6z M14,6c-1.104,0-2,0.896-2,2s0.896,2,2,2s2-0.896,2-2S15.104,6,14,6z" />
              </svg>
              <div
                className={`board-task__edit-menu ${
                  isMenuOpen ? "board-task__edit-menu--active" : ""
                }`}
                ref={menuRef}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <div
                  className="board-task__edit-menu-item"
                  onClick={() => {
                    setIsTaskDetailOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  Edit task
                </div>
                <div
                  className="board-task__edit-menu-item board-task__edit-menu-item--delete"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsMenuOpen(false);
                    deleteTask(task.id);
                  }}
                >
                  Delete task
                </div>
              </div>
            </div>
          </div>
        </div>

        <ul className="tag-list">
          {task.tags
            ? task.tags.map((tag) => (
                <li className="tag" key={tag.id}>
                  {tag.name}
                </li>
              ))
            : null}
        </ul>

        <div className="footer">
          <div className="footer__priority">
            <span className={`${taskPriorityClassName(task.priority)}`}>
              {task.priority}
            </span>
          </div>

          <div className="buttons">
            {task.dueDate === null ? (
              <DateButton task={task} date={dueDate} setDate={setDueDate} />
            ) : (
              <DateFilledButton
                task={task}
                date={dueDate}
                setDate={setDueDate}
              />
            )}
            {task.assignee === null ? (
              <AssigneeButton task={task} />
            ) : (
              <AssigneeFilledButton task={task} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardTask;

export const DateButton = ({
  task,
  date,
  setDate,
}: {
  task: TaskWithAssignee;
  date: any;
  setDate: (date: any) => void;
}) => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  const { mutate: updateTask } = useUpdateTask();

  return (
    <div className="date-button">
      <div className="menu-button menu-button-container ">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsMenuOpen((state) => !state);
          }}
          ref={btnRef}
          className="menu-button"
        >
          <div className="board-task__date--empty">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            <div className="board-task__add-date"></div>
          </div>
        </button>

        {isMenuOpen && (
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="menu"
            ref={menuRef}
          >
            <ReactDatePicker
              value={date}
              selected={new Date(date)}
              onChange={(dueDate) => {
                updateTask({
                  taskId: task.id,
                  taskData: {
                    dueDate: dueDate,
                  },
                });
                setDate(new Date(dueDate!));
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const DateFilledButton = ({
  task,
  date,
  setDate,
}: {
  task: TaskWithAssignee;
  date: any;
  setDate: (date: any) => void;
}) => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  const { mutate: updateTask } = useUpdateTask();

  return (
    <div className="date-button">
      <div className="menu-button menu-button-container ">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsMenuOpen((state) => !state);
          }}
          ref={btnRef}
          className="menu-button"
        >
          <div className="board-task__date">
            <span>{formatDueDate(date)}</span>
          </div>
        </button>

        {isMenuOpen && (
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="menu"
            ref={menuRef}
          >
            <ReactDatePicker
              value={date}
              selected={new Date(date)}
              onChange={(dueDate) => {
                setDate(new Date(dueDate!));
                updateTask({
                  taskId: task.id,
                  taskData: {
                    dueDate: dueDate,
                  },
                });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export const AssigneeButton = ({ task }: { task: TaskWithAssignee }) => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  const [selectedAssignee, setSelectedAssignee] = useState<User | null>(
    task ? task.assignee : null
  );

  const { mutate: updateTask } = useUpdateTask();

  const updateAssignee = () => {
    updateTask({
      taskId: task.id,
      taskData: {
        assigneeId: selectedAssignee ? selectedAssignee.id : null,
      },
    });
  };

  const userId = useUserStore((state) => state.userId);

  return (
    <div className="board-task__assignee-container">
      <div
        ref={btnRef}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsMenuOpen(!isMenuOpen);
        }}
        className="board-task__assignee--empty"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      </div>
      {isMenuOpen && (
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="board-task__add-assignee"
          ref={menuRef}
        >
          <div
            className="close"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsMenuOpen(false);
            }}
          >
            <svg className="task-detail__icon" viewBox="0 0 320.591 320.591">
              <g>
                <g>
                  <path d="m30.391 318.583c-7.86.457-15.59-2.156-21.56-7.288-11.774-11.844-11.774-30.973 0-42.817l257.812-257.813c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875l-259.331 259.331c-5.893 5.058-13.499 7.666-21.256 7.288z" />
                  <path d="m287.9 318.583c-7.966-.034-15.601-3.196-21.257-8.806l-257.813-257.814c-10.908-12.738-9.425-31.908 3.313-42.817 11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414-6.35 5.522-14.707 8.161-23.078 7.288z" />
                </g>
              </g>
            </svg>
          </div>
          <div className="content">
            <div>Assignee</div>
            <div className="assignee-form">
              <label className="label">
                <AssigneeMenu
                  selectedAssignee={selectedAssignee}
                  setSelectedAssignee={setSelectedAssignee}
                  taskId={task.id}
                />
              </label>
              <span>or</span>

              <button
                className="button"
                onClick={() => {
                  updateTask({
                    taskId: task.id,
                    taskData: {
                      assigneeId: userId,
                    },
                  });
                }}
              >
                Assign to me
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export const AssigneeFilledButton = ({ task }: { task: TaskWithAssignee }) => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  const [selectedAssignee, setSelectedAssignee] = useState<User | null>(
    task.assignee
  );

  const { mutate: updateTask } = useUpdateTask();

  const updateAssignee = () => {
    updateTask({
      taskId: task.id,
      taskData: {
        assigneeId: selectedAssignee ? selectedAssignee.id : null,
      },
    });
  };

  const userId = useUserStore((state) => state.userId);

  return (
    <div className="board-task__assignee-container">
      <div
        ref={btnRef}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsMenuOpen(!isMenuOpen);
        }}
        className="board-task__assignee"
      >
        <div className="board-task__assignee">
          <span>{getInitials(task.assignee.name!)}</span>
        </div>
      </div>
      {isMenuOpen && (
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="board-task__add-assignee"
          ref={menuRef}
        >
          <div
            className="close"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsMenuOpen(false);
            }}
          >
            <svg className="task-detail__icon" viewBox="0 0 320.591 320.591">
              <g>
                <g>
                  <path d="m30.391 318.583c-7.86.457-15.59-2.156-21.56-7.288-11.774-11.844-11.774-30.973 0-42.817l257.812-257.813c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875l-259.331 259.331c-5.893 5.058-13.499 7.666-21.256 7.288z" />
                  <path d="m287.9 318.583c-7.966-.034-15.601-3.196-21.257-8.806l-257.813-257.814c-10.908-12.738-9.425-31.908 3.313-42.817 11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414-6.35 5.522-14.707 8.161-23.078 7.288z" />
                </g>
              </g>
            </svg>
          </div>
          <div className="content">
            <div>Assignee</div>
            <div className="assignee-form">
              <label className="label">
                <AssigneeMenu
                  selectedAssignee={selectedAssignee}
                  setSelectedAssignee={setSelectedAssignee}
                  taskId={task.id}
                />
              </label>
              <span>or</span>

              <button
                className="button"
                onClick={() => {
                  updateTask({
                    taskId: task.id,
                    taskData: {
                      assigneeId: userId,
                    },
                  });
                }}
              >
                Assign to me
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const AssigneeMenu = ({
  selectedAssignee,
  setSelectedAssignee,
  taskId,
}: {
  selectedAssignee: User;
  setSelectedAssignee: any;
  taskId: string;
}) => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  const [searchMember, setSearchMember] = useState(
    selectedAssignee ? selectedAssignee.name : ""
  );
  const { members, status } = useWorkspaceMembers();
  const [filteredMembers, setFilteredMembers] = useState<User[] | null>(null);
  const { isInputFocused, setIsInputFocused, handleInputBlur, inputRef } =
    usePlaceHolder({ blurHandler: () => {} });

  useEffect(() => {
    setFilteredMembers(() => {
      if (members) {
        const newFilteredMembers = members.filter((member) => {
          return member
            .name!.toLocaleLowerCase()
            .includes(searchMember!.trim().toLocaleLowerCase());
        });

        return newFilteredMembers as User[];
      }
    });
  }, [selectedAssignee, searchMember, members]);

  const { mutateAsync: updateTask } = useUpdateTask();

  return (
    <div className="new-project__client menu-container data-selected">
      <div
        role="button"
        ref={btnRef}
        className="menu-button"
        onClick={() => setIsMenuOpen((state) => !state)}
      >
        {/* Placeholder */}
        {selectedAssignee && !isInputFocused && (
          <div
            className="client-placeholder"
            onClick={() => {
              setIsInputFocused(true);
            }}
          >
            <span>{selectedAssignee.name}</span>
            <button
              aria-label="Remove assignee"
              onClick={() => {
                updateTask({
                  taskId: taskId,
                  taskData: {
                    assigneeId: "remove",
                  },
                });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="remove-icon"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Input text */}
        {isInputFocused && (
          <input
            ref={inputRef}
            value={searchMember!}
            onChange={(e) => {
              setSearchMember(e.target.value);
            }}
            onBlur={handleInputBlur}
            className="form__input"
            id="name"
            type="text"
            placeholder="John Smith"
            autoComplete="off"
          />
        )}
        {/* Empty */}
        {!isInputFocused && !selectedAssignee && (
          <input
            ref={inputRef}
            value={searchMember!}
            onChange={(e) => {
              setSearchMember(e.target.value);
            }}
            onBlur={handleInputBlur}
            className="form__input"
            id="name"
            type="text"
            placeholder="Rob Daniels"
            autoComplete="off"
          />
        )}
      </div>
      {isMenuOpen && (
        <div
          className="menu"
          ref={menuRef}
          onClick={(e) => {
            setIsMenuOpen(false);
          }}
        >
          {/* Filters first using the input name */}
          {filteredMembers!.map((client) => (
            <div
              className="item"
              key={client.id}
              onClick={() => {
                setSelectedAssignee(client);
                updateTask({
                  taskId: taskId,
                  taskData: {
                    assigneeId: client ? client.id : null,
                  },
                });
                setIsMenuOpen(false);
              }}
            >
              <span className="item__name"> {client.name}</span>
            </div>
          ))}

          {filteredMembers?.length === 0 && (
            <div className="item">
              <span className="item__name">No client found</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
