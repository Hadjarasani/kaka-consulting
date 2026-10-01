import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      company,
      phone,
      projectType,
      budget,
      deadline,
      message,
      recaptchaToken,
    } = body;

    // Vérification présence token
    if (!recaptchaToken) {
        return NextResponse.json (
            {
                success: false,
                error: "Vérification anti-spam manquante.",
            },
            { status: 400 }
        );
    }

    // Vérification reCAPTCHA v3
    const recaptchaResponse = await fetch (
        "https://www.google.com/recaptcha/api/siteverify",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams ({
                secret: process.env.RECAPTCHA_SECRET_KEY!,
                response: recaptchaToken,
            })
        }
    );
    const recaptchaData = await recaptchaResponse.json();
    console.log("reCAPTCHA Quote:", recaptchaData);

    if (
        !recaptchaData.success ||
        recaptchaData.score < 0.5 ||
        recaptchaData.action !== "quote"
    ){
        return NextResponse.json(
            {
                success: false,
                error: "La vérification anti-spam a échoué.",
            },
            { status: 400 }
        );
    }

    // Validation côté serveur
    if (
      !name?.trim() ||
      !email?.trim() ||
      !company?.trim() ||
      !projectType ||
      !message?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Tous les champs obligatoires doivent être remplis.",
        },
        { status: 400 }
      );
    }

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

    if (message.trim().length < 20) {
      return NextResponse.json(
        {
          success: false,
          error:
            "La description du projet doit contenir au moins 20 caractères.",
        },
        { status: 400 }
      );
    }

    // 1️⃣ Enregistrement dans Supabase

    const { error: databaseError } = await supabase
      .from("quote_requests")
      .insert([
        {
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || null,
          phone: phone?.trim() || null,
          project_type: projectType,
          budget: budget || null,
          deadline: deadline || null,
          message: message.trim(),
        },
      ]);

    if (databaseError) {
      console.error("Erreur Supabase :", databaseError);

      return NextResponse.json(
        {
          success: false,
          error: "Impossible d'enregistrer votre demande.",
        },
        { status: 500 }
      );
    }

    // 2️⃣ E-mail envoyé à KAKA CONSULTING

    await resend.emails.send({
      from: "KAKA CONSULTING <contact@kakaconsulting.fr>",
      to: "contact@kakaconsulting.fr",

      subject: `Nouvelle demande de devis - ${company}`,

      html: `
        <h2>Nouvelle demande de devis</h2>

        <h3>Coordonnées</h3>

        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Entreprise :</strong> ${company}</p>
        <p><strong>Téléphone :</strong> ${phone || "Non renseigné"}</p>

        <h3>Projet</h3>

        <p><strong>Type :</strong> ${projectType}</p>
        <p><strong>Budget :</strong> ${budget || "Non renseigné"}</p>
        <p><strong>Délai :</strong> ${deadline || "Non renseigné"}</p>

        <h3>Description</h3>

        <p>${message}</p>
      `,
    });

    // 3️⃣ Accusé de réception envoyé au prospect

    await resend.emails.send({
      from: "KAKA CONSULTING <contact@kakaconsulting.fr>",
      to: email,

      subject: "Nous avons bien reçu votre demande de devis",

      html: `
        <h2>Bonjour ${name},</h2>

        <p>
          Merci d'avoir contacté KAKA CONSULTING.
        </p>

        <p>
          Nous avons bien reçu votre demande de devis concernant :
          <strong>${projectType}</strong> pour l'entreprise <strong>${company}</strong>.
        </p>

        <p>
          Notre équipe va étudier votre besoin et reviendra vers vous
          dans les plus brefs délais.
        </p>

        <hr/>

        <p>
          À bientôt,<br />
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
              color: #3B0910;
              font-size: 12px;
              letter-spacing: 1px;
            ">
              DÉVELOPPER • ANALYSER • TRANSFORMER
            </p>
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
    console.error("Erreur API quote :", error);

    return NextResponse.json(
      {
        success: false,
        error: "Une erreur interne est survenue.",
      },
      { status: 500 }
    );
  }
}