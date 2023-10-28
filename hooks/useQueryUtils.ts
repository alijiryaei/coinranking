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

  const state = router.query;

  return {
    update,
    router,
    state,
    updateMultipleParam
  };
};

export default useQueryUtils;
