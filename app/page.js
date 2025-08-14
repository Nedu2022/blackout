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
  Power
} from 'lucide-react';

const PowerOutageApp = () => {
  const [activeTab, setActiveTab] = useState('report');
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
    { id: 3, name: 'Emeka Grid', area: 'Surulere', status: 'available' }
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
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">PowerGrid Manager</h1>
                <p className="text-sm text-gray-600">Smart Power Outage Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Power className="h-4 w-4 text-green-500" />
              <span>System Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'report', label: 'Report Outage', icon: AlertTriangle },
              { id: 'dashboard', label: 'Admin Dashboard', icon: Wrench },
              { id: 'predictions', label: 'AI Predictions', icon: Brain }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center space-x-2 ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Report Outage Tab */}
        {activeTab === 'report' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <div className="p-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <AlertTriangle className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Report Power Outage</h2>
                <p className="text-gray-600">Help us restore power to your area quickly by providing details below</p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="inline h-4 w-4 mr-1" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="inline h-4 w-4 mr-1" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="+234-xxx-xxx-xxxx"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Area/District
                  </label>
                  <select
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Street address, house number, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description of Issue
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Please describe the power issue you're experiencing..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Submit Complaint
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Admin Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
              <div className="text-sm text-gray-600">
                {complaints.filter(c => c.status === 'pending').length} pending complaints
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Complaints</p>
                    <p className="text-3xl font-bold text-gray-900">{complaints.length}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Available Technicians</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {technicians.filter(t => t.status === 'available').length}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Wrench className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Resolved Today</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {complaints.filter(c => c.status === 'completed').length}
                    </p>
                  </div>
                  <div className="p-3 bg-emerald-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Complaints List */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Complaints</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {complaints.map((complaint) => (
                  <div key={complaint.id} className={`p-6 border-l-4 ${getPriorityColor(complaint.priority)}`}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{complaint.name}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                            {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                          </span>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4" />
                            <span>{complaint.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{complaint.area} - {complaint.address}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>Reported at {formatTime(complaint.timestamp)}</span>
                          </div>
                        </div>
                        <p className="mt-3 text-gray-700">{complaint.description}</p>
                      </div>
                      <div className="flex flex-col space-y-2 ml-4">
                        {complaint.status === 'pending' && (
                          <button
                            onClick={() => assignTechnician(complaint.id)}
                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200"
                          >
                            Assign Tech
                          </button>
                        )}
                        {complaint.status === 'assigned' && (
                          <button
                            onClick={() => markComplete(complaint.id)}
                            className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors duration-200"
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
          <div className="space-y-8">
            <div className="text-center">
              <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Brain className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Power Predictions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our AI system analyzes historical data, weather patterns, and grid load to predict potential outages
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {predictions.map((prediction, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{prediction.area}</h3>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium text-purple-600">{prediction.probability}%</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Predicted Outage</p>
                        <p className="font-medium text-gray-900">{formatDate(prediction.nextOutage)}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Expected Duration</p>
                        <p className="font-medium text-gray-900">{prediction.duration}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Battery className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Reason</p>
                        <p className="font-medium text-gray-900">{prediction.reason}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${prediction.probability}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Probability Score: {prediction.probability}%</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">How AI Predictions Work</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our machine learning model analyzes multiple factors including historical outage patterns, 
                    weather forecasts, grid load distribution, equipment age, and maintenance schedules to 
                    predict potential power disruptions. This helps us proactively position technicians 
                    and prepare communities for planned maintenance.
                  </p>
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