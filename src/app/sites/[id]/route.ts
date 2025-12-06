import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PATCH(req: Request, { params }: any) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = params;
  const data = await req.json();

  const page = await prisma.page.update({
    where: { id },
    data,
  });

  return NextResponse.json(page);
}

export async function DELETE(_req: Request, { params }: any) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = params;

  await prisma.page.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
