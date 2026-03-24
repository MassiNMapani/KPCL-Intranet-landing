import type { Request, Response } from "express";
import { previewLimitSchema } from "../validation/common";
import { sendSuccess } from "../utils/response";
import { contentService } from "../services/content-service";

export const contentController = {
  async newsAnnouncements(request: Request, response: Response) {
    const { limit } = previewLimitSchema.parse(request.query);

    // Future auth middleware hook: enforce authenticated access before returning company updates.
    // Future role filtering hook: target announcements and events to authorized audiences here.
    const data = await contentService.getNewsAnnouncements(limit);
    sendSuccess(response, data, request.context.requestId);
  },
  async onboarding(request: Request, response: Response) {
    const { limit } = previewLimitSchema.parse(request.query);

    // Future audit logging hook: record onboarding content access for regulated workflows here.
    const data = await contentService.getOnboarding(limit);
    sendSuccess(response, data, request.context.requestId);
  },
};
