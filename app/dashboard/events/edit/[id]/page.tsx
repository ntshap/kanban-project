"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

export default function EditEventPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event>({
    id: "",
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    attendees: 0,
    status: "Upcoming",
  })
  const router = useRouter()

  useEffect(() => {
    // In a real application, fetch event data from an API
    // For now, we'll use mock data
    const mockEvent: Event = {
      id: params.id,
      title: "Annual Church Gathering",
      description: "Join us for our annual church gathering with worship and fellowship.",
      date: "2025-04-15",
      time: "10:00",
      location: "Main Sanctuary",
      attendees: 150,
      status: "Upcoming",
    }
    setEvent(mockEvent)
  }, [params.id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, save changes to an API
    console.log("Saving event:", event)
    router.push(`/events/${event.id}`)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Edit Event</h1>
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border rounded-lg p-6 space-y-4">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={event.title}
                onChange={(e) => setEvent({ ...event, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={event.description}
                onChange={(e) => setEvent({ ...event, description: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={event.date}
                  onChange={(e) => setEvent({ ...event, date: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={event.time}
                  onChange={(e) => setEvent({ ...event, time: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={event.location}
                onChange={(e) => setEvent({ ...event, location: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="attendees">Attendees</Label>
              <Input
                id="attendees"
                type="number"
                value={event.attendees}
                onChange={(e) => setEvent({ ...event, attendees: parseInt(e.target.value) })}
                required
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={event.status}
                onValueChange={(value: "Upcoming" | "Completed" | "Cancelled") =>
                  setEvent({ ...event, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Upcoming">Upcoming</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  )
}
