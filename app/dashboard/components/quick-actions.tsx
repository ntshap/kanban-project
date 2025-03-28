'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import {
  Calendar,
  MessageSquare,
  FileText,
  Users,
  PlusCircle,
  Mail,
  Upload,
} from "lucide-react";

export function QuickActions() {
  const router = useRouter();
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const quickActions = [
    {
      title: "Create Event",
      description: "Schedule a new event",
      icon: Calendar,
      onClick: () => router.push("/dashboard/events/create"),
    },
    {
      title: "Send Message",
      description: "Contact participants",
      icon: MessageSquare,
      onClick: () => router.push("/dashboard/messages"),
    },
    {
      title: "View Reports",
      description: "Check analytics",
      icon: FileText,
      onClick: () => router.push("/dashboard/reports"),
    },
    {
      title: "Invite Team",
      description: "Add team members",
      icon: Users,
      onClick: () => setIsInviteDialogOpen(true),
    },
    {
      title: "New Post",
      description: "Create announcement",
      icon: PlusCircle,
      onClick: () => router.push("/dashboard/posts/create"),
    },
    {
      title: "Upload Files",
      description: "Share documents",
      icon: Upload,
      onClick: () => setIsUploadDialogOpen(true),
    },
  ];

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Invitation sent",
      description: `An invitation has been sent to ${inviteEmail}`,
    });
    setInviteEmail('');
    setIsInviteDialogOpen(false);
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadFile) {
      toast({
        title: "File uploaded",
        description: `${uploadFile.name} has been uploaded successfully`,
      });
      setUploadFile(null);
      setIsUploadDialogOpen(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center justify-center gap-2 hover:bg-accent"
                  onClick={action.onClick}
                >
                  <Icon className="h-6 w-6" />
                  <div className="space-y-1 text-center">
                    <h3 className="font-medium">{action.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Invite Team Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>
              Send an invitation to join your team
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleInvite}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Send Invitation</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Upload Files Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Files</DialogTitle>
            <DialogDescription>
              Share documents with your team
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpload}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="file">Select file</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Upload</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
