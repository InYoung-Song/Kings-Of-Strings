-- Optional seed data. Safe to skip: the public site renders its music section
-- from lib/content.ts, so this only pre-populates the future admin "music
-- manager" with the two real releases. NO tour dates are seeded (none exist on
-- the original site, and we never invent them).

insert into music_releases (title, type, cover_path, spotify_url, apple_music_url, other_links, sort_order, is_published)
select
  'Dead Man Walking', 'single',
  '/media/original/dead-man-walking-cover.png',
  'https://open.spotify.com/album/4CaDrhtSHlGOR30RteRuNz?si=06rYIMLAT2CxGLmqe3A4cQ',
  null, '[]'::jsonb, 0, true
where not exists (select 1 from music_releases where title = 'Dead Man Walking');

insert into music_releases (title, type, cover_path, spotify_url, apple_music_url, other_links, sort_order, is_published)
select
  'Memento LP', 'album',
  '/media/original/memento-cover.jpg',
  'https://open.spotify.com/album/45YyDgjBPpnp9NhbNTVKjZ?si=4i9CW_YERF-WemCSPiWlkA',
  'https://music.apple.com/us/album/memento/1753625844',
  '[{"label":"iHeartRadio","href":"https://www.iheart.com/artist/the-kings-of-strings-38709864/albums/the-kings-of-strings-191431752/"}]'::jsonb,
  1, true
where not exists (select 1 from music_releases where title = 'Memento LP');
