import type { Request, Response } from "express";
import { previewLimitSchema } from "../validation/common";
import { sendSuccess } from "../utils/response";
import { directoryService } from "../services/directory-service";

export const directoryController = {
  async staff(request: Request, response: Response) {
    const { limit } = previewLimitSchema.parse(request.query);

    // Future auth middleware hook: require an authenticated employee or service principal here.
    // Future RBAC hook: restrict directory visibility and fields by policy.
    const data = await directoryService.listStaff(limit);
    sendSuccess(response, data, request.context.requestId);
  },
  async departments(request: Request, response: Response) {
    const { limit } = previewLimitSchema.parse(request.query);

    // Future role filtering hook: scope department results for role-aware views here.
    const data = await directoryService.listDepartments(limit);
    sendSuccess(response, data, request.context.requestId);
  },
  async leadership(request: Request, response: Response) {
    const { limit } = previewLimitSchema.parse(request.query);

    // Future RBAC hook: enforce leadership resource visibility checks here.
    const data = await directoryService.listLeadership(limit);
    sendSuccess(response, data, request.context.requestId);
  },
  async organizationChart(request: Request, response: Response) {
    // Future HR integration hook: route to authoritative reporting-line data here.
    const data = await directoryService.getOrganizationChart();
    sendSuccess(response, data, request.context.requestId);
  },
};
