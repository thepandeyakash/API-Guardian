import { useQuery } from "@tanstack/react-query";

import { projectsPageKeys } from "@/lib/query-keys";
import { fetchProjectsPageData } from "@/services/projects-page.service";

export function useProjectsPage() {
  return useQuery({
    queryKey: projectsPageKeys.overview(),
    queryFn: fetchProjectsPageData,
    staleTime: 60 * 1000,
  });
}
