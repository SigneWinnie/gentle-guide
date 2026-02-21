import { useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { Send, X } from "lucide-react";

const NotificationsPage = () => {
  const { emailLogs, students, sendEmail } = useAppData();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ recipient: "", subject: "", template: "GENERAL", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendEmail(form);
    setShowForm(false);
    setForm({ recipient: "", subject: "", template: "GENERAL", message: "" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Email Notifications</h2>
          <p className="text-sm text-muted-foreground">Send and track email notifications</p>
        </div>
        <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          <Send className="w-4 h-4" /> Send Email
        </button>
      </div>

      <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Recipient</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Subject</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Template</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Sent At</th>
              </tr>
            </thead>
            <tbody>
              {emailLogs.map((e) => (
                <tr key={e.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                  <td className="px-4 py-3 text-foreground">{e.recipient}</td>
                  <td className="px-4 py-3 text-muted-foreground">{e.subject}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground hidden md:table-cell">{e.template}</td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 rounded text-xs font-bold bg-success/15 text-success">{e.status}</span></td>
                  <td className="px-4 py-3 text-xs text-muted-foreground hidden lg:table-cell">{new Date(e.sentAt).toLocaleString()}</td>
                </tr>
              ))}
              {emailLogs.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No emails sent yet</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4">
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-elevated border border-border w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="font-bold text-foreground">Send Email</h3>
              <button type="button" onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Recipient</label>
                <select required value={form.recipient} onChange={(e) => setForm((p) => ({ ...p, recipient: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="">Select student</option>
                  {students.map((s) => <option key={s.id} value={s.email}>{s.firstName} {s.lastName} ({s.email})</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Template</label>
                <select value={form.template} onChange={(e) => setForm((p) => ({ ...p, template: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="GENERAL">General</option>
                  <option value="REGISTRATION">Registration Confirmation</option>
                  <option value="GRADES">Grade Publication</option>
                  <option value="ANNOUNCEMENT">Announcement</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Subject</label>
                <input required value={form.subject} onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Message</label>
                <textarea required rows={4} value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-border flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">Send</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
