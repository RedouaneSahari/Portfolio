import { NextResponse } from "next/server"

export async function GET() {
  try {
    // In production, fetch these from your database
    const stats = {
      totalProjects: 15,
      yearsExperience: 3,
      technologies: 25,
      certifications: 2,
      auditsCompleted: 10,
    }

    return NextResponse.json(stats, { status: 200 })
  } catch (error) {
    console.error("[v0] Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    console.log("[v0] Stats updated:", body)

    return NextResponse.json(
      {
        success: true,
        message: "Stats updated successfully",
        stats: body,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Error updating stats:", error)
    return NextResponse.json({ error: "Failed to update stats" }, { status: 500 })
  }
}
