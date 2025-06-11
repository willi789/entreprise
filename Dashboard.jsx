import React, { useState, useEffect } from 'react';
import {
  TrendingUp, DollarSign, Briefcase, Star, Clock, Users,
  ArrowRight, ArrowUpRight, Calendar, MapPin, Eye, Send,
  Bookmark, CheckCircle, AlertCircle, Zap, Target, Award,
  BarChart3, MessageSquare, Plus, ExternalLink, Sparkles,
  Building, Globe, Shield, Heart, ChevronRight, Play,
  TrendingDown, Activity, Timer, FileText, Bell, Search,
  Filter, Download, Upload, RefreshCw, Settings
} from 'lucide-react';

const Dashboard = ({ company, setActiveTab }) => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedCard, setSelectedCard] = useState(null);

  // Mock data basé sur l'entreprise GreenTech Solutions
  const stats = {
    week: {
      budget: { amount: 15800, change: 22, trend: 'up' },
      projects: { amount: 3, change: 50, trend: 'up' },
      applications: { amount: 12, change: 8, trend: 'up' },
      collaborations: { amount: 2, change: 100, trend: 'up' }
    },
    month: {
      budget: { amount: 45200, change: 18, trend: 'up' },
      projects: { amount: 8, change: 33, trend: 'up' },
      applications: { amount: 47, change: 25, trend: 'up' },
      collaborations: { amount: 12, change: 41, trend: 'up' }
    }
  };

  const currentStats = stats[timeRange];

  const topFreelances = [
    {
      id: 1,
      name: "Camille Dupont",
      speciality: "Designer UX/UI",
      avatar: "CD",
      rating: 4.9,
      completedProjects: 27,
      hourlyRate: 65,
      skills: ["UX/UI", "Figma", "Design System"],
      lastProject: "Refonte app mobile",
      available: true,
      certified: "Label NR",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      name: "Thomas Bernard",
      speciality: "Développeur React",
      avatar: "TB",
      rating: 4.8,
      completedProjects: 34,
      hourlyRate: 75,
      skills: ["React", "Node.js", "TypeScript"],
      lastProject: "Dashboard analytics",
      available: false,
      certified: "B-Corp",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      name: "Sophie Martin",
      speciality: "Data Scientist",
      avatar: "SM",
      rating: 4.9,
      completedProjects: 19,
      hourlyRate: 80,
      skills: ["Python", "ML", "Analytics"],
      lastProject: "Modèle prédictif",
      available: true,
      certified: "Carbon Trust",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'application_received',
      title: 'Nouvelle candidature',
      description: 'Marie Laurent - Projet "App mobile éco-responsable"',
      time: '1h',
      icon: Users,
      color: 'blue',
      urgent: true
    },
    {
      id: 2,
      type: 'project_completed',
      title: 'Projet terminé',
      description: 'Design system livré par Camille Dupont',
      amount: '+4,200€',
      time: '3h',
      icon: CheckCircle,
      color: 'green'
    },
    {
      id: 3,
      type: 'message_received',
      title: 'Nouveau message',
      description: 'Thomas Bernard - Questions techniques',
      time: '5h',
      icon: MessageSquare,
      color: 'purple'
    },
    {
      id: 4,
      type: 'payment_due',
      title: 'Paiement à effectuer',
      description: 'Facture "Dashboard IoT" - 2,800€',
      time: '1j',
      icon: DollarSign,
      color: 'orange'
    }
  ];

  const StatCard = ({ title, value, change, trend, icon: Icon, color, gradient, onClick }) => (
    <div 
      onClick={onClick}
      className={`
        relative p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105
        ${selectedCard === title ? 'ring-2 ring-green-500 shadow-2xl' : ''}
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex items-center space-x-1 text-sm font-semibold ${trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
          {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {change > 0 ? '+' : ''}{change}%
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{typeof value === 'number' ? value.toLocaleString() : value}</p>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
    </div>
  );

  const FreelanceCard = ({ freelance, onClick }) => (
    <div className="bg-white rounded-2xl border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:scale-[1.02]">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className={`w-14 h-14 bg-gradient-to-r ${freelance.gradient} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
              {freelance.avatar}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                {freelance.name}
              </h3>
              <p className="text-gray-600 text-sm">{freelance.speciality}</p>
              <div className="flex items-center mt-1">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-sm font-medium text-gray-700">{freelance.rating}</span>
                <span className="text-xs text-gray-500 ml-1">({freelance.completedProjects} projets)</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${freelance.available ? 'bg-green-400' : 'bg-orange-400'}`}></div>
            <span className="text-xs text-gray-500">
              {freelance.available ? 'Disponible' : 'Occupé'}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-600 rounded-lg">
            {freelance.certified}
          </span>
          <span className="text-sm font-semibold text-gray-900">{freelance.hourlyRate}€/h</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {freelance.skills.map((skill) => (
            <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg">
              {skill}
            </span>
          ))}
        </div>

        <div className="text-sm text-gray-600 mb-4">
          <span className="font-medium">Dernier projet :</span> {freelance.lastProject}
        </div>

        <div className="flex space-x-3">
          <button 
            onClick={() => onClick(freelance)}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center justify-center group"
          >
            <MessageSquare className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
            Contacter
          </button>
          <button className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
            <Eye className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bonjour {company.contactPerson.name.split(' ')[0]} ! 👋
          </h1>
          <p className="text-gray-600">
            Voici un aperçu de votre activité de recrutement et des talents disponibles.
          </p>
        </div>
        
        <div className="mt-4 lg:mt-0 flex items-center space-x-4">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
          </select>
          <button 
            onClick={() => setActiveTab('projects')}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouveau projet
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Budget utilisé"
          value={`${currentStats.budget.amount.toLocaleString()}€`}
          change={currentStats.budget.change}
          trend={currentStats.budget.trend}
          icon={DollarSign}
          gradient="from-green-500 to-emerald-500"
          onClick={() => setSelectedCard('Budget utilisé')}
        />
        <StatCard
          title="Projets actifs"
          value={currentStats.projects.amount}
          change={currentStats.projects.change}
          trend={currentStats.projects.trend}
          icon={Briefcase}
          gradient="from-blue-500 to-cyan-500"
          onClick={() => setSelectedCard('Projets actifs')}
        />
        <StatCard
          title="Candidatures"
          value={currentStats.applications.amount}
          change={currentStats.applications.change}
          trend={currentStats.applications.trend}
          icon={Users}
          gradient="from-purple-500 to-pink-500"
          onClick={() => setSelectedCard('Candidatures')}
        />
        <StatCard
          title="Collaborations"
          value={currentStats.collaborations.amount}
          change={currentStats.collaborations.change}
          trend={currentStats.collaborations.trend}
          icon={Star}
          gradient="from-orange-500 to-yellow-500"
          onClick={() => setSelectedCard('Collaborations')}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Freelances */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Zap className="w-6 h-6 mr-2 text-yellow-500" />
                Talents recommandés
              </h2>
              <p className="text-gray-600 mt-1">Freelances alignés avec vos valeurs et besoins</p>
            </div>
            <button 
              onClick={() => setActiveTab('freelance-search')}
              className="text-green-600 hover:text-green-700 font-semibold flex items-center"
            >
              Voir tout
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          <div className="space-y-6">
            {topFreelances.map((freelance) => (
              <FreelanceCard
                key={freelance.id}
                freelance={freelance}
                onClick={(freelance) => console.log('Contacter', freelance.name)}
              />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-green-500" />
              Actions rapides
            </h3>
            <div className="space-y-3">
              <button 
                onClick={() => setActiveTab('projects')}
                className="w-full flex items-center justify-between p-3 bg-white rounded-xl hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-center">
                  <Plus className="w-5 h-5 text-green-500 mr-3" />
                  <span className="font-medium text-gray-900">Publier un projet</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all duration-200" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-white rounded-xl hover:shadow-md transition-all duration-200 group">
                <div className="flex items-center">
                  <Search className="w-5 h-5 text-blue-500 mr-3" />
                  <span className="font-medium text-gray-900">Recherche urgente</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-white rounded-xl hover:shadow-md transition-all duration-200 group">
                <div className="flex items-center">
                  <BarChart3 className="w-5 h-5 text-purple-500 mr-3" />
                  <span className="font-medium text-gray-900">Analytics détaillés</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all duration-200" />
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-gray-600" />
              Activité récente
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activity.color === 'green' ? 'bg-green-100' :
                    activity.color === 'blue' ? 'bg-blue-100' :
                    activity.color === 'purple' ? 'bg-purple-100' :
                    activity.color === 'orange' ? 'bg-orange-100' :
                    'bg-gray-100'
                  }`}>
                    <activity.icon className={`w-4 h-4 ${
                      activity.color === 'green' ? 'text-green-600' :
                      activity.color === 'blue' ? 'text-blue-600' :
                      activity.color === 'purple' ? 'text-purple-600' :
                      activity.color === 'orange' ? 'text-orange-600' :
                      'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      {activity.urgent && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>}
                    </div>
                    <p className="text-sm text-gray-600 truncate">{activity.description}</p>
                    {activity.amount && (
                      <p className="text-sm font-semibold text-green-600">{activity.amount}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">Il y a {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setActiveTab('messages')}
              className="w-full mt-4 text-center text-green-600 hover:text-green-700 font-medium text-sm py-2 hover:bg-green-50 rounded-lg transition-colors duration-200"
            >
              Voir toute l'activité
            </button>
          </div>

          {/* Company Performance */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
              Performance
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Taux de satisfaction</span>
                <span className="font-bold text-gray-900">{company.rating}/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{width: `${(company.rating/5)*100}%`}}></div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{company.completedCollaborations}</p>
                  <p className="text-xs text-gray-500">Collaborations</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">92%</p>
                  <p className="text-xs text-gray-500">Projets à temps</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;