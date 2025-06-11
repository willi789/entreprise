import React, { useState } from 'react';
import { 
  Home, Search, Plus, Users, MessageSquare, Building,
  BarChart3, Settings, Award, HelpCircle, ChevronLeft,
  ChevronRight, Briefcase, Star, TrendingUp, Calendar,
  Bell, Shield, LogOut, Target, Zap, FileText
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, company }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const mainMenuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Home, 
      description: 'Vue d\'ensemble de votre activité',
      badge: null,
      gradient: 'from-green-500 to-emerald-500'
    },
    { 
      id: 'projects', 
      label: 'Mes projets', 
      icon: Briefcase, 
      description: 'Gérer vos missions et recrutements',
      badge: company.activeProjects,
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'freelance-search', 
      label: 'Trouver des freelances', 
      icon: Search, 
      description: 'Rechercher des talents qualifiés',
      badge: 47,
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      id: 'applications', 
      label: 'Candidatures', 
      icon: Users, 
      description: 'Gérer les candidatures reçues',
      badge: 8,
      gradient: 'from-orange-500 to-yellow-500'
    },
    { 
      id: 'messages', 
      label: 'Messages', 
      icon: MessageSquare, 
      description: 'Conversations avec les freelances',
      badge: 3,
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  const secondaryMenuItems = [
    { 
      id: 'company-profile', 
      label: 'Profil entreprise', 
      icon: Building, 
      description: 'Gérer votre profil public',
      gradient: 'from-teal-500 to-cyan-500'
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: BarChart3, 
      description: 'Statistiques et performances',
      gradient: 'from-emerald-500 to-green-500'
    },
    { 
      id: 'certifications', 
      label: 'Certifications', 
      icon: Award, 
      description: 'Vos labels et engagements',
      gradient: 'from-amber-500 to-orange-500'
    },
    { 
      id: 'settings', 
      label: 'Paramètres', 
      icon: Settings, 
      description: 'Configuration du compte',
      gradient: 'from-gray-500 to-slate-500'
    }
  ];

  const quickActions = [
    { 
      id: 'create-project', 
      label: 'Publier un projet', 
      icon: Plus, 
      color: 'green'
    },
    { 
      id: 'urgent-hiring', 
      label: 'Recrutement urgent', 
      icon: Zap, 
      color: 'orange'
    }
  ];

  const MenuItem = ({ item, isActive, onClick, isCollapsed }) => {
    return (
      <button
        onClick={() => onClick(item.id)}
        className={`
          group relative w-full flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 hover:scale-105
          ${isActive 
            ? `bg-gradient-to-r ${item.gradient} text-white shadow-2xl shadow-green-500/25` 
            : 'text-gray-600 hover:text-gray-900 hover:bg-white hover:shadow-lg'
          }
          ${isCollapsed ? 'justify-center px-3' : ''}
        `}
        title={isCollapsed ? item.label : ''}
      >
        <div className={`
          flex items-center justify-center w-6 h-6 flex-shrink-0
          ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}
        `}>
          <item.icon className="w-6 h-6" />
        </div>
        
        {!isCollapsed && (
          <>
            <div className="flex-1 text-left">
              <p className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-gray-900'}`}>
                {item.label}
              </p>
              <p className={`text-xs mt-0.5 ${isActive ? 'text-green-100' : 'text-gray-500'}`}>
                {item.description}
              </p>
            </div>

            {item.badge && (
              <div className={`
                px-2 py-1 rounded-full text-xs font-bold min-w-[20px] text-center
                ${isActive 
                  ? 'bg-white/20 text-white' 
                  : 'bg-green-100 text-green-600'
                }
              `}>
                {item.badge > 99 ? '99+' : item.badge}
              </div>
            )}
          </>
        )}

        {isActive && (
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl"></div>
        )}
      </button>
    );
  };

  return (
    <aside className={`
      bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 flex flex-col transition-all duration-300 relative
      ${isCollapsed ? 'w-20' : 'w-80'}
    `}>
      {/* Header */}
      <div className={`p-6 border-b border-gray-200 ${isCollapsed ? 'px-4' : ''}`}>
        {!isCollapsed && (
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">{company.initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 truncate">{company.name}</h3>
              <p className="text-sm text-gray-500 truncate">{company.industry}</p>
              <div className="flex items-center mt-1">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-sm font-medium text-gray-700">{company.rating}</span>
                <span className="text-xs text-gray-500 ml-1">({company.completedCollaborations} collab.)</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`
            absolute -right-3 top-8 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110
            ${isCollapsed ? 'rotate-180' : ''}
          `}
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Quick Actions */}
      {!isCollapsed && (
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="space-y-2">
            {quickActions.map((action) => (
              <button
                key={action.id}
                className={`
                  w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 hover:scale-105
                  ${action.color === 'green' ? 'bg-green-50 text-green-600 hover:bg-green-100' : ''}
                  ${action.color === 'orange' ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' : ''}
                `}
              >
                <action.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="flex-1 px-6 py-6 space-y-2 overflow-y-auto">
        {!isCollapsed && (
          <div className="mb-6">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Navigation principale
            </h4>
          </div>
        )}
        
        {mainMenuItems.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            isActive={activeTab === item.id}
            onClick={setActiveTab}
            isCollapsed={isCollapsed}
          />
        ))}

        {!isCollapsed && (
          <div className="pt-6 mt-6 border-t border-gray-200">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Outils & Paramètres
            </h4>
          </div>
        )}

        {secondaryMenuItems.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            isActive={activeTab === item.id}
            onClick={setActiveTab}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className={`p-6 border-t border-gray-200 ${isCollapsed ? 'px-4' : ''}`}>
        {!isCollapsed && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-400 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 text-sm">Entreprise Certifiée</h5>
                <p className="text-xs text-gray-500">{company.certifications.length} certifications</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {company.certifications.slice(0, 2).map((cert, index) => (
                <span key={index} className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-lg">
                  {cert}
                </span>
              ))}
              {company.certifications.length > 2 && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
                  +{company.certifications.length - 2}
                </span>
              )}
            </div>
            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold py-2 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 hover:scale-105 shadow-lg">
              Améliorer le profil
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;