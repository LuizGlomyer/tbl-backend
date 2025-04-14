import { relations } from 'drizzle-orm';
import { Platforms } from './platforms';
import { Media } from './media';

export const PlatformsRelations = relations(Platforms, ({ one }) => ({
  media: one(Media, {
    fields: [Platforms.mediaId],
    references: [Media.id],
  }),
}));
