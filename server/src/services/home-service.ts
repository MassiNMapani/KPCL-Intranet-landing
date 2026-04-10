import type { HomePageData } from "@shared/models/intranet";
import { applicationsService } from "./applications-service";
import { contentService } from "./content-service";
import { directoryService } from "./directory-service";
import { resourcesService } from "./resources-service";

export const homeService = {
  async getHomePageData(): Promise<HomePageData> {
    const [
      applications,
      newsAnnouncements,
      onboarding,
      resourceHub,
      staffPreview,
      departmentsPreview,
      leadershipPreview,
    ] = await Promise.all([
      applicationsService.listApplications(),
      contentService.getNewsAnnouncements(3),
      contentService.getOnboarding(3),
      resourcesService.listResources(),
      directoryService.listStaff(3),
      directoryService.listDepartments(3),
      directoryService.listLeadership(3),
    ]);

    // Future caching hook: serve bounded homepage aggregates from a short-lived cache here.
    // Future tracing hook: wrap downstream repository calls in a single homepage aggregation span here.
    // Future monitoring hook: emit section-level freshness and latency metrics here.
    return {
      welcome: {
        title: "Welcome to Kanona Power Company Limited",
        message:
          "This is where you can access internal applications, staff information, onboarding resources and company-wide news and announcements. You will find links to the internal applications and our licensed applications.",
      },
      quickActions: applications.slice(0, 3),
      applicationLauncher: applications,
      resourceHub: resourceHub.slice(0, 3),
      updates: {
        announcements: newsAnnouncements.announcements,
        events: newsAnnouncements.events,
      },
      previews: {
        staff: staffPreview,
        departments: departmentsPreview,
        onboarding: onboarding.checklist,
        leadership: leadershipPreview,
      },
    };
  },
};
