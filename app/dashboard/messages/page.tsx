"use client"

import type React from "react"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { MessageCircle, Send, Clock, Search, Inbox, Archive, Star, AlertCircle } from "lucide-react"

// Mock data for messages
const mockMessages = [
  {
    id: "1",
    sender: "Maria Rodriguez",
    email: "maria@example.com",
    subject: "Question about enrollment",
    message:
      "Hello, I'm interested in enrolling my daughter in your daycare. Could you please provide more information about the enrollment process and availability?",
    date: "2023-12-10T14:30:00",
    read: true,
    starred: false,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    sender: "John Smith",
    email: "john@example.com",
    subject: "Schedule change request",
    message:
      "I need to change my son's schedule starting next week. He will be attending Monday, Wednesday, and Friday instead of the full week. Please let me know if this is possible.",
    date: "2023-12-09T10:15:00",
    read: false,
    starred: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    sender: "Sarah Johnson",
    email: "sarah@example.com",
    subject: "Dietary restrictions",
    message:
      "I wanted to inform you that my child has been diagnosed with a gluten allergy. Could you please ensure that his meals are gluten-free? Let me know if you need any additional information.",
    date: "2023-12-08T16:45:00",
    read: false,
    starred: false,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    sender: "David Williams",
    email: "david@example.com",
    subject: "Vacation notice",
    message:
      "We will be on vacation from December 20th to January 3rd. My daughter will not be attending during this period. Please adjust the billing accordingly.",
    date: "2023-12-07T09:20:00",
    read: true,
    starred: false,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    sender: "Emily Brown",
    email: "emily@example.com",
    subject: "Feedback on recent event",
    message:
      "I just wanted to say thank you for organizing the winter celebration. My son had a wonderful time and hasn't stopped talking about it. The staff did an amazing job!",
    date: "2023-12-06T13:10:00",
    read: true,
    starred: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function MessagesPage() {
  const [messages, setMessages] = useState(mockMessages)
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null)
  const [activeTab, setActiveTab] = useState("inbox")
  const [searchQuery, setSearchQuery] = useState("")
  const [replyText, setReplyText] = useState("")
  const { toast } = useToast()

  // Filter messages based on active tab and search query
  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "inbox") return matchesSearch
    if (activeTab === "starred") return message.starred && matchesSearch
    if (activeTab === "unread") return !message.read && matchesSearch
    if (activeTab === "archived") return false // No archived messages in mock data

    return matchesSearch
  })

  const handleSelectMessage = (message: any) => {
    // Mark as read when selected
    if (!message.read) {
      const updatedMessages = messages.map((m) => (m.id === message.id ? { ...m, read: true } : m))
      setMessages(updatedMessages)
    }
    setSelectedMessage(message)
  }

  const handleStarMessage = (e: React.MouseEvent, messageId: string) => {
    e.stopPropagation()
    const updatedMessages = messages.map((message) =>
      message.id === messageId ? { ...message, starred: !message.starred } : message,
    )
    setMessages(updatedMessages)
  }

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedMessage) return

    // In a real app, this would send the reply to a backend
    toast({
      title: "Reply sent",
      description: `Your reply to ${selectedMessage.sender} has been sent.`,
    })

    setReplyText("")
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col w-full">
      <DashboardHeader />
      <div className="flex-1 p-8 pt-6 w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-200px)]">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Tabs defaultValue="inbox" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="inbox">
                  <Inbox className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Inbox</span>
                </TabsTrigger>
                <TabsTrigger value="unread">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Unread</span>
                </TabsTrigger>
                <TabsTrigger value="starred">
                  <Star className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Starred</span>
                </TabsTrigger>
                <TabsTrigger value="archived">
                  <Archive className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Archived</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="mt-4 space-y-2 overflow-auto max-h-[calc(100vh-300px)]">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((message) => (
                  <Card
                    key={message.id}
                    className={`cursor-pointer hover:bg-muted/50 transition-colors ${!message.read ? "border-l-4 border-l-blue-500" : ""} ${selectedMessage?.id === message.id ? "bg-muted/50" : ""}`}
                    onClick={() => handleSelectMessage(message)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src={message.avatar} alt={message.sender} />
                          <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`font-medium truncate ${!message.read ? "font-semibold" : ""}`}>
                              {message.sender}
                            </p>
                            <button
                              onClick={(e) => handleStarMessage(e, message.id)}
                              className="text-muted-foreground hover:text-yellow-400 transition-colors"
                            >
                              <Star className={`h-4 w-4 ${message.starred ? "fill-yellow-400 text-yellow-400" : ""}`} />
                            </button>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{message.subject}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(message.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                  <AlertCircle className="h-8 w-8 mb-2" />
                  <p>No messages found</p>
                  <p className="text-sm">Try a different filter or search term</p>
                </div>
              )}
            </div>
          </div>

          {/* Message Content */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {selectedMessage ? (
              <>
                <Card className="flex-1 overflow-auto">
                  <CardHeader className="border-b pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{selectedMessage.subject}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={selectedMessage.avatar} alt={selectedMessage.sender} />
                            <AvatarFallback>{selectedMessage.sender.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">{selectedMessage.sender}</span>
                            <span className="mx-1">&lt;{selectedMessage.email}&gt;</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatDate(selectedMessage.date)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="whitespace-pre-line">{selectedMessage.message}</p>
                  </CardContent>
                </Card>

                <div className="mt-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Type your reply..."
                        className="min-h-[100px]"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <div className="flex justify-end mt-2">
                        <Button
                          onClick={handleSendReply}
                          disabled={!replyText.trim()}
                          className="bg-gradient-to-r from-blue-500 via-pink-500 to-green-500"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Send Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <MessageCircle className="h-12 w-12 mb-4" />
                <h3 className="text-lg font-medium">No message selected</h3>
                <p>Select a message from the list to view its contents</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

