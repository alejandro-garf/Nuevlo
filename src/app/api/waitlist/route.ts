import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const DB_PATH = join(process.cwd(), "db.json");

function readDB() {
  try {
    const data = readFileSync(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return { waitlist: [], organizations: [] };
  }
}

function writeDB(data: Record<string, unknown[]>) {
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, ...fields } = body;

    if (!type || !fields.email || !fields.name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = readDB();
    const entry = { ...fields, timestamp: new Date().toISOString() };

    if (type === "individual") {
      db.waitlist.push(entry);
    } else if (type === "organization") {
      db.organizations.push(entry);
    } else {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    writeDB(db);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { error: "Failed to save signup" },
      { status: 500 }
    );
  }
}
