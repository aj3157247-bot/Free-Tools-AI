CREATE TABLE IF NOT EXISTS sessions (
 sid TEXT PRIMARY KEY,
 first_seen INTEGER NOT NULL,
 last_seen INTEGER NOT NULL,
 country TEXT,
 device TEXT
);
CREATE TABLE IF NOT EXISTS pageviews (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 sid TEXT NOT NULL,
 path TEXT NOT NULL,
 title TEXT,
 referrer TEXT,
 lang TEXT,
 country TEXT,
 device TEXT,
 created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS events (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 sid TEXT NOT NULL,
 event TEXT NOT NULL,
 target TEXT,
 path TEXT,
 created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_pageviews_created ON pageviews(created_at);
CREATE INDEX IF NOT EXISTS idx_pageviews_path ON pageviews(path);
CREATE INDEX IF NOT EXISTS idx_events_created ON events(created_at);

CREATE TABLE IF NOT EXISTS ads (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 title TEXT NOT NULL,
 description TEXT,
 image_url TEXT,
 target_url TEXT NOT NULL,
 placement TEXT NOT NULL DEFAULT 'top',
 status TEXT NOT NULL DEFAULT 'draft',
 start_at INTEGER NOT NULL DEFAULT 0,
 end_at INTEGER NOT NULL DEFAULT 0,
 impressions INTEGER NOT NULL DEFAULT 0,
 clicks INTEGER NOT NULL DEFAULT 0,
 created_at INTEGER NOT NULL,
 updated_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_ads_status_placement ON ads(status,placement);
