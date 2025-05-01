import { relations } from 'drizzle-orm';
import { Platforms } from '../tables/content/platforms';
import { Media } from '../tables/content/media';

export const PlatformsRelations = relations(Platforms, ({ one }) => ({
  media: one(Media, {
    fields: [Platforms.mediaId],
    references: [Media.id],
  }),
}));
