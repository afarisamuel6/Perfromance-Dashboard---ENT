/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  PieChart,
  Pie
} from 'recharts';
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  MoreVertical, 
  ChevronRight, 
  LayoutDashboard, 
  Settings, 
  Users, 
  BookOpen, 
  Briefcase,
  AlertCircle,
  Download,
  Info,
  FileText,
  ClipboardList,
  Plus,
  Upload,
  X,
  Printer,
  FileCheck,
  Lock,
  LogOut,
  User
} from 'lucide-react';
import { KPI_CATEGORIES, KPICategory, RATING_SCALE, KPI, EvidenceFile } from './constants';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('dti_auth') === 'true';
  });
  const [categories, setCategories] = useState<KPICategory[]>(KPI_CATEGORIES);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'framework' | 'report' | string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Auth logic
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = formData.get('username') as string;
    const pass = formData.get('password') as string;

    if (user === 'dtientrepreneurship' && pass === 'Pdent2026!') {
      setIsAuthenticated(true);
      localStorage.setItem('dti_auth', 'true');
    } else {
      alert('Invalid credentials. Please contact the administrator.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('dti_auth');
  };

  // Load from local storage
  useEffect(() => {
    if (!isAuthenticated) return;
    const saved = localStorage.getItem('dti_kpi_data');
    if (saved) {
      try {
        setCategories(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved data", e);
      }
    }
  }, [isAuthenticated]);

  // Save to local storage
  const saveToLocal = (newCategories: KPICategory[]) => {
    if (!isAuthenticated) return;
    localStorage.setItem('dti_kpi_data', JSON.stringify(newCategories));
    setCategories(newCategories);
  };

  const overallScore = useMemo(() => {
    let totalWeightedScore = 0;
    categories.forEach(cat => {
      cat.kpis.forEach(kpi => {
        const achievement = Math.min(kpi.actualValue / kpi.targetValue, 1);
        totalWeightedScore += achievement * kpi.weight;
      });
    });
    return totalWeightedScore;
  }, [categories]);

  const rating = useMemo(() => {
    return RATING_SCALE.find(r => overallScore >= r.min) || RATING_SCALE[RATING_SCALE.length - 1];
  }, [overallScore]);

  const chartData = useMemo(() => {
    return categories.map(cat => {
      const catScore = cat.kpis.reduce((acc, kpi) => {
        const achievement = Math.min(kpi.actualValue / kpi.targetValue, 1);
        return acc + (achievement * kpi.weight);
      }, 0);
      const normalizedScore = (catScore / cat.weight) * 100;
      return {
        name: cat.name,
        score: Math.round(normalizedScore),
        weight: cat.weight * 100
      };
    });
  }, [categories]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-[48px] shadow-2xl border border-gray-100 p-12 space-y-8"
        >
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-black text-white rounded-[32px] flex items-center justify-center mx-auto shadow-2xl shadow-black/20 ring-8 ring-gray-50">
              <Lock className="w-12 h-12" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-black uppercase tracking-tight leading-tight text-gray-900">
                Entrepreneurship Department Performance Dashboard
              </h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-2">DTI Institutional Secure Portal</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="group">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1 group-focus-within:text-black transition-colors">HOD Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
                  <input 
                    name="username"
                    type="text" 
                    required
                    placeholder="Enter official username"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-black/5 focus:border-black focus:bg-white transition-all shadow-inner"
                  />
                </div>
              </div>
              <div className="group">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1 group-focus-within:text-black transition-colors">Access Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
                  <input 
                    name="password"
                    type="password" 
                    required
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-black/5 focus:border-black focus:bg-white transition-all shadow-inner"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-5 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Authorize Login
            </button>
          </form>

          <div className="pt-4 border-t border-gray-50 flex flex-col items-center gap-2">
            <p className="text-[9px] text-center text-gray-400 font-bold uppercase tracking-widest">
              Secured by DTI Analytics Unit
            </p>
            <div className="flex gap-1">
              {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-gray-200" />)}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const handleKPIUpdate = (categoryId: string, kpiId: string, actual: number, notes?: string, files?: EvidenceFile[]) => {
    const updated = categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          kpis: cat.kpis.map(kpi => {
            if (kpi.id === kpiId) {
              const updatedFiles = [...(kpi.evidenceFiles || []), ...(files || [])];
              return { 
                ...kpi, 
                actualValue: actual, 
                notes: notes || kpi.notes,
                evidenceFiles: updatedFiles
              };
            }
            return kpi;
          })
        };
      }
      return cat;
    });
    saveToLocal(updated);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex h-screen bg-[#F8F9FA] font-sans text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${isSidebarOpen ? 'w-72' : 'w-20'} h-full bg-white border-r border-gray-200 transition-all duration-300 flex flex-col z-20`}
      >
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold italic">dti</div>
              <span className="font-bold tracking-tight text-lg">Facilitator</span>
            </div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'dashboard' ? 'bg-black text-white shadow-lg shadow-black/10' : 'text-gray-500 hover:bg-gray-100 hover:text-black'}`}
          >
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span className="font-medium">Overview</span>}
          </button>

          <button 
            onClick={() => setActiveTab('report')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'report' ? 'bg-black text-white shadow-lg shadow-black/10' : 'text-gray-500 hover:bg-gray-100 hover:text-black'}`}
          >
            <FileCheck className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span className="font-medium">Appraisal Report</span>}
          </button>
          
          <button 
            onClick={() => setActiveTab('framework')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'framework' ? 'bg-black text-white shadow-lg shadow-black/10' : 'text-gray-500 hover:bg-gray-100 hover:text-black'}`}
          >
            <BookOpen className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span className="font-medium">Framework Table</span>}
          </button>
          
          <div className={`mt-6 mb-2 px-4 transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">KPI Categories</span>
          </div>

          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === cat.id ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-gray-500 hover:bg-gray-100 hover:text-black'}`}
            >
              <Target className={`w-5 h-5 shrink-0 ${activeTab === cat.id ? 'text-indigo-600' : 'text-gray-400'}`} />
              {isSidebarOpen && <span className="truncate text-sm">{cat.name}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 mt-auto space-y-2">
          <div className={`px-4 py-2 bg-gray-50 rounded-xl mb-1 ${isSidebarOpen ? 'block' : 'hidden'}`}>
            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Logged in as</div>
            <div className="text-xs font-bold text-black truncate">HOD Entrepreneurship</div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 group"
          >
            <LogOut className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
            {isSidebarOpen && <span className="text-sm font-bold">Logout Session</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#F8F9FA] p-8 lg:p-12">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' ? (
            <motion.div 
              key="dashboard"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8 max-w-7xl mx-auto w-full"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h1 className="text-4xl font-black tracking-tight text-black mb-2">Performance Dashboard</h1>
                  <p className="text-gray-500 max-w-lg">Tracking institutional impact and facilitator effectiveness based on the DTI appraisal framework.</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <button 
                    onClick={() => setActiveTab('report')}
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-2xl font-bold text-sm shadow-xl shadow-black/10 hover:bg-gray-800 transition-all"
                  >
                    <FileCheck className="w-5 h-5" />
                    Generate Appraisal Report
                  </button>
                  <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                    <div className={`p-3 rounded-xl bg-opacity-20 flex items-center justify-center`} style={{ backgroundColor: rating.color + '33', color: rating.color }}>
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Performance</div>
                      <div className="text-2xl font-black" style={{ color: rating.color }}>{rating.label}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><TrendingUp className="w-5 h-5" /></div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Weighted Score</span>
                  </div>
                  <div className="text-3xl font-black text-indigo-600">
                    {(overallScore * 100).toFixed(1)}
                    <span className="text-sm font-normal text-gray-400"> / 100</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 transition-all duration-1000" style={{ width: `${overallScore * 100}%` }}></div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-green-50 text-green-600 rounded-lg"><CheckCircle className="w-5 h-5" /></div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Overall Progress</span>
                  </div>
                  <div className="text-3xl font-black">
                    {Math.round(categories.reduce((acc, cat) => acc + cat.kpis.reduce((kacc, kpi) => kacc + Math.min(kpi.actualValue / kpi.targetValue, 1), 0), 0) / categories.reduce((acc, cat) => acc + cat.kpis.length, 0) * 100)}
                    <span className="text-sm font-normal text-gray-400">%</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Aggregate goal completion</p>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm md:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-black text-white rounded-xl"><FileText className="w-5 h-5" /></div>
                      <div>
                        <h3 className="text-sm font-black uppercase tracking-tight">Recent Task Logs</h3>
                        <p className="text-[10px] text-gray-400">Latest evidence recorded</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {categories.flatMap(c => c.kpis).filter(k => k.notes).length > 0 ? (
                      categories.flatMap(c => c.kpis).filter(k => k.notes).slice(-2).reverse().map((kpi, idx) => (
                        <div key={idx} className="flex gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                          <div className="flex-1">
                            <div className="text-[10px] font-black text-gray-800 uppercase tracking-tight">{kpi.name}</div>
                            <p className="text-xs text-gray-500 mt-0.5 italic truncate">"{kpi.notes}"</p>
                          </div>
                          <div className="shrink-0 text-right">
                            <span className="px-2 py-1 bg-white border border-gray-100 text-[10px] font-bold text-indigo-700 rounded-lg">{kpi.actualValue} {kpi.unit}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-4 text-center text-gray-300 italic text-xs">No tasks logged yet.</div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Charts Container */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <BarChart className="w-5 h-5 text-indigo-600" />
                    Performance by Category (%)
                  </h3>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} layout="vertical" margin={{ left: 40, right: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                        <XAxis type="number" domain={[0, 100]} hide />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          width={140} 
                          tick={{ fontSize: 10, fill: '#6B7280', fontWeight: 500 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip 
                          cursor={{ fill: '#F3F4F6' }}
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                        />
                        <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.score >= 90 ? '#22c55e' : entry.score >= 70 ? '#3b82f6' : entry.score >= 60 ? '#eab308' : '#ef4444'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <Target className="w-5 h-5 text-indigo-600" />
                    Weighted Distribution
                  </h3>
                  <div className="h-[350px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius="70%" data={chartData}>
                        <PolarGrid stroke="#E5E7EB" />
                        <PolarAngleAxis dataKey="name" tick={{ fontSize: 9, fill: '#6B7280' }} />
                        <Radar
                          name="Target Weight"
                          dataKey="weight"
                          stroke="#818cf8"
                          fill="#818cf8"
                          fillOpacity={0.2}
                        />
                        <Radar
                          name="Actual Performance"
                          dataKey="score"
                          stroke="#4f46e5"
                          fill="#4f46e5"
                          fillOpacity={0.5}
                        />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>

              {/* Quick Actions / Recent Items */}
              <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                  <h3 className="text-lg font-bold">Category Summary</h3>
                  <button 
                    onClick={() => setActiveTab('framework')}
                    className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Extract Data Table
                  </button>
                </div>
                <div className="divide-y divide-gray-50">
                  {categories.map((cat) => {
                    const score = (cat.kpis.reduce((acc, kpi) => acc + (Math.min(kpi.actualValue / kpi.targetValue, 1) * kpi.weight), 0) / cat.weight) * 100;
                    return (
                      <div key={cat.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between cursor-pointer group" onClick={() => setActiveTab(cat.id)}>
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${score >= 90 ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'}`}>
                            {score.toFixed(0)}%
                          </div>
                          <div>
                            <div className="text-sm font-bold group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{cat.name}</div>
                            <div className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Weight: {(cat.weight * 100).toFixed(0)}%</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-600 transform group-hover:translate-x-1 transition-all" />
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          ) : activeTab === 'framework' ? (
            <FrameworkView categories={categories} />
          ) : activeTab === 'report' ? (
            <ReportView categories={categories} overallScore={overallScore} rating={rating} />
          ) : (
            <CategoryDetail 
              category={categories.find(c => c.id === activeTab)!} 
              onKPIUpdate={handleKPIUpdate}
              onBack={() => setActiveTab('dashboard')}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function CategoryDetail({ category, onKPIUpdate, onBack }: { category: KPICategory, onKPIUpdate: (catId: string, kpiId: string, actual: number, notes?: string) => void, onBack: () => void }) {
  const catScore = (category.kpis.reduce((acc, kpi) => acc + (Math.min(kpi.actualValue / kpi.targetValue, 1) * kpi.weight), 0) / category.weight) * 100;
  
  return (
    <motion.div 
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -20, opacity: 0 }}
      className="max-w-7xl mx-auto w-full space-y-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-gray-400">
          <button onClick={onBack} className="hover:text-black transition-colors font-bold text-sm">Dashboard</button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-black font-bold text-sm truncate">{category.name}</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-black tracking-tight uppercase leading-tight">{category.name}</h2>
          </div>
          <p className="text-gray-500 font-medium italic">{category.objective}</p>
        </div>
        <div className="flex items-center gap-6 min-w-[240px]">
          <div className="relative w-20 h-20 shrink-0">
            <svg className="w-full h-full -rotate-90">
              <circle cx="40" cy="40" r="35" fill="none" stroke="#F3F4F6" strokeWidth="8" />
              <circle cx="40" cy="40" r="35" fill="none" stroke="#4f46e5" strokeWidth="8" strokeDasharray={`${Math.PI * 70}`} strokeDashoffset={`${Math.PI * 70 * (1 - catScore / 100)}`} strokeLinecap="round" className="transition-all duration-1000" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-black text-lg">{catScore.toFixed(0)}%</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Category Weight</div>
            <div className="text-2xl font-black text-black tracking-tight">{(category.weight * 100).toFixed(0)}%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {category.kpis.map((kpi) => (
          <KPICard key={kpi.id} kpi={kpi} onUpdate={(actual, notes) => onKPIUpdate(category.id, kpi.id, actual, notes)} />
        ))}
      </div>
    </motion.div>
  );
}

function KPICard({ kpi, onUpdate }: { kpi: KPI; onUpdate: (actual: number, notes?: string, files?: EvidenceFile[]) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('0');
  const [updateMode, setUpdateMode] = useState<'set' | 'add'>('add');
  const [notes, setNotes] = useState('');
  const [pendingFiles, setPendingFiles] = useState<EvidenceFile[]>([]);
  
  const completion = Math.min(kpi.actualValue / kpi.targetValue, 1);
  const remaining = Math.max(kpi.targetValue - kpi.actualValue, 0);
  const remainingPercent = Math.max(100 - (completion * 100), 0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPendingFiles(prev => [...prev, {
            name: file.name,
            dataUrl: event.target!.result as string,
            type: file.type
          }]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePendingFile = (index: number) => {
    setPendingFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(inputValue) || 0;
    const newTotal = updateMode === 'add' ? kpi.actualValue + val : val;
    onUpdate(newTotal, notes, pendingFiles);
    setIsEditing(false);
    setInputValue('0');
    setNotes('');
    setPendingFiles([]);
  };

  return (
    <motion.div 
      layout
      className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col gap-6"
    >
      <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-500 rounded-lg">{(kpi.weight * 100).toFixed(0)}% Weight</span>
            <span className="px-3 py-1 bg-indigo-50 text-[10px] font-black uppercase tracking-widest text-indigo-600 rounded-lg">{kpi.frequency}</span>
            <span className="px-3 py-1 bg-green-50 text-[10px] font-black uppercase tracking-widest text-green-600 rounded-lg">{kpi.measurementMethod}</span>
          </div>
          <div>
            <h4 className="text-xl font-black uppercase tracking-tight text-black mb-1">{kpi.name}</h4>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xl">{kpi.targetDescription}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
              <div className="text-[10px] uppercase font-black text-indigo-400 mb-1">Completed</div>
              <div className="text-xl font-black text-indigo-700">{(completion * 100).toFixed(0)}%</div>
              <div className="text-[10px] text-indigo-400 font-bold mt-1">{kpi.actualValue} / {kpi.targetValue} {kpi.unit}</div>
            </div>
            <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100/50">
              <div className="text-[10px] uppercase font-black text-orange-400 mb-1">Remaining</div>
              <div className="text-xl font-black text-orange-700">{remainingPercent.toFixed(0)}%</div>
              <div className="text-[10px] text-orange-400 font-bold mt-1">{remaining.toFixed(1)} {kpi.unit} to target</div>
            </div>
          </div>

          <div className="space-y-3">
            {kpi.notes && !isEditing && (
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="text-[10px] uppercase font-black text-gray-400 mb-1">Latest Achievement Detail</div>
                <p className="text-sm text-gray-700 italic">"{kpi.notes}"</p>
              </div>
            )}
            
            {kpi.evidenceFiles && kpi.evidenceFiles.length > 0 && !isEditing && (
              <div className="flex flex-wrap gap-2">
                {kpi.evidenceFiles.map((file, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-100 rounded-xl text-[10px] font-bold text-gray-600 shadow-sm">
                    <FileCheck className="w-3 h-3 text-indigo-600" />
                    {file.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-4">
          <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden relative">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${completion * 100}%` }}
              className={`h-full transition-all duration-500 rounded-full ${completion >= 1 ? 'bg-green-500' : 'bg-indigo-600'}`}
            />
            {completion < 1 && (
              <div className="absolute top-0 right-0 h-full flex items-center pr-3">
                <span className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">Remaining</span>
              </div>
            )}
          </div>

          {!isEditing ? (
            <div className="space-y-2">
              <button 
                onClick={() => { setUpdateMode('add'); setIsEditing(true); }}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
              >
                <Plus className="w-4 h-4" /> Log Progress (+ Incremental)
              </button>
              <button 
                onClick={() => { setUpdateMode('set'); setIsEditing(true); setInputValue(kpi.actualValue.toString()); }}
                className="w-full py-3 bg-white text-gray-500 border border-gray-200 rounded-2xl font-bold text-xs hover:bg-gray-50 transition-colors"
              >
                Reset / Override Total Value
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 bg-gray-50 rounded-[32px] border border-gray-200 shadow-inner space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                  {updateMode === 'add' ? 'Add Achievement' : 'Set Total Achievement'}
                </span>
                <span className="px-2 py-0.5 bg-indigo-100 text-[10px] font-bold text-indigo-600 rounded uppercase">Mode: {updateMode}</span>
              </div>
              
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase block mb-1">
                  {updateMode === 'add' ? `Quantity Achieved (${kpi.unit})` : `Final Total Value (${kpi.unit})`}
                </label>
                <input 
                  type="number"
                  step="0.1"
                  autoFocus
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-2xl bg-white font-black text-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase block mb-1">Upload Evidence (Photos/PDFs)</label>
                <div className="relative">
                  <input 
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id={`file-upload-${kpi.id}`}
                  />
                  <label 
                    htmlFor={`file-upload-${kpi.id}`}
                    className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-200 rounded-2xl bg-white cursor-pointer hover:border-indigo-400 transition-colors"
                  >
                    <Upload className="w-6 h-6 text-gray-400 mb-2" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Attach Prove(s)</span>
                  </label>
                </div>
                {pendingFiles.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {pendingFiles.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 px-2 py-1 bg-white rounded-lg border border-gray-100 text-[9px] font-bold">
                        <span className="truncate max-w-[80px]">{f.name}</span>
                        <button type="button" onClick={() => removePendingFile(i)} className="text-red-500"><X className="w-3 h-3" /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase block mb-1">Achievement Details</label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., Conducted weekly collaboration with department..."
                  className="w-full p-4 border border-gray-200 rounded-2xl bg-white text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 min-h-[100px] transition-all"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-black text-white rounded-2xl font-bold text-sm hover:bg-gray-800 transition-colors shadow-xl"
                >
                  Confirm & Save Log
                </button>
                <button 
                  type="button"
                  onClick={() => { setIsEditing(false); setPendingFiles([]); }}
                  className="px-6 py-4 bg-white text-gray-500 border border-gray-200 rounded-2xl font-bold text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function FrameworkView({ categories }: { categories: KPICategory[] }) {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="max-w-7xl mx-auto w-full space-y-8"
    >
      <div>
        <h2 className="text-3xl font-black uppercase tracking-tight mb-2">Excel-Ready KPI Table</h2>
        <p className="text-gray-500">Copy this data into Excel to maintain a local record of your institutional appraisal framework.</p>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-200 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-400">KPI Name</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actual</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Target</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Weight</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Achieved</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {categories.map(cat => (
                cat.kpis.map((kpi, idx) => {
                  const achievement = Math.min(kpi.actualValue / kpi.targetValue, 1);
                  return (
                    <tr key={kpi.id} className="hover:bg-gray-50/50 transition-colors">
                      {idx === 0 ? (
                        <td className="p-5 border-r border-gray-50 font-bold bg-white align-top" rowSpan={cat.kpis.length}>
                          {cat.name}
                        </td>
                      ) : null}
                      <td className="p-5 font-semibold text-black">{kpi.name}</td>
                      <td className="p-5 text-right font-mono bg-indigo-50/30">{kpi.actualValue}</td>
                      <td className="p-5 text-right font-mono text-gray-400">{kpi.targetValue} {kpi.unit}</td>
                      <td className="p-5 text-right font-mono text-gray-400">{(kpi.weight * 100).toFixed(0)}%</td>
                      <td className="p-5 text-right font-mono font-bold text-indigo-600">{(achievement * 100).toFixed(0)}%</td>
                      <td className="p-5 text-gray-500 italic max-w-xs truncate">{kpi.notes || '-'}</td>
                    </tr>
                  );
                })
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-indigo-900 text-white p-8 rounded-[32px] space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Info className="w-6 h-6" />
          Excel Implementation Guide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm opacity-90 leading-relaxed">
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-widest text-indigo-300">Recommended Sheet Layout</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Sheet 1 (KPI Table):</strong> Copy the table above.</li>
              <li><strong>Sheet 2 (Data Entry):</strong> Create columns for <span className="bg-indigo-800 px-2 rounded">Actual</span> and <span className="bg-indigo-800 px-2 rounded">Target</span> values next to each KPI.</li>
              <li><strong>Sheet 3 (Dashboard):</strong> Use charts connected to the calculated weighted scores.</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-widest text-indigo-300">Excel Formulas</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Achievement %:</strong> <code>=MIN(Actual / Target, 1)</code></li>
              <li><strong>Weighted Score:</strong> <code>=(Achievement%) * Weight</code></li>
              <li><strong>Classification:</strong> <code>=IFS(Score &gt;= 0.9, "Outstanding", Score &gt;= 0.8, "Very Good", Score &gt;= 0.7, "Good", Score &gt;= 0.6, "Fair", TRUE, "Poor")</code></li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ReportView({ categories, overallScore, rating }: { categories: KPICategory[]; overallScore: number; rating: any }) {
  const printReport = () => {
    window.print();
  };

  const downloadCSV = () => {
    const headers = ['Category', 'KPI Name', 'Actual', 'Target', 'Unit', 'Achievement %', 'Notes'];
    const rows = categories.flatMap(cat => 
      cat.kpis.map(kpi => [
        cat.name,
        kpi.name,
        kpi.actualValue,
        kpi.targetValue,
        kpi.unit,
        ((Math.min(kpi.actualValue / kpi.targetValue, 1)) * 100).toFixed(1) + '%',
        kpi.notes || ''
      ])
    );

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `DTI_Appraisal_Report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto w-full space-y-8 pb-20"
    >
      <div className="flex items-center justify-between no-print">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tight">Appraisal Evidence Report</h2>
          <p className="text-gray-500">Generate a formal visual report or download raw data for local backup.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={downloadCSV}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black border border-gray-200 rounded-2xl font-bold text-sm shadow-sm hover:bg-gray-50 transition-all"
          >
            <Download className="w-5 h-5" />
            Download Data (.CSV)
          </button>
          <button 
            onClick={printReport}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
          >
            <Printer className="w-5 h-5" />
            Print / Save as PDF
          </button>
        </div>
      </div>

      <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 flex items-start gap-4 no-print mb-8">
        <div className="p-2 bg-indigo-600 text-white rounded-xl"><Info className="w-5 h-5" /></div>
        <div className="text-sm text-indigo-900">
          <p className="font-bold mb-1">How to Download as PDF:</p>
          <p className="opacity-80 leading-relaxed">After clicking "Print / Save as PDF", change the Destination in your browser's print dialog to <strong>"Save as PDF"</strong>. This will generate a formal downloadable document with all your evidence.</p>
        </div>
      </div>

      <div className="bg-white p-12 rounded-[48px] border border-gray-100 shadow-2xl space-y-12 print:shadow-none print:border-none print:p-0">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b-2 border-gray-50 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center font-black">DTI</div>
              <h1 className="text-2xl font-black uppercase tracking-tighter">Performance Appraisal</h1>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-gray-800">Facilitator: <span className="font-normal text-gray-500">Samuel Afari</span></p>
              <p className="text-sm font-bold text-gray-800">Role: <span className="font-normal text-gray-500">Entrepreneurship Facilitator</span></p>
              <p className="text-sm font-bold text-gray-800">Date Generated: <span className="font-normal text-gray-500">{new Date().toLocaleDateString()}</span></p>
            </div>
          </div>
          <div className="p-6 bg-gray-50 rounded-[32px] border border-gray-100 text-center min-w-[200px]">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Final Appraisal Score</div>
            <div className="text-5xl font-black text-black">{(overallScore * 100).toFixed(1)}%</div>
            <div className="mt-2 text-sm font-bold" style={{ color: rating.color }}>{rating.label}</div>
          </div>
        </div>

        <div className="space-y-12">
          {categories.map(cat => {
            const catAchievement = (cat.kpis.reduce((acc, kpi) => acc + (Math.min(kpi.actualValue / kpi.targetValue, 1) * kpi.weight), 0) / cat.weight) * 100;
            return (
              <div key={cat.id} className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <h3 className="text-lg font-black uppercase tracking-tight text-gray-800">{cat.name}</h3>
                  <span className="text-sm font-black text-indigo-600">{catAchievement.toFixed(1)}% Completed</span>
                </div>
                <div className="space-y-6">
                  {cat.kpis.map(kpi => {
                    const achievement = Math.min(kpi.actualValue / kpi.targetValue, 1) * 100;
                    return (
                      <div key={kpi.id} className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-gray-50/50 rounded-3xl border border-gray-50">
                        <div className="md:col-span-3 space-y-3">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-gray-900">{kpi.name}</h4>
                            <span className="text-[10px] font-black text-gray-400 uppercase">({(kpi.weight * 100).toFixed(0)}% Weight)</span>
                          </div>
                          <p className="text-sm text-gray-600 italic">Target: {kpi.targetDescription}</p>
                          {kpi.notes && (
                            <div className="pt-2">
                              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-1">Evidence & Notes:</span>
                              <p className="text-sm text-gray-700 bg-white p-3 rounded-xl border border-gray-100">"{kpi.notes}"</p>
                            </div>
                          )}
                          {kpi.evidenceFiles && kpi.evidenceFiles.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-2">
                              {kpi.evidenceFiles.map((f, idx) => (
                                <div key={idx} className="flex items-center gap-1.5 px-2 py-1 bg-white rounded-lg text-[9px] font-bold text-gray-500 border border-gray-100">
                                  <FileText className="w-3 h-3 text-indigo-500" />
                                  {f.name}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col justify-center items-end text-right">
                          <div className="text-[10px] font-black text-gray-400 uppercase">Progress</div>
                          <div className="text-2xl font-black text-black">{achievement.toFixed(0)}%</div>
                          <div className="text-xs text-gray-500">{kpi.actualValue} / {kpi.targetValue} {kpi.unit}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-20 grid grid-cols-2 gap-12">
          <div className="border-t border-gray-300 pt-4">
            <p className="text-xs font-black uppercase text-gray-400">Facilitator Signature</p>
            <div className="h-10"></div>
            <p className="text-sm font-bold">__________________________</p>
          </div>
          <div className="border-t border-gray-300 pt-4">
            <p className="text-xs font-black uppercase text-gray-400">HOD / Reviewer Signature</p>
            <div className="h-10"></div>
            <p className="text-sm font-bold">__________________________</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
