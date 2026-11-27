type ContactField = "name" | "email" | "message";
type ContactFieldErrors = Partial<Record<ContactField, string>>;

const defaultRecipient = "sneivega09@gmail.com";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function jsonResponse(body: object, status: number) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 10_000) {
    return jsonResponse(
      { message: "El mensaje supera el tamaño permitido." },
      413,
    );
  }

  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return jsonResponse({ message: "No se pudo procesar la solicitud." }, 403);
  }

  let payload: Record<string, unknown>;
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return jsonResponse({ message: "La solicitud no es válida." }, 400);
    }
    payload = body as Record<string, unknown>;
  } catch {
    return jsonResponse({ message: "La solicitud no es válida." }, 400);
  }

  if (readText(payload.website)) {
    return jsonResponse({ message: "¡Gracias por escribirme!" }, 200);
  }

  const name = readText(payload.name);
  const email = readText(payload.email).toLowerCase();
  const message = readText(payload.message);
  const fieldErrors: ContactFieldErrors = {};

  if (name.length < 2 || name.length > 100) {
    fieldErrors.name = "Escribe tu nombre (máximo 100 caracteres).";
  }
  if (email.length > 254 || !emailPattern.test(email)) {
    fieldErrors.email = "Escribe una dirección de correo válida.";
  }
  if (message.length < 10 || message.length > 2000) {
    fieldErrors.message =
      "Cuéntame un poco más (entre 10 y 2000 caracteres).";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return jsonResponse(
      {
        message: "Revisa los campos señalados antes de enviar el mensaje.",
        fieldErrors,
      },
      400,
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || defaultRecipient;

  if (!apiKey || !from) {
    return jsonResponse(
      {
        message:
          "El envío todavía no está configurado. Puedes escribirme directamente al correo que aparece en esta página.",
      },
      503,
    );
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: "Nuevo mensaje desde tu portafolio",
        text: `Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`,
      }),
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) {
      return jsonResponse(
        {
          message:
            "No se pudo enviar el mensaje en este momento. Inténtalo de nuevo o escríbeme directamente.",
        },
        502,
      );
    }
  } catch {
    return jsonResponse(
      {
        message:
          "No se pudo conectar con el servicio de correo. Inténtalo de nuevo o escríbeme directamente.",
      },
      502,
    );
  }

  return jsonResponse(
    { message: "¡Gracias por escribirme! Tu mensaje ya fue enviado." },
    200,
  );
}
