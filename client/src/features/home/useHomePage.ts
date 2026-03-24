import type { HomePageData } from "@shared/models/intranet";
import { useAsyncResource } from "../../hooks/useAsyncResource";
import { intranetService } from "../../services/intranet-service";

export const useHomePage = () => {
  return useAsyncResource<HomePageData>(intranetService.getHomePage, []);
};
