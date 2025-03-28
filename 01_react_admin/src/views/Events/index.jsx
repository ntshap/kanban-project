"use client"

import { useState, useEffect } from "react"
import { Card, Button, Modal, Form, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import DatePicker from "react-datepicker"
import { Calendar, MapPin, Clock, Users, ImageIcon, Trash2, Edit2, Eye, Upload } from "lucide-react"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import "react-datepicker/dist/react-datepicker.css"
import { retrieveData, storeData } from "../../utils/localStorage"
import UploadDocumentModal from "../dashboard/UploadDocumentModal"

const EventCard = ({ event, onView, onEdit, onDelete, onUpload }) => {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative">
        {event.image ? (
          <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-48 object-cover" />
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-gray-400" />
          </div>
        )}
        <div className="absolute top-3 right-3 flex gap-2">
          <Button
            variant="light"
            size="sm"
            className="rounded-full w-8 h-8 flex items-center justify-center bg-white/90 hover:bg-white"
            onClick={() => onUpload(event)}
          >
            <Upload className="w-4 h-4" />
          </Button>
          <Button
            variant="light"
            size="sm"
            className="rounded-full w-8 h-8 flex items-center justify-center bg-white/90 hover:bg-white"
            onClick={() => onEdit(event)}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            variant="light"
            size="sm"
            className="rounded-full w-8 h-8 flex items-center justify-center bg-white/90 hover:bg-white"
            onClick={() => onDelete(event)}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      </div>

      <Card.Body>
        <h5 className="font-semibold mb-2">{event.title}</h5>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(event.date).toLocaleDateString()}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            {event.time?.slice(0, 5)}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            {event.location}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-2" />
            {event.attendees || 0} Attendees
          </div>
        </div>

        <Button variant="primary" className="w-full mt-4" onClick={() => onView(event)}>
          <Eye className="w-4 h-4 mr-2" /> View Details
        </Button>
      </Card.Body>
    </Card>
  )
}

const EventsPage = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const navigate = useNavigate()

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: new Date(),
    time: "08:00",
    location: "",
    attendees: 0,
    image: "/placeholder.svg?height=200&width=300",
    documents: [],
  })

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = () => {
    setLoading(true)

    // Simulate API call with localStorage
    setTimeout(() => {
      const storedEvents = retrieveData("admin_events", [])
      setEvents(storedEvents)
      setLoading(false)
    }, 800)
  }

  const handleAddEvent = (e) => {
    e.preventDefault()

    // Create new event with ID
    const newId = events.length > 0 ? Math.max(...events.map((event) => event.id)) + 1 : 1
    const eventToAdd = {
      ...newEvent,
      id: newId,
      date: newEvent.date.toISOString().split("T")[0],
    }

    // Add to events array
    const updatedEvents = [...events, eventToAdd]

    // Save to localStorage
    storeData("admin_events", updatedEvents)

    // Update state
    setEvents(updatedEvents)
    setShowModal(false)

    // Reset form
    setNewEvent({
      title: "",
      description: "",
      date: new Date(),
      time: "08:00",
      location: "",
      attendees: 0,
      image: "/placeholder.svg?height=200&width=300",
      documents: [],
    })
  }

  const handleDeleteEvent = () => {
    if (!selectedEvent) return

    // Filter out the selected event
    const updatedEvents = events.filter((event) => event.id !== selectedEvent.id)

    // Save to localStorage
    storeData("admin_events", updatedEvents)

    // Update state
    setEvents(updatedEvents)
    setShowDeleteModal(false)
    setSelectedEvent(null)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="border-0 shadow-sm">
            <Skeleton height={200} />
            <Card.Body>
              <Skeleton height={20} width="60%" className="mb-2" />
              <Skeleton height={40} className="mb-3" />
              <Skeleton height={15} className="mb-2" />
              <Skeleton height={15} className="mb-2" />
              <Skeleton height={15} className="mb-2" />
              <Skeleton height={35} className="mt-4" />
            </Card.Body>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Events Management</h1>
        <Button variant="primary" onClick={() => setShowModal(true)} className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          Add New Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onView={(event) => navigate(`/events/${event.id}`)}
            onEdit={(event) => navigate(`/events/edit/${event.id}`)}
            onDelete={(event) => {
              setSelectedEvent(event)
              setShowDeleteModal(true)
            }}
            onUpload={(event) => {
              setSelectedEvent(event)
              setShowUploadModal(true)
            }}
          />
        ))}
      </div>

      {/* Add Event Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddEvent}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <DatePicker
                    selected={newEvent.date}
                    onChange={(date) => setNewEvent({ ...newEvent, date })}
                    className="form-control"
                    dateFormat="MM/dd/yyyy"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Expected Attendees</Form.Label>
              <Form.Control
                type="number"
                value={newEvent.attendees}
                onChange={(e) => setNewEvent({ ...newEvent, attendees: Number.parseInt(e.target.value) || 0 })}
              />
            </Form.Group>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Create Event
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete "{selectedEvent?.title}"?</p>
          <p className="text-sm text-gray-500">This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteEvent}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Upload Modal */}
      <UploadDocumentModal
        show={showUploadModal}
        onHide={() => setShowUploadModal(false)}
        eventId={selectedEvent?.id}
        fetchEvents={fetchEvents}
      />
    </div>
  )
}

export default EventsPage

