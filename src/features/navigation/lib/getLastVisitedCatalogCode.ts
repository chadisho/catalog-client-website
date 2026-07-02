import { useNavigationContextStore } from '../store/navigationContextStore';

export function getLastVisitedCatalogCode(): string | null {
  return useNavigationContextStore.getState().recentCatalogs[0]?.code ?? null;
}
