import React, { FocusEvent, useState } from "react";
import PageHeader from "@/components/header/PageHeader";
import { useProjects } from "@/hooks/ProjectHooks";
import Projects from "@/components/project/Projects";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import {
  useUpdateWorkspace,
  useWorkspaceWithProjects,
} from "@/hooks/WorkspaceHooks";
import LoadingSkeleton from "@/components/UI/LoadingSkeleton";
import UserCard from "@/components/UI/UserCard";
import { useModalStore } from "store/user";

const WorkspacePage = () => {
  const { workspace, projects, status } = useWorkspaceWithProjects();
  const setIsProjectModalOpen = useModalStore(
    (state) => state.setIsAddProjectModalOpen
  );

  console.log("projects: ", projects);
  console.log("workspace ", workspace);
  console.log("members ", workspace?.members);
  return (
    <>
      <PageHeader title={workspace?.name ?? "Loading..."} />

      <div className="page workspace-page">
        <div className="workspace__sections">
          <div className="workspace__section">
            <div className="workspace__section-header">
              {status === "loading" && <LoadingSkeleton />}
              {status === "success" && <h2>About us</h2>}
            </div>

            <div className="workspace__description">
              {status === "loading" && <LoadingSkeleton />}
              {status === "success" && (
                <WorkspaceDescription
                  initialDescription={workspace?.description ?? ""}
                />
              )}
            </div>
          </div>
          <div className="workspace__section">
            <div className="workspace__section-header">
              {status === "loading" && <LoadingSkeleton />}
              {status === "success" && (
                <h2>Members ({workspace?.members.length!})</h2>
              )}
            </div>

            <div className="workspace__members">
              {status === "loading" && (
                <>
                  <LoadingSkeleton />
                  <LoadingSkeleton />
                  <LoadingSkeleton />
                </>
              )}
              {workspace?.members.map((member) => (
                <UserCard key={member.id} name={member.name!} id={member.id} />
              ))}
            </div>
          </div>
          <div className="workspace__section">
            <div className="workspace__section-header">
              {status === "loading" && <LoadingSkeleton />}
              {status === "success" && <h2>Projects</h2>}
            </div>
            <div className="workspace__projects">
              {status === "loading" && (
                <div>
                  <LoadingSkeleton />
                  <LoadingSkeleton />
                  <LoadingSkeleton />
                </div>
              )}
              {status === "success" && (
                <>
                  <div
                    className="add-project-btn"
                    onClick={() => {
                      setIsProjectModalOpen(true);
                    }}
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="m12 6a1 1 0 0 0 -1 1v4h-4a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2h-4v-4a1 1 0 0 0 -1-1z"></path>
                    </svg>
                    New Project
                  </div>
                  <Projects projects={projects!} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkspacePage;

const WorkspaceDescription = ({
  initialDescription,
}: {
  initialDescription: string;
}) => {
  const [description, setDescription] = useState(initialDescription);
  const [oldDescription, setOldDescription] = useState(initialDescription);
  const { mutate: updateDescription } = useUpdateWorkspace();
  const handleDescriptionBlur = (
    e: FocusEvent<HTMLTextAreaElement, Element>
  ) => {
    let trimmedDescription = e.currentTarget.value.trim();
    console.log("DESCrIPTION: ", trimmedDescription);

    if (oldDescription === trimmedDescription) {
      setDescription(trimmedDescription);
      console.log("NOPE");
      return;
    } else {
      updateDescription({
        description: trimmedDescription,
      });
      setDescription(trimmedDescription);
      setOldDescription(trimmedDescription);
    }
    console.log("BLUR");
  };
  return (
    <textarea
      className="workspace__description-input"
      placeholder="Click here to add your team's description."
      value={description}
      onChange={(e) => {
        setDescription(e.currentTarget.value);
      }}
      onBlur={handleDescriptionBlur}
    />
  );
};
