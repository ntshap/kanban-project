"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Calendar,
  DollarSign,
  FileText,
  Users,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Upload,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { DatePicker } from "@/components/ui/date-picker"
import { TimeInput } from "@/components/ui/time-input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { StatCard } from "@/components/dashboard/stat-card"
import { EventDetailModal } from "@/components/dashboard/event-detail-modal"
import { UploadDocumentModal } from "@/components/dashboard/upload-document-modal"
import { DeleteConfirmationDialog } from "@/components/dashboard/delete-confirmation-dialog"
import { QuickActions } from "./components/quick-actions"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// Sample data for the dashboard
const events = [
  {
    id: 1,
    title: "Client Strategy Meeting",
    description: "Quarterly meeting with key clients to discuss project progress",
    date: "2024-03-15",
    time: "09:00",
    location: "Executive Boardroom",
    status: "Completed",
    attendees: 12,
  },
  {
    id: 2,
    title: "New Employee Orientation",
    description: "Onboarding session for new team members",
    date: "2024-03-28",
    time: "10:30",
    location: "Training Room A",
    status: "Upcoming",
    attendees: 8,
  },
  {
    id: 3,
    title: "Client Product Demo",
    description: "Product demonstration for potential enterprise clients",
    date: "2024-04-05",
    time: "14:00",
    location: "Demo Suite",
    status: "Upcoming",
    attendees: 15,
  },
]

// Form schema for adding/editing events
const eventFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  date: z.date(),
  time: z.string(),
  location: z.string().min(3, { message: "Location must be at least 3 characters" }),
  status: z.string().optional(),
})

export default function DashboardPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)

  // Form setup
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
      time: "09:00",
      location: "",
      status: "Upcoming",
    },
  })

  // Handle form submission
  const onSubmit = (data: z.infer<typeof eventFormSchema>) => {
    console.log(data)
    toast({
      title: "Event created",
      description: "Your event has been successfully created.",
    })
    setShowAddModal(false)
    form.reset()
  }

  // Handle view event details
  const handleViewEvent = (event: any) => {
    setSelectedEvent(event)
    setShowDetailModal(true)
  }

  // Handle upload documents
  const handleUploadDocuments = (event: any) => {
    setSelectedEvent(event)
    setShowUploadModal(true)
  }

  // Handle delete event
  const handleDeleteEvent = (event: any) => {
    setSelectedEvent(event)
    setShowDeleteDialog(true)
  }

  // Confirm delete event
  const confirmDeleteEvent = () => {
    toast({
      title: "Event deleted",
      description: "The event has been successfully deleted.",
    })
    setShowDeleteDialog(false)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value="1,234"
          description="Active users this month"
          trend="up"
          percentage={12}
          icon={Users}
        />
        <StatCard
          title="Total Events"
          value="45"
          description="Events this month"
          trend="up"
          percentage={8}
          icon={Calendar}
        />
        <StatCard
          title="Revenue"
          value="$52,890"
          description="Total revenue this month"
          trend="up"
          percentage={15}
          icon={DollarSign}
        />
        <StatCard
          title="Documents"
          value="128"
          description="Files uploaded"
          trend="up"
          percentage={5}
          icon={FileText}
        />
      </div>

      <QuickActions />

      <Card className="mt-6">
        <CardHeader className="pb-4">
          <CardTitle>Recent Events</CardTitle>
          <CardDescription>
            Overview of your latest events
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[300px] py-4">Event Name</TableHead>
                <TableHead className="py-4">Date</TableHead>
                <TableHead className="py-4">Status</TableHead>
                <TableHead className="py-4">Attendees</TableHead>
                <TableHead className="text-right py-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id} className="hover:bg-slate-50">
                  <TableCell className="py-4 font-medium">{event.title}</TableCell>
                  <TableCell className="py-4">{event.date}</TableCell>
                  <TableCell className="py-4">
                    <Badge 
                      className={
                        event.status === "Completed" 
                          ? "bg-green-100 text-green-800 px-3 py-1" 
                          : "bg-blue-100 text-blue-800 px-3 py-1"
                      }
                    >
                      {event.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">{event.attendees}</TableCell>
                  <TableCell className="text-right space-x-2 py-4">
                    <Button variant="ghost" size="icon" onClick={() => handleViewEvent(event)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleUploadDocuments(event)}>
                      <Upload className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteEvent(event)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between px-6 py-4">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>

      {/* Add Event Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>
              Create a new event for your organization. Fill in all the required details.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Event title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Event description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <DatePicker date={field.value} onSelect={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <TimeInput value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Event location" {...field} />
                    </FormControl>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Upcoming">Upcoming</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Event</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal show={showDetailModal} onClose={() => setShowDetailModal(false)} event={selectedEvent} />
      )}

      {/* Upload Document Modal */}
      {selectedEvent && (
        <UploadDocumentModal
          show={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          eventId={selectedEvent.id}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {selectedEvent && (
        <DeleteConfirmationDialog
          show={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          onConfirm={confirmDeleteEvent}
          title="Delete Event"
          description={`Are you sure you want to delete "${selectedEvent.title}"? This action cannot be undone.`}
        />
      )}
    </div>
  )
}
