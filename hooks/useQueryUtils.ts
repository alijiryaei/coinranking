/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useRouter } from "next/router";

interface Queries {
  [key : string] : string
}

const useQueryUtils = () => {
  const router = useRouter();
  // const 
  const update = (key: string, value: string): void => {
    const queryState = router.query;
    queryState[key] = value;
    router.push({ query: queryState });
  };

  const updateMultipleParam = (queries : Queries) => {
    const queryState = router.query;
    router.push({query : {...queryState , ...queries}})
  }

  const updateUrl = (url : string) => {
    router.push(url)
  }
  const state = router.query;

  return {
    update,
    updateUrl,
    state,
    updateMultipleParam
  };
};

export default useQueryUtils;
