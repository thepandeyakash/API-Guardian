import { api } from "@/lib/axios";
import type { ApiSuccessResponse } from "@/types/api";
import type { Project } from "@/types/project";

export async function getProjects(): Promise<Project[]> {
  const { data } = await api.get<ApiSuccessResponse<Project[]>>("/projects");

  return data.data;
}
