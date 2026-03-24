import { ErrorState } from "../../components/feedback/ErrorState";
import { LoadingState } from "../../components/feedback/LoadingState";
import { HomePageView } from "./HomePageView";
import { useHomePage } from "./useHomePage";

export const HomePageContainer = () => {
  const { data, isLoading, error } = useHomePage();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !data) {
    return (
      <ErrorState
        message={error ?? "Home page content is unavailable."}
        title="Homepage unavailable"
      />
    );
  }

  return <HomePageView data={data} />;
};
