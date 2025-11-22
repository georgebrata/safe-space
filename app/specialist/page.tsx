import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, Clock, Search } from "lucide-react"

export default function SpecialistDashboard() {
  // Mock data for specialist view
  const cases = [
    { id: "SAFE-2024-8821", risk: "High", status: "Pending", time: "10m ago" },
    { id: "SAFE-2024-8819", risk: "Critical", status: "Active", time: "1h ago" },
    { id: "SAFE-2024-8804", risk: "Medium", status: "Review", time: "1d ago" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Specialist Header */}
      <header className="bg-slate-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="font-bold text-lg">SafeSpace Specialist Portal</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-slate-800">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center font-bold">DR</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 md:p-8 space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">4</div>
              <p className="text-sm text-muted-foreground">Pending Urgent Cases</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">12</div>
              <p className="text-sm text-muted-foreground">Active Conversations</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">98%</div>
              <p className="text-sm text-muted-foreground">Response Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Case Management */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Incoming Cases</h2>
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" /> Filter
            </Button>
          </div>

          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-secondary/20 text-muted-foreground">
                <tr>
                  <th className="p-4">Case ID</th>
                  <th className="p-4">Risk Level</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Time</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((c) => (
                  <tr key={c.id} className="border-t hover:bg-secondary/5">
                    <td className="p-4 font-medium">{c.id}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                          c.risk === "Critical"
                            ? "bg-destructive/10 text-destructive"
                            : c.risk === "High"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {c.risk}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">{c.status}</td>
                    <td className="p-4 text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {c.time}
                    </td>
                    <td className="p-4">
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
