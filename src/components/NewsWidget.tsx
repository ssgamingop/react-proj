import React, { useEffect, useState } from 'react';
import { RefreshCw, Newspaper } from 'lucide-react';

interface NewsArticle {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  enclosure?: {
    link: string;
  };
  source?: string;
}

export const NewsWidget: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.coindesk.com/arc/outboundfeeds/rss/');
      const data = await response.json();
      
      if (data && data.status === 'ok' && Array.isArray(data.items)) {
        const articles = data.items.slice(0, 5).map((item: any) => ({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          description: item.description,
          enclosure: item.enclosure?.link ? { link: item.enclosure.link } : undefined,
          source: 'CoinDesk'
        }));
        setNews(articles);
      } else {
        setError("No news articles available.");
      }
    } catch (error) {
      console.error("Failed to fetch news", error);
      setError("News service unavailable.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="bg-white dark:bg-[#131722] border border-slate-200 dark:border-slate-800/60 rounded-2xl shadow-sm p-6 overflow-hidden h-full flex flex-col transition-colors">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 whitespace-nowrap">
          <div className="bg-primary/10 p-1.5 rounded-lg shrink-0">
            <Newspaper className="w-5 h-5 text-primary" />
          </div>
          Crypto News
        </h2>
        <button 
          onClick={fetchNews}
          className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors shrink-0"
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <div className="flex-1 min-h-0 overflow-y-auto pr-1 -mr-1 space-y-4 scrollbar-hide relative z-0">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex gap-4 animate-pulse">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-xl shrink-0"></div>
                <div className="flex-1 space-y-2 py-1 min-w-0">
                  <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 flex flex-col items-center justify-center h-full">
            <Newspaper className="w-10 h-10 text-slate-300 dark:text-slate-800 mb-4" />
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest px-4">{error}</p>
            <button 
              onClick={fetchNews}
              className="mt-6 text-[10px] font-bold text-primary uppercase tracking-widest hover:bg-primary/10 border border-primary/20 px-4 py-2 rounded-full transition-all"
            >
              Retry Connection
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {news.map((article, index) => (
              <a 
                key={index} 
                href={article.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex gap-4 group p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-all min-w-0 border border-transparent dark:hover:border-slate-800/60"
              >
                <div className="relative shrink-0">
                  {article.enclosure?.link ? (
                    <img 
                      src={article.enclosure.link} 
                      alt="" 
                      className="w-14 h-14 object-cover rounded-xl bg-slate-100 dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-800/60"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-800/60">
                      <Newspaper className="w-6 h-6 text-slate-400 dark:text-slate-700" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-between py-0.5 min-w-0 flex-1">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-slate-200 line-clamp-2 leading-snug group-hover:text-primary transition-colors pr-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-slate-500 mt-2 truncate">
                    <span className="text-primary truncate">{article.source}</span>
                    <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full shrink-0"></span>
                    <span className="shrink-0">{new Date(article.pubDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};