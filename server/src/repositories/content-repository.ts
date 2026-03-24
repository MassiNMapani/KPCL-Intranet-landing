import type {
  AnnouncementRecord,
  EventRecord,
  OnboardingItemRecord,
} from "@shared/models/intranet";
import { announcements, events, onboardingItems } from "./mock/mock-data";

export const contentRepository = {
  async listAnnouncements(limit?: number): Promise<AnnouncementRecord[]> {
    // Future SharePoint integration: load targeted announcements from a content source here.
    // Future PostgreSQL repository implementation: back announcements with persisted content rows here.
    return typeof limit === "number" ? announcements.slice(0, limit) : announcements;
  },
  async listEvents(limit?: number): Promise<EventRecord[]> {
    // Future PostgreSQL repository implementation: load scheduled events from relational tables here.
    return typeof limit === "number" ? events.slice(0, limit) : events;
  },
  async listOnboardingItems(limit?: number): Promise<OnboardingItemRecord[]> {
    // Future PostgreSQL repository implementation: source onboarding sequences from persisted workflow tables here.
    return typeof limit === "number" ? onboardingItems.slice(0, limit) : onboardingItems;
  },
};
