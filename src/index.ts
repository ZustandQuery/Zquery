import { useEffect } from "react";
import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

export type QueryKey = string | unknown[];

interface QueryState<TData> {
  data: TData | null;
  error: Error | null;
  isLoading: boolean;
  lastUpdated: number;
}

interface QueryStoreState {
  queries: Record<string, QueryState<unknown>>;
  fetchData: <TData>(
    key: QueryKey,
    queryFn: () => Promise<TData>,
    options?: { staleTime?: number }
  ) => Promise<void>;
}

const serializeKey = (key: QueryKey) =>
  JSON.stringify(key, Object.keys(key || {}).sort());

const queryMiddleware: StateCreator<QueryStoreState> = (set, get) => ({
  queries: {},
  fetchData: async (key, queryFn, options = {}) => {
    const { staleTime = 10000 } = options;
    const serializedKey = serializeKey(key);
    const currentQuery = get().queries[serializedKey];

    // 1. 신선한 데이터가 있으면 패칭 생략
    if (
      currentQuery?.lastUpdated &&
      Date.now() - currentQuery.lastUpdated < staleTime
    ) {
      return;
    }

    // 2. 로딩 상태 시작
    set((state) => ({
      queries: {
        ...state.queries,
        [serializedKey]: {
          ...currentQuery,
          isLoading: true,
          error: null,
        },
      },
    }));

    try {
      const data = await queryFn();
      // 3. 성공 시 데이터 저장
      set((state) => ({
        queries: {
          ...state.queries,
          [serializedKey]: {
            data,
            error: null,
            isLoading: false,
            lastUpdated: Date.now(),
          },
        },
      }));
    } catch (error) {
      // 4. 실패 시 에러 저장
      set((state) => ({
        queries: {
          ...state.queries,
          [serializedKey]: {
            ...currentQuery,
            error: error as Error,
            isLoading: false,
          },
        },
      }));
    }
  },
});

export const useQueryStore = create<QueryStoreState>()(
  persist(queryMiddleware, {
    name: "query-cache",
    partialize: (state) => ({
      queries: state.queries,
    }),
  })
);

export const useQuery = <TData>(
  key: QueryKey,
  queryFn: () => Promise<TData>,
  options?: { staleTime?: number }
) => {
  const { fetchData, queries } = useQueryStore();
  const serializedKey = serializeKey(key);

  useEffect(() => {
    fetchData(key, queryFn, options);
  }, [serializedKey]);

  return {
    data: queries[serializedKey]?.data as TData | undefined,
    isLoading: queries[serializedKey]?.isLoading ?? true,
    error: queries[serializedKey]?.error,
  };
};
