import React, { useEffect, useState } from 'react';
import { cryptoApi } from '../services/api';
import { ExternalLink, RefreshCw } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  url: string;
  source: string;
  imageurl: string;
  body: string;
  published_on: number;
}

export const NewsWidget: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await cryptoApi.getNews();
      if (data && data.Data) {
        setNews(data.Data.slice(0, 5));
      } else {
        setError("No news data received");
      }
    } catch (error) {
      console.error("Failed to fetch news", error);
      setError("Failed to load news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <div className="bg-primary/10 p-1.5 rounded-lg">
            <ExternalLink className="w-5 h-5 text-primary" />
          </div>
          Latest News
        </h2>
        <button 
          onClick={fetchNews}
          className="p-2 text-slate-500 hover:text-white transition-colors"
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-4 animate-pulse">
              <div className="w-20 h-20 bg-slate-800 rounded-xl shrink-0"></div>
              <div className="flex-1 space-y-2 py-1">
                <div className="h-3 bg-slate-800 rounded w-3/4"></div>
                <div className="h-3 bg-slate-800 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-slate-500 text-sm">{error}</p>
          <button 
            onClick={fetchNews}
            className="mt-4 text-xs font-bold text-primary uppercase tracking-widest"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {news.map((article) => (
            <a 
              key={article.id} 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex gap-4 group p-2 -m-2 rounded-2xl hover:bg-white/[0.03] transition-all"
            >
              <div className="relative shrink-0">
                <img 
                  src={article.imageurl} 
                  alt={article.title} 
                  className="w-20 h-20 object-cover rounded-xl bg-slate-800"
                  onError={(e) => {
                    // Fallback if image fails to load
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80?text=News';
                  }}
                />
                <div className="absolute inset-0 rounded-xl shadow-inner shadow-white/5"></div>
              </div>
              <div className="flex flex-col justify-between py-0.5">
                <h3 className="text-sm font-bold text-slate-200 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  <span className="text-slate-400">{article.source}</span>
                  <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                  <span>{new Date(article.published_on * 1000).toLocaleDateString()}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};