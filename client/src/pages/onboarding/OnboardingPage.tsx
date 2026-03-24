import { InfoCard } from "../../components/cards/InfoCard";
import { PageDataState } from "../../components/feedback/PageDataState";
import { SafeExternalLink } from "../../components/links/SafeExternalLink";
import { PageHero } from "../../components/sections/PageHero";
import { useAsyncResource } from "../../hooks/useAsyncResource";
import { intranetService } from "../../services/intranet-service";

const OnboardingPage = () => {
  const { data, isLoading, error } = useAsyncResource(intranetService.getOnboarding, []);

  return (
    <div className="page-stack">
      <PageHero
        title="Onboarding"
        description="A single guided onboarding space designed to absorb future HR, identity, and policy integrations."
        aside="Future audit trail hook: persist onboarding milestone acknowledgements and access changes."
      />
      <PageDataState
        isLoading={isLoading}
        error={error}
        isEmpty={!data || (data.checklist.length === 0 && data.resources.length === 0)}
        emptyTitle="No onboarding content available"
        emptyMessage="Onboarding steps and starter resources have not been published yet."
      >
        <section className="grid-2">
          <InfoCard title="Onboarding Steps" eyebrow="Checklist">
            <ul className="list">
              {data?.checklist.map((step) => (
                <li key={step.id}>
                  <strong>{step.title}</strong>
                  <p>{step.summary}</p>
                  <p className="meta-copy">Owner: {step.owner}</p>
                </li>
              ))}
            </ul>
          </InfoCard>
          <InfoCard title="Starter Resources" eyebrow="Templates and guides">
            <ul className="list">
              {data?.resources.map((resource) => (
                <li key={resource.id}>
                  <SafeExternalLink href={resource.targetUrl}>
                    {resource.title}
                  </SafeExternalLink>
                  <p>{resource.description}</p>
                </li>
              ))}
            </ul>
          </InfoCard>
        </section>
      </PageDataState>
    </div>
  );
};

export default OnboardingPage;
