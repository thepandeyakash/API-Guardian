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
import {
  createEndpointSchema,
  httpMethods,
  type CreateEndpointInput,
} from "@/features/projects/schemas";
import { useCreateEndpoint } from "@/features/projects/hooks/useEndpoints";
import { cn } from "@/lib/utils";

type CreateEndpointDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string | null;
  projectName?: string;
};

const selectClassName = cn(
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
);

export function CreateEndpointDialog({
  open,
  onOpenChange,
  projectId,
  projectName,
}: CreateEndpointDialogProps) {
  const createEndpoint = useCreateEndpoint();

  const form = useForm<CreateEndpointInput>({
    resolver: zodResolver(createEndpointSchema),
    defaultValues: {
      projectId: projectId ?? "",
      name: "",
      url: "",
      method: "GET",
      expectedStatusCode: 200,
      monitoringInterval: 300,
      monitoringEnabled: true,
    },
  });

  useEffect(() => {
    if (open && projectId) {
      form.reset({
        projectId,
        name: "",
        url: "",
        method: "GET",
        expectedStatusCode: 200,
        monitoringInterval: 300,
        monitoringEnabled: true,
      });
    }
  }, [open, projectId, form]);

  function onSubmit(values: CreateEndpointInput) {
    createEndpoint.mutate(values, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create endpoint</DialogTitle>
          <DialogDescription>
            {projectName
              ? `Add a monitored endpoint to ${projectName}.`
              : "Add a monitored endpoint to this project."}
          </DialogDescription>
        </DialogHeader>

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
                    <Input placeholder="Health check" {...field} />
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
                    <Input
                      placeholder="https://api.example.com/health"
                      {...field}
                    />
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
                      <select
                        {...field}
                        className={selectClassName}
                      >
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
                disabled={createEndpoint.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={createEndpoint.isPending}>
                {createEndpoint.isPending ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create endpoint"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
