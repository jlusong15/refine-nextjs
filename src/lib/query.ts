import { Query, QueryClient } from "@tanstack/react-query"

export function invalidateAccessQuery(queryClient: QueryClient, key: string) {
	return queryClient.invalidateQueries({
		predicate: (query: Query) => query.queryKey[0] === key,
	})
}