"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

export interface SelectedCompareModel {
  slug: string;
  name: string;
  labName: string;
  labSlug: string;
  inputPricePer1M: number;
  outputPricePer1M: number;
  contextWindow: number;
}

interface CompareContextValue {
  selectedModels: SelectedCompareModel[];
  toggleModel: (model: SelectedCompareModel) => void;
  addModel: (model: SelectedCompareModel) => boolean;
  removeModel: (slug: string) => void;
  clearModels: () => void;
  isSelected: (slug: string) => boolean;
  canAddMore: boolean;
  maxModels: number;
  isHydrated: boolean;
}

const STORAGE_KEY = "oneatlas:compare-slugs";
const MAX_COMPARE_MODELS = 4;

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [selectedModels, setSelectedModels] = useState<SelectedCompareModel[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage on client mount (prevents SSR hydration mismatch)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSelectedModels(parsed.slice(0, MAX_COMPARE_MODELS));
        }
      }
    } catch {
      // Ignore storage errors
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync state to localStorage whenever modified after initial hydration
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedModels));
    } catch {
      // Ignore quota/storage errors
    }
  }, [selectedModels, isHydrated]);

  const addModel = useCallback((model: SelectedCompareModel): boolean => {
    let added = false;
    setSelectedModels((prev) => {
      if (prev.some((m) => m.slug === model.slug)) return prev;
      if (prev.length >= MAX_COMPARE_MODELS) return prev;
      added = true;
      return [...prev, model];
    });
    return added;
  }, []);

  const removeModel = useCallback((slug: string) => {
    setSelectedModels((prev) => prev.filter((m) => m.slug !== slug));
  }, []);

  const toggleModel = useCallback((model: SelectedCompareModel) => {
    setSelectedModels((prev) => {
      const exists = prev.some((m) => m.slug === model.slug);
      if (exists) {
        return prev.filter((m) => m.slug !== model.slug);
      }
      if (prev.length >= MAX_COMPARE_MODELS) {
        return prev;
      }
      return [...prev, model];
    });
  }, []);

  const clearModels = useCallback(() => {
    setSelectedModels([]);
  }, []);

  const isSelected = useCallback(
    (slug: string) => selectedModels.some((m) => m.slug === slug),
    [selectedModels]
  );

  const canAddMore = selectedModels.length < MAX_COMPARE_MODELS;

  const value = useMemo(
    () => ({
      selectedModels,
      toggleModel,
      addModel,
      removeModel,
      clearModels,
      isSelected,
      canAddMore,
      maxModels: MAX_COMPARE_MODELS,
      isHydrated,
    }),
    [
      selectedModels,
      toggleModel,
      addModel,
      removeModel,
      clearModels,
      isSelected,
      canAddMore,
      isHydrated,
    ]
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export function useCompare(): CompareContextValue {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
