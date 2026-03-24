import { contentRepository } from "../repositories/content-repository";
import { resourcesService } from "./resources-service";

export const contentService = {
  async getNewsAnnouncements(limit?: number) {
    // Future SharePoint integration hook: source announcements and event feeds here.
    const [announcementItems, eventItems] = await Promise.all([
      contentRepository.listAnnouncements(limit),
      contentRepository.listEvents(limit),
    ]);

    return {
      announcements: announcementItems,
      events: eventItems,
    };
  },
  async getOnboarding(limit?: number) {
    // Future audit logging hook: record access to onboarding resources where policy requires it.
    // Future caching hook: keep low-churn onboarding resources in bounded cache here.
    const [checklist, resourceItems] = await Promise.all([
      contentRepository.listOnboardingItems(limit),
      resourcesService.listResources(),
    ]);

    return {
      checklist,
      resources: typeof limit === "number" ? resourceItems.slice(0, limit) : resourceItems,
    };
  },
};
