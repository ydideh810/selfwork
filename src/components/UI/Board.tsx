import { TaskWithAssignee } from "@/types/types";
import React from "react";
import { getInitials } from "./UserCard";
import useMenu from "@/hooks/useMenu";
import { useDeleteSection } from "@/hooks/SectionHooks";
import BoardTask from "./BoardTask";

interface Board {
  title: string;
  id: string;
  tasks: TaskWithAssignee[];
}

const Board: React.FC<Board> = ({ title, id, tasks }) => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  const { mutate: deleteSection } = useDeleteSection();
  return (
    <div className="board">
      <div className="board-title">
        <div className="name">{title}</div>
        <div className="board__more-btn-container">
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
          <div
            className={`board-card__edit-menu ${
              isMenuOpen ? "board-card__edit-menu--active" : ""
            }`}
            ref={menuRef}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <div
              className="board-card__edit-menu__item"
              onClick={() => {
                setIsMenuOpen(false);
                deleteSection(id);
              }}
            >
              <svg className="board-card__edit-menu__icon" viewBox="0 0 24 24">
                <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" />
              </svg>
              Delete
            </div>
          </div>
        </div>
      </div>
      <div className="board-task-list">
        {tasks && tasks.map((task) => <BoardTask key={task.id} task={task} />)}
      </div>
    </div>
  );
};

export default Board;