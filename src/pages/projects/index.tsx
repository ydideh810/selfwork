import { useState } from "react";
import { NextPage } from "next";
import Header from "../../components/header/PageHeader";
import NoProjects from "../../components/project/NoProjects";
import AddProjectModal from "../../components/project/AddProjectModal";
import { Project } from "@prisma/client";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Button from "../../components/ui/Button";
import Projects from "../../components/project/Projects";
import useClients from "../../hooks/useClients";
import useProjects from "../../hooks/useProjects";

export type ProjectForProjectCard = Project & {
  client: {
    name: string;
  };
};

const ProjectsPage: NextPage = () => {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  // useQuery trpc
  const { clients, status: clientsStatus } = useClients();
  const { projects, status: projectStatus } = useProjects();

  return (
    <>
      <AddProjectModal
        clients={clients!}
        isOpen={isAddProjectModalOpen}
        setIsModalOpen={setIsAddProjectModalOpen}
      />
      {/* Wrapper */}
      <div className="h-full py-5 px-7">
        <Header
          isButton={true}
          buttonText="Add Project"
          title="Projects"
          buttonHandler={() => {
            setIsAddProjectModalOpen(true);
          }}
        >
          {/* Filter buttons */}
          <Button>Sort By</Button>
        </Header>
        <hr className="mt-4" />
        {/* Loading Spinner */}
        {status === "loading" && (
          <div className="w-full h-full flex justify-center mt-11">
            <LoadingSpinner />
          </div>
        )}
        {status === "success" && projects?.length === 0 && (
          <NoProjects
            buttonHandler={() => {
              setIsAddProjectModalOpen(true);
            }}
          />
        )}
        {status === "error" && (
          <div className="w-full h-full flex justify-center align-middle">
            <h1 className="text-2xl">Error</h1>
            <p className="text-gray-500">
              Sorry about that. Try to refresh the page.
            </p>
          </div>
        )}
        {/* Grid of projects */}
        {status === "success" && (
          <Projects projects={projects!} status={status} />
        )}
      </div>
    </>
  );
};

export default ProjectsPage;
