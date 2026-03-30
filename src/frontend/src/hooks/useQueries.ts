import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import type { backendInterface } from "../backend";
import { useActor } from "./useActor";
import { useInternetIdentity } from "./useInternetIdentity";

export function useGetAllSubmissions(options?: { enabled?: boolean }) {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  const extraEnabled = options?.enabled !== undefined ? options.enabled : true;

  // Only run when actor is ready, not fetching, identity is present (authenticated actor),
  // and the caller has explicitly enabled the query
  return useQuery({
    queryKey: ["submissions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBookings();
    },
    enabled: !!actor && !isFetching && !!identity && extraEnabled,
    retry: false,
  });
}

export function useSubmitBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      organization: string;
      eventType: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.submitBooking(
        data.name,
        data.email,
        data.phone,
        data.organization,
        data.eventType,
        data.message,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
  });
}

export function useDeleteSubmission() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.deleteBooking(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
  });
}

export function useGetAllRegistrations(options?: { enabled?: boolean }) {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  const extraEnabled = options?.enabled !== undefined ? options.enabled : true;

  // Only run when actor is ready, not fetching, identity is present (authenticated actor),
  // and the caller has explicitly enabled the query
  return useQuery({
    queryKey: ["registrations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRegistrations();
    },
    enabled: !!actor && !isFetching && !!identity && extraEnabled,
    retry: false,
  });
}

export function useSubmitRegistration() {
  const { actor } = useActor();
  const actorRef = useRef<backendInterface | null>(null);
  const queryClient = useQueryClient();

  // Keep the ref always up-to-date with the latest actor
  useEffect(() => {
    actorRef.current = actor;
  }, [actor]);

  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      collegeProfession: string;
    }) => {
      // Use the ref so we always get the latest actor value
      let resolvedActor = actorRef.current;

      // If actor isn't ready yet, poll the ref for up to 10 seconds
      if (!resolvedActor) {
        resolvedActor = await new Promise<backendInterface>(
          (resolve, reject) => {
            let attempts = 0;
            const interval = setInterval(() => {
              attempts++;
              const current = actorRef.current;
              if (current) {
                clearInterval(interval);
                resolve(current);
              } else if (attempts > 100) {
                clearInterval(interval);
                reject(
                  new Error(
                    "Actor not available. Please refresh and try again.",
                  ),
                );
              }
            }, 100);
          },
        );
      }

      return resolvedActor.submitRegistration(
        data.name,
        data.email,
        data.phone,
        data.collegeProfession,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
    },
  });
}

export function useDeleteRegistration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.deleteRegistration(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
    },
  });
}
