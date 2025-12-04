import { demoArticles } from "@/data/articles";

export default function KnowledgePage() {
  const articlesByCategory = groupByCategory(demoArticles);

  return (
    <div className="container space-y-6 py-10">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          ความรู้เรื่องฟิล์มตกแต่งภายใน
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-700 md:text-base">
          รวบรวมบทความพื้นฐานเกี่ยวกับฟิล์มตกแต่งภายใน
          ช่วยให้คุณเข้าใจวัสดุ วิธีใช้งาน การดูแล และสิ่งที่ควรรู้ก่อนรีโนเวทด้วยฟิล์ม
        </p>
      </header>

      <div className="space-y-6">
        {Object.entries(articlesByCategory).map(([category, articles]) => (
          <section key={category} className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-600">
              {categoryLabel(category)}
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="rounded-xl border border-slate-200/80 bg-white/90 p-5 text-sm text-slate-800"
                >
                  <div className="mb-3 h-20 w-full rounded-xl bg-gradient-to-br from-brand-soft via-white to-brand/30" />
                  <h3 className="text-base font-semibold leading-snug text-slate-900">
                    {article.title}
                  </h3>
                  {article.publishedAt && (
                    <p className="mt-1 text-[11px] text-slate-500">
                      เผยแพร่: {article.publishedAt}
                    </p>
                  )}
                  <p className="mt-2 text-xs leading-relaxed text-slate-700">
                    {article.summary}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function groupByCategory(articles: typeof demoArticles) {
  return articles.reduce<Record<string, typeof demoArticles>>((acc, article) => {
    const key = article.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(article);
    return acc;
  }, {});
}

function categoryLabel(key: string) {
  switch (key) {
    case "intro":
      return "บทนำ / ทำความรู้จัก interior film";
    case "material-knowledge":
      return "ความรู้เรื่องวัสดุ";
    case "business-outcome":
      return "ผลลัพธ์เชิงธุรกิจ";
    case "maintenance":
      return "การดูแลรักษา";
    case "design-ideas":
      return "ไอเดียการออกแบบ";
    default:
      return key;
  }
}
