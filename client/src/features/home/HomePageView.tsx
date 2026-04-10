import type { HomePageData } from "@shared/models/intranet";
import { PageHero } from "../../components/sections/PageHero";
import { homeContent } from "./home-content";

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
        slides={homeContent.heroCarousel}
      />
    </div>
  );
};
