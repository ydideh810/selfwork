import React, { Ref, useRef, useState, useEffect } from "react";
import { useOnClickOutside } from "../src/hooks/useOnClickOutside";
import ProjectEditPopup from "./ProjectEditPopup";

type ProjectCardProps = {
  title: string;
  description: string | null;
  projectId: string;
  clientName: string;
  clientId: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  projectId,
  clientId,
  clientName,
}) => {
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const projectCardRef = useRef(null);
  const modalRef = useRef(null);

  useOnClickOutside(modalRef, () => {
    setIsModelOpen(false);
  });

  return (
    <div
      ref={projectCardRef}
      className="relative flex flex-col w-[260px] h-[320px] px-[20px]
      py-[25px] rounded-lg shadow-md border-[1px]"
    >
      {/* Header */}
      <div className="flex justify-between text-lg">
        <a
          href={`/projects/${projectId}`}
          className="font-semibold hover:underline"
        >
          {title}
        </a>
        <button
          onClick={() => setIsModelOpen(!isModelOpen)}
          className={`${
            isModelOpen ? "hidden opacity-0 transition-opacity " : ""
          } text-[18px] select-none hover:cursor-pointer`}
        >
          ...
        </button>
        {isModelOpen && (
          <ProjectEditPopup ref={modalRef} isModelOpen={isModelOpen} />
        )}
      </div>

      {/* Info */}
      <div className="grow flex flex-col mt-4">
        {/* Description */}
        <div className="text-ellipsis overflow-hidden grow text-gray-700 text-[14px]">
          {description}
        </div>
        {/* Footer */}
        {/* //! Fix footer layout styling */}
        <div className="">
          <div className="flex align-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-user"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            {/* //! Fix formatting on the client's name */}
            <a
              href={`/clients/${clientId}`}
              className="ml-2 hover:underline text-ellipsis"
            >
              {clientName}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
