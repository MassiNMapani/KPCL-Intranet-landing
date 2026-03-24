import type { Request, Response } from "express";
import { sendSuccess } from "../utils/response";
import { applicationsService } from "../services/applications-service";
import { emptyQuerySchema } from "../validation/common";

export const applicationsController = {
  async list(request: Request, response: Response) {
    emptyQuerySchema.parse(request.query);

    // Future auth middleware hook: require a validated employee identity before listing applications.
    // Future RBAC hook: return only applications authorized for the caller's role set.
    const data = await applicationsService.listApplications();
    sendSuccess(response, data, request.context.requestId);
  },
};
