import { Resend } from "resend";
import { NextResponse } from "next/server";
import { error } from "console";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, company, message } = body;

    if(!name || !email || !company || !message){
        return NextResponse.json(
            {error: "Tous les champs sont obligatoires" },
            { status: 400 }
        )
    }

    await resend.emails.send({
      from: "KAKA CONSULTING <contact@kakaconsulting.fr>",
      to: "contact@kakaconsulting.fr",

      subject: `Nouvelle demande de devis - ${company}`,

      html: `
        <h2>Nouvelle demande de devis</h2>

        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Entreprise :</strong> ${company}</p>

        <h3>Message :</h3>

        <p>${message}</p>
      `,
    });

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}