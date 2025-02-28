CREATE TABLE IF NOT EXISTS _content_info (id TEXT PRIMARY KEY, "ready" BOOLEAN, "version" VARCHAR);
INSERT INTO _content_info VALUES ('checksum_content', false, 'v3.2.0--3Efr8LAR3J');
DROP TABLE IF EXISTS _content_content;
CREATE TABLE IF NOT EXISTS _content_content (id TEXT PRIMARY KEY, "title" VARCHAR, "body" TEXT, "description" VARCHAR, "extension" VARCHAR, "meta" TEXT, "navigation" TEXT DEFAULT true, "path" VARCHAR, "seo" TEXT DEFAULT '{}', "stem" VARCHAR);
UPDATE _content_info SET ready = true WHERE id = 'checksum_content';