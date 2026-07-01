import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  httpMethods,
  updateEndpointSchema,
  type UpdateEndpointInput,
} from "@/features/projects/schemas";
import {
  useEndpoint,
  useUpdateEndpoint,
} from "@/features/projects/hooks/useEndpoints";
import { cn } from "@/lib/utils";

type EditEndpointDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  endpointId: string | null;
};

const selectClassName = cn(
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
);

export function EditEndpointDialog({
  open,
  onOpenChange,
  endpointId,
}: EditEndpointDialogProps) {
  const { data: endpoint, isLoading } = useEndpoint(
    open ? endpointId : null
  );
  const updateEndpoint = useUpdateEndpoint();

  const form = useForm<UpdateEndpointInput>({
    resolver: zodResolver(updateEndpointSchema),
    defaultValues: {
      name: "",
      url: "",
      method: "GET",
      expectedStatusCode: 200,
      monitoringInterval: 300,
      monitoringEnabled: true,
    },
  });

  useEffect(() => {
    if (open && endpoint) {
      form.reset({
        name: endpoint.name,
        url: endpoint.url,
        method: endpoint.method,
        expectedStatusCode: endpoint.expectedStatusCode,
        monitoringInterval: endpoint.monitoringInterval,
        monitoringEnabled: endpoint.monitoringEnabled,
      });
    }
  }, [open, endpoint, form]);

  function onSubmit(values: UpdateEndpointInput) {
    if (!endpointId) {
      return;
    }

    updateEndpoint.mutate(
      { endpointId, payload: values },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit endpoint</DialogTitle>
          <DialogDescription>
            Update endpoint configuration and monitoring settings.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="grid gap-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4"
              noValidate
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="method"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Method</FormLabel>
                      <FormControl>
                        <select {...field} className={selectClassName}>
                          {httpMethods.map((method) => (
                            <option key={method} value={method}>
                              {method}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expectedStatusCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected status</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={100}
                          max={599}
                          value={field.value ?? ""}
                          onChange={(event) =>
                            field.onChange(
                              event.target.value === ""
                                ? undefined
                                : Number(event.target.value)
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="monitoringInterval"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interval (seconds)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          value={field.value ?? ""}
                          onChange={(event) =>
                            field.onChange(
                              event.target.value === ""
                                ? undefined
                                : Number(event.target.value)
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="monitoringEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-col justify-end">
                      <FormLabel>Monitoring</FormLabel>
                      <FormControl>
                        <label className="flex h-8 items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={field.value ?? true}
                            onChange={(event) =>
                              field.onChange(event.target.checked)
                            }
                            className="size-4 rounded border-input"
                          />
                          Enabled
                        </label>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={updateEndpoint.isPending}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={updateEndpoint.isPending}>
                  {updateEndpoint.isPending ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
