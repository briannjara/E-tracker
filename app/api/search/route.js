import { db } from "../../../utils/dbConfig";
import { Expenses } from "../../../utils/schema";
import { eq, like } from "drizzle-orm";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return new Response(JSON.stringify({ results: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const results = await db
      .select()
      .from(Expenses)
      .where(like(Expenses.name, `%${query}%`))
      .limit(10);

    return new Response(JSON.stringify({ results }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Search error:", error);
    return new Response(JSON.stringify({ error: "An error occurred during search" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}