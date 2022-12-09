import React, { useState } from "react";
import { Task } from "@prisma/client";

const OneTask = ({ task }: { task: Task }) => {
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const taskCompleteHandler = () => {};
  // Handle the state of all of the Task data
  // PUT request to task for isComplete
  //   DELETE request after making task for isComplete to true
  //   POST request to create a task
  return (
    <div
      className="relative flex w-full py-3 px-10 hover:bg-gray-200 border-b-[1px] border-b-[#f2f2f2]"
      onMouseEnter={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
    >
      <div>
        {isOver && (
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 32 32"
            className="absolute top-4 left-1 hover:fill-black fill-gray-400 hover:cursor-pointer"
          >
            <title>tools</title>
            <path d="M27.465 32c-1.211 0-2.35-0.471-3.207-1.328l-9.392-9.391c-2.369 0.898-4.898 0.951-7.355 0.15-3.274-1.074-5.869-3.67-6.943-6.942-0.879-2.682-0.734-5.45 0.419-8.004 0.135-0.299 0.408-0.512 0.731-0.572 0.32-0.051 0.654 0.045 0.887 0.277l5.394 5.395 3.586-3.586-5.394-5.395c-0.232-0.232-0.336-0.564-0.276-0.887s0.272-0.596 0.572-0.732c2.552-1.152 5.318-1.295 8.001-0.418 3.274 1.074 5.869 3.67 6.943 6.942 0.806 2.457 0.752 4.987-0.15 7.358l9.392 9.391c0.844 0.842 1.328 2.012 1.328 3.207-0 2.5-2.034 4.535-4.535 4.535zM15.101 19.102c0.26 0 0.516 0.102 0.707 0.293l9.864 9.863c0.479 0.479 1.116 0.742 1.793 0.742 1.398 0 2.535-1.137 2.535-2.535 0-0.668-0.27-1.322-0.742-1.793l-9.864-9.863c-0.294-0.295-0.376-0.74-0.204-1.119 0.943-2.090 1.061-4.357 0.341-6.555-0.863-2.631-3.034-4.801-5.665-5.666-1.713-0.561-3.468-0.609-5.145-0.164l4.986 4.988c0.391 0.391 0.391 1.023 0 1.414l-5 5c-0.188 0.188-0.441 0.293-0.707 0.293s-0.52-0.105-0.707-0.293l-4.987-4.988c-0.45 1.682-0.397 3.436 0.164 5.146 0.863 2.631 3.034 4.801 5.665 5.666 2.2 0.721 4.466 0.604 6.555-0.342 0.132-0.059 0.271-0.088 0.411-0.088z"></path>
          </svg>
        )}
        <button
          className="justify-center align-middle items-center"
          onClick={() => taskCompleteHandler}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[20px] h-[20px] fill-gray-400 hover:fill-black"
            viewBox="0 0 32 32"
          >
            <title>check</title>
            <path d="M16 0c-8.822 0-16 7.178-16 16s7.178 16 16 16c8.822 0 16-7.178 16-16s-7.178-16-16-16zM16 30c-7.72 0-14-6.28-14-14s6.28-14 14-14c7.72 0 14 6.28 14 14s-6.28 14-14 14z"></path>
            <path d="M14 19.586l-4.293-4.293-1.414 1.414 5.707 5.707 9.707-9.707-1.414-1.414-8.293 8.293z"></path>
          </svg>
        </button>
      </div>
      <div className="text-[13px] flex flex-wrap items-center py-1 pr-[85px] ml-4">
        {task.name}
        {/* Render all of the task data. UI is close together. Small icons. */}
        {/* Conditionally render the Add/Edit TaskForm */}
        {/* On hover, render the circle icons of priority, logTime, addTask, extra details, edit button */}
      </div>
    </div>
  );
};

export default OneTask;