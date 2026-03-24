import type { HomeWidgetsData } from "@shared/models/intranet";
import { useAsyncResource } from "../../hooks/useAsyncResource";
import { intranetService } from "../../services/intranet-service";

export const useHomeWidgets = () => {
  return useAsyncResource<HomeWidgetsData>(intranetService.getHomeWidgets, []);
};
