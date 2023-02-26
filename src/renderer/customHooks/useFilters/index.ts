// import { useCallback, useState } from "react";
// import { useAppConfig } from "../useAppConfig";

// export const useFilters = ({
//   entity,
// }: UseFiltersProps): UseFiltersReturnType => {
//   const [state, setState] = useState<UseFiltersState>({
//     filters: [],
//     loading: true,
//   });

//   const [configState] = useAppConfig();
//   const { config } = configState;

//   const reloadFilters = useCallback(async () => {
//     if (!config) return;

//     const filters = await getFilters({ entity, config });

//     setState({
//       filters,
//       loading: false,
//     });
//   }, [config, entity]);

//   const updateFilters = useCallback(
//     async (filters: Filter[]) => {
//       if (!config) return;

//       await saveFilters({ entity, filters, config });
//       await reloadFilters();
//     },
//     [config, entity, reloadFilters]
//   );

//   useEffect(() => {
//     reloadFilters();
//   }, [config, entity, reloadFilters]);

//   return [state, { reloadFilters, updateFilters }];
// };
