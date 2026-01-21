import { useState } from 'react';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import CreateBlog from './components/CreateBlog';
import { Button } from '@/components/ui/button';
import { FaPlusCircle, FaPenNib, FaThLarge, FaGlobe, FaBars, FaBriefcase, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleSelectBlog = (id: string) => {
    setSelectedId(id);
    setShowCreateForm(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowCreate = () => {
    setShowCreateForm(true);
    setSelectedId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setShowCreateForm(false);
    setSelectedId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col w-screen overflow-x-hidden">

      <nav className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 h-16 flex items-center px-6 md:px-10 justify-between shadow-sm shrink-0">

        <div className="flex items-center gap-3 cursor-pointer group" onClick={handleGoHome}>
          <div className="bg-[#0F1D42] h-9 w-9 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-white font-black text-lg">C</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-[#0F1D42] leading-none">
              CA MONK
            </span>
            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase hidden md:block">
              Blog Workspace
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 bg-slate-100/80 p-1.5 rounded-full border border-slate-200 shadow-sm">
          {['Community', 'Events', 'Practice'].map((item) => (
            <Button
              key={item}
              variant="ghost"
              className="rounded-full px-6 h-9 text-sm font-semibold text-slate-600 border border-transparent hover:bg-[#0F1D42] hover:text-black hover:border-[#0F1D42] hover:rounded-full hover:shadow-md transition-all duration-300 active:scale-95"
            >
              {item}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="hidden md:flex text-slate-500 hover:text-[#0F1D42]">
            <FaGlobe className="h-5 w-5" />
          </Button>

          <div className="h-6 w-px bg-slate-200 mx-1 hidden md:block"></div>

          <Button
            onClick={handleShowCreate}
            className="bg-[#0F1D42] hover:bg-blue-900 text-white gap-2 rounded-full px-5 h-10 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg flex items-center z-50 relative"
            style={{ backgroundColor: '#0F1D42', color: 'white' }}
          >
            <FaPlusCircle className="h-4 w-4 text-white" />
            <span className="font-bold text-sm text-white">Write Post</span>
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden text-slate-700">
            <FaBars className="h-6 w-6" />
          </Button>
        </div>
      </nav>

      <main className="flex-1 w-full p-4 md:p-8 gap-8 flex flex-col md:flex-row items-start">

        <aside className={`${selectedId || showCreateForm ? 'hidden md:flex' : 'flex'} w-full md:w-[400px] bg-white border border-slate-200 flex-col rounded-2xl shadow-sm sticky top-24 max-h-[calc(100vh-8rem)] overflow-hidden shrink-0`}>
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
            <h2 className="font-bold text-slate-800 flex items-center gap-2 text-sm uppercase tracking-wide">
              <FaThLarge className="h-4 w-4 text-blue-600" /> Recent Stories
            </h2>
            <span className="text-[10px] font-bold text-slate-400 bg-white border px-2 py-0.5 rounded shadow-sm">ALL POSTS</span>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
            <BlogList onSelect={handleSelectBlog} selectedId={selectedId || ''} />
          </div>
        </aside>

        <section className={`${!selectedId && !showCreateForm ? 'hidden md:flex' : 'flex'} flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm min-h-[600px] flex flex-col overflow-hidden w-full`}>
          {selectedId && (
            <div className="md:hidden p-4 border-b bg-white flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer hover:bg-slate-50 sticky top-0 z-10" onClick={() => setSelectedId(null)}>
              ← Back to list
            </div>
          )}

          <div className="flex-1 w-full p-0">
            {showCreateForm ? (
              <div className="p-6 md:p-10 w-full h-full">
                <CreateBlog />
              </div>
            ) : selectedId ? (
              <div className="h-full w-full">
                <BlogDetail id={selectedId} />
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-slate-50/30">
                <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-xl mb-8 ring-1 ring-slate-100 rotate-3 transition-transform hover:rotate-6">
                  <FaPenNib className="h-10 w-10 text-blue-600" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                  Knowledge <span className="text-blue-600">Hub</span>
                </h1>
                <p className="text-slate-500 text-lg max-w-lg mb-8 leading-relaxed">
                  Stay updated with the latest trends in finance, accounting, and career growth. Select an article to start reading.
                </p>
                <div className="flex gap-4">
                  <Button onClick={handleShowCreate} size="lg" className="bg-[#0F1D42] hover:bg-blue-900 text-white font-bold px-8 rounded-full shadow-lg h-12" style={{ backgroundColor: '#0F1D42', color: 'white' }}>
                    Start Writing
                  </Button>
                  <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-100 font-bold px-8 rounded-full h-12">
                    Browse Topics
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-[#050810] text-slate-300 py-10 border-t border-slate-800 mt-auto w-full shrink-0">
        <div className="w-full px-6 md:px-12">

          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-10">

            <div className="md:col-span-2 pr-12">
              <div className="flex items-center gap-2 mb-5">
                <div className="bg-white h-7 w-7 rounded flex items-center justify-center">
                  <FaBriefcase className="h-4 w-4 text-[#050810]" />
                </div>
                <span className="font-bold text-white text-xl tracking-tight">CA MONK</span>
              </div>
              <p className="text-sm text-slate-400 leading-7 font-normal">
                Empowering the next generation of financial leaders with tools, community, and knowledge.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-500 uppercase text-[11px] tracking-widest mb-5">Resources</h3>
              <ul className="space-y-3 text-sm font-medium">
                <li><a href="#" className="hover:text-white transition-colors text-slate-300">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-slate-300">Webinars</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-slate-300">Case Studies</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-slate-500 uppercase text-[11px] tracking-widest mb-5">Platform</h3>
              <ul className="space-y-3 text-sm font-medium">
                <li><a href="#" className="hover:text-white transition-colors text-slate-300">Job Board</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-slate-300">Practice Tests</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-slate-300">Mentorship</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-slate-500 uppercase text-[11px] tracking-widest mb-5">Connect</h3>
              <ul className="space-y-3 text-sm font-medium">
                <li>
                  <a href="#" className="flex items-center gap-2 hover:text-white transition-colors text-slate-300">
                    <FaLinkedin className="h-4 w-4" /> LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 hover:text-white transition-colors text-slate-300">
                    <FaTwitter className="h-4 w-4" /> Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 hover:text-white transition-colors text-slate-300">
                    <FaInstagram className="h-4 w-4" /> Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800/60 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-medium">
            <p>© 2024 CA Monk. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

export default App;