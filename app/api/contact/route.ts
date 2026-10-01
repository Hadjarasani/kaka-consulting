import { Resend } from "resend";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      company,
      message,
      recaptchaToken,
    } = body;

    // 1. Validation des champs
    if (
      !name?.trim() ||
      !email?.trim() ||
      !company?.trim() ||
      !message?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Tous les champs sont obligatoires.",
        },
        { status: 400 }
      );
    }

    // 2. Validation de l'e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Adresse e-mail invalide.",
        },
        { status: 400 }
      );
    }

    // 3. Validation de la longueur du message
    if (message.trim().length < 20) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Le message doit contenir au moins 20 caractères.",
        },
        { status: 400 }
      );
    }

    // 4. Vérification de la présence du token reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Vérification anti-spam manquante.",
        },
        { status: 400 }
      );
    }

    // 5. Vérification du token auprès de Google
    const recaptchaResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY!,
          response: recaptchaToken,
        }),
      }
    );

    const recaptchaData = await recaptchaResponse.json();

    console.log("reCAPTCHA:", recaptchaData);

    // 6. Vérification du résultat
    if (
      !recaptchaData.success ||
      recaptchaData.score < 0.5 ||
      recaptchaData.action !== "contact"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "La vérification anti-spam a échoué. Veuillez réessayer.",
        },
        { status: 403 }
      );
    }

    // 7. Enregistrement dans Supabase
    const { error: dbError } = await supabase
      .from("contacts")
      .insert([
        {
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          message: message.trim(),
        },
      ]);

    if (dbError) {
      console.error("Erreur Supabase :", dbError);

      return NextResponse.json(
        {
          success: false,
          error:
            "Erreur lors de l'enregistrement de votre demande.",
        },
        { status: 500 }
      );
    }

    // 8. E-mail envoyé à KAKA CONSULTING
    await resend.emails.send({
      from: "KAKA CONSULTING <contact@kakaconsulting.fr>",
      to: "contact@kakaconsulting.fr",

      subject: `Nouveau message - ${company}`,

      html: `
        <h2>Nouveau message de contact</h2>

        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Entreprise :</strong> ${company}</p>

        <h3>Message :</h3>

        <p>${message}</p>
      `,
    });

    // 9. Accusé de réception automatique
    await resend.emails.send({
      from: "KAKA CONSULTING <contact@kakaconsulting.fr>",
      to: email,

      subject: "Nous avons bien reçu votre demande",

      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #4A0015;">
            Bonjour ${name},
          </h2>

          <p>
            Merci d'avoir contacté KAKA CONSULTING.
          </p>

          <p>
            Nous avons bien reçu votre demande concernant
            <strong>${company}</strong> et nous vous répondrons
            dans les plus brefs délais.
          </p>

          <p>
            En attendant, n'hésitez pas à consulter notre site :
            kakaconsulting.fr
          </p>

          <hr />

          <p>
            Cordialement,<br />
            <strong>L'équipe KAKA CONSULTING</strong>
          </p>
          <!-- Logo -->
          <div style="
            margin-top: 25px;
            text-align: center;
          ">
            <img
              src="cid:kaka-logo"
              alt="KAKA CONSULTING"
              width="150"
              style="
                display: block;
                margin: 0 auto;
                max-width: 150px;
                height: auto;
              "
            />

            <p style="
              margin-top: 10px;
              color: #4A0015;
              font-size: 12px;
              letter-spacing: 1px;
            ">
              DÉVELOPPER • ANALYSER • TRANSFORMER
            </p>
          </div>
        </div>
      `,

        attachments: [
          {
            filename: "kakaClogo.png",
            content: fs.readFileSync(
              path.join(process.cwd(), "public/images/kakaClogo.png")
            ),
            contentId: "kaka-logo",
          },
        ],
    });

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur API contact :", error);

    return NextResponse.json(
      {
        success: false,
        error: "Une erreur interne est survenue.",
      },
      { status: 500 }
    );
  }
}