import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  UserPlus, 
  Shield, 
  Mail, 
  MapPin,
  CheckCircle2,
  XCircle,
  Download,
  Table as TableIcon,
  FileText,
  RefreshCw,
  Trash2
} from 'lucide-react';
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from '../../features/users/hooks';
import { User, UserRole } from '../../types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Modal } from '../shared/Modal';
import { UserForm } from './UserForm';
import { UserFormData } from '../../features/users/schema';
import { toast } from 'sonner';
import { DataTable } from '../shared/DataTable';
import { exportToCSV, exportToPDF } from '../../lib/export';
import { ConfirmDialog } from '../shared/ConfirmDialog';
import { EmptyState } from '../shared/EmptyState';
import { Meta } from '../shared/Meta';

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: users = [], isLoading, refetch, isFetching } = useUsers({
    search: searchTerm,
  });
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleCreateUser = async (data: UserFormData) => {
    try {
      await createUserMutation.mutateAsync(data as Omit<User, 'id'>);
      setIsCreateModalOpen(false);
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleUpdateUser = async (data: UserFormData) => {
    if (!editingUser) return;
    try {
      await updateUserMutation.mutateAsync({ id: editingUser.id, user: data as Partial<User> });
      setEditingUser(null);
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleExportCSV = () => {
    exportToCSV(users, 'citiscope-users');
  };

  const handleExportPDF = () => {
    const columns = ['id', 'name', 'email', 'role', 'region', 'zone', 'status'];
    exportToPDF(users, columns, 'citiscope-users', 'CitiScope Users Report');
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'federal_admin': return <Badge className="bg-red-500 hover:bg-red-600">Federal Admin</Badge>;
      case 'regional_admin': return <Badge className="bg-blue-500 hover:bg-blue-600">Regional Admin</Badge>;
      case 'zonal_admin': return <Badge className="bg-purple-500 hover:bg-purple-600">Zonal Admin</Badge>;
      case 'woreda_admin': return <Badge className="bg-orange-500 hover:bg-orange-600">Woreda Admin</Badge>;
      case 'technician': return <Badge className="bg-green-500 hover:bg-green-600">Technician</Badge>;
      default: return <Badge variant="outline">{role}</Badge>;
    }
  };

  const columns = [
    {
      header: 'User',
      accessorKey: 'name',
      sortable: true,
      cell: (user: User) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Role',
      accessorKey: 'role',
      sortable: true,
      cell: (user: User) => getRoleBadge(user.role)
    },
    {
      header: 'Region / Zone',
      accessorKey: 'region',
      sortable: true,
      cell: (user: User) => (
        <div className="flex items-center gap-1 text-xs">
          <MapPin className="h-3 w-3 text-muted-foreground" />
          <span>{user.region}</span>
          {user.zone && <span className="text-muted-foreground"> / {user.zone}</span>}
        </div>
      )
    },
    {
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      cell: (user: User) => (
        user.status === 'active' ? (
          <div className="flex items-center gap-1 text-green-500 text-xs font-medium">
            <CheckCircle2 className="h-3 w-3" /> Active
          </div>
        ) : (
          <div className="flex items-center gap-1 text-red-500 text-xs font-medium">
            <XCircle className="h-3 w-3" /> Inactive
          </div>
        )
      )
    },
    {
      header: 'Phone',
      accessorKey: 'phone',
      cell: (user: User) => <span className="text-xs text-muted-foreground">{user.phone}</span>
    },
    {
      header: 'Actions',
      accessorKey: 'id',
      cell: (user: User) => (
        <div className="flex items-center justify-end gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setEditingUser(user)}>
                <Shield className="mr-2 h-4 w-4" /> Edit User
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" /> Send Message
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <ConfirmDialog
                title="Delete User"
                description={`Are you sure you want to delete user ${user.name}? This action cannot be undone.`}
                confirmLabel="Delete"
                variant="destructive"
                onConfirm={() => deleteUserMutation.mutate(user.id)}
                trigger={
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete User
                  </DropdownMenuItem>
                }
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <Meta 
        title="User Management | CitiScope" 
        description="Manage administrative users and their access levels across the platform."
      />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage administrative access and roles across all tiers of the platform.</p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleExportCSV}>
                <TableIcon className="mr-2 h-4 w-4" /> Export to CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportPDF}>
                <FileText className="mr-2 h-4 w-4" /> Export to PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" /> Add New User
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users by name or email..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="h-9 px-4">Total Users: {users.length}</Badge>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => refetch()}
            className={isFetching ? "animate-spin" : ""}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {users.length === 0 && !isLoading ? (
        <EmptyState
          icon={Shield}
          title="No users found"
          description="Try adjusting your search to find the user you're looking for."
          actionLabel="Clear Search"
          onAction={() => setSearchTerm('')}
        />
      ) : (
        <DataTable
          columns={columns}
          data={users}
          isLoading={isLoading}
          pageSize={10}
        />
      )}

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Add New User"
        description="Create a new administrative user for the platform."
      >
        <UserForm
          onSubmit={handleCreateUser}
          isSubmitting={createUserMutation.isPending}
        />
      </Modal>

      <Modal
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        title="Edit User"
        description="Update user information and permissions."
      >
        {editingUser && (
          <UserForm
            initialData={editingUser}
            onSubmit={handleUpdateUser}
            isSubmitting={updateUserMutation.isPending}
          />
        )}
      </Modal>
    </div>
  );
}
