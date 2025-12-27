import { scopesData } from "./mockData";
import { Scope } from "./types";

const EmissionCollectionActions = {
  fetchEmissionCollectionData: async (): Promise<Scope[]> => {
    // Simulate an API call with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(scopesData);
      }, 500);
    });
  },
};

export default EmissionCollectionActions;