import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('mocked config value'),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  test('Return root url string', () => {
    expect(appController.getRoot()).toBe('Hello TBL!');
  });
});
