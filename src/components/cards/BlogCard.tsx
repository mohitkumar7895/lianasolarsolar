import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/types';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b132b] flex flex-col justify-between group hover:border-blue-500/40 hover:shadow-xl transition-all duration-300">
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="blue" className="text-[10px] font-bold bg-blue-600 text-white border-none">
            {post.category}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.publishedAt}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {post.title}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">{post.excerpt}</p>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6 rounded-full overflow-hidden bg-slate-200">
              <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
            </div>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{post.author.name}</span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
          >
            Read <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
