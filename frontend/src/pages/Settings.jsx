
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Bell, Lock, LogOut } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { toast } = useToast();

  const handleLogout = () => {
    // Simulate logout
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    // In a real implementation, you'd clear auth tokens and redirect
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="py-6 px-4 md:px-8 border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Dashboard</span>
            </Link>
            <h1 className="text-xl font-bold">Settings</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64 shrink-0">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'profile' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                }`}
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </button>
              
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'notifications' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                }`}
              >
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </button>
              
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'security' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                }`}
              >
                <Lock className="w-5 h-5" />
                <span>Security</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
          
          {/* Content */}
          <div className="flex-1 card">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Profile Settings</h2>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      defaultValue="John Doe"
                      className="w-full p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      defaultValue="john.doe@example.com"
                      className="w-full p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="bio" className="block text-sm font-medium">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      rows={4}
                      defaultValue="Teacher at Springfield High School, specializing in Mathematics."
                      className="w-full p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => toast({ title: "Profile updated", description: "Your profile information has been updated" })}
                    className="btn-primary"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">Receive notifications about your account via email</p>
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="relative w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Browser Notifications</h3>
                      <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="relative w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Marketing Emails</h3>
                      <p className="text-sm text-muted-foreground">Receive emails about new features and updates</p>
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="relative w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => toast({ title: "Preferences saved", description: "Your notification preferences have been updated" })}
                    className="btn-primary mt-6"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Security Settings</h2>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="current-password" className="block text-sm font-medium">
                      Current Password
                    </label>
                    <input
                      id="current-password"
                      type="password"
                      className="w-full p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="new-password" className="block text-sm font-medium">
                      New Password
                    </label>
                    <input
                      id="new-password"
                      type="password"
                      className="w-full p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="confirm-password" className="block text-sm font-medium">
                      Confirm New Password
                    </label>
                    <input
                      id="confirm-password"
                      type="password"
                      className="w-full p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => toast({ title: "Password updated", description: "Your password has been changed successfully" })}
                    className="btn-primary"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
