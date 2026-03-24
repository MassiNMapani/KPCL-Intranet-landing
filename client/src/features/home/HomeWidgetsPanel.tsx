import { InfoCard } from "../../components/cards/InfoCard";
import { PageDataState } from "../../components/feedback/PageDataState";
import { useHomeWidgets } from "./useHomeWidgets";

const dateLabel = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

export const HomeWidgetsPanel = () => {
  const { data, isLoading, error } = useHomeWidgets();

  return (
    <section className="page-section">
      <div className="section-header">
        <h2>My Work Snapshot</h2>
        <p>Lightweight operational widgets loaded separately so the core homepage remains fast and resilient.</p>
      </div>

      <PageDataState
        isLoading={isLoading}
        error={error}
        isEmpty={!data}
        emptyTitle="Widgets unavailable"
        emptyMessage="Operational widgets are not available right now."
      >
        <div className="widget-grid">
          <InfoCard title="Pending Approvals" eyebrow="Workflow" className="widget-card">
            <ul className="list">
              {data?.pendingApprovals.map((item) => (
                <li key={item.id}>
                  <strong>{item.title}</strong>
                  <p>{item.requestType}</p>
                  <p className="meta-copy">
                    {item.submittedBy} · {dateLabel(item.submittedAt)}
                  </p>
                </li>
              ))}
            </ul>
          </InfoCard>

          <InfoCard title="Upcoming Travel" eyebrow="Travel" className="widget-card">
            <ul className="list">
              {data?.upcomingTravel.map((item) => (
                <li key={item.id}>
                  <strong>{item.travelerName}</strong>
                  <p>{item.destination}</p>
                  <p className="meta-copy">
                    {dateLabel(item.departureDate)} · {item.status}
                  </p>
                </li>
              ))}
            </ul>
          </InfoCard>

          <InfoCard
            title="Recent Expense Submissions"
            eyebrow="Finance"
            className="widget-card"
          >
            <ul className="list">
              {data?.recentExpenseSubmissions.map((item) => (
                <li key={item.id}>
                  <strong>{item.employeeName}</strong>
                  <p>{item.amountLabel}</p>
                  <p className="meta-copy">
                    {dateLabel(item.submittedAt)} · {item.status}
                  </p>
                </li>
              ))}
            </ul>
          </InfoCard>

          <InfoCard title="Open Project Items" eyebrow="Delivery" className="widget-card">
            <ul className="list">
              {data?.openProjectItems.map((item) => (
                <li key={item.id}>
                  <strong>{item.taskName}</strong>
                  <p>{item.projectName}</p>
                  <p className="meta-copy">
                    {item.ownerName} · Due {item.dueDate} · {item.priority}
                  </p>
                </li>
              ))}
            </ul>
          </InfoCard>

          <InfoCard
            title="Unread Announcements"
            eyebrow="Updates"
            className="widget-card"
          >
            <ul className="list">
              {data?.unreadAnnouncements.map((item) => (
                <li key={item.id}>
                  <strong>{item.title}</strong>
                  <p>{item.category}</p>
                  <p className="meta-copy">{dateLabel(item.publishedAt)}</p>
                </li>
              ))}
            </ul>
          </InfoCard>

          <InfoCard
            title="Onboarding Tasks"
            eyebrow="People"
            className="widget-card"
          >
            <ul className="list">
              {data?.onboardingTasks.map((item) => (
                <li key={item.id}>
                  <strong>{item.employeeName}</strong>
                  <p>{item.taskTitle}</p>
                  <p className="meta-copy">
                    {item.ownerDepartmentName} · Due {item.dueDate} · {item.status}
                  </p>
                </li>
              ))}
            </ul>
          </InfoCard>
        </div>
      </PageDataState>
    </section>
  );
};
