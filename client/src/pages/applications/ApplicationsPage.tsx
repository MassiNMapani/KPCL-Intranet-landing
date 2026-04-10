import type { ApplicationRecord } from "@shared/models/intranet";
import { InfoCard } from "../../components/cards/InfoCard";
import { PageDataState } from "../../components/feedback/PageDataState";
import { SafeExternalLink } from "../../components/links/SafeExternalLink";
import { PageHero } from "../../components/sections/PageHero";
import { SectionHeader } from "../../components/sections/SectionHeader";
import { featureFlags } from "../../config/feature-flags";
import { useAsyncResource } from "../../hooks/useAsyncResource";
import { intranetService } from "../../services/intranet-service";

const ApplicationsPage = () => {
  const { data, isLoading, error } = useAsyncResource<ApplicationRecord[]>(
    intranetService.getApplications,
    [],
  );

  const apps =
    data?.filter((item) => (featureFlags.showPlannedApps ? true : item.status === "active")) ??
    [];

  return (
    <div className="page-stack">
      <PageHero
        title="Applications"
        description="For internal business operations and employee services, please access the applications below."
        showPanel
      />
      <section className="page-section">
        <SectionHeader
          title="Enterprise App Catalog"
          description="All launch URLs are validated on the backend before they reach the UI."
        />
        <PageDataState
          isLoading={isLoading}
          error={error}
          isEmpty={apps.length === 0}
          emptyTitle="No applications available"
          emptyMessage="The application catalog is currently empty or unavailable for your access scope."
        >
          <div className="card-grid">
            {apps.map((app) => (
              <InfoCard key={app.id} title={app.name} eyebrow={app.category}>
                <p>{app.summary}</p>
                <p className="meta-copy">Status: {app.status}</p>
                <SafeExternalLink href={app.launchUrl}>Open application</SafeExternalLink>
              </InfoCard>
            ))}
          </div>
        </PageDataState>
      </section>
    </div>
  );
};

export default ApplicationsPage;
