import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json([], { status: 401 });

  const workspaces = await prisma.workspace.findMany({
    where: { ownerId: session.user.id },
    include: { sites: true },
  });

  const sites = workspaces.flatMap((ws) => ws.sites);

  return NextResponse.json(sites);
}

export async function POST(req: Request) {
  const body = await req.json();
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, workspaceId } = body;

  const site = await prisma.site.create({
    data: { name, workspaceId },
  });

  return NextResponse.json(site);
}
