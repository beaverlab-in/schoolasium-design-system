import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";
import { connectDB }    from "@/lib/db";
import { Activity }     from "@/models/Activity";
import { getResource, canAccessResource } from "@/lib/resources";
import path             from "path";
import fs               from "fs";

type Ctx = { params: Promise<{ resourceId: string }> };

// GET /api/download/[resourceId] — permission-gated file download
export async function GET(request: NextRequest, ctx: Ctx) {
  const { resourceId } = await ctx.params;
  const resource = getResource(resourceId);

  if (!resource) {
    return NextResponse.json({ error: "Resource not found" }, { status: 404 });
  }

  const user = getUserFromRequest(request);
  const userRole = user?.role;

  if (!canAccessResource(resource, userRole)) {
    return NextResponse.json(
      { error: "Sign in with an employee account to download this resource." },
      { status: 403 }
    );
  }

  if (!resource.downloadPath) {
    return NextResponse.json(
      { error: "This resource is hosted externally. Contact the design team." },
      { status: 404 }
    );
  }

  // Resolve file path — downloadPath is like "/resources/brand/logo.png"
  const filePath = path.join(process.cwd(), "public", resource.downloadPath);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found on server." }, { status: 404 });
  }

  // Log the download
  try {
    await connectDB();
    const ua = request.headers.get("user-agent") ?? "";
    await Activity.create({
      employeeId:   user?.sub        ?? "guest",
      employeeName: user?.name       ?? "Guest",
      type: "download",
      detail: `Downloaded ${resource.name}`,
      resourceId,
      ip:      request.headers.get("x-forwarded-for") ?? "unknown",
      device:  ua.includes("Mobi") ? "Mobile" : "Desktop",
      browser: ua.includes("Chrome") ? "Chrome" : ua.includes("Firefox") ? "Firefox" : ua.includes("Safari") ? "Safari" : "Other",
      os:      ua.includes("Windows") ? "Windows" : ua.includes("Mac") ? "macOS" : ua.includes("Linux") ? "Linux" : "Other",
      sessionId: user?.sub?.slice(-6) ?? "",
    });
  } catch { /* best-effort logging */ }

  // Stream the file
  const fileBuffer = fs.readFileSync(filePath);
  const filename   = path.basename(filePath);
  const ext        = path.extname(filename).toLowerCase();

  const MIME: Record<string, string> = {
    ".png":  "image/png",
    ".jpg":  "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg":  "image/svg+xml",
    ".ttf":  "font/ttf",
    ".woff": "font/woff",
    ".woff2":"font/woff2",
    ".json": "application/json",
    ".css":  "text/css",
    ".scss": "text/plain",
    ".ts":   "text/plain",
    ".js":   "text/javascript",
    ".md":   "text/markdown",
    ".pdf":  "application/pdf",
    ".zip":  "application/zip",
  };

  const contentType = MIME[ext] ?? "application/octet-stream";

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type":        contentType,
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length":      String(fileBuffer.length),
      "Cache-Control":       "no-store",
    },
  });
}
