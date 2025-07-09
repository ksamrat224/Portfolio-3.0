import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Search,
  Calendar,
  Clock,
  Tag,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";

const Blog = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const blogPosts = [
    {
      id: 1,
      title: "Building a Community Voting Platform with React & NestJS",
      excerpt:
        "A deep dive into building a full-stack voting and feedback app for Nepali communities using React, NestJS, and Prisma.",
      content: `
# Building a Community Voting Platform with React & NestJS

This project was aimed at empowering Nepali communities to vote and provide feedback digitally.

## Tech Stack

- **Frontend**: React, TailwindCSS
- **Backend**: NestJS
- **Database**: PostgreSQL with Prisma ORM

## Key Features

- Secure login & registration
- Dynamic polls and real-time results
- Feedback form with sentiment tagging

## Challenges

Handling nested API relationships in Prisma and ensuring real-time UI updates was tricky. I used optimistic UI updates in React and fine-tuned relations with Prisma.

\`\`\`typescript
const votes = await prisma.vote.findMany({
  where: { pollId },
  include: { user: true }
});
\`\`\`

This kind of nested fetching helped personalize the vote dashboard per user.

## Deployment

The frontend was deployed using Vercel, and the backend on Render. I used env configs for security.

This project sharpened my full-stack thinking a lot!
    `,
      date: "2025-06-18",
      readTime: "6 min read",
      tags: ["React", "NestJS", "Prisma", "Full-stack"],
      author: "Samrat Karki",
      comments: 9,
    },
    {
      id: 2,
      title: "Making a Smart Recipe Planner in React",
      excerpt:
        "Explore how I built a drag-and-drop based meal planner with dynamic recipe search, cooking instructions, and a shopping list generator.",
      content: `
# Making a Smart Recipe Planner in React

This was one of my favorite projects as it combined UI/UX creativity with logic-heavy features.

## Cool Features

- Drag-and-drop meal planning using \`react-beautiful-dnd\`
- Recipe search with filters and ingredient scaling
- Markdown support for adding your own recipes
- Auto-generated shopping list

## Code Snippet

\`\`\`js
const scaledIngredients = ingredients.map(i => ({
  ...i,
  quantity: i.quantity * servings
}));
\`\`\`

Simple logic, but very impactful for user experience!

## Tools I Used

- React, React Router, TailwindCSS
- Framer Motion for transitions
- TipTap for recipe editing UI

It helped me understand how UI interactivity affects user satisfaction.
    `,
      date: "2025-06-25",
      readTime: "5 min read",
      tags: ["React", "Meal Planning", "UX"],
      author: "Samrat Karki",
      comments: 5,
    },
    {
      id: 3,
      title: "My Portfolio Website Setup: From React to Framer Motion",
      excerpt:
        "How I built a performant, animated personal portfolio using React, MDX, and Framer Motion.",
      content: `
# My Portfolio Website Setup

I created my personal portfolio to showcase my projects, skills, and resume—all in a single-page React app.

## Stack

- React + Vite
- TailwindCSS
- Framer Motion for animations
- MDX + \`react-markdown\` for blogs
- react-three-fiber for subtle 3D effects

## Highlights

- Hero & About sections with animated transitions
- Blog section that renders Markdown content
- Interactive project cards with tilt & hover effects

## Sample

\`\`\`js
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <ProjectCard />
</motion.div>
\`\`\`

This gave the portfolio a smooth, modern feel.

## Deployment

Deployed on Vercel with automatic GitHub integration. It's now my favorite personal project.
    `,
      date: "2025-07-01",
      readTime: "4 min read",
      tags: ["React", "Framer Motion", "Portfolio"],
      author: "Samrat Karki",
      comments: 3,
    },
  ];

  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)));

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === "" || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
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
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {selectedPost.title}
                </h1>

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
              Thoughts, tutorials, and insights about web development and
              technology
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
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
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedTag === tag
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
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
                    <span className="text-sm text-gray-600">
                      By {post.author}
                    </span>
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
              <p className="text-gray-600 text-lg">
                No posts found matching your criteria.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
