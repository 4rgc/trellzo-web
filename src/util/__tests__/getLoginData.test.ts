import getLoginData from '../getLoginData';
import Cookie from 'js-cookie';
import jwt from 'jsonwebtoken';

describe('getLoginData', () => {
	let mockCookieGet: jest.SpyInstance | undefined;

	beforeAll(() => {
		mockCookieGet = jest.spyOn(Cookie, 'get');
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

	it('returns an empty login object if no auth token is present', () => {
		// Arrange
		mockCookieGet?.mockReturnValueOnce(undefined);
		// Act
		const login = getLoginData();
		// Assert
		expect(login.isEmpty()).toStrictEqual(true);
		expect(login.isExpired()).toStrictEqual(true);
	});

	it('returns an expired login object if the auth token is expired', () => {
		// Arrange
		mockCookieGet?.mockReturnValueOnce(
			jwt.sign({ userId: 'userId' }, 'secretkey', { expiresIn: '-10s' })
		);
		// Act
		const login = getLoginData();
		// Assert
		expect(login.userId).toStrictEqual('userId');
		expect(login.isEmpty()).toStrictEqual(false);
		expect(login.isExpired()).toStrictEqual(true);
	});

	it('returns a valid login object if the auth token is valid', () => {
		// Arrange
		mockCookieGet?.mockReturnValueOnce(
			jwt.sign({ userId: 'userId' }, 'secretkey', { expiresIn: '10s' })
		);
		// Act
		const login = getLoginData();
		// Assert
		expect(login.userId).toStrictEqual('userId');
		expect(login.isEmpty()).toStrictEqual(false);
		expect(login.isExpired()).toStrictEqual(false);
	});

	it("returns an empty login object if the auth token doesn't have an expiration time", () => {
		// Arrange
		mockCookieGet?.mockReturnValueOnce(
			jwt.sign({ userId: 'userId' }, 'secretkey')
		);
		// Act
		const login = getLoginData();
		// Assert
		expect(login.userId).toStrictEqual('');
		expect(login.isEmpty()).toStrictEqual(true);
		expect(login.isExpired()).toStrictEqual(true);
	});
});
