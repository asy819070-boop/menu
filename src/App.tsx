/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  UtensilsCrossed, 
  Flame, 
  Snowflake, 
  Sparkles, 
  Search, 
  ExternalLink, 
  RotateCcw, 
  History, 
  Check, 
  TrendingUp, 
  ChefHat, 
  Store,
  HelpCircle,
  ThumbsUp,
  X,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { menus, MenuItem } from './data/menus';
import { sound } from './utils/audio';

interface HistoryItem {
  id: string; // unique generation timestamp
  menu: MenuItem;
  timestamp: string;
}

export default function App() {
  // Filter States - Default empty (nothing selected) as requested
  const [cuisines, setCuisines] = useState<('한식' | '중식' | '양식' | '일식')[]>([]);
  const [temperatures, setTemperatures] = useState<('따뜻한 음식' | '차가운 음식')[]>([]);
  const [spicinesses, setSpicinesses] = useState<('매운 음식' | '안매운 음식')[]>([]);

  // Recommendation States
  const [result, setResult] = useState<MenuItem | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinnerItem, setSpinnerItem] = useState<MenuItem | null>(null);
  
  // History State
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Sound feedback preferences
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Load history from localStorage on startup
  useEffect(() => {
    const saved = localStorage.getItem('menu_recommender_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load menu history', e);
      }
    }
  }, []);

  // Save history to localStorage
  const saveHistory = (updated: HistoryItem[]) => {
    setHistory(updated);
    localStorage.setItem('menu_recommender_history', JSON.stringify(updated));
  };

  // Sound triggering safely
  const triggerSound = (type: 'click' | 'tick' | 'success') => {
    if (!soundEnabled) return;
    if (type === 'click') sound.playClick();
    if (type === 'tick') sound.playTick();
    if (type === 'success') sound.playSuccess();
  };

  // Multi-select toggle helper
  const toggleFilter = <T,>(list: T[], setList: React.Dispatch<React.SetStateAction<T[]>>, value: T) => {
    triggerSound('click');
    if (list.includes(value)) {
      // Keep at least one selected, or clear. Clearing shows "must select at least one" warning in active filter counts.
      setList(list.filter(item => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  // Quick reset all filters to completely empty (default state)
  const handleResetFilters = () => {
    triggerSound('click');
    setCuisines([]);
    setTemperatures([]);
    setSpicinesses([]);
    setResult(null);
  };

  // Turn on all conditions immediately
  const handleSelectAllFilters = () => {
    triggerSound('click');
    setCuisines(['한식', '중식', '양식', '일식']);
    setTemperatures(['따뜻한 음식', '차가운 음식']);
    setSpicinesses(['매운 음식', '안매운 음식']);
    setResult(null);
  };

  const handleSelectAllCuisines = () => {
    triggerSound('click');
    setCuisines(['한식', '중식', '양식', '일식']);
  };

  const handleClearCuisines = () => {
    triggerSound('click');
    setCuisines([]);
  };

  // Get matching menu count in real-time based strictly on active selections
  const getFilteredMenus = () => {
    return menus.filter(menu => {
      const matchCuisine = cuisines.includes(menu.cuisine);
      const matchTemp = temperatures.includes(menu.temperature);
      const matchSpiciness = spicinesses.includes(menu.spiciness);
      return matchCuisine && matchTemp && matchSpiciness;
    });
  };

  const filteredItems = getFilteredMenus();

  // Roulette/Spin matching random recommendation
  const handleRecommend = () => {
    if (filteredItems.length === 0) return;
    
    triggerSound('click');
    setIsSpinning(true);
    setResult(null);

    // Prepare spinning items list (if single item, no need for complex spin intervals but still do short effect)
    const spinCandidates = [...filteredItems];
    let ticksPlayed = 0;
    const totalTicks = 15; // frequency of spinning changes
    const spinIntervalMs = 70; // speed of change

    let currentIndex = 0;

    const interval = setInterval(() => {
      // Pick next candidate sequentially for visible scrolling state
      setSpinnerItem(spinCandidates[currentIndex % spinCandidates.length]);
      triggerSound('tick');
      currentIndex++;
      ticksPlayed++;

      if (ticksPlayed >= totalTicks) {
        clearInterval(interval);
        
        // Pick the absolute random final winner from candidates
        const randomIndex = Math.floor(Math.random() * spinCandidates.length);
        const winner = spinCandidates[randomIndex];
        
        setTimeout(() => {
          setResult(winner);
          setIsSpinning(false);
          setSpinnerItem(null);
          triggerSound('success');

          // Log to history
          const nowStr = new Date().toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
          const newHistoryItem: HistoryItem = {
            id: Date.now().toString(),
            menu: winner,
            timestamp: nowStr
          };
          saveHistory([newHistoryItem, ...history.slice(0, 19)]); // Keep last 20 records
        }, 200);
      }
    }, spinIntervalMs);
  };

  // Wipe whole history
  const handleClearHistory = () => {
    triggerSound('click');
    saveHistory([]);
  };

  // Fast set filter to match a specific menu for demo/exploration
  const applyExactMatchFilters = (menu: MenuItem) => {
    triggerSound('click');
    setCuisines([menu.cuisine]);
    setTemperatures([menu.temperature]);
    setSpicinesses([menu.spiciness]);
    setResult(menu);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans selection:bg-amber-100 selection:text-amber-900 pb-16">
      {/* Top Header Grid Area */}
      <header className="border-b border-neutral-200/80 bg-white shadow-xs sticky top-0 z-40 backdrop-blur-md bg-white/90">
        <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-sm flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5" />
            </span>
            <div>
              <h1 id="app-title" className="text-lg font-bold tracking-tight text-neutral-900">
                오늘 뭐 먹지? <span className="text-orange-600">메뉴 추천기</span>
              </h1>
              <p className="text-xs text-neutral-500 hidden sm:block">맞춤 필터링으로 빠르게 고르는 완벽한 오늘 한끼</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Audio Toggle Toggle */}
            <button
              id="sound-toggle"
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                sound.playClick();
              }}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-200 border flex items-center gap-1.5 ${
                soundEnabled 
                  ? 'bg-amber-50 border-amber-200 text-amber-700 shadow-2xs' 
                  : 'bg-neutral-100 border-neutral-200 text-neutral-500'
              }`}
              title="효과음 켜기/끄기"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${soundEnabled ? 'bg-amber-500 animate-pulse' : 'bg-neutral-400'}`}></span>
              효과음: {soundEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-6">
        {/* Intro Message Card with animation */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 sm:p-5 mb-6 flex flex-col md:flex-row items-start md:items-center gap-4 justify-between"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl mt-0.5 select-none">💡</span>
            <div>
              <h2 className="font-semibold text-neutral-900 text-sm sm:text-base">
                음식 종류, 온도, 맵기 조건에 맞춰 메뉴를 추천해 드려요!
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed">
                모든 조건은 <strong className="text-amber-800">중복 선택(복수 선택)</strong>이 가능합니다. 여러 조건을 자유롭게 조합하여 최고의 오늘 식사 파트너를 점지받아 보세요.
              </p>
            </div>
          </div>
          <button
            id="quick-reset-header-btn"
            onClick={handleResetFilters}
            className="text-xs flex items-center gap-1 text-amber-700 hover:text-amber-900 font-medium px-3 py-1.5 border border-amber-200 rounded-lg bg-white/60 hover:bg-white hover:shadow-xs transition-all shrink-0 self-end md:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            전체 초기화
          </button>
        </motion.div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left Column: Filter Settings (7 Cols on desktop) */}
          <div className="md:col-span-7 flex flex-col gap-5">
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4 border-b border-neutral-100 pb-3">
                <h3 className="font-bold text-neutral-950 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  메뉴 맞춤 필터링
                </h3>
                <span className="text-xs text-neutral-500">원하는 사양을 체크하세요</span>
              </div>

              {/* 1. Cuisine Type */}
              <div id="cuisine-section" className="mb-5">
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                    1. 음식 카테고리
                  </label>
                  <div className="flex items-center gap-2">
                    <button 
                      id="cuisine-all"
                      onClick={handleSelectAllCuisines}
                      className="text-[11px] font-medium text-neutral-500 hover:text-amber-600 transition"
                    >
                      전체선택
                    </button>
                    <span className="text-[11px] text-neutral-300">|</span>
                    <button 
                      id="cuisine-clear"
                      onClick={handleClearCuisines}
                      className="text-[11px] font-medium text-neutral-500 hover:text-amber-600 transition"
                    >
                      해제
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {(['한식', '중식', '양식', '일식'] as const).map((item) => {
                    const isSelected = cuisines.includes(item);
                    return (
                      <button
                        key={item}
                        id={`cuisine-${item}`}
                        onClick={() => toggleFilter(cuisines, setCuisines, item)}
                        className={`py-2 px-1 rounded-xl font-medium text-xs border text-center transition-all duration-200 relative overflow-hidden flex flex-col items-center justify-center gap-1 ${
                          isSelected 
                            ? 'bg-amber-500 border-amber-600 text-white font-bold shadow-xs scale-[1.02]' 
                            : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-600'
                        }`}
                      >
                        {isSelected && (
                          <span className="absolute top-1 right-1 flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                          </span>
                        )}
                        <span className="text-base select-none">
                          {item === '한식' ? '🍙' : item === '중식' ? '🥟' : item === '양식' ? '🍝' : '🍣'}
                        </span>
                        <span>{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Temperature Grade */}
              <div id="temp-section" className="mb-5">
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                    2. 요리 온도
                  </label>
                  <span className="text-[11px] text-neutral-400">복수선택 가능</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { value: '따뜻한 음식', label: '뜨끈하게 든든히', desc: '따뜻한 국물 / 구이 요리', icon: Flame, color: 'hover:border-red-300 active-red', activeClass: 'border-red-500 bg-red-50 text-red-800' },
                    { value: '차가운 음식', label: '차갑게 짜릿하게', desc: '냉면 / 스시 / 아삭 샐러드', icon: Snowflake, color: 'hover:border-blue-300 active-blue', activeClass: 'border-blue-500 bg-blue-50 text-blue-800' }
                  ].map((item) => {
                    const isSelected = temperatures.includes(item.value as any);
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.value}
                        id={`temp-${item.value === '따뜻한 음식' ? 'hot' : 'cold'}`}
                        onClick={() => toggleFilter(temperatures, setTemperatures, item.value as any)}
                        className={`p-3 rounded-xl border text-left transition-all duration-200 relative flex gap-2.5 items-start ${
                          isSelected 
                            ? `${item.activeClass} font-semibold ring-[2px] ring-offset-0 ring-opacity-20 shadow-xs` 
                            : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-600'
                        }`}
                      >
                        <span className={`p-1.5 rounded-lg shrink-0 ${
                          isSelected 
                            ? item.value === '따뜻한 음식' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                            : 'bg-neutral-200/50 text-neutral-400'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-bold tracking-tight">{item.value}</p>
                          <p className="text-[10px] text-neutral-500 truncate mt-0.5">{item.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Spiciness Grade */}
              <div id="spicy-section" className="mb-2">
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                    3. 매콤 맵기 사양
                  </label>
                  <span className="text-[11px] text-neutral-400">복수선택 가능</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { value: '매운 음식', label: '매콤달콤한 요리', desc: '고추장 / 마라 / 청양고추', activeColor: 'border-rose-500 bg-rose-50 text-rose-800' },
                    { value: '안매운 음식', label: '담백순한 요리', desc: '간장베이스 / 수프 / 고소함', activeColor: 'border-emerald-500 bg-emerald-50 text-emerald-800' }
                  ].map((item) => {
                    const isSelected = spicinesses.includes(item.value as any);
                    return (
                      <button
                        key={item.value}
                        id={`spicy-${item.value === '매운 음식' ? 'spicy' : 'mild'}`}
                        onClick={() => toggleFilter(spicinesses, setSpicinesses, item.value as any)}
                        className={`p-3 rounded-xl border text-left transition-all duration-200 relative flex items-start gap-2.5 ${
                          isSelected 
                            ? `${item.activeColor} font-semibold shadow-xs` 
                            : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-600'
                        }`}
                      >
                        <span className={`text-base select-none shrink-0 p-1 rounded-lg ${
                          isSelected ? 'bg-white shadow-2xs' : 'bg-neutral-200/50'
                        }`}>
                          {item.value === '매운 음식' ? '🌶️' : '🥦'}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-bold tracking-tight">{item.value}</p>
                          <p className="text-[10px] text-neutral-500 truncate mt-0.5">{item.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Total match summary block */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-4 flex items-center justify-between text-xs sm:text-sm">
              <span className="text-neutral-500 font-medium">현재 필터 조건에 응답하는 메뉴들</span>
              <div className="flex items-center gap-1.5 font-bold text-neutral-900 bg-neutral-100 py-1.5 px-3 rounded-xl">
                <span>🍽️ 총</span>
                <span className="text-orange-600 outline-amber-400 text-base">{filteredItems.length}개</span>
                <span>매칭됨</span>
              </div>
            </div>

            {/* Recommended Menu Statistics brief - Dynamic visual summary */}
            {filteredItems.length > 0 && (
              <div className="bg-white border border-neutral-200 rounded-2xl p-4 hidden sm:block">
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wide mb-2 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                  현재 선택 후보군 둘러보기 ({filteredItems.length})
                </p>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                  {filteredItems.map(m => (
                    <span 
                      key={m.id} 
                      onClick={() => applyExactMatchFilters(m)}
                      title="클릭 시 이 요리로 즉시 필터 맞춤"
                      className="text-xs bg-neutral-100 hover:bg-amber-100 hover:text-amber-900 px-2 py-1 rounded-md text-neutral-600 flex items-center gap-1 cursor-pointer transition border border-transparent hover:border-amber-200 duration-150"
                    >
                      <span>{m.emoji}</span>
                      <span>{m.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Interaction Roulette Board (5 Cols on desktop) */}
          <div className="md:col-span-5 flex flex-col gap-5">
            
            {/* Main Action Box */}
            <div className="bg-white border-2 border-amber-400/80 rounded-2xl p-5 shadow-sm overflow-hidden relative flex flex-col items-center justify-center min-h-[360px]">
              
              {/* Card Decoration Corner ribbon or tag */}
              <div className="absolute top-0 right-0 bg-amber-400 text-amber-950 font-bold text-[10px] px-3.5 py-1 rounded-bl-xl uppercase tracking-wider shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3 animate-spin" />
                Randomize
              </div>

              {/* Conditionally render states */}
              <AnimatePresence mode="wait">
                
                {/* 1. SPINNING STATE */}
                {isSpinning && spinnerItem && (
                  <motion.div
                    key="spinning"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.05, opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-6"
                  >
                    <div className="relative w-28 h-28 bg-gradient-to-tr from-orange-100 to-amber-100 border-4 border-amber-300 rounded-full flex items-center justify-center shadow-md animate-pulse">
                      <span className="text-6.5xl animate-bounce leading-none select-none">
                        {spinnerItem.emoji}
                      </span>
                      <div className="absolute inset-0 border-[3px] border-dashed border-amber-400 rounded-full animate-spin"></div>
                    </div>
                    
                    <motion.p 
                      key={spinnerItem.name}
                      initial={{ y: 5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-2xl font-black text-neutral-900 mt-5 tracking-tight min-h-8"
                    >
                      {spinnerItem.name}
                    </motion.p>
                    
                    <div className="mt-2.5 flex gap-1.5 justify-center">
                      <span className="text-[10px] font-bold bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md">
                        {spinnerItem.cuisine}
                      </span>
                      <span className="text-[10px] font-bold bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md">
                        {spinnerItem.temperature}
                      </span>
                    </div>
                    
                    <p className="text-xs text-amber-700 font-medium mt-4 animate-pulse">
                      조건에 맞춰 엄선 중입니다... 💨
                    </p>
                  </motion.div>
                )}

                {/* 2. SUCCESS RECOMMENDATION SHOWN */}
                {!isSpinning && result && (
                  <motion.div
                    key="result"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full flex flex-col items-center"
                  >
                    {/* Animated emoji container */}
                    <div className="relative mb-3 flex justify-center">
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.12, 1],
                          rotate: [0, -3, 3, -3, 0]
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 4, 
                          repeatType: "mirror"
                        }}
                        className="w-24 h-24 bg-amber-100 border-2 border-amber-200 rounded-2xl flex items-center justify-center text-5xl shadow-sm relative z-10"
                      >
                        {result.emoji}
                      </motion.div>
                      {/* Radiating visual ring */}
                      <div className="absolute -inset-2 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-3xl opacity-20 blur-sm -z-10 animate-pulse"></div>
                    </div>

                    <p className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-100 rounded-full px-2.5 py-0.5 mb-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500 animate-pulse" />
                      오늘 당신만을 위한 완벽 추천 메뉴
                    </p>

                    <h4 id="result-title" className="text-2xl font-extrabold text-neutral-950 tracking-tight text-center">
                      {result.name}
                    </h4>

                    {/* Specifications chips */}
                    <div className="flex flex-wrap justify-center gap-1.5 mt-2 mb-3">
                      <span className="text-[11px] font-bold text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded-md">
                        {result.cuisine}
                      </span>
                      <span className="text-[11px] font-bold text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded-md">
                        {result.temperature}
                      </span>
                      <span className="text-[11px] font-bold text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded-md">
                        {result.spiciness}
                      </span>
                    </div>

                    {/* Description Paragraph */}
                    <p className="text-xs sm:text-sm text-neutral-600 text-center leading-relaxed max-w-xs mt-1 px-2 mb-3 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                      {result.description}
                    </p>

                    {/* Ingredients detail */}
                    <div className="w-full mb-4 px-2">
                      <p className="text-[10px] font-bold text-neutral-400 text-left uppercase tracking-wider mb-1 flex items-center gap-1">
                        <ChefHat className="w-3 h-3 text-amber-600" />
                        식재료 구성 목록
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {result.ingredients.map((ing, idx) => (
                          <span key={idx} className="text-[10px] bg-white border border-neutral-200/80 hover:bg-neutral-50 text-neutral-600 px-2 py-0.5 rounded-md font-medium">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* External Actions helper */}
                    <div className="grid grid-cols-2 gap-2 w-full mt-1">
                      <a 
                        id="naver-link"
                        href={`https://search.naver.com/search.naver?query=${encodeURIComponent(result.name + ' 맛집')}`}
                        target="_blank" 
                        rel="referrer noopener referrerPolicy"
                        className="py-1.5 px-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs text-center font-bold flex items-center justify-center gap-1.5 transition-all text-ellipsis overflow-hidden whitespace-nowrap"
                      >
                        <Store className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        주변 맛집 검색
                        <ExternalLink className="w-3 h-3 opacity-60 shrink-0" />
                      </a>
                      <a 
                        id="youtube-link"
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(result.name + ' 레시피')}`}
                        target="_blank" 
                        rel="referrer noopener referrerPolicy"
                        className="py-1.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs text-center font-bold flex items-center justify-center gap-1.5 transition-all text-ellipsis overflow-hidden whitespace-nowrap shadow-xs hover:shadow-sm"
                      >
                        <ChefHat className="w-3.5 h-3.5 shrink-0" />
                        레시피 유튜브
                        <ExternalLink className="w-3 h-3 opacity-80 shrink-0" />
                      </a>
                    </div>

                    {/* Spin again action footer */}
                    <button
                      id="spin-again-btn"
                      onClick={handleRecommend}
                      disabled={filteredItems.length === 0}
                      className="mt-4 text-xs font-bold text-neutral-800 hover:text-amber-600 transition flex items-center gap-1 py-1 px-3 border border-neutral-200 hover:border-amber-400 hover:bg-amber-50/50 rounded-full"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      다른 매칭 메뉴 순발 추천!
                    </button>
                  </motion.div>
                )}

                {/* 3. WELCOME/PROMPT SELECTION STATE */}
                {!isSpinning && !result && (
                  <motion.div
                    key="empty"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-6 flex flex-col items-center justify-center"
                  >
                    {/* Animated cutlery display */}
                    <div className="w-20 h-20 bg-amber-50 border border-amber-100 rounded-full flex items-center justify-center text-4xl shadow-2xs mb-4">
                      📋
                    </div>

                    {filteredItems.length > 0 ? (
                      <>
                        <p className="text-base font-bold text-neutral-900 tracking-tight">
                          오늘의 완벽 맞춤 식사 메뉴 추천
                        </p>
                        <p className="text-xs text-neutral-500 max-w-xs mt-1.5 leading-relaxed px-4">
                          좌측 조건에 맞춰 랜덤 목록이 선정됩니다. 준비된 후보는 총 <strong className="text-orange-600 font-bold">{filteredItems.length}가지</strong> 입니다.
                        </p>
                        
                        {/* Huge recommendation trigger */}
                        <button
                          id="trigger-recommendation"
                          onClick={handleRecommend}
                          className="mt-6 px-10 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-extrabold text-base shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.03] active:scale-[0.98] outline-hidden cursor-pointer flex items-center gap-2 group relative overflow-hidden"
                        >
                          <span className="relative z-10 flex items-center gap-1.5">
                            <Sparkles className="w-5 h-5 animate-pulse" />
                            메뉴 마법사 가동!
                          </span>
                          {/* Shimmer effect reflection */}
                          <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </button>
                      </>
                    ) : (
                      <>
                        {cuisines.length === 0 && temperatures.length === 0 && spicinesses.length === 0 ? (
                          <>
                            <p className="text-base font-bold text-amber-900 flex items-center gap-1">
                              ✨ 맛있는 즐거움이 기다리고 있어요!
                            </p>
                            <p className="text-xs text-neutral-500 max-w-xs mt-2 leading-relaxed px-4">
                              좌측 필터에서 원하시는 음식 종류(한/중/양/일)와 온도, 맵기를 선택해 주세요. 취향에 딱 맞는 맞춤형 한끼를 즉시 선정해 드립니다.
                            </p>
                            <button
                              id="select-all-filters-welcome-btn"
                              onClick={handleSelectAllFilters}
                              className="mt-5 px-6 py-2.5 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                            >
                              <Sparkles className="w-3.5 h-3.5 animate-bounce" />
                              모든 옵션 켜고 즉시 추천 받기
                            </button>
                          </>
                        ) : (
                          <>
                            <p className="text-sm font-bold text-red-600">
                              헉! 매칭되는 한끼 옵션이 없습니다
                            </p>
                            <p className="text-xs text-neutral-500 max-w-xs mt-1.5 leading-relaxed px-4">
                              한식·중식·양식·일식 카테고리, 요리 온도, 맵기 필터 중 최소 하나씩은 체크를 켜두셔야 추천 가동이 가능합니다.
                            </p>
                            
                            <button
                              id="restore-filters-error-btn"
                              onClick={handleSelectAllFilters}
                              className="mt-5 px-6 py-2.5 rounded-full bg-neutral-800 hover:bg-neutral-950 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              필터 전체 선택으로 복구
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick tips display */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-4 cursor-default">
              <h5 className="font-bold text-xs text-neutral-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-neutral-400" />
                사용자 퀵팁 가이드
              </h5>
              <ul className="text-xs text-neutral-600 space-y-1.5 leading-relaxed">
                <li className="flex items-start gap-1">
                  <span className="text-amber-500 shrink-0">•</span>
                  <span>매 식사가 끝난 후, 하단의 기록에서 이전에 받았던 메뉴들을 한눈에 확인할 수 있습니다.</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-amber-500 shrink-0">•</span>
                  <span>효과음 버튼을 눌러 스핀 사운드 알람을 간편히 제어할 수 있습니다.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* History Area - Bottom Row */}
        <div id="history-box" className="mt-8 bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-1 px-1.5 bg-neutral-100 rounded-lg text-neutral-700">
                <History className="w-4 h-4" />
              </span>
              <div>
                <h4 className="font-bold text-neutral-900 text-sm sm:text-base">최근 추천받은 메뉴 역사</h4>
                <p className="text-[11px] text-neutral-500">이번 브라우저 세션에서 획득한 매칭 기록입니다</p>
              </div>
            </div>

            {history.length > 0 && (
              <button 
                id="clear-history-btn"
                onClick={handleClearHistory}
                className="text-xs text-red-500 hover:text-red-700 font-medium px-2.5 py-1 hover:bg-red-50/80 rounded-lg transition-all"
              >
                전체 삭제
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="text-center py-8 text-neutral-400">
              <span className="text-3xl select-none">🍲</span>
              <p className="text-xs mt-2 font-medium">아직 추천 결과가 없습니다.</p>
              <p className="text-[10px] text-neutral-400 mt-1">위의 마법 추천 버튼을 가동하여 역사를 새기세요.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-76 overflow-auto pr-1">
              {history.map((record) => (
                <div 
                  key={record.id} 
                  className="bg-neutral-50 hover:bg-neutral-100/70 border border-neutral-200/80 rounded-xl p-3 flex justify-between items-center transition group duration-200"
                >
                  <div 
                    className="flex items-center gap-3 cursor-pointer min-w-0" 
                    title="클릭하여 이 추천 설정을 빠르게 가동"
                    onClick={() => applyExactMatchFilters(record.menu)}
                  >
                    <span className="text-2xl select-none shrink-0 p-1 rounded-lg bg-white shadow-2xs group-hover:scale-110 duration-150 transition-all">
                      {record.menu.emoji}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-neutral-900 group-hover:text-amber-600 transition truncate">{record.menu.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[9px] bg-neutral-200 px-1 py-0.2 rounded-sm text-neutral-600 text-center uppercase tracking-wide">
                          {record.menu.cuisine}
                        </span>
                        <span className="text-[9px] bg-amber-100 px-1 py-0.2 rounded-sm text-amber-800 text-center">
                          {record.menu.temperature}
                        </span>
                        <span className="text-[9px] bg-neutral-200/60 px-1 py-0.2 rounded-sm text-neutral-600 text-center">
                          {record.menu.spiciness === '매운 음식' ? '🌶️' : '🥦'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-right shrink-0 ml-1.5">
                    <span className="text-[10px] text-neutral-400 font-medium select-none">{record.timestamp}</span>
                    <button 
                      title="이 기록 삭제"
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerSound('click');
                        saveHistory(history.filter(h => h.id !== record.id));
                      }}
                      className="p-1 text-neutral-450 hover:text-red-600 hover:bg-red-50 rounded-md transition"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Exquisite Footer Area */}
      <footer className="mt-12 text-center text-xs text-neutral-400/80 max-w-lg mx-auto px-4 leading-relaxed">
        <p>오늘의 위 건강과 고독한 미식을 위해 최적의 동반자 수치를 제공합니다.</p>
        <p className="mt-1">© 2026 메뉴 추천기 프로그램. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
