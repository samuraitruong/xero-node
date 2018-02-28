import { InMemoryOAuthLib } from './InMenoryOAuthLib';
import { XeroAPIClient } from '../../XeroAPIClient';
import * as path from 'path';
import * as fs from 'fs';

describe('client', () => {
	describe('and private key errors', () => {
		it('throws when using invalid private key', () => {
			// TODO: Needed or nah?
		});
	});

	describe('and 404 errors', () => {
		const inMemoryOAuth = new InMemoryOAuthLib();
		let xeroClient: XeroAPIClient = null;

		beforeAll(async () => {

			const privateKeyFile = path.resolve(__dirname + '/test-privatekey.pem');
			const privateKey = fs.readFileSync(privateKeyFile, 'utf8');

			inMemoryOAuth.callbackResultsForNextCall({
				statusCode: 404,
				data: 'The resource you\'re looking for cannot be found'
			}, `The resource you're looking for cannot be found`, { statusCode: 404 });

			// TODO: Move to test utils: GetTestClient() or something
			xeroClient = new XeroAPIClient({
				appType: 'private',
				consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
				privateKey: privateKey
			}, null, inMemoryOAuth);

		});

		it('error is expected', async () => {
			expect.assertions(1);
			try {
				await xeroClient.invoices.get();
			} catch (error){
				expect(error).toMatchObject({
					statusCode: 404,
					body: 'The resource you\'re looking for cannot be found'
				});
			}
		});
	});

	describe('and 400 validation errors', () => {
	});
});
