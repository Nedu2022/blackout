'use client';

import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  MapPin, 
  Clock, 
  User, 
  Phone, 
  AlertTriangle, 
  CheckCircle, 
  Wrench, 
  Brain,
  Calendar,
  TrendingUp,
  Battery,
  Power,
  Menu,
  X,
  ArrowRight,
  Activity,
  Users,
  Shield
} from 'lucide-react';

const PowerOutageApp = () => {
  const [activeTab, setActiveTab] = useState('report');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      name: 'John Doe',
      phone: '+234-801-234-5678',
      area: 'Victoria Island',
      address: '15 Ahmadu Bello Way',
      description: 'Complete power outage since 2 PM',
      status: 'pending',
      priority: 'high',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 2,
      name: 'Sarah Ahmed',
      phone: '+234-802-345-6789',
      area: 'Ikeja',
      address: '42 Allen Avenue',
      description: 'Frequent power fluctuations damaging appliances',
      status: 'assigned',
      priority: 'medium',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
    },
    {
      id: 3,
      name: 'David Chen',
      phone: '+234-803-456-7890',
      area: 'Lekki',
      address: '28 Admiralty Way',
      description: 'Transformer blown, entire street affected',
      status: 'completed',
      priority: 'high',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: '',
    address: '',
    description: ''
  });

  const [technicians] = useState([
    { id: 1, name: 'Michael Tech', area: 'Victoria Island', status: 'available' },
    { id: 2, name: 'Ada Power', area: 'Ikeja', status: 'busy' },
    { id: 3, name: 'Emeka Grid', area: 'Surulere', status: 'available' },
    { id: 4, name: 'Kemi Volt', area: 'Lekki', status: 'available' }
  ]);

  const [predictions] = useState([
    {
      area: 'Victoria Island',
      nextOutage: '2025-08-16 14:00',
      probability: 75,
      duration: '2-4 hours',
      reason: 'Scheduled maintenance'
    },
    {
      area: 'Ikeja',
      nextOutage: '2025-08-15 18:30',
      probability: 45,
      duration: '1-2 hours',
      reason: 'High demand peak'
    },
    {
      area: 'Surulere',
      nextOutage: '2025-08-17 09:00',
      probability: 60,
      duration: '3-5 hours',
      reason: 'Equipment upgrade'
    }
  ]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.area || !formData.address || !formData.description) {
      alert('Please fill in all fields');
      return;
    }
    
    const newComplaint = {
      id: complaints.length + 1,
      ...formData,
      status: 'pending',
      priority: 'medium',
      timestamp: new Date()
    };
    setComplaints([newComplaint, ...complaints]);
    setFormData({
      name: '',
      phone: '',
      area: '',
      address: '',
      description: ''
    });
    alert('Complaint submitted successfully! We will dispatch a technician soon.');
  };

  const assignTechnician = (complaintId) => {
    setComplaints(complaints.map(complaint => 
      complaint.id === complaintId 
        ? { ...complaint, status: 'assigned' }
        : complaint
    ));
  };

  const markComplete = (complaintId) => {
    setComplaints(complaints.map(complaint => 
      complaint.id === complaintId 
        ? { ...complaint, status: 'completed' }
        : complaint
    ));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'assigned': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'border-l-rose-400';
      case 'medium': return 'border-l-amber-400';
      case 'low': return 'border-l-emerald-400';
      default: return 'border-l-gray-400';
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const tabs = [
    { id: 'report', label: 'Report Outage', icon: AlertTriangle },
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'predictions', label: 'AI Insights', icon: Brain }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 sm:h-24">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                  <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-emerald-400 rounded-full animate-pulse flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h1 className="text-xl sm:text-3xl font-bold text-white">PowerGrid Lagos</h1>
                <p className="text-sm sm:text-base text-blue-200 hidden sm:block">Real-time Power Management System</p>
              </div>
            </div>
            
            {/* Live Stats */}
            <div className="hidden lg:flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur">
                  <Activity className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-blue-200">Grid Status</p>
                  <p className="text-sm font-bold text-white">98.2% Online</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-blue-200">Active Issues</p>
                  <p className="text-sm font-bold text-white">{complaints.filter(c => c.status === 'pending').length} Reports</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-blue-200">Technicians</p>
                  <p className="text-sm font-bold text-white">{technicians.filter(t => t.status === 'available').length}/4 Available</p>
                </div>
              </div>
            </div>

            {/* Desktop Quick Actions */}
            <div className="hidden md:flex lg:hidden items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-lg backdrop-blur">
                <Power className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-medium text-white">Online</span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors backdrop-blur"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Bottom gradient line */}
        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm">
          <div className="absolute top-24 left-0 right-0 bg-gradient-to-br from-slate-800 to-blue-900 border-b border-blue-500/30 shadow-2xl">
            <div className="px-4 py-6 space-y-2">
              {/* Mobile Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                  <Activity className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
                  <p className="text-xs text-blue-200">Grid</p>
                  <p className="text-sm font-bold text-white">98%</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                  <AlertTriangle className="h-5 w-5 text-amber-400 mx-auto mb-1" />
                  <p className="text-xs text-blue-200">Issues</p>
                  <p className="text-sm font-bold text-white">{complaints.filter(c => c.status === 'pending').length}</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                  <Users className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                  <p className="text-xs text-blue-200">Staff</p>
                  <p className="text-sm font-bold text-white">{technicians.filter(t => t.status === 'available').length}/4</p>
                </div>
              </div>

              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    setActiveTab(id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-4 rounded-xl text-left transition-all duration-200 ${
                    activeTab === id
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-400/30'
                      : 'text-blue-100 hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{label}</span>
                  {activeTab === id && <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full"></div>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <nav className="hidden sm:block bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-medium text-sm transition-all duration-200 ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Report Outage Tab */}
        {activeTab === 'report' && (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <div className="relative inline-flex">
                <div className="p-4 bg-gradient-to-br from-rose-500 to-orange-600 rounded-2xl shadow-lg">
                  <AlertTriangle className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full animate-bounce"></div>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Report Power Outage</h2>
                <p className="text-gray-600 text-sm sm:text-base">Quick reporting for faster restoration</p>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
                      placeholder="+234-xxx-xxx-xxxx"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    Area/District
                  </label>
                  <select
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
                  >
                    <option value="">Select your area</option>
                    <option value="Victoria Island">Victoria Island</option>
                    <option value="Ikeja">Ikeja</option>
                    <option value="Surulere">Surulere</option>
                    <option value="Lekki">Lekki</option>
                    <option value="Yaba">Yaba</option>
                    <option value="Gbagada">Gbagada</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    Full Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
                    placeholder="Street address, house number, etc."
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <AlertTriangle className="h-4 w-4 mr-2 text-gray-500" />
                    Issue Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none bg-gray-50/50 hover:bg-white"
                    placeholder="Describe the power issue you're experiencing..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="group w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>Submit Report</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Admin Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Operations Dashboard</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                <span>{complaints.filter(c => c.status === 'pending').length} active issues</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Total Reports</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">{complaints.length}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <AlertTriangle className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Available Staff</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {technicians.filter(t => t.status === 'available').length}
                    </p>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl">
                    <Users className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Resolved Today</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {complaints.filter(c => c.status === 'completed').length}
                    </p>
                  </div>
                  <div className="p-3 bg-teal-50 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-teal-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">System Health</p>
                    <p className="text-2xl sm:text-3xl font-bold text-emerald-600">98%</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-xl">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Complaints List */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="px-4 sm:px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {complaints.map((complaint) => (
                  <div key={complaint.id} className={`p-4 sm:p-6 border-l-4 ${getPriorityColor(complaint.priority)} hover:bg-gray-50/50 transition-colors duration-200`}>
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-4 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-3">
                          <h4 className="text-lg font-semibold text-gray-900">{complaint.name}</h4>
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border w-fit ${getStatusColor(complaint.status)}`}>
                            {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                          </span>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 flex-shrink-0" />
                            <span>{complaint.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span>{complaint.area} - {complaint.address}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span>Reported at {formatTime(complaint.timestamp)}</span>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm">{complaint.description}</p>
                      </div>
                      <div className="flex flex-row sm:flex-col lg:flex-col space-x-2 sm:space-x-0 sm:space-y-2 lg:space-y-2 lg:ml-4">
                        {complaint.status === 'pending' && (
                          <button
                            onClick={() => assignTechnician(complaint.id)}
                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 flex-1 sm:flex-none whitespace-nowrap"
                          >
                            Assign Tech
                          </button>
                        )}
                        {complaint.status === 'assigned' && (
                          <button
                            onClick={() => markComplete(complaint.id)}
                            className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex-1 sm:flex-none whitespace-nowrap"
                          >
                            Mark Complete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AI Predictions Tab */}
        {activeTab === 'predictions' && (
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center space-y-4">
              <div className="relative inline-flex">
                <div className="p-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-lg">
                  <Brain className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Activity className="h-3 w-3 text-white animate-pulse" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">AI Power Insights</h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                  Advanced analytics for predictive maintenance and proactive outage prevention
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {predictions.map((prediction, index) => (
                <div key={index} className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{prediction.area}</h3>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-purple-600 group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-sm font-bold text-purple-600">{prediction.probability}%</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Predicted Event</p>
                        <p className="font-semibold text-gray-900 text-sm">{formatDate(prediction.nextOutage)}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Duration</p>
                        <p className="font-semibold text-gray-900 text-sm">{prediction.duration}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Battery className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Reason</p>
                        <p className="font-semibold text-gray-900 text-sm">{prediction.reason}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Confidence Level</span>
                      <span className="text-sm font-bold text-gray-900">{prediction.probability}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${prediction.probability}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 sm:p-8 border border-blue-200">
              <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="p-3 bg-blue-100 rounded-xl flex-shrink-0">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">How Our AI Works</h3>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    Our machine learning algorithms continuously analyze weather patterns, grid load data, 
                    equipment maintenance schedules, and historical outage trends. This enables proactive 
                    technician deployment and helps communities prepare for potential disruptions before they occur.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/50 rounded-full text-xs font-medium text-blue-700">Weather Analysis</span>
                    <span className="px-3 py-1 bg-white/50 rounded-full text-xs font-medium text-blue-700">Load Prediction</span>
                    <span className="px-3 py-1 bg-white/50 rounded-full text-xs font-medium text-blue-700">Equipment Health</span>
                    <span className="px-3 py-1 bg-white/50 rounded-full text-xs font-medium text-blue-700">Historical Patterns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PowerOutageApp;