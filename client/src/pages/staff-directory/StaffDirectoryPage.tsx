import type { StaffMemberRecord } from "@shared/models/intranet";
import { InfoCard } from "../../components/cards/InfoCard";
import { PageDataState } from "../../components/feedback/PageDataState";
import { PageHero } from "../../components/sections/PageHero";
import { useAsyncResource } from "../../hooks/useAsyncResource";
import { intranetService } from "../../services/intranet-service";

const StaffDirectoryPage = () => {
  const { data, isLoading, error } = useAsyncResource<StaffMemberRecord[]>(
    intranetService.getStaffDirectory,
    [],
  );

  return (
    <div className="page-stack">
      <PageHero
        title="Staff Directory"
        description="The staff directory is a searchable list of people across the company. It helps you find employees, their roles, departments, and contact details."
        showPanel
        panelImageSrc="/branding/staff-directory-hero.png"
      />
      <PageDataState
        isLoading={isLoading}
        error={error}
        isEmpty={!data || data.length === 0}
        emptyTitle="No staff records available"
        emptyMessage="Staff directory results are currently unavailable for this view."
      >
        <div className="card-grid">
          {data?.map((person) => (
            <InfoCard key={person.id} title={person.name} eyebrow={person.departmentName}>
              <p>{person.title}</p>
              <p>{person.email}</p>
              {person.location && person.location !== "Company Directory" ? (
                <p className="meta-copy">{person.location}</p>
              ) : null}
            </InfoCard>
          ))}
        </div>
      </PageDataState>
    </div>
  );
};

export default StaffDirectoryPage;
