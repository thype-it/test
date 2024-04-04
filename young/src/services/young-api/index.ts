import { rateplansSchema } from "@/schemas/rateplan";

export async function getRateplanData() {
  let res;

  try {
    res = await fetch("https://ydps.tprepaid.st.sk/young/unknown/planOffer");
  } catch {
    throw new Error("Failed to fetch data");
  }

  const parsedJson = await res.json();
  return rateplansSchema.parse(parsedJson);
}
