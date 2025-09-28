import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { useMemes } from '../hooks/useMemes'
import { useAnalytics } from '../hooks/useAnalytics'

const Profile = () => {
  const { user } = useAuth()
  const { isDarkMode } = useTheme()
  const { memes } = useMemes()
  const { analytics } = useAnalytics(user?.id)
  const [currentTab, setCurrentTab] = useState(0)

  const userMemes = memes.filter(meme => meme.user_id === user?.id)
  const favoriteMemes = memes.filter(meme => meme.favorited)
  const isDemoUser = user && localStorage.getItem('demoUser')

  const tabs = [
    { label: 'My Memes', icon: '🎨', count: userMemes.length },
    { label: 'Favorites', icon: '❤️', count: favoriteMemes.length },
    { label: 'Settings', icon: '⚙️', count: null }
  ]

  return (
    <div className={`min-h-screen p-6 transition-all duration-500 ${
      isDarkMode ? 'text-white' : 'text-gray-900'
    }`}>
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`glass p-8 rounded-2xl mb-8 transition-all duration-500 ${
            isDarkMode ? '' : 'bg-white/90 shadow-xl border border-gray-100'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-500 to-cyan-500 p-1">
                <div className={`w-full h-full rounded-full flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } overflow-hidden`}>
                  {user?.avatar && user.avatar.startsWith('http') ? (
                    <img 
                      src={user.avatar} 
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl">{user?.avatar || '👤'}</span>
                  )}
                </div>
              </div>              
              {isDemoUser && (
                <div className="absolute -top-2 -right-2 bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                  DEMO
                </div>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                <h1 className="text-3xl font-bold gradient-text">
                  {user?.name || 'Meme Master'}
                </h1>
              </div>
              
              <p className={`text-lg mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {user?.email || 'demo@memefy.ai'}
              </p>
              
              <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">{userMemes.length}</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Memes Created
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">{analytics?.total_views || 0}</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Total Views
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">{analytics?.total_shares || 0}</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Shares
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentTab(index)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-500 ease-in-out ${
                currentTab === index
                  ? 'bg-gradient-to-r from-pink-500 to-cyan-500 text-white shadow-lg'
                  : isDarkMode
                    ? 'glass text-gray-300 hover:text-white'
                    : 'bg-white/80 text-gray-700 hover:text-gray-900 shadow-sm hover:shadow-md border border-gray-200'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
              {tab.count !== null && (
                <span className="ml-2 bg-black/20 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={currentTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {currentTab === 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 gradient-text">My Memes Collection</h2>
              {userMemes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userMemes.map((meme, index) => (
                    <motion.div
                      key={meme.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`glass rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 ${
                        isDarkMode ? '' : 'bg-white/90 shadow-lg border border-gray-100'
                      }`}
                    >
                      <div className="aspect-square bg-gray-100 flex items-center justify-center">
                        <span className="text-4xl">🎭</span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">{meme.template_name}</h3>
                        <div className="flex justify-between text-sm opacity-70">
                          <span>👁️ {meme.views || 0}</span>
                          <span>📤 {meme.shares || 0}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🎨</div>
                  <h3 className="text-xl font-bold mb-4 gradient-text">No Memes Yet</h3>
                  <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Start creating some epic memes to build your collection!
                  </p>
                  <motion.a
                    href="/generator"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block bg-gradient-to-r from-pink-500 to-cyan-500 text-white px-6 py-3 rounded-full font-semibold"
                  >
                    Create First Meme ✨
                  </motion.a>
                </div>
              )}
            </div>
          )}

          {currentTab === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 gradient-text">Favorite Memes</h2>
              <div className="text-center py-16">
                <div className="text-6xl mb-4">❤️</div>
                <h3 className="text-xl font-bold mb-4 gradient-text">No Favorites Yet</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Explore the gallery and save your favorite memes here!
                </p>
              </div>
            </div>
          )}

          {currentTab === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 gradient-text">Account Settings</h2>
              <div className={`glass p-6 rounded-2xl transition-all duration-500 ${
                isDarkMode ? '' : 'bg-white/90 shadow-lg border border-gray-100'
              }`}>
                <div className="space-y-6">
                  {/* Avatar Upload Section */}
                  <div>
                    <label className="block font-semibold mb-3">Profile Picture</label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-cyan-500 p-0.5">
                        <div className={`w-full h-full rounded-full flex items-center justify-center ${
                          isDarkMode ? 'bg-gray-800' : 'bg-white'
                        } overflow-hidden`}>
                          {user?.avatar && user.avatar.startsWith('http') ? (
                            <img 
                              src={user.avatar} 
                              alt="Profile"
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-lg">{user?.avatar || '👤'}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {isDemoUser 
                            ? '🔒 Sign in with Google for custom avatar'
                            : '🎆 Using your Google profile picture'
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Display Name</label>
                    <input
                      type="text"
                      value={user?.name || ''}
                      disabled={isDemoUser}
                      className={`w-full p-3 rounded-xl border-2 transition-all duration-300 ${
                        isDarkMode
                          ? 'bg-gray-800/50 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } ${isDemoUser ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled={isDemoUser}
                      className={`w-full p-3 rounded-xl border-2 transition-all duration-300 ${
                        isDarkMode
                          ? 'bg-gray-800/50 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } ${isDemoUser ? 'opacity-50 cursor-not-allowed' : ''}`}
                    />
                  </div>
                  {isDemoUser && (
                    <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-xl p-4">
                      <p className="text-yellow-400 font-semibold">
                        ⚠️ Demo Mode: Settings are read-only. Sign in with Google for full features!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Profile