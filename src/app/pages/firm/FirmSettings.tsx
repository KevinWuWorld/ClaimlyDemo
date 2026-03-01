import { useState } from "react";
import { Bell, Mail, Briefcase } from "lucide-react";
import Header from "../../components/Header";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Switch } from "../../components/ui/switch";
import { Separator } from "../../components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { toast } from "sonner";

export default function FirmSettings() {
  const [notifications, setNotifications] = useState({
    newLeads: true,
    leadResponses: true,
    caseMessages: true,
    scheduledMeetings: true,
    caseUpdates: true,
    emailDigest: "daily" as "realtime" | "daily" | "weekly",
    smsAlerts: false
  });

  const [leadPreferences, setLeadPreferences] = useState({
    autoAccept: false,
    maxLeadsPerWeek: "10",
    preferredCaseTypes: ["Auto Accidents", "Personal Injury"],
    minimumCaseValue: "10000"
  });

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header type="firm" />

      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">Firm Settings</h1>

        <div className="space-y-6">
          {/* Notification Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Bell className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">Notification Settings</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Lead Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Leads</p>
                      <p className="text-sm text-slate-600">Get notified when new leads arrive</p>
                    </div>
                    <Switch
                      checked={notifications.newLeads}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, newLeads: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Lead Responses</p>
                      <p className="text-sm text-slate-600">When a plaintiff responds to your contact</p>
                    </div>
                    <Switch
                      checked={notifications.leadResponses}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, leadResponses: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-4">Case Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Case Messages</p>
                      <p className="text-sm text-slate-600">When plaintiffs send messages</p>
                    </div>
                    <Switch
                      checked={notifications.caseMessages}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, caseMessages: checked })
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

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Case Updates</p>
                      <p className="text-sm text-slate-600">Activity on your active cases</p>
                    </div>
                    <Switch
                      checked={notifications.caseUpdates}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, caseUpdates: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-4">Delivery Preferences</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-2">Email Digest Frequency</p>
                    <Select 
                      value={notifications.emailDigest}
                      onValueChange={(value: any) => 
                        setNotifications({ ...notifications, emailDigest: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Real-time (instant emails)</SelectItem>
                        <SelectItem value="daily">Daily digest</SelectItem>
                        <SelectItem value="weekly">Weekly digest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Alerts</p>
                      <p className="text-sm text-slate-600">Receive text messages for urgent items</p>
                    </div>
                    <Switch
                      checked={notifications.smsAlerts}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, smsAlerts: checked })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Lead Preferences */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">Lead Preferences</h2>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-medium mb-2">Maximum Leads Per Week</p>
                <Select 
                  value={leadPreferences.maxLeadsPerWeek}
                  onValueChange={(value) => 
                    setLeadPreferences({ ...leadPreferences, maxLeadsPerWeek: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 leads per week</SelectItem>
                    <SelectItem value="10">10 leads per week</SelectItem>
                    <SelectItem value="20">20 leads per week</SelectItem>
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <p className="font-medium mb-2">Minimum Case Value</p>
                <Select 
                  value={leadPreferences.minimumCaseValue}
                  onValueChange={(value) => 
                    setLeadPreferences({ ...leadPreferences, minimumCaseValue: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5000">$5,000+</SelectItem>
                    <SelectItem value="10000">$10,000+</SelectItem>
                    <SelectItem value="25000">$25,000+</SelectItem>
                    <SelectItem value="50000">$50,000+</SelectItem>
                    <SelectItem value="any">Any amount</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-500 mt-1">
                  Only receive leads with estimated values above this threshold
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Preferred Case Types:</strong> {leadPreferences.preferredCaseTypes.join(", ")}
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  To modify preferred case types, update your specialties in your firm profile
                </p>
              </div>
            </div>
          </Card>

          {/* Team Management */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">Team Management</h2>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-slate-600">
                Manage which team members receive notifications and have access to the platform.
              </p>
              <Button variant="outline">
                Manage Team Members
              </Button>
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex gap-3">
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              Save Settings
            </Button>
            <Button variant="outline">
              Reset to Defaults
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
