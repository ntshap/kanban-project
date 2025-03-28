"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Users, Image, Download, Edit, Trash2, Check, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

interface EventDetailModalProps {
  show: boolean
  onClose: () => void
  event: any
}

export function EventDetailModal({ show, onClose, event }: EventDetailModalProps) {
  const [activeTab, setActiveTab] = useState("details")
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  // Sample data for attendees
  const attendees = [
    { id: 1, name: "John Doe", status: "Present", notes: "Arrived on time", avatar: "JD" },
    { id: 2, name: "Jane Smith", status: "Present", notes: "Volunteered to help", avatar: "JS" },
    { id: 3, name: "Robert Johnson", status: "Absent", notes: "Called in sick", avatar: "RJ" },
    { id: 4, name: "Emily Williams", status: "Present", notes: "", avatar: "EW" },
    { id: 5, name: "Michael Brown", status: "Late", notes: "Arrived 15 minutes late", avatar: "MB" },
    { id: 6, name: "Sarah Davis", status: "Present", notes: "Brought refreshments", avatar: "SD" },
    { id: 7, name: "David Miller", status: "Absent", notes: "No notification", avatar: "DM" },
    { id: 8, name: "Jennifer Wilson", status: "Present", notes: "", avatar: "JW" },
  ]

  // Sample data for photos
  const photos = [
    { id: 1, url: "/placeholder.svg?height=400&width=600", caption: "Opening ceremony", date: "2024-03-15" },
    { id: 2, url: "/placeholder.svg?height=400&width=600", caption: "Group discussion", date: "2024-03-15" },
    { id: 3, url: "/placeholder.svg?height=400&width=600", caption: "Presentation", date: "2024-03-15" },
    { id: 4, url: "/placeholder.svg?height=400&width=600", caption: "Networking session", date: "2024-03-15" },
    { id: 5, url: "/placeholder.svg?height=400&width=600", caption: "Closing remarks", date: "2024-03-15" },
    { id: 6, url: "/placeholder.svg?height=400&width=600", caption: "Award ceremony", date: "2024-03-15" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present":
        return "success"
      case "Absent":
        return "destructive"
      case "Late":
        return "warning"
      default:
        return "default"
    }
  }

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0 gap-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-semibold text-slate-900">{event.title}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent px-6">
              <TabsTrigger
                value="details"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="attendance"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
              >
                Attendance
              </TabsTrigger>
              <TabsTrigger
                value="gallery"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
              >
                Gallery
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="details" className="p-6 pt-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border shadow-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold">Event Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Date</p>
                      <p className="font-medium">{event.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Time</p>
                      <p className="font-medium">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Location</p>
                      <p className="font-medium">{event.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Attendees</p>
                      <p className="font-medium">{event.attendees} participants</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700">{event.description}</p>

                  <div className="mt-6">
                    <p className="text-sm font-medium text-slate-500 mb-2">Status</p>
                    <Badge variant={event.status === "Completed" ? "success" : "default"} className="px-3 py-1 text-xs">
                      {event.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Event Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <Check className="h-4 w-4" />
                      </div>
                      <div className="h-full w-px bg-blue-100"></div>
                    </div>
                    <div>
                      <p className="font-medium">Event Created</p>
                      <p className="text-sm text-slate-500">March 1, 2024 at 10:30 AM</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <Check className="h-4 w-4" />
                      </div>
                      <div className="h-full w-px bg-blue-100"></div>
                    </div>
                    <div>
                      <p className="font-medium">Invitations Sent</p>
                      <p className="text-sm text-slate-500">March 5, 2024 at 2:15 PM</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <Check className="h-4 w-4" />
                      </div>
                      <div className="h-full w-px bg-blue-100"></div>
                    </div>
                    <div>
                      <p className="font-medium">Event Started</p>
                      <p className="text-sm text-slate-500">
                        {event.date} at {event.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                        <Clock className="h-4 w-4" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Event Completed</p>
                      <p className="text-sm text-slate-500">Pending</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="p-0">
            <div className="p-6 pb-3">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold">Attendance List</h3>
                  <p className="text-sm text-slate-500">
                    {attendees.filter((a) => a.status === "Present").length} of {attendees.length} members present
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>

            <ScrollArea className="h-[400px] border-t">
              <div className="p-6 pt-3">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Notes</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {attendees.map((attendee) => (
                        <TableRow key={attendee.id} className="hover:bg-slate-50">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(attendee.name)}&background=c7d2fe&color=4f46e5`}
                                />
                                <AvatarFallback>{attendee.avatar}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{attendee.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(attendee.status)}>{attendee.status}</Badge>
                          </TableCell>
                          <TableCell>{attendee.notes || "-"}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="gallery" className="p-0">
            {selectedPhoto ? (
              <div className="relative h-[500px] bg-slate-900">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4 z-10 h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20"
                  onClick={() => setSelectedPhoto(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="flex h-full items-center justify-center">
                  <img
                    src={selectedPhoto || "/placeholder.svg"}
                    alt="Event photo"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="p-6 pb-3">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-semibold">Event Photos</h3>
                      <p className="text-sm text-slate-500">{photos.length} photos from this event</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download All
                      </Button>
                      <Button size="sm">
                        <Image className="h-4 w-4 mr-2" />
                        Add Photos
                      </Button>
                    </div>
                  </div>
                </div>

                <ScrollArea className="h-[400px] border-t">
                  <div className="p-6 pt-3">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {photos.map((photo) => (
                        <div
                          key={photo.id}
                          className="group relative aspect-video cursor-pointer overflow-hidden rounded-md border bg-slate-50"
                          onClick={() => setSelectedPhoto(photo.url)}
                        >
                          <img
                            src={photo.url || "/placeholder.svg"}
                            alt={photo.caption}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <p className="text-sm font-medium text-white">{photo.caption}</p>
                            <p className="text-xs text-white/80">{photo.date}</p>
                          </div>
                          <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-full bg-black/20 text-white hover:bg-black/40"
                            >
                              <Download className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-full bg-black/20 text-white hover:bg-black/40"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              </>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter className="p-6 pt-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

