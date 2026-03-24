import { InfoCard } from "../../components/cards/InfoCard";
import { PageDataState } from "../../components/feedback/PageDataState";
import { PageHero } from "../../components/sections/PageHero";
import { useAsyncResource } from "../../hooks/useAsyncResource";
import { intranetService } from "../../services/intranet-service";

const NewsAnnouncementsPage = () => {
  const { data, isLoading, error } = useAsyncResource(
    intranetService.getNewsAnnouncements,
    [],
  );

  return (
    <div className="page-stack">
      <PageHero
        title="News & Announcements"
        description="Company communications with a clean repository boundary for future publishing integrations."
        aside="Future SharePoint / Graph hook: ingest news posts, attachments, and targeted audiences here."
      />
      <PageDataState
        isLoading={isLoading}
        error={error}
        isEmpty={!data || (data.announcements.length === 0 && data.events.length === 0)}
        emptyTitle="No updates available"
        emptyMessage="News, announcements, and events have not been published yet."
      >
        <div className="card-grid">
          {data?.announcements.map((item) => (
            <InfoCard key={item.id} title={item.title} eyebrow={item.category}>
              <p>{item.summary}</p>
              <p className="meta-copy">{item.publishedAt}</p>
            </InfoCard>
          ))}
          {data?.events.map((item) => (
            <InfoCard key={item.id} title={item.title} eyebrow="Event">
              <p>{item.summary}</p>
              <p className="meta-copy">
                {new Date(item.startsAt).toLocaleString()} · {item.location}
              </p>
            </InfoCard>
          ))}
        </div>
      </PageDataState>
    </div>
  );
};

export default NewsAnnouncementsPage;
