import { useEffect, useState } from "react";

type AsyncState<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

export const useAsyncResource = <T,>(
  loader: () => Promise<T>,
  dependencies: ReadonlyArray<unknown> = [],
): AsyncState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    setIsLoading(true);
    setError(null);

    loader()
      .then((payload) => {
        if (active) {
          setData(payload);
        }
      })
      .catch((reason: Error) => {
        if (active) {
          setError(reason.message);
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, dependencies);

  return {
    data,
    isLoading,
    error,
  };
};
