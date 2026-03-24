import type { OrganizationNodeRecord } from "@shared/models/intranet";
import { InfoCard } from "../../components/cards/InfoCard";
import { PageDataState } from "../../components/feedback/PageDataState";
import { PageHero } from "../../components/sections/PageHero";
import { useAsyncResource } from "../../hooks/useAsyncResource";
import { intranetService } from "../../services/intranet-service";

const OrganizationChartPage = () => {
  const { data, isLoading, error } = useAsyncResource<OrganizationNodeRecord[]>(
    intranetService.getOrganizationChart,
    [],
  );

  return (
    <div className="page-stack">
      <PageHero
        title="Organization Chart"
        description="A simple reporting structure view prepared for future authoritative sync from HR systems."
        aside="Future HR system hook: replace mock hierarchy with validated reporting data and change audits."
      />
      <PageDataState
        isLoading={isLoading}
        error={error}
        isEmpty={!data || data.length === 0}
        emptyTitle="No organization structure available"
        emptyMessage="Organization chart records are not available yet."
      >
        <div className="card-grid">
          {data?.map((node) => (
            <InfoCard key={node.id} title={node.team} eyebrow={node.reportsTo ?? "Root Team"}>
              <p>Leader: {node.leaderName}</p>
            </InfoCard>
          ))}
        </div>
      </PageDataState>
    </div>
  );
};

export default OrganizationChartPage;
