import { useState } from "react";
import { User, Bell, Lock, Mail } from "lucide-react";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import { toast } from "sonner";

export default function Settings() {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    zip: "90210"
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    caseUpdates: true,
    firmMessages: true,
    scheduledMeetings: true
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">Settings</h1>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">Profile Information</h2>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="zip">ZIP Code</Label>
                <Input
                  id="zip"
                  value={profile.zip}
                  onChange={(e) => setProfile({ ...profile, zip: e.target.value })}
                />
              </div>

              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Save Profile
              </Button>
            </form>
          </Card>

          {/* Notification Preferences */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Bell className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">Notification Preferences</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Notification Channels</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-slate-600">Receive updates via email</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, email: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-slate-600">Receive text message alerts</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, sms: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-4">What to Notify About</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Case Updates</p>
                      <p className="text-sm text-slate-600">When your case status changes</p>
                    </div>
                    <Switch
                      checked={notifications.caseUpdates}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, caseUpdates: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Firm Messages</p>
                      <p className="text-sm text-slate-600">When your attorney sends a message</p>
                    </div>
                    <Switch
                      checked={notifications.firmMessages}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, firmMessages: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Scheduled Meetings</p>
                      <p className="text-sm text-slate-600">Reminders for upcoming meetings</p>
                    </div>
                    <Switch
                      checked={notifications.scheduledMeetings}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, scheduledMeetings: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveNotifications} className="bg-blue-600 hover:bg-blue-700">
                Save Preferences
              </Button>
            </div>
          </Card>

          {/* Privacy & Security */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Lock className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">Privacy & Security</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Your data is protected:</strong> We use end-to-end encryption for all communications 
                  and never share your personal information without your consent.
                </p>
              </div>

              <Button variant="outline">Change Password</Button>
              <Button variant="outline">Download My Data</Button>
              <Button variant="outline" className="text-red-600 hover:text-red-700">
                Delete Account
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
