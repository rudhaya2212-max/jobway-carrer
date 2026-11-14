import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  ExternalLink, 
  Send, 
  Sparkles, 
  Code2, 
  Tag, 
  MoreHorizontal 
} from 'lucide-react';

export const CommunityView: React.FC = () => {
  const { user, currentCareer, communityPosts, addCommunityPost, toggleLikePost, showToast } = useApp();

  const [postText, setPostText] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [techStackInput, setTechStackInput] = useState('');
  const [showProjectFields, setShowProjectFields] = useState(false);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) return;

    const stack = techStackInput.trim() 
      ? techStackInput.split(',').map(s => s.trim()) 
      : undefined;

    addCommunityPost(postText, projectTitle.trim() || undefined, stack);
    setPostText('');
    setProjectTitle('');
    setTechStackInput('');
    setShowProjectFields(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5 pb-16">
      
      {/* Feed Header */}
      <div className="flex items-center justify-between border-b border-neutral-200/80 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900">
            Community & Project Showcase
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Share roadmap wins, project milestones, and peer feedback
          </p>
        </div>
      </div>

      {/* New Thread Post Box */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 shadow-subtle">
        <form onSubmit={handleCreatePost} className="space-y-3">
          <div className="flex gap-3">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="h-8 w-8 rounded-full object-cover border border-neutral-200 shrink-0 mt-0.5"
            />
            <div className="flex-1 space-y-2">
              <textarea
                value={postText}
                onChange={e => setPostText(e.target.value)}
                rows={2}
                placeholder="Share a milestone, capstone project, or question..."
                className="w-full text-xs text-neutral-900 placeholder:text-neutral-400 bg-transparent border-0 focus:ring-0 focus:outline-none resize-none p-0 leading-relaxed"
              />

              {/* Collapsible Project Metadata */}
              {showProjectFields && (
                <div className="pt-2 border-t border-neutral-100 space-y-2 animate-fade-in">
                  <input
                    type="text"
                    value={projectTitle}
                    onChange={e => setProjectTitle(e.target.value)}
                    placeholder="Project Title (e.g. Distributed Rate Limiter)"
                    className="w-full text-xs px-3 py-1.5 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900"
                  />
                  <input
                    type="text"
                    value={techStackInput}
                    onChange={e => setTechStackInput(e.target.value)}
                    placeholder="Technologies (comma separated: React, Node.js, Redis)"
                    className="w-full text-xs px-3 py-1.5 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
            <button
              type="button"
              onClick={() => setShowProjectFields(!showProjectFields)}
              className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              <Code2 className="h-3.5 w-3.5 stroke-[1.8]" />
              <span>{showProjectFields ? 'Remove Project Link' : 'Attach Project Showcase'}</span>
            </button>

            <button
              type="submit"
              disabled={!postText.trim()}
              className="px-4 py-1.5 rounded-full bg-neutral-950 text-white text-xs font-semibold hover:bg-neutral-800 disabled:opacity-40 transition-all shadow-subtle"
            >
              Post Thread
            </button>
          </div>
        </form>
      </div>

      {/* Threads Feed */}
      <div className="space-y-4">
        {communityPosts.map(post => (
          <article
            key={post.id}
            className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-subtle hover:border-neutral-300/80 transition-all"
          >
            {/* Author Row */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={post.avatarUrl}
                  alt={post.authorName}
                  className="h-8 w-8 rounded-full object-cover border border-neutral-200"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-neutral-900">
                      {post.authorName}
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      {post.authorHandle}
                    </span>
                    <span className="text-neutral-300">•</span>
                    <span className="text-[11px] text-neutral-400 font-mono">
                      {post.timestamp}
                    </span>
                  </div>
                  <span className="inline-block text-[10px] font-medium text-neutral-500 bg-neutral-100 px-2 py-0.2 rounded-full border border-neutral-200/60 mt-0.5">
                    {post.careerTag}
                  </span>
                </div>
              </div>

              <button className="text-neutral-400 hover:text-neutral-700 p-1">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            {/* Post Content */}
            <p className="text-xs sm:text-[13px] text-neutral-800 leading-relaxed font-sans mb-3 pl-11">
              {post.content}
            </p>

            {/* Project Snippet Box */}
            {post.projectSnippet && (
              <div className="ml-11 mb-3 rounded-xl bg-neutral-50 p-3.5 border border-neutral-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                    <Code2 className="h-3.5 w-3.5 text-neutral-700 stroke-[1.8]" />
                    {post.projectSnippet.title}
                  </span>
                  {post.projectSnippet.link && (
                    <a
                      href={post.projectSnippet.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-semibold text-neutral-700 hover:text-neutral-900 flex items-center gap-1"
                    >
                      <span>Code</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>

                <p className="text-[11px] text-neutral-600 leading-relaxed">
                  {post.projectSnippet.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {post.projectSnippet.techStack.map(t => (
                    <span
                      key={t}
                      className="text-[10px] font-mono text-neutral-700 bg-white px-2 py-0.5 rounded border border-neutral-200/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Actions Row */}
            <div className="flex items-center gap-6 pl-11 text-xs text-neutral-500 pt-2 border-t border-neutral-100">
              <button
                onClick={() => toggleLikePost(post.id)}
                className={`flex items-center gap-1.5 transition-colors ${
                  post.isLiked ? 'text-rose-600 font-semibold' : 'hover:text-neutral-900'
                }`}
              >
                <Heart className={`h-3.5 w-3.5 ${post.isLiked ? 'fill-rose-500 stroke-rose-500' : 'stroke-[1.8]'}`} />
                <span>{post.likesCount}</span>
              </button>

              <button
                onClick={() => showToast('Replies feature available')}
                className="flex items-center gap-1.5 hover:text-neutral-900 transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5 stroke-[1.8]" />
                <span>{post.repliesCount}</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  showToast('Post link copied to clipboard');
                }}
                className="flex items-center gap-1.5 hover:text-neutral-900 transition-colors"
              >
                <Share2 className="h-3.5 w-3.5 stroke-[1.8]" />
                <span>Share</span>
              </button>
            </div>

          </article>
        ))}
      </div>

    </div>
  );
};

