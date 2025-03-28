"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  attendees: number
  status: "Upcoming" | "Completed" | "Cancelled"
}

const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Quarterly Business Review",
    description: "Strategic review meeting with department heads and key stakeholders.",
    date: "2025-04-15",
    time: "10:00",
    location: "Executive Conference Room",
    attendees: 25,
    status: "Upcoming",
  },
  {
    id: "2",
    title: "Client Product Launch",
    description: "Product launch presentation for our enterprise clients.",
    date: "2025-04-20",
    time: "14:00",
    location: "Innovation Center",
    attendees: 45,
    status: "Upcoming",
  },
  {
    id: "3",
    title: "Team Building Workshop",
    description: "Interactive workshop focusing on team collaboration and leadership skills.",
    date: "2025-03-31",
    time: "09:00",
    location: "Training Room A",
    attendees: 30,
    status: "Completed",
  },
]

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(sampleEvents)
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    status: "Upcoming",
  })

  const router = useRouter()

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time && newEvent.location) {
      const event: Event = {
        id: (events.length + 1).toString(),
        title: newEvent.title,
        description: newEvent.description || "",
        date: newEvent.date,
        time: newEvent.time,
        location: newEvent.location,
        attendees: 0,
        status: "Upcoming",
      }
      setEvents([...events, event])
      setShowAddDialog(false)
      setNewEvent({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        status: "Upcoming",
      })
    }
  }

  const handleDeleteEvent = (event: Event) => {
    setSelectedEvent(event)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (selectedEvent) {
      setEvents(events.filter((e) => e.id !== selectedEvent.id))
      setShowDeleteDialog(false)
      setSelectedEvent(null)
    }
  }

  const handleViewEvent = (event: Event) => {
    // Navigate to event details page
    router.push(`/dashboard/events/${event.id}`)
  }

  const handleEditEvent = (event: Event) => {
    // Navigate to event edit page
    router.push(`/dashboard/events/edit/${event.id}`)
  }

  return (
    <div className="p-8">
      <div className="max-w-[1400px] mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Events</h1>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Event
          </Button>
        </div>

        <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
          <Search className="w-5 h-5 text-gray-500" />
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="border rounded-lg bg-white shadow-sm overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[250px] py-4">Event Name</TableHead>
                <TableHead className="w-[120px] py-4">Date</TableHead>
                <TableHead className="w-[100px] py-4">Time</TableHead>
                <TableHead className="w-[200px] py-4">Location</TableHead>
                <TableHead className="w-[100px] py-4">Attendees</TableHead>
                <TableHead className="w-[120px] py-4">Status</TableHead>
                <TableHead className="w-[120px] text-right py-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id} className="hover:bg-slate-50">
                  <TableCell className="py-4 font-medium">{event.title}</TableCell>
                  <TableCell className="py-4">{event.date}</TableCell>
                  <TableCell className="py-4">{event.time}</TableCell>
                  <TableCell className="py-4">{event.location}</TableCell>
                  <TableCell className="py-4">{event.attendees}</TableCell>
                  <TableCell className="py-4">
                    <Badge 
                      className={
                        event.status === "Completed" 
                          ? "bg-green-100 text-green-800 px-3 py-1" 
                          : event.status === "Cancelled"
                          ? "bg-red-100 text-red-800 px-3 py-1"
                          : "bg-blue-100 text-blue-800 px-3 py-1"
                      }
                    >
                      {event.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex justify-end gap-3">
                      <Button variant="ghost" size="icon" onClick={() => handleViewEvent(event)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEditEvent(event)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteEvent(event)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>
                Create a new event by filling out the form below.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEvent}>Add Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Event</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this event? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
