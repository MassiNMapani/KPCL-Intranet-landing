import { Link } from "react-router-dom";
import type { HomePageData } from "@shared/models/intranet";
import { InfoCard } from "../../components/cards/InfoCard";
import { SafeExternalLink } from "../../components/links/SafeExternalLink";
import { PageHero } from "../../components/sections/PageHero";
import { SectionHeader } from "../../components/sections/SectionHeader";
import { ResourceHubPanel } from "../resources/ResourceHubPanel";
import { homeContent } from "./home-content";
import { HomeCardList } from "./components/HomeCardList";
import { HomeWidgetsPanel } from "./HomeWidgetsPanel";

type HomePageViewProps = {
  data: HomePageData;
};

export const HomePageView = ({ data }: HomePageViewProps) => {
  return (
    <div className="page-stack">
      <PageHero
        title={data.welcome.title}
        description={data.welcome.message}
        aside={data.welcome.operationalNote}
      />

      <section className="grid-2">
        <InfoCard
          title={homeContent.quickActions.title}
          eyebrow={homeContent.quickActions.eyebrow}
          className="quick-actions-card"
        >
          <div className="pill-row">
            {data.quickActions.map((app) => (
              <SafeExternalLink key={app.id} className="button-link" href={app.launchUrl}>
                {app.name}
              </SafeExternalLink>
            ))}
          </div>
          <p className="meta-copy">{homeContent.quickActions.helperText}</p>
        </InfoCard>

        <ResourceHubPanel initialItems={data.resourceHub} />
      </section>

      <HomeWidgetsPanel />

      <section className="page-section">
        <SectionHeader
          title={homeContent.applicationLauncher.title}
          description={homeContent.applicationLauncher.description}
        />
        <div className="card-grid">
          {data.applicationLauncher.map((app) => (
            <InfoCard
              key={app.id}
              title={app.name}
              eyebrow={app.category}
              className="application-card"
            >
              <p>{app.summary}</p>
              <p className="meta-copy">Audience: {app.audience.join(", ")}</p>
              <SafeExternalLink href={app.launchUrl}>Open application</SafeExternalLink>
            </InfoCard>
          ))}
        </div>
      </section>

      <section className="page-section">
        <SectionHeader
          title={homeContent.updates.title}
          description={homeContent.updates.description}
        />
        <div className="card-grid">
          {data.updates.announcements.map((item) => (
            <InfoCard
              key={item.id}
              title={item.title}
              eyebrow={item.category}
              className="update-card"
            >
              <p>{item.summary}</p>
              <p className="meta-copy">Published: {item.publishedAt}</p>
            </InfoCard>
          ))}
          {data.updates.events.map((item) => (
            <InfoCard key={item.id} title={item.title} eyebrow="Event" className="update-card">
              <p>{item.summary}</p>
              <p className="meta-copy">
                Starts: {new Date(item.startsAt).toLocaleString()} · {item.location}
              </p>
            </InfoCard>
          ))}
        </div>
      </section>

      <section className="grid-2">
        <HomeCardList
          title={homeContent.staffPreview.title}
          eyebrow={homeContent.staffPreview.eyebrow}
          action={<Link to={homeContent.staffPreview.actionPath}>{homeContent.staffPreview.actionLabel}</Link>}
          items={data.previews.staff}
          className="preview-card"
          renderItem={(person) => (
            <li key={person.id}>
              <strong>{person.name}</strong>
              <p>
                {person.title} · {person.departmentName}
              </p>
            </li>
          )}
        />

        <HomeCardList
          title={homeContent.departmentsPreview.title}
          eyebrow={homeContent.departmentsPreview.eyebrow}
          action={
            <Link to={homeContent.departmentsPreview.actionPath}>
              {homeContent.departmentsPreview.actionLabel}
            </Link>
          }
          items={data.previews.departments}
          className="preview-card"
          renderItem={(department) => (
            <li key={department.id}>
              <strong>{department.name}</strong>
              <p>{department.summary}</p>
            </li>
          )}
        />
      </section>

      <section className="grid-2">
        <HomeCardList
          title={homeContent.onboardingPreview.title}
          eyebrow={homeContent.onboardingPreview.eyebrow}
          action={
            <Link to={homeContent.onboardingPreview.actionPath}>
              {homeContent.onboardingPreview.actionLabel}
            </Link>
          }
          items={data.previews.onboarding}
          className="preview-card"
          renderItem={(step) => (
            <li key={step.id}>
              <strong>{step.title}</strong>
              <p>{step.summary}</p>
            </li>
          )}
        />

        <HomeCardList
          title={homeContent.leadershipPreview.title}
          eyebrow={homeContent.leadershipPreview.eyebrow}
          action={
            <Link to={homeContent.leadershipPreview.actionPath}>
              {homeContent.leadershipPreview.actionLabel}
            </Link>
          }
          items={data.previews.leadership}
          className="preview-card leadership-card"
          renderItem={(leader) => (
            <li key={leader.id}>
              <strong>{leader.name}</strong>
              <p>{leader.role}</p>
            </li>
          )}
        />
      </section>
    </div>
  );
};
