import type { LeadershipRecord } from "@shared/models/intranet";
import { InfoCard } from "../../components/cards/InfoCard";
import { PageDataState } from "../../components/feedback/PageDataState";
import { PageHero } from "../../components/sections/PageHero";
import { useAsyncResource } from "../../hooks/useAsyncResource";
import { intranetService } from "../../services/intranet-service";

const LeadershipPage = () => {
  const { data, isLoading, error } = useAsyncResource<LeadershipRecord[]>(
    intranetService.getLeadership,
    [],
  );

  return (
    <div className="page-stack">
      <PageHero
        title="Leadership"
        description="Leadership profiles are organized for future governance workflows and role-aware visibility controls."
        aside="Future RBAC hook: restrict leadership-only artifacts and executive resources by policy."
      />
      <PageDataState
        isLoading={isLoading}
        error={error}
        isEmpty={!data || data.length === 0}
        emptyTitle="No leadership profiles available"
        emptyMessage="Leadership records are currently unavailable."
      >
        <div className="card-grid">
          {data?.map((leader) => (
            <InfoCard key={leader.id} title={leader.name} eyebrow={leader.role}>
              <p>{leader.summary}</p>
            </InfoCard>
          ))}
        </div>
      </PageDataState>
    </div>
  );
};

export default LeadershipPage;
