# xero-node (alpha)

## Release of SDK with oAuth 2 support
Version 4.x of Xero NodeJS SDK only supports oAuth2 authentication and the following API sets.
* accounting

Coming soon
* fixed asset 
* bank feeds 
* files 
* payroll
* projects
* xero hq


## Usage
Installation
```sh
npm install @xero/xero-node-sdk
```
Example
```js
import { XeroClient } from "xero-node-sdk";

const client_id = 'YOUR-CLIENT_ID'
const client_secret = 'YOUR-CLIENT_SECRET'
const redirectUri = 'http://www.yourdomain.com/callback'
const scopes = 'openid profile email accounting.transactions offline_access'

const xero = new XeroClient({
        clientId: client_id,
        clientSecret: client_secret,
        redirectUris: [redirectUri],
        scopes: scopes.split(" ")
      });

// Get authorization for user
let consentUrl = await xeroClient.buildConsentUrl();

// Redirect user's browser to the consentUrl
// User will login to Xero and grant your app access
// User will be returned to the redirectUri (aka Callback URL)

//On callback - get token from Xero
//Get the query string (i.e. with express req.query)
await  xero.setAccessTokenFromRedirectUri(req.query);

// Optional: read user info from the id token
let tokenClaims = await xeroClient.readIdTokenClaims();
  
//Call the Xero API
let apiResponse = await xero.accountingApi.getInvoices(xero.tenantIds[0]);
console.log("Invoices[1]: ", apiResponse.body.invoices[0].invoiceID);

// Refresh the token when it expires
await xeroClient.refreshToken();
```


#### Project Structure
```
src/
  |-  gen/        autogenerated TypeScript
  `-  *.ts        handwritten TypeScript
dist/             compiled JavaScript
package.json
```
