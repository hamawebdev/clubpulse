
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApi } from "@/hooks/useApi";
import { approvalService } from "@/services/approvalService";
import { CalendarIcon } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  type: z.string().min(1, { message: "Report type is required" }),
  details: z.string().min(10, { message: "Details must be at least 10 characters" }),
  dateRange: z.object({
    from: z.string().min(1, { message: "Start date is required" }),
    to: z.string().min(1, { message: "End date is required" }),
  }),
});

interface ReportFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ isOpen, onClose }) => {
  const { usePost } = useApi();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "",
      details: "",
      dateRange: {
        from: new Date().toISOString().split('T')[0],
        to: new Date().toISOString().split('T')[0],
      },
    },
  });

  const generateReport = usePost((data: z.infer<typeof formSchema>) => 
    approvalService.generateReport({
      title: data.title,
      type: data.type,
      content: {
        details: data.details,
        dateRange: data.dateRange,
      }
    }), {
      invalidateQueries: ["reports"],
      successMessage: "Report generated successfully",
      onSuccess: () => {
        onClose();
        form.reset();
      },
    }
  );

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    generateReport.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Generate Report</DialogTitle>
          <DialogDescription>
            Fill in the details to generate a new report
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Report Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Monthly Attendance Report" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Report Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Attendance">Attendance</SelectItem>
                      <SelectItem value="Financial">Financial</SelectItem>
                      <SelectItem value="Event Summary">Event Summary</SelectItem>
                      <SelectItem value="Membership">Membership</SelectItem>
                      <SelectItem value="Custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dateRange.from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateRange.to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Report Details</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe what should be included in this report..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={generateReport.isPending}
              >
                Generate Report
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportForm;
