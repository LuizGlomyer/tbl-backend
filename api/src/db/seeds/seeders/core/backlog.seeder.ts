import { BacklogService } from '../../../../modules/core/backlog/backlog.service';

import { TABLE_BACKLOG } from '../../../schema/tables/core/backlog';

export class BacklogSeeder {
  constructor(private backlogService: BacklogService) {}

  async seed() {
    console.log(`INSERT ${TABLE_BACKLOG}`);
    await this.backlogService.create({
      userMediaId: 1,
      statusId: 2,
      rating: '7.2',
      review:
        'Switch is a good console, but has its faults. Like the Joy-Con drift issue.',
      reviewContainsSpoilers: false,
      personalCommentary: 'Great library',
      timeSpent: '910:22:50',
    });
    await this.backlogService.create({
      userMediaId: 2,
      statusId: 3,
      rating: '9.7',
      review:
        'Death Strangding good. Kojima is a genius. The game is a masterpiece.',
      reviewContainsSpoilers: true,
      personalCommentary: "Didn't understand anything tbh",
      timeSpent: '41:44:33',
    });
    await this.backlogService.create({
      userMediaId: 3,
      statusId: 5,
      rating: '10.0',
      review: 'Good fighting game',
      reviewContainsSpoilers: false,
      personalCommentary: 'Smash is so much fun with friends!',
      timeSpent: '10:30:00',
    });
    await this.backlogService.create({
      userMediaId: 3,
      statusId: 1,
      rating: '9.4',
      review:
        'This a replay after going pro. This game has some balancing issues but is still quite solid.',
      reviewContainsSpoilers: false,
      personalCommentary: 'Main Captain Falcon',
      timeSpent: '99:44:00',
    });
    await this.backlogService.create({
      userMediaId: 4,
      statusId: 2,
      rating: '10.0',
      review: 'Great console.',
      reviewContainsSpoilers: false,
      personalCommentary: 'Sony!',
      timeSpent: '550:30:00',
    });
    await this.backlogService.create({
      userMediaId: 5,
      statusId: 1,
    });
  }
}
