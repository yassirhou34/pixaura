import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Here you would typically send an email or save to a database
    // For now, we'll just log it and return success
    console.log("Contact form submission:", body)

    // Example: Send to your email service (Resend, SendGrid, etc.)
    // await sendEmail({
    //   to: 'contact@pixaura.eu',
    //   from: 'noreply@pixaura.eu',
    //   subject: `New Project Inquiry from ${body.name}`,
    //   html: `...`
    // })

    return NextResponse.json({ success: true, message: "Form submitted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to process form" }, { status: 500 })
  }
}
