
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";

export const useApi = <T = any, E = Error>() => {
  const queryClient = useQueryClient();
  
  const handleError = (error: E) => {
    const errorMessage = error instanceof Error ? error.message : "An error occurred";
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    });
    console.error(error);
  };
  
  return {
    useGet: <R = T>(
      queryKey: string[],
      queryFn: () => Promise<R>,
      options?: any
    ) => {
      return useQuery({
        queryKey,
        queryFn,
        onError: handleError,
        ...options,
      });
    },
    
    usePost: <D = any, R = T>(
      mutationFn: (data: D) => Promise<R>,
      options?: any
    ) => {
      return useMutation({
        mutationFn,
        onError: handleError,
        onSuccess: (data, variables, context) => {
          if (options?.onSuccess) {
            options.onSuccess(data, variables, context);
          }
          if (options?.invalidateQueries) {
            queryClient.invalidateQueries({ queryKey: options.invalidateQueries });
          }
          if (options?.successMessage) {
            toast({
              title: "Success",
              description: options.successMessage,
            });
          }
        },
        ...options,
      });
    },
    
    usePut: <D = any, R = T>(
      mutationFn: (data: D) => Promise<R>,
      options?: any
    ) => {
      return useMutation({
        mutationFn,
        onError: handleError,
        onSuccess: (data, variables, context) => {
          if (options?.onSuccess) {
            options.onSuccess(data, variables, context);
          }
          if (options?.invalidateQueries) {
            queryClient.invalidateQueries({ queryKey: options.invalidateQueries });
          }
          if (options?.successMessage) {
            toast({
              title: "Success",
              description: options.successMessage,
            });
          }
        },
        ...options,
      });
    },
    
    useDelete: <D = any, R = T>(
      mutationFn: (data: D) => Promise<R>,
      options?: any
    ) => {
      return useMutation({
        mutationFn,
        onError: handleError,
        onSuccess: (data, variables, context) => {
          if (options?.onSuccess) {
            options.onSuccess(data, variables, context);
          }
          if (options?.invalidateQueries) {
            queryClient.invalidateQueries({ queryKey: options.invalidateQueries });
          }
          if (options?.successMessage) {
            toast({
              title: "Success",
              description: options.successMessage,
            });
          }
        },
        ...options,
      });
    },
  };
};
