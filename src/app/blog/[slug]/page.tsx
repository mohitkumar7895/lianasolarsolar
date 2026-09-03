import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Share2, Tag } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BLOGS_DATA } from '@/data/blogs';
import { FinalCTA } from '@/components/sections/FinalCTA';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOGS_DATA.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOGS_DATA.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | Liana Solar Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOGS_DATA.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="py-12 md:py-20 space-y-16">
      <Container className="max-w-4xl">
        <div className="space-y-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Articles
          </Link>

          <Badge variant="amber">{post.category}</Badge>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between py-4 border-y border-slate-200 dark:border-slate-800 text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-200">
                <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{post.author.name}</p>
                <p>{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.publishedAt}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>

        <div className="relative h-80 sm:h-[450px] w-full rounded-3xl overflow-hidden my-8 shadow-xl">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p className="text-xl font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
            {post.excerpt}
          </p>

          <p>{post.content}</p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4">
            Key Takeaways for Property Owners
          </h2>

          <p>
            Rooftop solar is no longer just an environmental choice; it is one of the highest-yielding financial assets available to property owners in India. With guaranteed payback in 3 to 4 years and 25+ years of linear power generation, solar systems deliver Internal Rates of Return (IRR) exceeding 25% to 30%.
          </p>

          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-slate-900 dark:text-white">
            <h4 className="font-bold text-base text-amber-600 dark:text-amber-400">💡 Pro Tip from Liana Solar Engineers:</h4>
            <p className="text-sm mt-1 text-slate-600 dark:text-slate-300">
              Ensure your rooftop has at least 80 sq. ft. of shadow-free area per 1 kW of installation. Always opt for Tier-1 Monocrystalline Bifacial modules with N-Type TOPCon cells for highest output during cloudy weather.
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" /> Tags:
          </span>
          {post.tags.map((tag) => (
            <Badge key={tag} variant="slate" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </Container>

      <FinalCTA />
    </div>
  );
}
