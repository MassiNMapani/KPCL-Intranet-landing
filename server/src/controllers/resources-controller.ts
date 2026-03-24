import type { Request, Response } from "express";
import { sendSuccess } from "../utils/response";
import { resourcesService } from "../services/resources-service";
import { resourceQuerySchema } from "../validation/resources";

export const resourcesController = {
  async list(request: Request, response: Response) {
    const filters = resourceQuerySchema.parse(request.query);

    // Permission check here: enforce future RBAC and department visibility before returning resource metadata.
    // Audit log here: record resource hub access for compliance-sensitive catalogs.
    const items = await resourcesService.listResources(filters);

    sendSuccess(
      response,
      {
        filters,
        items,
      },
      request.context.requestId,
    );
  },
};
