import { UserController } from './../src/user/user.controller';
import { EventsGatewayService } from './../src/events-gateway/events-gateway.service';
import { UserModule } from './../src/user/user.module';
import { NestApplication } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { User } from '../src/entities/user.entity';
import { UserService } from '../src/user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';

const mockedUserRecord = {
  id: 'usercl5ba8w2800023b68rh6uliqe',
  joined_date: '2020-02-01T05:11:43.183Z',
  password: '9xto2def60',
  profile_image: 'https://api.lorem.space/image/face?w=150&h=150&hash=gi4a39oy',
  username: 'Lawrence.Rosenbaum70',
  createdAt: '2022-07-07T17:08:16.711Z',
  updatedAt: '2022-07-07T17:08:16.711Z',
};
const save = plainToClass(User, mockedUserRecord);

describe('UserController (e2e)', () => {
  let app: NestApplication;
  let userService = {
    findAll: () => [mockedUserRecord],
    create: () => mockedUserRecord,
    findOne: () => mockedUserRecord,
  };

  const mockedUserRepo = {
    save: jest.fn(() => Promise.resolve(save)),
    findAll: jest.fn(() => Promise.resolve([mockedUserRecord])),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockedUserRepo,
        },
        EventsGatewayService,
      ],
      controllers: [UserController],
    })
      .overrideProvider(UserService)
      .useValue(userService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/user')
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(userService.findAll());
      });
  });

  it('/ (POST)', () => {
    const query = {
      ...mockedUserRecord,
      createdAt: undefined,
      updatedAt: undefined,
    };
    return request(app.getHttpServer())
      .post('/user')
      .query(query)
      .then((result) => {
        expect(result.statusCode).toEqual(201);
        expect(result.body).toEqual(userService.create());
      });
  });

  it('/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/user/usercl5ba8w2800023b68rh6uliqe')
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(userService.findOne());
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
