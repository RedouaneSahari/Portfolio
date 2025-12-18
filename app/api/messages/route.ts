import { NextResponse } from "next/server"

interface Message {
  id: string
  name: string
  email: string
  message: string
  timestamp: string
  read?: boolean
}

// In-memory storage (replace with database in production)
let messages: Message[] = []

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = Number.parseInt(searchParams.get("offset") || "0")
    const unreadOnly = searchParams.get("unread") === "true"

    let filteredMessages = messages

    if (unreadOnly) {
      filteredMessages = messages.filter((m) => !m.read)
    }

    const paginatedMessages = filteredMessages.slice(offset, offset + limit)

    return NextResponse.json({
      messages: paginatedMessages,
      total: filteredMessages.length,
      unread: messages.filter((m) => !m.read).length,
    })
  } catch (error) {
    console.error("[v0] Error fetching messages:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const { messageId, read } = await request.json()

    const messageIndex = messages.findIndex((m) => m.id === messageId)

    if (messageIndex === -1) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    messages[messageIndex].read = read

    return NextResponse.json({
      success: true,
      message: messages[messageIndex],
    })
  } catch (error) {
    console.error("[v0] Error updating message:", error)
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const messageId = searchParams.get("id")

    if (!messageId) {
      return NextResponse.json({ error: "Message ID required" }, { status: 400 })
    }

    const initialLength = messages.length
    messages = messages.filter((m) => m.id !== messageId)

    if (messages.length === initialLength) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Message deleted successfully",
    })
  } catch (error) {
    console.error("[v0] Error deleting message:", error)
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 })
  }
}
