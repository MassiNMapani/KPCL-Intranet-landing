import { widgetsRepository } from "../repositories/widgets-repository";

export const widgetsService = {
  async getHomeWidgets() {
    // API here: compose lightweight homepage widgets without inflating the primary home payload.
    // cache here: short-lived response caching should sit at this service boundary for homepage traffic.
    // metrics here: emit section-level freshness and latency metrics for widget aggregation.
    // logging here: record widget aggregation success/failure with request correlation ids.
    // auth here: tailor widgets to the authenticated employee once SSO is integrated.
    return widgetsRepository.getHomeWidgets();
  },
};
