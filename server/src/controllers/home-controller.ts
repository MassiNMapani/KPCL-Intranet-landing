import type { Request, Response } from "express";
import { sendSuccess } from "../utils/response";
import { homeService } from "../services/home-service";
import { homeRequestQuerySchema } from "../validation/home";

export const homeController = {
  async show(request: Request, response: Response) {
    homeRequestQuerySchema.parse(request.query);

    // Future auth hook: require an authenticated employee principal before returning homepage data.
    // Future RBAC hook: tailor homepage sections based on authorized claims and department scope.
    const data = await homeService.getHomePageData();
    sendSuccess(response, data, request.context.requestId);
  },
};
