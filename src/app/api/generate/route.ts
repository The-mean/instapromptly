import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
    const { topic, tone } = await req.json();

    if (!topic || !tone) {
        return NextResponse.json({ error: "topic ve tone zorunludur." }, { status: 400 });
    }

    const prompt = `Bir Instagram Reels videosu için viral bir başlık ve 15 etkileşimli hashtag üret. Konu: ${topic}. Ton: ${tone}. Türkçe yaz. Amacımız görünürlük ve etkileşimi artırmak.\n\nSadece aşağıdaki formatta JSON döndür:\n{\n  \"headline\": \"...\",\n  \"hashtags\": [\"...\", \"...\"],\n  \"cta\": \"...\"\n}`;

    try {
        const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: "Yalnızca JSON formatında cevap ver." },
                    { role: "user", content: prompt },
                ],
                temperature: 0.8,
                max_tokens: 400,
            }),
        });

        if (!openaiRes.ok) {
            const error = await openaiRes.text();
            return NextResponse.json({ error }, { status: 500 });
        }

        const data = await openaiRes.json();
        let content = data.choices?.[0]?.message?.content;
        // Yanıtı logla (geliştirme için, prod'da kaldırılabilir)
        console.log("OpenAI yanıtı:", content);
        let json: any = null;
        try {
            json = JSON.parse(content);
        } catch {
            // Kod bloğu içinde gelirse ayıkla
            const match = content.match(/```json[\s\S]*?({[\s\S]*})[\s\S]*?```/);
            if (match) {
                try {
                    json = JSON.parse(match[1]);
                } catch { }
            }
        }
        // Son bir güvenlik: headline, hashtags, cta alanları var mı kontrol et
        if (!json || typeof json !== "object" || !json.headline || !Array.isArray(json.hashtags) || !json.cta) {
            return NextResponse.json({ error: "OpenAI yanıtı beklenen formatta değil.", raw: content }, { status: 500 });
        }
        return NextResponse.json(json);
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
} 