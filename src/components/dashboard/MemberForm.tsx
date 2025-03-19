
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Member } from "@/services/memberService";
import { useApi } from "@/hooks/useApi";
import { memberService } from "@/services/memberService";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  role: z.string().min(1, { message: "Role is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  phone: z.string().optional(),
  department: z.string().optional(),
});

interface MemberFormProps {
  isOpen: boolean;
  onClose: () => void;
  member?: Member;
}

const MemberForm: React.FC<MemberFormProps> = ({ isOpen, onClose, member }) => {
  const { usePost, usePut } = useApi();
  const isEditing = !!member;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: member?.name || "",
      email: member?.email || "",
      role: member?.role || "",
      status: member?.status || "Active",
      phone: member?.phone || "",
      department: member?.department || "",
    },
  });

  const createMember = usePost(memberService.createMember, {
    invalidateQueries: ["members"],
    successMessage: "Member created successfully",
    onSuccess: () => {
      onClose();
      form.reset();
    },
  });

  const updateMember = usePut(
    (data: z.infer<typeof formSchema>) =>
      memberService.updateMember(member?.id || "", data),
    {
      invalidateQueries: ["members"],
      successMessage: "Member updated successfully",
      onSuccess: () => {
        onClose();
        form.reset();
      },
    }
  );

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (isEditing) {
      updateMember.mutate(data);
    } else {
      createMember.mutate(data as any);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Member" : "Add New Member"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update member information in the form below"
              : "Fill in the details to add a new member"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="President">President</SelectItem>
                      <SelectItem value="Vice President">Vice President</SelectItem>
                      <SelectItem value="Secretary">Secretary</SelectItem>
                      <SelectItem value="Treasurer">Treasurer</SelectItem>
                      <SelectItem value="Member">Member</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="(123) 456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Engineering" {...field} />
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
                disabled={createMember.isPending || updateMember.isPending}
              >
                {isEditing ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MemberForm;
