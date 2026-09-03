import React from 'react';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/common/SectionHeader';
import { BlogCard } from '@/components/cards/BlogCard';
import { BLOGS_DATA } from '@/data/blogs';

export const metadata = {
  title: 'Solar News, Insights & Guides',
  description: 'Expert articles on PM Surya Ghar Yojana, solar panel technology, tax benefits, and clean energy insights in India.',
};

export default function BlogPage() {
  return (
    <div className="py-12 md:py-20">
      <Container>
        <SectionHeader
          badge="Knowledge Hub"
          title="Solar Insights & Technology Guides"
          description="Everything you need to know about rooftop solar economics, government policy updates, and panel engineering."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOGS_DATA.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </Container>
    </div>
  );
}
