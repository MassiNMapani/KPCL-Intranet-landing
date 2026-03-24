import { Router } from "express";
import { applicationsController } from "../controllers/applications-controller";
import { contentController } from "../controllers/content-controller";
import { directoryController } from "../controllers/directory-controller";
import { homeController } from "../controllers/home-controller";
import { resourcesController } from "../controllers/resources-controller";
import { widgetsController } from "../controllers/widgets-controller";
import { asyncHandler } from "../utils/async-handler";

export const apiRouter = Router();

// Future authentication middleware hook: validate SSO session or bearer token here.
// Future RBAC middleware hook: enforce route-level permissions before controller execution.
apiRouter.get("/home", asyncHandler(homeController.show));
apiRouter.get("/home/widgets", asyncHandler(widgetsController.home));
apiRouter.get("/applications", asyncHandler(applicationsController.list));
apiRouter.get("/staff-directory", asyncHandler(directoryController.staff));
apiRouter.get("/organization-chart", asyncHandler(directoryController.organizationChart));
apiRouter.get("/departments", asyncHandler(directoryController.departments));
apiRouter.get("/leadership", asyncHandler(directoryController.leadership));
apiRouter.get("/onboarding", asyncHandler(contentController.onboarding));
apiRouter.get("/news-announcements", asyncHandler(contentController.newsAnnouncements));
apiRouter.get("/resources", asyncHandler(resourcesController.list));
