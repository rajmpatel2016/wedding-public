import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Connection, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
	findOne: jest.fn(),
	find: jest.fn(),
	create: jest.fn(),
	save: jest.fn(),
	preload: jest.fn(),
	update: jest.fn(),
});

describe('UsersService', () => {
	let service: UsersService;
	let userRepository: MockRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				{ provide: Connection, useValue: {} },
				{
					provide: getRepositoryToken(Users),
					useValue: createMockRepository(),
				},
			],
		}).compile();

		service = module.get<UsersService>(UsersService);
		userRepository = module.get<MockRepository>(getRepositoryToken(Users));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('findOne', () => {
		describe('when user with ID exists', () => {
			it('should return the user object', async () => {
				const userId = 1;
				const expectedUser = {};

				userRepository.findOne.mockReturnValue(expectedUser);
				const user = await service.findOne(userId);
				expect(user).toEqual(expectedUser);
			});
		});
		describe('otherwise', () => {
			it('should throw the "NotFoundException"', async () => {
				const userId = 1;
				userRepository.findOne.mockReturnValue(undefined);
				try {
					await service.findOne(userId);
				} catch (err) {
					expect(err).toBeInstanceOf(NotFoundException);
					expect(err.message).toEqual(`User #${userId} not found`);
				}
			});
		});
	});

	describe('findAll', () => {
		describe('when all users return', () => {
			it('should return the user object', async () => {
				const users = [
					{
						name: 'Subway',
						description: 'Best Sandwich',
						imageUrl: 'some url',
						averageRating: 4,
						ratingsCount: 2,
					},
				];

				userRepository.find.mockReturnValue(users);
				const user = await service.findAll();
				expect(user).toEqual(users);
			});
		});
		describe('otherwise', () => {
			it('should throw the "NotFoundException"', async () => {
				const userId = 1;
				userRepository.findOne.mockReturnValue(undefined);
				try {
					await service.findOne(userId);
				} catch (err) {
					expect(err).toBeInstanceOf(NotFoundException);
					expect(err.message).toEqual(`User #${userId} not found`);
				}
			});
		});
	});

	describe('create', () => {
		describe('when create a user', () => {
			it('should return the user object', async () => {
				const expectedUser = {
					name: 'john',
					email: 'john@dispostable.com',
					password: 'password',
				};

				userRepository.save.mockReturnValue(expectedUser);
				const user = await service.create(expectedUser);
				expect(user).toEqual(expectedUser);
			});
		});
	});

	describe('update', () => {
		describe('when update a user', () => {
			it('should return the user object', async () => {
				const expectedUser = {
					id: '1',
					name: 'john',
					email: 'john@dispostable.com',
				};

				userRepository.save.mockReturnValue(expectedUser);
				userRepository.preload.mockReturnValue(expectedUser);
				const user = await service.update('1', expectedUser);
				expect(user).toEqual(expectedUser);
			});
		});
		describe('when update a non existent user', () => {
			it('should throw an error', async () => {
				const userId = '1';
				const expectedUser = {
					id: '1',
					name: 'john',
					email: 'john@dispostable.com',
				};

				userRepository.preload.mockReturnValue(undefined);
				try {
					await service.update(userId, expectedUser);
				} catch (err) {
					expect(err).toBeInstanceOf(NotFoundException);
					expect(err.message).toEqual(`User #${userId} not found`);
				}
			});
		});
	});
});
