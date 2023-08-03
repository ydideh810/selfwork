import { SectionWithTasks, TaskWithAssignee } from "@/types/types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useMenu from "@/hooks/useMenu";
import { useDeleteSection, useUpdateSection } from "@/hooks/SectionHooks";
import BoardNewTask from "./BoardNewTask";
import BoardTask from "./BoardTask";
import { useCreateTask } from "@/hooks/TaskHooks";
import { XYCoord, useDrag, useDrop } from "react-dnd";

interface Board {
  title: string;
  section: SectionWithTasks;
  tasks: TaskWithAssignee[];
  moveBoard: (dragIndex: number, hoverIndex: number) => void;
  isUserAssignedSection?: boolean;
  // index: number;
}

const Board: React.FC<Board> = ({
  title,
  section,
  tasks,
  moveBoard,
  isUserAssignedSection = false,
  // index,
}) => {
  const { mutate: createTask } = useCreateTask();

  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  const {
    btnRef: newTaskBtnRef,
    isMenuOpen: isNewTaskOpen,
    menuRef: newTaskRef,
    setIsMenuOpen: setNewTaskOpen,
  } = useMenu(async () => {
    if (newTaskName.trim().length > 0) {
      createTask({
        name: newTaskName,
        sectionId: section.id,
        description: "",
        assignee: null,
        priority: null,
      });
    }
  });

  const { mutate: deleteSection } = useDeleteSection();

  const [newTaskName, setNewTaskName] = useState("");

  const [oldName, setOldName] = useState(title);
  const [sectionInputName, setSectionInputName] = useState(title);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);
  const { mutate: updateSection } = useUpdateSection();

  const focusOnInput = () => {
    // @ts-ignore
    inputRef.current!.focus();
  };

  useEffect(() => {
    if (isInputFocused === true) {
      focusOnInput();
    }
  }, [isInputFocused]);

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let trimmedName = e.currentTarget.value.trim();
    if (trimmedName.length === 0) {
      trimmedName = "Untitled Section";
    }
    if (oldName === trimmedName) {
      setSectionInputName(trimmedName);
      // console.log("NOPE");
      setIsInputFocused(false);
      return;
    } else {
      updateSection({
        sectionId: section.id,
        sectionData: { name: trimmedName },
      });
      setSectionInputName(trimmedName);
      setOldName(trimmedName);
    }
    // Switches to display button
    setIsInputFocused(false);
  };

  //********* THIS IS FOR REORDERING BOARDS ********/
  // Sorting Board
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: "Board",
    // Props to collect

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      handlerId: monitor.getHandlerId(),
      highlighted: monitor.canDrop(),
    }),

    hover(item: any, monitor) {
      console.log("ITEM: ", item);
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = section.order!;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex) {
        moveBoard(dragIndex, hoverIndex);
        item.index = hoverIndex;
        console.log("CANCEL 1");
        return;
      }
      // Moving LEFT
      if (dragIndex > hoverIndex) {
        moveBoard(dragIndex, hoverIndex);
        item.index = hoverIndex;
        console.log("CANCEL 2");
        return;
      }

      return;
    },
  }));

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "Board",
    item: () => {
      return { boardId: section.id, index: section.order };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  drag(drop(ref));

  return (
    <div className="board" ref={ref}>
      <div className="board-title">
        <div className="name">
          {isInputFocused ? (
            <input
              ref={inputRef}
              className="section__name-input"
              autoComplete="off"
              type="text"
              name="name"
              placeholder="New Section"
              value={sectionInputName}
              onChange={(e) => {
                setSectionInputName(e.currentTarget.value);
              }}
              onBlur={handleInputBlur}
            />
          ) : (
            <div
              className="section__input-placeholder"
              role="button"
              onClick={() => {
                setIsInputFocused(true);
              }}
            >
              {sectionInputName}
            </div>
          )}
        </div>
        {/* MORE BUTTON */}
        <div
          className={`board__more-btn-container ${isMenuOpen ? "active" : ""}`}
        >
          <div
            ref={btnRef}
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="board__more-btn"
            role="button"
          >
            <svg className="board-card__more-icon" viewBox="0 0 16 16">
              <path d="M2,6C0.896,6,0,6.896,0,8s0.896,2,2,2s2-0.896,2-2S3.104,6,2,6z M8,6C6.896,6,6,6.896,6,8s0.896,2,2,2s2-0.896,2-2  S9.104,6,8,6z M14,6c-1.104,0-2,0.896-2,2s0.896,2,2,2s2-0.896,2-2S15.104,6,14,6z" />
            </svg>
          </div>
          {isMenuOpen && (
            <div
              className={`menu ${isMenuOpen ? "active" : ""}`}
              ref={menuRef}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <button
                className={`item ${
                  isUserAssignedSection ? "item--disabled" : ""
                }`}
                onClick={() => {
                  setIsMenuOpen(false);
                  deleteSection(section.id);
                }}
                disabled={isUserAssignedSection}
              >
                Delete section
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="board-task-list">
        {tasks && tasks.map((task) => <BoardTask key={task.id} task={task} />)}
        {isNewTaskOpen && (
          <BoardNewTask
            forwardRef={newTaskRef}
            name={newTaskName}
            setName={setNewTaskName}
            setNewTaskOpen={setNewTaskOpen}
          />
        )}

        <div
          ref={newTaskBtnRef}
          role="button"
          className="board-add-task"
          onClick={() => {
            if (newTaskName.trim().length > 0) {
              createTask({
                name: newTaskName,
                sectionId: section.id,
                description: "",
                assignee: null,
                priority: null,
              });
            }
            setNewTaskOpen((state) => !state);
          }}
        >
          <svg
            fill="currentColor"
            className="sidebar__add-icon"
            viewBox="0 0 24 24"
          >
            <path d="m12 6a1 1 0 0 0 -1 1v4h-4a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2h-4v-4a1 1 0 0 0 -1-1z" />
          </svg>
          <span>Add Task</span>
        </div>
      </div>
    </div>
  );
};

export default Board;
