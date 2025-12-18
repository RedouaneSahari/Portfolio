import { NextResponse } from "next/server"

interface ContactFormData {
  name: string
  email: string
  message: string
}

const messages: Array<ContactFormData & { id: string; timestamp: string }> = []

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json()

    // Validation des données
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 })
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 })
    }

    // Créer le message
    const message = {
      id: String(Date.now()),
      ...body,
      timestamp: new Date().toISOString(),
    }

    // Sauvegarder le message
    messages.push(message)

    // Log du message
    console.log("[v0] New contact message from:", body.name, "-", body.email)

    // Simuler l'envoi d'un email
    await simulateEmailSend(body)

    return NextResponse.json(
      {
        success: true,
        message: "Message envoyé avec succès",
        id: message.id,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Error processing contact form:", error)
    return NextResponse.json({ error: "Une erreur est survenue lors de l'envoi du message" }, { status: 500 })
  }
}

export async function GET() {
  try {
    return NextResponse.json(
      {
        messages,
        total: messages.length,
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

async function simulateEmailSend(data: ContactFormData): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In production, use a service like Resend, SendGrid, or Nodemailer
  /*
  import { Resend } from 'resend';
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: 'contact@redouane-sahari.com',
    to: 'redouane.sahari@gmail.com',
    subject: `Nouveau message de contact de ${data.name}`,
    html: `
      <h2>Nouveau message de contact</h2>
      <p><strong>Nom:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `
  });
  */
}
