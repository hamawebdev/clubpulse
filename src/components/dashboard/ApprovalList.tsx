
import React, { useState } from 'react';
import {
  Search,
  Filter,
  Check,
  X,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useApi } from '@/hooks/useApi';
import { approvalService, Approval } from '@/services/approvalService';
import ConfirmationDialog from './ConfirmationDialog';

interface RejectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

const RejectDialog: React.FC<RejectDialogProps> = ({ isOpen, onClose, onConfirm }) => {
  const [reason, setReason] = useState('');
  
  const handleConfirm = () => {
    onConfirm(reason);
    setReason('');
    onClose();
  };
  
  return (
    <ConfirmationDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Reject Request"
      description="Please provide a reason for rejecting this request."
      confirmText="Reject"
      cancelText="Cancel"
      variant="destructive"
    />
  );
};

const ApprovalList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [selectedApprovalId, setSelectedApprovalId] = useState<string | undefined>(undefined);
  
  const { toast } = useToast();
  const { useGet, usePut } = useApi<Approval[]>();
  
  const { data: approvals = [], isLoading, refetch } = useGet(
    ['approvals'],
    () => approvalService.getApprovals(),
    { 
      onError: () => {
        toast({
          title: 'Error',
          description: 'Failed to load approval requests',
          variant: 'destructive',
        });
      }
    }
  );
  
  const approveRequest = usePut(
    (id: string) => approvalService.approveRequest(id),
    {
      invalidateQueries: ['approvals'],
      successMessage: 'Request approved successfully',
    }
  );
  
  const rejectRequest = usePut(
    ({ id, reason }: { id: string; reason: string }) => 
      approvalService.rejectRequest(id, reason),
    {
      invalidateQueries: ['approvals'],
      successMessage: 'Request rejected successfully',
    }
  );
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleApprove = (id: string) => {
    approveRequest.mutate(id);
  };
  
  const handleRejectPrompt = (id: string) => {
    setSelectedApprovalId(id);
    setIsRejectDialogOpen(true);
  };
  
  const handleRejectConfirm = (reason: string) => {
    if (selectedApprovalId) {
      rejectRequest.mutate({ id: selectedApprovalId, reason });
    }
  };
  
  const handleViewDetails = (approval: Approval) => {
    toast({
      title: "View Details",
      description: `Viewing details for ${approval.title}`,
    });
  };
  
  const filteredApprovals = approvals.filter(approval => 
    approval.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    approval.requestedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
    approval.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search approvals..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={() => {
            toast({
              title: "Filter Approvals",
              description: "Filter options opened"
            });
          }}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Requested By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Loading approval requests...
                    </TableCell>
                  </TableRow>
                ) : filteredApprovals.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No approval requests found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredApprovals.map((approval) => (
                    <TableRow key={approval.id}>
                      <TableCell>
                        <div className="font-medium">{approval.title}</div>
                        <div className="text-xs text-muted-foreground">{approval.details.substring(0, 40)}...</div>
                      </TableCell>
                      <TableCell>{approval.type}</TableCell>
                      <TableCell>{approval.requestedBy}</TableCell>
                      <TableCell>{approval.requestedOn}</TableCell>
                      <TableCell>
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                          Pending
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-green-600 gap-1"
                            onClick={() => handleApprove(approval.id)}
                            disabled={approveRequest.isPending}
                          >
                            <Check className="h-4 w-4" />
                            Approve
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 gap-1"
                            onClick={() => handleRejectPrompt(approval.id)}
                            disabled={rejectRequest.isPending}
                          >
                            <X className="h-4 w-4" />
                            Reject
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewDetails(approval)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Reject Dialog */}
      <RejectDialog
        isOpen={isRejectDialogOpen}
        onClose={() => setIsRejectDialogOpen(false)}
        onConfirm={handleRejectConfirm}
      />
    </div>
  );
};

export default ApprovalList;
