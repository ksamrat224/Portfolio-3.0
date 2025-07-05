
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Search, Calendar, Clock, Tag, MessageCircle, ArrowLeft } from 'lucide-react';

const Blog = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with React Hooks',
      excerpt: 'Learn the fundamentals of React Hooks and how they can simplify your component logic.',
      content: `
# Getting Started with React Hooks

React Hooks revolutionized how we write React components. Let's explore the most commonly used hooks.

## useState Hook

The \`useState\` hook allows you to add state to functional components:

\`\`\`javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## useEffect Hook

The \`useEffect\` hook lets you perform side effects in functional components:

\`\`\`javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## Custom Hooks

You can create your own hooks to share logic between components:

\`\`\`javascript
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}
\`\`\`

Hooks make React components more readable and reusable!
      `,
      date: '2024-01-15',
      readTime: '5 min read',
      tags: ['React', 'JavaScript', 'Frontend'],
      author: 'John Doe',
      comments: 12
    },
    {
      id: 2,
      title: 'Building Responsive Layouts with CSS Grid',
      excerpt: 'Master CSS Grid to create complex, responsive layouts with ease.',
      content: `
# Building Responsive Layouts with CSS Grid

CSS Grid is a powerful layout system that makes creating complex layouts simple and intuitive.

## Basic Grid Setup

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
\`\`\`

## Responsive Grid

\`\`\`css
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
}
\`\`\`

This creates a responsive grid that automatically adjusts the number of columns based on available space.
      `,
      date: '2024-01-10',
      readTime: '7 min read',
      tags: ['CSS', 'Web Design', 'Responsive'],
      author: 'John Doe',
      comments: 8
    },
    {
      id: 3,
      title: 'TypeScript Best Practices for React Developers',
      excerpt: 'Improve your React development with TypeScript best practices and patterns.',
      content: `
# TypeScript Best Practices for React Developers

TypeScript adds type safety to your React applications. Here are some best practices.

## Defining Component Props

\`\`\`typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false 
}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={\`btn btn-\${variant}\`}
    >
      {children}
    </button>
  );
};
\`\`\`

## Using Generic Types

\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const fetchData = async <T>(url: string): Promise<ApiResponse<T>> => {
  const response = await fetch(url);
  return response.json();
};
\`\`\`

TypeScript helps catch errors early and improves developer experience!
      `,
      date: '2024-01-05',
      readTime: '6 min read',
      tags: ['TypeScript', 'React', 'Best Practices'],
      author: 'John Doe',
      comments: 15
    },
  ];

  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === '' || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  };

  if (selectedPost) {
    return (
      <section id="blog" className="py-20 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl mx-auto"
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Blog</span>
            </button>

            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{selectedPost.title}</h1>
                
                <div className="flex items-center text-gray-600 mb-6 space-x-6">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{selectedPost.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={16} />
                    <span>{selectedPost.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageCircle size={16} />
                    <span>{selectedPost.comments} comments</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedPost.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="prose prose-lg max-w-none">
                  <ReactMarkdown
                    components={{
                      code: CodeBlock,
                    }}
                  >
                    {selectedPost.content}
                  </ReactMarkdown>
                </div>

                {/* Simulated Comments Section */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Comments ({selectedPost.comments})</h3>
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            U{i}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">User {i}</div>
                            <div className="text-sm text-gray-600">2 days ago</div>
                          </div>
                        </div>
                        <p className="text-gray-700">
                          Great article! This really helped me understand the concepts better. 
                          Looking forward to more content like this.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Blog</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Thoughts, tutorials, and insights about web development and technology
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
              >
                <option value="">All Tags</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedTag === tag
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Tag size={12} className="inline mr-1" />
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle size={14} />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">By {post.author}</span>
                    <span className="text-blue-600 text-sm font-medium hover:text-blue-800">
                      Read More →
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No posts found matching your criteria.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
