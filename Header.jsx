import React, { useState } from 'react';
import { 
  Search, Bell, Settings, LogOut, Menu, 
  Briefcase, MessageSquare, Star, Clock,
  ChevronDown, X, Building, DollarSign,
  CheckCircle, AlertCircle, Info, Users
} from 'lucide-react';

const Header = ({ company, notifications = 0 }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notificationsList = [
    {
      id: 1,
      type: 'application',
      title: 'Nouvelle candidature',
      message: 'Marie Laurent a postulé pour "Refonte UX/UI app mobile"',
      time: '1h',
      icon: Users,
      color: 'blue',
      unread: true
    },
    {
      id: 2,
      type: 'message',
      title: 'Nouveau message',
      message: 'Thomas Bernard - Questions sur le projet dashboard',
      time: '3h',
      icon: MessageSquare,
      color: 'green',
      unread: true
    },
    {
      id: 3,
      type: 'project',
      title: 'Projet terminé',
      message: 'Design system GreenTech livré par Sophie Martin',
      time: '5h',
      icon: CheckCircle,
      color: 'emerald',
      unread: false
    },
    {
      id: 4,
      type: 'review',
      title: 'Nouvelle évaluation',
      message: 'Camille Dupont a noté votre collaboration 5 étoiles',
      time: '1j',
      icon: Star,
      color: 'yellow',
      unread: false
    },
    {
      id: 5,
      type: 'reminder',
      title: 'Rappel paiement',
      message: 'Facture projet "Dashboard IoT" à régler',
      time: '2j',
      icon: DollarSign,
      color: 'orange',
      unread: false
    }
  ];

  const getNotificationIcon = (type, color) => {
    const iconClass = `w-5 h-5 text-${color}-600`;
    switch(type) {
      case 'application': return <Users className={iconClass} />;
      case 'message': return <MessageSquare className={iconClass} />;
      case 'project': return <CheckCircle className={iconClass} />;
      case 'review': return <Star className={iconClass} />;
      case 'reminder': return <DollarSign className={iconClass} />;
      default: return <Info className={iconClass} />;
    }
  };

  const getNotificationBg = (color) => {
    const colors = {
      blue: 'bg-blue-100',
      green: 'bg-green-100', 
      yellow: 'bg-yellow-100',
      emerald: 'bg-emerald-100',
      orange: 'bg-orange-100'
    };
    return colors[color] || 'bg-gray-100';
  };

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-40 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">LinkUp</h1>
              <p className="text-xs text-gray-500">Espace Entreprise</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
          <div className="relative w-full">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher des freelances, projets, compétences..."
              className="w-full pl-12 pr-6 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:bg-white"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <kbd className="px-2 py-1 text-xs text-gray-500 bg-gray-200 rounded">⌘K</kbd>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Quick Stats */}
          <div className="hidden lg:flex items-center space-x-6 px-6 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{company.activeProjects}</p>
                <p className="text-xs text-gray-500">Projets actifs</p>
              </div>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{company.rating}</p>
                <p className="text-xs text-gray-500">Note</p>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200 group"
            >
              <Bell className="w-6 h-6" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {notifications > 9 ? '9+' : notifications}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 text-lg">Notifications</h3>
                    <button 
                      onClick={() => setShowNotifications(false)}
                      className="p-1 hover:bg-white rounded-lg transition-colors duration-200"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notifications} nouvelles notifications</p>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {notificationsList.map((notif) => (
                    <div key={notif.id} className={`p-4 hover:bg-gray-50 border-b border-gray-50 last:border-0 transition-colors duration-200 ${notif.unread ? 'bg-green-50/30' : ''}`}>
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 ${getNotificationBg(notif.color)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          {getNotificationIcon(notif.type, notif.color)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-gray-900">{notif.title}</p>
                            {notif.unread && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                          <p className="text-xs text-gray-400 mt-2 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            Il y a {notif.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t border-gray-100 bg-gray-50">
                  <button className="w-full text-center text-green-600 hover:text-green-700 font-medium transition-colors duration-200">
                    Voir toutes les notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-2xl transition-all duration-200 group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">{company.initials}</span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-900">{company.name}</p>
                <p className="text-xs text-gray-500">{company.industry}</p>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
            </button>

            {/* Profile Dropdown */}
            {showProfile && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-xl">{company.initials}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{company.name}</h4>
                      <p className="text-sm text-gray-600">{company.industry}</p>
                      <p className="text-xs text-gray-500">{company.email}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">{company.rating}</p>
                      <p className="text-xs text-gray-500">Note moyenne</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">{company.completedCollaborations}</p>
                      <p className="text-xs text-gray-500">Collaborations</p>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="space-y-2">
                    <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-xl transition-colors duration-200 text-left">
                      <Building className="w-5 h-5 text-gray-500" />
                      <span className="text-sm text-gray-700">Profil entreprise</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-xl transition-colors duration-200 text-left">
                      <Settings className="w-5 h-5 text-gray-500" />
                      <span className="text-sm text-gray-700">Paramètres</span>
                    </button>
                    <div className="border-t border-gray-100 pt-2 mt-4">
                      <button className="w-full flex items-center space-x-3 p-3 hover:bg-red-50 rounded-xl transition-colors duration-200 text-left group">
                        <LogOut className="w-5 h-5 text-gray-500 group-hover:text-red-500" />
                        <span className="text-sm text-gray-700 group-hover:text-red-600">Se déconnecter</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;