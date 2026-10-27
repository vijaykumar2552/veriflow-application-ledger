import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Bell, Check, FileWarning, UserRoundCheck } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fmtDateTime, useStore } from "@/lib/store";

const STORAGE_KEY = "veriflow-notifications-read";

interface NotificationItem {
  id: string;
  group: "review" | "document";
  title: string;
  detail: string;
  date: string;
  appId: string;
}

export function NotificationCenter() {
  const { apps, docs } = useStore();
  const [open, setOpen] = useState(false);
  const [readIds, setReadIds] = useState<Set<string>>(() => new Set());
  const [loaded, setLoaded] = useState(false);
  const reviews = useMemo(
    () =>
      apps
        .filter(
          (application) =>
            application.reviewStatus &&
            application.reviewStatus !== "Approved" &&
            application.reviewStatus !== "Rejected",
        )
        .map((application): NotificationItem => ({
          id: `review:${application.id}`,
          group: "review",
          title: application.applicant,
          detail: `${application.id} · ${application.reviewStatus}`,
          date: application.submitted,
          appId: application.id,
        })),
    [apps],
  );
  const attentionDocs = useMemo(
    () =>
      docs
        .filter((document) => document.status === "Needs Review" || document.status === "Flagged")
        .map((document): NotificationItem => ({
          id: `document:${document.id}`,
          group: "document",
          title: document.name,
          detail: `${document.appId} · ${document.status}`,
          date: document.uploaded,
          appId: document.appId,
        })),
    [docs],
  );
  const notifications = [...reviews, ...attentionDocs];
  const unreadCount = notifications.filter((notification) => !readIds.has(notification.id)).length;

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.every((id) => typeof id === "string")) {
          setReadIds(new Set(parsed));
        }
      }
    } catch (error) {
      toast.error("Could not restore notification read state.");
      console.error("Could not read notification state.", error);
    } finally {
      setLoaded(true);
    }
  }, []);

  const persistReadIds = (next: Set<string>) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      setReadIds(next);
    } catch (error) {
      toast.error("Could not save notification read state.");
      console.error("Could not persist notification state.", error);
    }
  };

  const markRead = (id: string) => {
    if (readIds.has(id)) return;
    persistReadIds(new Set([...readIds, id]));
  };

  const markAllRead = () => persistReadIds(new Set(notifications.map(({ id }) => id)));
  const reviewsUnread = reviews.filter(({ id }) => !readIds.has(id)).length;
  const documentsUnread = attentionDocs.filter(({ id }) => !readIds.has(id)).length;

  const renderItems = (items: NotificationItem[]) => (
    <ul className="divide-y rounded-lg border">
      {items.map((notification) => {
        const content = (
          <>
            <span className="flex min-w-0 flex-1 items-start gap-2">
              <span
                className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                  readIds.has(notification.id) ? "bg-transparent" : "bg-primary"
                }`}
                aria-label={readIds.has(notification.id) ? "Read" : "Unread"}
              />
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">{notification.title}</span>
                <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                  {notification.detail}
                </span>
                <time
                  className="mt-1 block text-[10px] text-muted-foreground"
                  dateTime={notification.date}
                >
                  {fmtDateTime(notification.date)}
                </time>
              </span>
            </span>
          </>
        );
        return (
          <li key={notification.id} className="flex items-center gap-2 px-3 py-2">
            {notification.group === "review" ? (
              <Link
                to="/review"
                className="flex min-w-0 flex-1 rounded-md py-1 text-left transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => {
                  markRead(notification.id);
                  setOpen(false);
                }}
              >
                {content}
              </Link>
            ) : (
              <Link
                to="/documents"
                search={{ app: notification.appId }}
                className="flex min-w-0 flex-1 rounded-md py-1 text-left transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => {
                  markRead(notification.id);
                  setOpen(false);
                }}
              >
                {content}
              </Link>
            )}
            {!readIds.has(notification.id) && (
              <button
                type="button"
                aria-label={`Mark ${notification.title} as read`}
                title="Mark as read"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => markRead(notification.id)}
              >
                <Check className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`Open demo notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Bell className="h-4 w-4" aria-hidden="true" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold leading-none text-destructive-foreground">
              {unreadCount}
            </span>
          )}
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Demo notifications</DialogTitle>
          <DialogDescription>
            Locally derived review and document reminders. They are not real-time service
            notifications.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-5">
          {notifications.length === 0 ? (
            <p className="rounded-lg border px-3 py-8 text-center text-sm text-muted-foreground">
              No open review or document items.
            </p>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {loaded ? `${unreadCount} unread` : "Loading saved read state…"}
                </p>
                <button
                  type="button"
                  disabled={!loaded || unreadCount === 0}
                  onClick={markAllRead}
                  className="rounded-md px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Mark all as read
                </button>
              </div>
              {reviews.length > 0 && (
                <section>
                  <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <UserRoundCheck className="h-4 w-4" aria-hidden="true" />
                    Reviews awaiting action
                    {reviewsUnread > 0 && (
                      <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary">
                        {reviewsUnread}
                      </span>
                    )}
                  </h3>
                  {renderItems(reviews)}
                </section>
              )}
              {attentionDocs.length > 0 && (
                <section>
                  <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <FileWarning className="h-4 w-4" aria-hidden="true" />
                    Documents to inspect
                    {documentsUnread > 0 && (
                      <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary">
                        {documentsUnread}
                      </span>
                    )}
                  </h3>
                  {renderItems(attentionDocs)}
                </section>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
