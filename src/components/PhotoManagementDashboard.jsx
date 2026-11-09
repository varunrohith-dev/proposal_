import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Trash2, 
  MoveUp, 
  MoveDown, 
  Sparkles, 
  Eye, 
  RefreshCw, 
  CheckCircle2, 
  ArrowRight, 
  Heart,
  Smile,
  Gem,
  Plus,
  Sliders,
  RotateCcw,
  Maximize2,
  X,
  Download,
  FileUp,
  Music
} from 'lucide-react';
import { CATEGORIES, DEFAULT_PHOTOS } from '../data/defaultPhotos';
import { romanticAudio } from '../utils/audioSynthesizer';

export default function PhotoManagementDashboard({
  photos,
  setPhotos,
  onPreviewWebsite
}) {
  const [selectedPhotoForPreview, setSelectedPhotoForPreview] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const fileInputRef = useRef(null);
  const replaceInputRefs = useRef({});
  const importFileRef = useRef(null);
  const audioInputRef = useRef(null);
  const [customAudioName, setCustomAudioName] = useState(null);

  // Batch upload or single upload handler
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newPhotos = files.map((file, i) => {
      const url = URL.createObjectURL(file);
      return {
        id: `upload-${Date.now()}-${i}`,
        url,
        name: file.name.replace(/\.[^/.]+$/, ""),
        category: "Solo Photo", // Manual category default ready for user selection
        title: `Memory Chapter ${photos.length + i + 1}`,
        heading: "A Beautiful Moment in Time",
        caption: "Every single glance with you feels like a dream I never want to wake up from.",
        description: "Placeholder description ready for you to personalize with your own romantic memory.",
        tag: "Sweet Moment"
      };
    });

    setPhotos(prev => [...prev, ...newPhotos]);
    romanticAudio.playHeartChime();
    e.target.value = '';
  };

  // Replace single photo
  const handleReplacePhoto = (id, file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotos(prev =>
      prev.map(p => (p.id === id ? { ...p, url, name: file.name } : p))
    );
    romanticAudio.playHeartChime();
  };

  // Delete photo
  const handleDeletePhoto = (id) => {
    if (photos.length <= 1) {
      alert("At least 1 frame is required. You can replace the photo instead of deleting it.");
      return;
    }
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  // Update photo field
  const handleFieldChange = (id, field, value) => {
    setPhotos(prev =>
      prev.map(p => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  // Reordering: Move Up
  const moveUp = (index) => {
    if (index === 0) return;
    setPhotos(prev => {
      const list = [...prev];
      const temp = list[index - 1];
      list[index - 1] = list[index];
      list[index] = temp;
      return list;
    });
  };

  // Reordering: Move Down
  const moveDown = (index) => {
    if (index === photos.length - 1) return;
    setPhotos(prev => {
      const list = [...prev];
      const temp = list[index + 1];
      list[index + 1] = list[index];
      list[index] = temp;
      return list;
    });
  };

  // Drag and Drop handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    setPhotos(prev => {
      const list = [...prev];
      const draggedItem = list[draggedIndex];
      list.splice(draggedIndex, 1);
      list.splice(index, 0, draggedItem);
      return list;
    });
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // Reset to default 12 photos
  const handleResetDefaults = () => {
    if (window.confirm("Reset all 12 photos and captions to initial defaults?")) {
      setPhotos(DEFAULT_PHOTOS);
      romanticAudio.playHeartChime();
    }
  };

  // Export JSON backup
  const handleExportConfig = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(photos, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "joma_love_story_backup.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    romanticAudio.playHeartChime();
  };

  // Import JSON backup
  const handleImportConfig = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported)) {
          setPhotos(imported);
          romanticAudio.playHeartChime();
          alert("Successfully imported memory config!");
        }
      } catch (err) {
        alert("Invalid JSON file format.");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Custom audio upload handler
  const handleAudioUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const audioUrl = URL.createObjectURL(file);
    const audioElem = document.getElementById('custom-bg-audio');
    if (audioElem) {
      audioElem.src = audioUrl;
      audioElem.play().catch(() => {});
      setCustomAudioName(file.name);
      romanticAudio.stopMelody(); // stop synthesizer in favor of user audio
    }
  };

  // Filtered photos
  const displayPhotos = filterCategory === 'All' 
    ? photos 
    : photos.filter(p => p.category === filterCategory);

  // Category counts
  const categoryCounts = {
    "Solo Photo": photos.filter(p => p.category === "Solo Photo").length,
    "Couple Photo": photos.filter(p => p.category === "Couple Photo").length,
    "Funny Photo": photos.filter(p => p.category === "Funny Photo").length,
    "Special Memory": photos.filter(p => p.category === "Special Memory").length,
  };

  const getCategoryIcon = (catId) => {
    switch (catId) {
      case "Solo Photo": return <Sparkles className="w-3.5 h-3.5" />;
      case "Couple Photo": return <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400/30" />;
      case "Funny Photo": return <Smile className="w-3.5 h-3.5 text-amber-400" />;
      case "Special Memory": return <Gem className="w-3.5 h-3.5 text-violet-300" />;
      default: return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 relative z-10 animate-fade-in">
      
      {/* Hidden audio element for custom user song */}
      <audio id="custom-bg-audio" loop className="hidden" />

      {/* Dashboard Top Banner */}
      <div className="glass-panel-glow rounded-3xl p-6 md:p-8 mb-8 border border-purple-500/30">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-900/50 border border-purple-400/40 text-purple-200 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sliders className="w-3.5 h-3.5 text-purple-300" />
              <span>Intelligent Photo Management Studio</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-serifDisplay font-bold text-white tracking-wide">
              Customize Your 12 Romantic Chapters
            </h1>
            <p className="text-purple-300/80 text-xs md:text-sm mt-1 max-w-2xl leading-relaxed">
              Upload all 12 photos together or individually. Manually categorize each picture into <span className="text-pink-300 font-semibold">Solo</span>, <span className="text-purple-300 font-semibold">Couple</span>, <span className="text-amber-300 font-semibold">Funny</span>, or <span className="text-violet-300 font-semibold">Special Memory</span>. Edit titles, captions, and descriptions. Drag & drop to arrange the exact sequence before previewing!
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-purple-900/60 border border-purple-400/40 text-purple-100 text-xs md:text-sm font-medium hover:bg-purple-800/80 hover:border-purple-300 transition-all shadow-md"
            >
              <Upload className="w-4 h-4 text-purple-300" />
              <span>Upload Photos</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              multiple
              accept="image/*"
              className="hidden"
            />

            <button
              onClick={() => {
                romanticAudio.playHeartChime();
                onPreviewWebsite();
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-7 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 text-white text-xs md:text-sm font-semibold shadow-purple-glow-lg hover:shadow-purple-glow-intense hover:scale-[1.02] transition-all"
            >
              <span>Preview Website</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status Indicators & Category breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-purple-500/20">
          {CATEGORIES.map(cat => {
            const count = categoryCounts[cat.id] || 0;
            return (
              <div 
                key={cat.id}
                onClick={() => setFilterCategory(filterCategory === cat.id ? 'All' : cat.id)}
                className={`cursor-pointer p-3 rounded-2xl border transition-all ${
                  filterCategory === cat.id 
                    ? 'bg-purple-800/40 border-purple-300 shadow-purple-glow' 
                    : 'bg-purple-950/40 border-purple-500/20 hover:border-purple-400/40'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-purple-200 flex items-center gap-1.5">
                    {getCategoryIcon(cat.id)}
                    {cat.label}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-purple-900/70 text-purple-200 border border-purple-400/30">
                    {count}
                  </span>
                </div>
                <p className="text-[10px] text-purple-300/60 truncate">
                  {cat.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Control bar: Drag instructions + Import / Export / Custom Audio */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-xs text-purple-300/80">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Showing <strong>{displayPhotos.length}</strong> of <strong>{photos.length}</strong> Frames</span>
          {photos.length === 12 && (
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-300 bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-500/30">
              <CheckCircle2 className="w-3 h-3" /> Exact 12 Ready!
            </span>
          )}
          {filterCategory !== 'All' && (
            <button
              onClick={() => setFilterCategory('All')}
              className="text-purple-400 underline hover:text-white ml-2"
            >
              Clear filter ({filterCategory})
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Custom audio upload */}
          <button
            onClick={() => audioInputRef.current && audioInputRef.current.click()}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-purple-500/30 text-purple-300 text-xs hover:bg-purple-900/30 hover:text-white transition-all"
            title="Upload your own song file for Joma"
          >
            <Music className="w-3 h-3 text-pink-400" />
            <span>{customAudioName ? `Song: ${customAudioName.slice(0, 10)}...` : "Custom Song (MP3)"}</span>
          </button>
          <input
            type="file"
            ref={audioInputRef}
            onChange={handleAudioUpload}
            accept="audio/*"
            className="hidden"
          />

          {/* Export JSON backup */}
          <button
            onClick={handleExportConfig}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-purple-500/30 text-purple-300 text-xs hover:bg-purple-900/30 hover:text-white transition-all"
            title="Export your edited captions and photos to a file"
          >
            <Download className="w-3 h-3" />
            <span>Export Backup</span>
          </button>

          {/* Import JSON backup */}
          <button
            onClick={() => importFileRef.current && importFileRef.current.click()}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-purple-500/30 text-purple-300 text-xs hover:bg-purple-900/30 hover:text-white transition-all"
            title="Load a saved backup file"
          >
            <FileUp className="w-3 h-3" />
            <span>Import</span>
          </button>
          <input
            type="file"
            ref={importFileRef}
            onChange={handleImportConfig}
            accept=".json"
            className="hidden"
          />

          {/* Reset */}
          <button
            onClick={handleResetDefaults}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-purple-500/30 text-purple-300 text-xs hover:bg-purple-900/30 hover:text-white transition-all"
            title="Reset to 12 original images and captions"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* Photos Grid / Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {displayPhotos.map((photo, index) => {
          const currentCategoryObj = CATEGORIES.find(c => c.id === photo.category) || CATEGORIES[0];
          
          return (
            <div
              key={photo.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`glass-panel rounded-3xl p-5 border transition-all duration-200 relative group ${
                draggedIndex === index 
                  ? 'opacity-40 scale-95 border-purple-400' 
                  : 'hover:border-purple-400/50 hover:shadow-purple-glow'
              }`}
            >
              {/* Card Top Header: Frame badge & Order buttons */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-purple-500/15">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-purple-900/80 border border-purple-400/40 text-xs font-bold text-purple-200 font-mono shadow-sm">
                    #{index + 1}
                  </span>
                  <span className="text-xs text-purple-300 font-mono tracking-wider">
                    FRAME {String(index + 1).padStart(2, '0')} / {photos.length}
                  </span>
                </div>

                {/* Move Up / Down & Delete */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg text-purple-300 hover:text-white hover:bg-purple-900/50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    title="Move Frame Earlier"
                  >
                    <MoveUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => moveDown(index)}
                    disabled={index === photos.length - 1}
                    className="p-1.5 rounded-lg text-purple-300 hover:text-white hover:bg-purple-900/50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    title="Move Frame Later"
                  >
                    <MoveDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="p-1.5 rounded-lg text-rose-400/70 hover:text-rose-300 hover:bg-rose-950/40 transition-colors ml-1"
                    title="Delete Frame"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Photo & Metadata layout */}
              <div className="flex flex-col sm:flex-row gap-4">
                
                {/* Photo Thumbnail + Replace/Preview overlay */}
                <div className="relative w-full sm:w-44 h-52 flex-shrink-0 rounded-2xl overflow-hidden bg-black/60 border border-purple-500/30 group/thumb">
                  {/* Preserving original photo aspect ratio & face appearance */}
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-contain p-1 rounded-2xl transition-transform duration-300 group-hover/thumb:scale-105"
                  />

                  {/* Hover Quick Action Buttons */}
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-xs opacity-0 group-hover/thumb:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                    <button
                      onClick={() => setSelectedPhotoForPreview(photo)}
                      className="w-full flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-purple-700/80 hover:bg-purple-600 text-white text-xs font-medium shadow-md transition-all"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Full Preview</span>
                    </button>

                    <button
                      onClick={() => replaceInputRefs.current[photo.id] && replaceInputRefs.current[photo.id].click()}
                      className="w-full flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-purple-900/90 border border-purple-400/40 hover:bg-purple-800 text-purple-200 text-xs font-medium transition-all"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Replace Photo</span>
                    </button>
                    <input
                      type="file"
                      ref={el => replaceInputRefs.current[photo.id] = el}
                      onChange={(e) => handleReplacePhoto(photo.id, e.target.files?.[0])}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>

                  {/* Category Pill on Thumbnail */}
                  <div className="absolute top-2 left-2 pointer-events-none">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-purple-950/90 border border-purple-400/40 text-purple-200 backdrop-blur-sm flex items-center gap-1">
                      {getCategoryIcon(photo.category)}
                      {photo.category}
                    </span>
                  </div>
                </div>

                {/* Editable Fields */}
                <div className="flex-1 space-y-3">
                  
                  {/* Category Manual Selector */}
                  <div>
                    <label className="block text-[11px] font-semibold text-purple-300 mb-1.5 uppercase tracking-wider">
                      Manual Category Selection:
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleFieldChange(photo.id, 'category', cat.id)}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all border text-left ${
                            photo.category === cat.id
                              ? 'bg-purple-600/40 border-purple-300 text-white shadow-purple-glow font-semibold'
                              : 'bg-purple-950/50 border-purple-500/20 text-purple-300/80 hover:bg-purple-900/30'
                          }`}
                        >
                          {getCategoryIcon(cat.id)}
                          <span className="truncate">{cat.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Photo Title */}
                  <div>
                    <label className="block text-[11px] font-semibold text-purple-300 mb-1 uppercase tracking-wider">
                      Photo Title
                    </label>
                    <input
                      type="text"
                      value={photo.title || ''}
                      onChange={(e) => handleFieldChange(photo.id, 'title', e.target.value)}
                      placeholder="e.g. Pure Grace & Soft Sunshine"
                      className="w-full px-3 py-1.5 rounded-xl glass-input text-xs font-semibold text-purple-100"
                    />
                  </div>

                  {/* Memory Heading */}
                  <div>
                    <label className="block text-[11px] font-semibold text-purple-300 mb-1 uppercase tracking-wider">
                      Memory Heading
                    </label>
                    <input
                      type="text"
                      value={photo.heading || ''}
                      onChange={(e) => handleFieldChange(photo.id, 'heading', e.target.value)}
                      placeholder="e.g. The Radiance in Your Eyes"
                      className="w-full px-3 py-1.5 rounded-xl glass-input text-xs text-purple-200"
                    />
                  </div>

                  {/* Romantic Caption */}
                  <div>
                    <label className="block text-[11px] font-semibold text-purple-300 mb-1 uppercase tracking-wider">
                      Romantic Caption
                    </label>
                    <input
                      type="text"
                      value={photo.caption || ''}
                      onChange={(e) => handleFieldChange(photo.id, 'caption', e.target.value)}
                      placeholder="Short romantic caption..."
                      className="w-full px-3 py-1.5 rounded-xl glass-input text-xs text-purple-100 italic"
                    />
                  </div>

                  {/* Memory Description */}
                  <div>
                    <label className="block text-[11px] font-semibold text-purple-300 mb-1 uppercase tracking-wider">
                      Memory Description
                    </label>
                    <textarea
                      rows={2}
                      value={photo.description || ''}
                      onChange={(e) => handleFieldChange(photo.id, 'description', e.target.value)}
                      placeholder="Detailed personal story or memory..."
                      className="w-full px-3 py-1.5 rounded-xl glass-input text-xs text-purple-200/90"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="sticky bottom-4 mt-10 z-40">
        <div className="glass-panel-glow rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-purple-400/40 shadow-purple-glow-lg">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-700/40 border border-purple-400/40 text-purple-200">
              <Sparkles className="w-5 h-5 text-purple-300 animate-spin" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">
                Ready to Experience Your Romantic Story?
              </p>
              <p className="text-[11px] text-purple-300/70">
                All {photos.length} frames categorized and configured. Original appearance preserved.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              romanticAudio.playHeartChime();
              onPreviewWebsite();
            }}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 text-white font-semibold text-sm shadow-purple-glow-lg hover:shadow-purple-glow-intense hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <span>Preview Website</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* High-Res Full Photo Preview Modal */}
      {selectedPhotoForPreview && (
        <div 
          onClick={() => setSelectedPhotoForPreview(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="glass-panel-glow rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-purple-400/50"
          >
            <div className="flex items-center justify-between p-4 border-b border-purple-500/20">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-purple-900/60 border border-purple-400/40 text-purple-200">
                  {selectedPhotoForPreview.category}
                </span>
                <h3 className="font-serifDisplay text-lg font-bold text-white">
                  {selectedPhotoForPreview.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPhotoForPreview(null)}
                className="p-1.5 rounded-full hover:bg-purple-900/50 text-purple-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preserved Full Photo Image Display */}
            <div className="flex-1 bg-black/70 flex items-center justify-center p-4 overflow-hidden">
              <img
                src={selectedPhotoForPreview.url}
                alt={selectedPhotoForPreview.title}
                className="max-h-[60vh] max-w-full object-contain rounded-2xl shadow-2xl"
              />
            </div>

            <div className="p-4 bg-purple-950/60 border-t border-purple-500/20">
              <h4 className="text-sm font-semibold text-purple-200">
                {selectedPhotoForPreview.heading}
              </h4>
              <p className="text-xs text-purple-300 italic mt-0.5">
                "{selectedPhotoForPreview.caption}"
              </p>
              <p className="text-xs text-purple-300/80 mt-1">
                {selectedPhotoForPreview.description}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
