import { useState } from "react";
import type {
  ResourceFilters,
  ResourceRecord,
  ResourceType,
} from "@shared/models/intranet";
import { InfoCard } from "../../components/cards/InfoCard";
import { PageDataState } from "../../components/feedback/PageDataState";
import { SafeExternalLink } from "../../components/links/SafeExternalLink";
import { useAsyncResource } from "../../hooks/useAsyncResource";
import { intranetService } from "../../services/intranet-service";

const resourceTypeOptions: Array<{ label: string; value: ResourceType | "" }> = [
  { label: "All types", value: "" },
  { label: "Forms", value: "Form" },
  { label: "Templates", value: "Template" },
  { label: "How-To Guides", value: "Guide" },
];

type ResourceHubPanelProps = {
  initialItems: ResourceRecord[];
};

export const ResourceHubPanel = ({ initialItems }: ResourceHubPanelProps) => {
  const [departmentId, setDepartmentId] = useState("");
  const [resourceType, setResourceType] = useState<ResourceType | "">("");

  const departmentsQuery = useAsyncResource(intranetService.getDepartments, []);

  const filters: ResourceFilters = {
    departmentId: departmentId || undefined,
    resourceType: resourceType || undefined,
  };

  const { data, isLoading, error } = useAsyncResource(
    () => intranetService.getResources(filters),
    [departmentId, resourceType],
  );

  const items = data?.items ?? initialItems;
  const departments = departmentsQuery.data ?? [];

  return (
    <InfoCard
      title="Forms, Templates, and How-To Hub"
      eyebrow="Governed resources"
      className="resource-hub-card"
    >
      <div className="filter-row">
        <label className="filter-field">
          <span>Department</span>
          <select value={departmentId} onChange={(event) => setDepartmentId(event.target.value)}>
            <option value="">All departments</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        </label>

        <label className="filter-field">
          <span>Resource type</span>
          <select
            value={resourceType}
            onChange={(event) => setResourceType(event.target.value as ResourceType | "")}
          >
            {resourceTypeOptions.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <PageDataState
        isLoading={isLoading}
        error={error}
        isEmpty={items.length === 0}
        emptyTitle="No resources match the current filters"
        emptyMessage="Try a different department or resource type."
      >
        <ul className="list">
          {items.map((resource) => (
            <li key={resource.id}>
              <SafeExternalLink href={resource.targetUrl}>{resource.title}</SafeExternalLink>
              <p>{resource.description}</p>
              <p className="meta-copy">
                {resource.departmentName} · {resource.resourceType} · {resource.owner}
              </p>
            </li>
          ))}
        </ul>
      </PageDataState>
    </InfoCard>
  );
};
