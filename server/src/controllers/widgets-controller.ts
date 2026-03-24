import type { Request, Response } from "express";
import { sendSuccess } from "../utils/response";
import { emptyQuerySchema } from "../validation/common";
import { widgetsService } from "../services/widgets-service";

export const widgetsController = {
  async home(request: Request, response: Response) {
    emptyQuerySchema.parse(request.query);

    // API here: expose a bounded homepage widget response for non-critical dashboard modules.
    // auth here: require authenticated access and apply per-user visibility later.
    const data = await widgetsService.getHomeWidgets();
    sendSuccess(response, data, request.context.requestId);
  },
};
