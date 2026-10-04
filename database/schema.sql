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
