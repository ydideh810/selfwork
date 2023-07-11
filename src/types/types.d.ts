import type { DefaultUser } from "next-auth";
import type {
  Client,
  Links,
  Note,
  Priority,
  Prisma,
  Project,
  Section,
  Status,
  Tag,
  Task,
  User,
  Workspace,
} from "@prisma/client";
import client from "../../prisma/client";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}

//Data Structure from Frontend
export type NewProjectFormData = {
  name: string;
  description: string;
  lumpSum: number;
  startDate: string;
  dueDate: string;
  priority: Priority;
  clientId?: string;
};

export type NewProject = {
  name: string;
  description: string;
  lumpSum: number;
  startDate: string;
  dueDate: string;
  priority: Priority;
  workspaceId: string;
  ownerId: string;
};

export type UpdateProjectData = {
  id?: number;
  name?: string;
  lumpSum?: number;
  priority?: Priority;
  description?: string;
  startDate?: Date;
  dueDate?: Date;
  clientId?: string;
};

type OneProjectWithSections = Project & {
  sections: Section[];
};

export type ProjectsWithSections = [OneProjectWithSections];

export type ProjectWithAll = Project & {
  sections: SectionWithTasks[];
  members: User[];
  notes: Note[];
  links: Links[];
};

export type NewClientData = {
  name: string;
  email: string;
  companyName?: string;
  businessAddress?: string;
  phone?: string;
};

// Section types
type SectionWithTasks = Section & {
  tasks: TaskWithAssignee[];
};

export type WorkspaceWithMembers = Workspace & {
  owner: User;
  members: User[];
};
export type WorkspaceWithProjects = Workspace & {
  owner: User;
  members: User[];
  projects: Project[];
};

export type UserSections = {
  userSections: SectionWithTasks[];
  userAssignedTasksSection: SectionWithTasks;
};

export type TaskWithAssignee = Task & {
  assignee: User;
  tags: Tag[];
};

// Link
export type NewLink = {
  name: string;
  url: string;
};
export type ClientWithProjects = Client & {
  projects: Project[];
};

export type ClientStatus = "active" | "pending" | "closed";
