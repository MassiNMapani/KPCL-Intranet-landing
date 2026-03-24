import type { DepartmentRecord } from "@shared/models/intranet";
import { InfoCard } from "../../components/cards/InfoCard";
import { PageDataState } from "../../components/feedback/PageDataState";
import { PageHero } from "../../components/sections/PageHero";
import { useAsyncResource } from "../../hooks/useAsyncResource";
import { intranetService } from "../../services/intranet-service";

const DepartmentsPage = () => {
  const { data, isLoading, error } = useAsyncResource<DepartmentRecord[]>(
    intranetService.getDepartments,
    [],
  );

  return (
    <div className="page-stack">
      <PageHero
        title="Departments"
        description="Department summaries are isolated behind the repository boundary for maintainability and future service integration."
        aside="Future logging hook: track department-page engagement and search patterns with sanitized events."
      />
      <PageDataState
        isLoading={isLoading}
        error={error}
        isEmpty={!data || data.length === 0}
        emptyTitle="No departments available"
        emptyMessage="Department records are currently unavailable."
      >
        <div className="card-grid">
          {data?.map((department) => (
            <InfoCard
              key={department.id}
              title={department.name}
              eyebrow={department.leaderName}
            >
              <p>{department.summary}</p>
              <p className="meta-copy">{department.focusAreas.join(" · ")}</p>
            </InfoCard>
          ))}
        </div>
      </PageDataState>
    </div>
  );
};

export default DepartmentsPage;
