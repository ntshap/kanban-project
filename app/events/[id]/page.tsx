"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, MapPin, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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

export default function EventDetailsPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event | null>(null)
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

  if (!event) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{event.title}</h1>
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold">Event Details</h2>
            <p className="text-gray-600">{event.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span>{event.attendees} Attendees</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Status</h2>
            <Badge
              variant={
                event.status === "Completed"
                  ? "secondary"
                  : event.status === "Cancelled"
                  ? "destructive"
                  : "default"
              }
              className="text-sm"
            >
              {event.status}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
