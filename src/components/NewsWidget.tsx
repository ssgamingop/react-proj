import React, { useEffect, useState } from 'react';
import { cryptoApi } from '../services/api';
import { ExternalLink } from 'lucide-react';

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

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await cryptoApi.getNews();
        if (data && data.Data) {
          setNews(data.Data.slice(0, 5)); // Show top 5
        }
      } catch (error) {
        console.error("Failed to fetch news", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div className="p-4 text-center bg-slate-800 rounded-lg">Loading news...</div>;
  }

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold text-white mb-4">Latest News</h2>
      <div className="flex flex-col gap-4">
        {news.map((article) => (
          <a 
            key={article.id} 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex gap-4 hover:bg-slate-700/50 p-2 rounded-lg transition-colors group"
          >
            <img 
              src={article.imageurl} 
              alt={article.title} 
              className="w-20 h-20 object-cover rounded-md"
            />
            <div className="flex flex-col flex-1">
              <h3 className="font-semibold text-slate-200 line-clamp-2 group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <div className="flex justify-between items-center mt-auto text-xs text-slate-400">
                <span>{article.source}</span>
                <span className="flex items-center gap-1">
                  {new Date(article.published_on * 1000).toLocaleDateString()}
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
