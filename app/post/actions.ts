"use server"
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

import { GoogleGenerativeAI } from "@google/generative-ai";
export async function createPost(formData: FormData, userId: string) {
    const user = await prisma.user.findUnique({
        where: { email: userId },
    });
    const content = formData.get("content")?.valueOf() as string ?? "";
    // Gemini 1.5 Flash: safe single prompt limit ~32,000 tokens (~24,000 words, ~100,000 chars)
    // We'll use a conservative 50,000 character limit
    let safeContent = content;
    if (content.length > 50000) {
      safeContent = content.slice(0, 50000);
    }
    await prisma.post.create({
      data: {
        title: formData.get("name")?.valueOf() as string ?? "",
        body: content,
        authorId: user?.id || "",
        summery: await askGemini('Generate a breif summery limted to 300 charachters without losing the valuse of this blogpost and make it attractive to users to read it : ' + safeContent),
      },
    });
    redirect("/");
}


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function askGemini(prompt: string, image?: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  let result;

  if (image) {
    result = await model.generateContent([
      { text: prompt },
      { inlineData: { data: image, mimeType: "image/png" } },
    ]);
  } else {
    result = await model.generateContent(prompt);
  }

  return result.response.text();
}