import { applicationsRepository } from "../repositories/applications-repository";

export const applicationsService = {
  async listApplications() {
    // Future RBAC middleware / service hook: filter application visibility by entitlements here.
    // Future structured logging hook: log catalog reads with correlation ids here.
    // Future monitoring hook: record catalog latency and result sizes here.
    return applicationsRepository.list();
  },
};
