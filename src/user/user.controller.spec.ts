import { EventsGatewayService } from '../events-gateway/events-gateway.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const mockedUserRecord = {
  id: 'usercl5ba8w2800023b68rh6uliqe',
  joined_date: new Date('2020-02-01T05:11:43.183Z'),
  password: '9xto2def60',
  profile_image: 'https://api.lorem.space/image/face?w=150&h=150&hash=gi4a39oy',
  username: 'Lawrence.Rosenbaum70',
  createdAt: new Date('2022-07-07T17:08:16.711Z'),
  updatedAt: new Date('2022-07-07T17:08:16.711Z'),
} as User;
const save = plainToClass(User, mockedUserRecord);

describe('CatsController', () => {
  let userController: UserController;
  let userService: UserService;

  const mockedUserRepo = {
    save: jest.fn(() => Promise.resolve(save)),
    findAll: jest.fn(() => Promise.resolve([mockedUserRecord])),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockedUserRepo,
        },
        EventsGatewayService,
      ],
      controllers: [UserController],
    }).compile();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
  });

  describe('create', () => {
    it('should return an user', async () => {
      const result: User = mockedUserRecord;
      jest.spyOn(userService, 'create').mockResolvedValue(result);
      expect(
        await userController.create({
          ...mockedUserRecord,
        }),
      ).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of user', async () => {
      const result: User[] = [mockedUserRecord];
      jest.spyOn(userService, 'findAll').mockResolvedValue(result);
      expect(await userController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return an user', async () => {
      const result: User = mockedUserRecord;
      jest.spyOn(userService, 'findOne').mockResolvedValue(result);
      expect(
        await userController.findOne('usercl5ba8w2800023b68rh6uliqe'),
      ).toBe(result);
    });
  });
});
