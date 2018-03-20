
import * as fs from 'fs';
import { AccountsResponse, InvoicesResponse, Invoice, ContactGroupsResponse, ContactGroup, CurrenciesResponse, EmployeesResponse, Currency, Employee, ContactsResponse, ReportsResponse, AttachmentsResponse, OrganisationResponse, Contact, UsersResponse, BrandingThemesResponse, BankTransfersResponse, BankTransfer, TrackingCategoriesResponse, TrackingCategory, TrackingOption, TaxRatesResponse } from './AccountingAPI-types';
import { IXeroClientConfiguration, BaseAPIClient } from './internals/BaseAPIClient';
import { IOAuth1HttpClient } from './internals/OAuth1HttpClient';
import { generateQueryString } from './internals/utils';

export interface QueryArgs {
	where?: string;
	order?: string;
}

export interface HeaderArgs {
	'If-Modified-Since'?: string;
}

export class AccountingAPIClient extends BaseAPIClient {

	public constructor(options: IXeroClientConfiguration, _oAuth1HttpClient?: IOAuth1HttpClient) {
		super(options, {}, _oAuth1HttpClient);
	}

	private generateHeader(args: HeaderArgs) {
		if (args && args['If-Modified-Since']) {
			const toReturn = {
				'If-Modified-Since': args['If-Modified-Since']
			};

			delete args['If-Modified-Since'];
			return toReturn;
		}
	}

	public accounts = {
		get: async (args?: { AccountID?: string } & QueryArgs & HeaderArgs): Promise<AccountsResponse> => {
			let endpoint = 'accounts';
			if (args && args.AccountID) {
				endpoint = endpoint + '/' + args.AccountID;
				delete args.AccountID; // remove from query string
			}
			const header = this.generateHeader(args);
			endpoint += generateQueryString(args);

			return this.oauth1Client.get<AccountsResponse>(endpoint, header);
		},
		create: async (account: Account): Promise<AccountsResponse> => {
			// from docs: You can only add accounts one at a time (i.e. you'll need to do multiple API calls to add many accounts)
			const endpoint = 'accounts';
			return this.oauth1Client.put<AccountsResponse>(endpoint, account);
		},
		update: async (account: Account, args?: { AccountID?: string }): Promise<AccountsResponse> => {
			// from docs: You can only update accounts one at a time (i.e. you’ll need to do multiple API calls to update many accounts)
			let endpoint = 'accounts';
			if (args && args.AccountID) {
				endpoint = endpoint + '/' + args.AccountID;
				delete args.AccountID; // remove from query string
			}
			endpoint += generateQueryString(args);

			return this.oauth1Client.post<AccountsResponse>(endpoint, account);
		},
		delete: async (args: { AccountID: string }): Promise<AccountsResponse> => {
			// from docs: If an account is not able to be deleted (e.g. ssystem accounts and accounts used on transactions) you can update the status to ARCHIVED.
			const endpoint = 'accounts/' + args.AccountID;
			return this.oauth1Client.delete<AccountsResponse>(endpoint);
		},
		attachments: this.generateAttachmentsEndpoint('accounts')
	};

	public invoices = {
		get: async (args?: { InvoiceID?: string, InvoiceNumber?: string, page?: number, createdByMyApp?: boolean } & HeaderArgs & QueryArgs): Promise<InvoicesResponse> => {
			let endpoint = 'invoices';
			if (args && args.InvoiceID) {
				endpoint = endpoint + '/' + args.InvoiceID;
				delete args.InvoiceID;
			} else if (args && args.InvoiceNumber) {
				endpoint = endpoint + '/' + args.InvoiceNumber;
				delete args.InvoiceNumber;
			}

			const header = this.generateHeader(args);
			endpoint += generateQueryString(args);

			return this.oauth1Client.get<InvoicesResponse>(endpoint, header);
		},
		savePDF: async (args?: { InvoiceID: string, InvoiceNumber?: string, savePath: string }): Promise<void> => {
			let endpoint = 'invoices';
			if (args && args.InvoiceID) {
				endpoint = endpoint + '/' + args.InvoiceID;
				delete args.InvoiceID;
			} else if (args && args.InvoiceNumber) {
				endpoint = endpoint + '/' + args.InvoiceNumber;
				delete args.InvoiceNumber;
			}
			endpoint += generateQueryString(args);

			const writeStream = fs.createWriteStream(args.savePath);

			return this.oauth1Client.writeUTF8ResponseToStream(endpoint, 'application/pdf', writeStream);
		},
		create: async (invoice: Invoice | { Invoices: Invoice[] }, args?: { summarizeErrors?: boolean }): Promise<InvoicesResponse> => {
			const endpoint = 'invoices' + generateQueryString(args, true);

			return this.oauth1Client.put<InvoicesResponse>(endpoint, invoice);
		},
		update: async (invoices: Invoice | Invoice[], args?: { InvoiceID?: string, InvoiceNumber?: string, where?: string, summarizeErrors?: boolean }): Promise<InvoicesResponse> => {
			let endpoint = `invoices`;

			if (args && args.InvoiceID) {
				endpoint = endpoint + '/' + args.InvoiceID;
				delete args.InvoiceID;
			} else if (args && args.InvoiceNumber) {
				endpoint = endpoint + '/' + args.InvoiceNumber;
				delete args.InvoiceNumber;
			}

			endpoint += generateQueryString(args, true);

			return this.oauth1Client.post<InvoicesResponse>(endpoint, invoices);
		},
		onlineInvoice: {
			get: async (args?: { InvoiceID: string }): Promise<string> => {
				let endpoint = 'invoices';
				if (args && args.InvoiceID) {
					endpoint = endpoint + '/' + args.InvoiceID;
					delete args.InvoiceID;
				}

				endpoint += '/onlineinvoice';

				return this.oauth1Client.get<any>(endpoint);
			}
		},
		attachments: this.generateAttachmentsEndpoint('invoices')
	};

	private generateAttachmentsEndpoint(path: string) {
		return {
			get: async (args?: { EntityID: string }): Promise<AttachmentsResponse> => {
				const endpoint = `${path}/${args.EntityID}/attachments`;
				return this.oauth1Client.get<AttachmentsResponse>(endpoint);
			},
			downloadAttachment: async (args?: { entityID: string, mimeType: string, fileName: string, pathToSave: string }) => {
				const endpoint = `${path}/${args.entityID}/attachments/${args.fileName}`;
				const writeStream = fs.createWriteStream(args.pathToSave);

				await this.oauth1Client.writeBinaryResponseToStream(endpoint, args.mimeType, writeStream);
			},
			uploadAttachment: async (args?: { entityID: string, mimeType: string, fileName: string, pathToUpload: string }) => {
				const endpoint = `${path}/${args.entityID}/attachments/${args.fileName}`;
				const readStream = fs.createReadStream(args.pathToUpload);

				const fileSize = fs.statSync(args.pathToUpload).size;

				return this.oauth1Client.readStreamToRequest(endpoint, args.mimeType, fileSize, readStream);
			},
		};
	}

	public contactgroups = {
		get: async (args?: { ContactGroupID?: string } & QueryArgs): Promise<ContactGroupsResponse> => {

			let endpoint = 'contactgroups';
			if (args && args.ContactGroupID) {
				endpoint = endpoint + '/' + args.ContactGroupID;
				delete args.ContactGroupID;
			}

			endpoint += generateQueryString(args);

			return this.oauth1Client.get<ContactGroupsResponse>(endpoint);
		},
		create: async (contactGroups: ContactGroup | ContactGroup[], args?: { summarizeErrors?: boolean }): Promise<ContactGroupsResponse> => {
			const endpoint = 'contactgroups' + generateQueryString(args, true);

			return this.oauth1Client.put<ContactGroupsResponse>(endpoint, contactGroups);
		},
		update: async (contactGroups: ContactGroup | ContactGroup[], args?: { ContactGroupID: string, summarizeErrors?: boolean }): Promise<ContactGroupsResponse> => {
			let endpoint = 'contactgroups';
			if (args && args.ContactGroupID) {
				endpoint = endpoint + '/' + args.ContactGroupID;
				delete args.ContactGroupID;
			}
			endpoint += generateQueryString(args, true);

			return this.oauth1Client.post<ContactGroupsResponse>(endpoint, contactGroups);
		},
		contacts: {
			delete: async (args: { ContactGroupID: string, ContactID?: string }): Promise<ContactsResponse> => {
				let endpoint = 'contactgroups';
				if (args && args.ContactGroupID) {
					endpoint = endpoint + '/' + args.ContactGroupID + '/contacts';
					delete args.ContactGroupID;
					if (args.ContactID) {
						endpoint = endpoint + '/' + args.ContactID;
						delete args.ContactID;
					}
				}
				endpoint += generateQueryString(args, true);

				return this.oauth1Client.delete<ContactsResponse>(endpoint);
			},
			create: async (contact: Contact, args: { ContactGroupID: string }): Promise<ContactsResponse> => {
				let endpoint = 'contactgroups';
				if (args && args.ContactGroupID) {
					endpoint = endpoint + '/' + args.ContactGroupID + '/contacts';
					delete args.ContactGroupID;
				}
				endpoint += generateQueryString(args, true);

				return this.oauth1Client.put<ContactsResponse>(endpoint, contact);
			}
		}
	};

	public currencies = {
		get: async (args?: { } & QueryArgs): Promise<CurrenciesResponse> => {
			const endpoint = 'currencies' + generateQueryString(args);

			return this.oauth1Client.get<CurrenciesResponse>(endpoint);
		},
		create: async (currency: Currency): Promise<CurrenciesResponse> => {
			const endpoint = 'currencies';
			return this.oauth1Client.put<CurrenciesResponse>(endpoint, currency);
		}
	};

	public employees = {
		get: async (args?: { EmployeeID?: string } & QueryArgs & HeaderArgs): Promise<EmployeesResponse> => {
			let endpoint = 'employees';
			if (args && args.EmployeeID) {
				endpoint = endpoint + '/' + args.EmployeeID;
				delete args.EmployeeID;
			}
			const header = this.generateHeader(args);

			endpoint += generateQueryString(args);

			return this.oauth1Client.get<EmployeesResponse>(endpoint, header);
		},
		create: async (employee: Employee | { Employees: Employee[] }): Promise<EmployeesResponse> => {
			const endpoint = 'employees';
			return this.oauth1Client.put<EmployeesResponse>(endpoint, employee);
		},
		update: async (employee: Employee | { Employees: Employee[] }): Promise<EmployeesResponse> => {
			const endpoint = 'employees';
			return this.oauth1Client.post<EmployeesResponse>(endpoint, employee);
		}
	};

	public trackingCategories = {
		get: async (args?: { TrackingCategoryID?: string, includeArchived?: boolean } & HeaderArgs & QueryArgs): Promise<TrackingCategoriesResponse> => {
			// TODO: Support for where arg
			let endpoint = 'trackingcategories';
			if (args && args.TrackingCategoryID) {
				endpoint = endpoint + '/' + args.TrackingCategoryID;
			}

			const headers = this.generateHeader(args);
			endpoint += generateQueryString(args);

			return this.oauth1Client.get<TrackingCategoriesResponse>(endpoint, headers);
		},
		create: async (trackingCategory: TrackingCategory | TrackingCategory[]): Promise<any> => {
			const endpoint = 'trackingcategories';
			return this.oauth1Client.put<TrackingCategoriesResponse>(endpoint, trackingCategory);
		},
		update: async (trackingCategory: TrackingCategory | TrackingCategory[], args?: { TrackingCategoryID: string }): Promise<TrackingCategoriesResponse> => {
			let endpoint = 'trackingcategories';
			if (args && args.TrackingCategoryID) {
				endpoint = endpoint + '/' + args.TrackingCategoryID;
				delete args.TrackingCategoryID;
			}

			return this.oauth1Client.post<TrackingCategoriesResponse>(endpoint, trackingCategory);
		},
		delete: async (args: { TrackingCategoryID: string }): Promise<any> => {
			const endpoint = 'trackingcategories/' + args.TrackingCategoryID;
			return this.oauth1Client.delete<any>(endpoint);
		},
		trackingOptions: {
			create: async (trackingOption: TrackingOption | TrackingOption[], args?: { TrackingCategoryID: string }): Promise<TrackingCategoriesResponse> => {
				let endpoint = 'trackingcategories';
				if (args && args.TrackingCategoryID) {
					endpoint = endpoint + '/' + args.TrackingCategoryID + '/Options';
					delete args.TrackingCategoryID;
				}

				return this.oauth1Client.put<TrackingCategoriesResponse>(endpoint, trackingOption);
			},
			update: async (trackingOption: TrackingOption | TrackingOption[], args?: { TrackingCategoryID: string, TrackingOptionID: string }): Promise<TrackingCategoriesResponse> => {
				let endpoint = 'trackingcategories';
				if (args && args.TrackingCategoryID && args.TrackingOptionID) {
					endpoint = endpoint + '/' + args.TrackingCategoryID + '/Options/' + args.TrackingOptionID;
					delete args.TrackingCategoryID;
					delete args.TrackingOptionID;
				}

				return this.oauth1Client.post<TrackingCategoriesResponse>(endpoint, trackingOption);
			},
			delete: async (args: { TrackingCategoryID: string, TrackingOptionID: string}): Promise<any> => {
				const endpoint = 'trackingcategories/' + args.TrackingCategoryID + '/Options/' + args.TrackingOptionID;
				return this.oauth1Client.delete<any>(endpoint);
			},
		}
	};

	public users = {
		get: async (args?: { UserID?: string } & HeaderArgs & QueryArgs): Promise<UsersResponse> => {
			let endpoint = 'users';
			if (args && args.UserID) {
				endpoint = endpoint + '/' + args.UserID;
				delete args.UserID;
			}

			const headers = this.generateHeader(args);

			endpoint += generateQueryString(args);

			return this.oauth1Client.get<UsersResponse>(endpoint, headers);
		}
	};

	public brandingThemes = {
		get: async (args?: { BrandingThemeID?: string }): Promise<BrandingThemesResponse> => {
			let endpoint = 'brandingthemes';
			if (args && args.BrandingThemeID) {
				endpoint = endpoint + '/' + args.BrandingThemeID;
				delete args.BrandingThemeID;
			}

			return this.oauth1Client.get<BrandingThemesResponse>(endpoint);
		}
	};

	public bankTransfers = {
		get: async (args?: { BankTransferID?: string } & HeaderArgs & QueryArgs): Promise<BankTransfersResponse> => {
			let endpoint = 'banktransfers';
			if (args && args.BankTransferID) {
				endpoint = endpoint + '/' + args.BankTransferID;
				delete args.BankTransferID;
			}

			endpoint += generateQueryString(args);

			return this.oauth1Client.get<BankTransfersResponse>(endpoint, this.generateHeader(args));
		},
		create: async (bankTransfer: BankTransfer & BankTransfer[], args?: { summarizeErrors: boolean }): Promise<BankTransfersResponse> => {
			let endpoint = 'banktransfers';
			endpoint += generateQueryString(args, true);
			return this.oauth1Client.put<BankTransfersResponse>(endpoint, bankTransfer);
		}

	};

	public organisation = {
		get: async (): Promise<OrganisationResponse> => {
			const endpoint = 'organisation';
			return this.oauth1Client.get<OrganisationResponse>(endpoint);
		},
		CISSettings: {
			get: async (args: { OrganisationID: string, where?: string }): Promise<OrganisationResponse> => {
				let endpoint = 'organisation';
				if (args && args.OrganisationID) {
					endpoint = endpoint + '/' + args.OrganisationID + '/CISSettings';
					delete args.OrganisationID;
				}
				endpoint += generateQueryString(args);

				return this.oauth1Client.get<OrganisationResponse>(endpoint);
			}
		}
	};

	public contacts = {
		get: async (): Promise<ContactsResponse> => {
			const endpoint = 'contacts';
			return this.oauth1Client.get<ContactsResponse>(endpoint);
		},
		create: async (body?: object, args?: { summarizeErrors: boolean }): Promise<ContactsResponse> => {
			let endpoint = 'contacts';
			endpoint += generateQueryString(args, true);
			return this.oauth1Client.post<ContactsResponse>(endpoint, body);
		},
		attachments: this.generateAttachmentsEndpoint('contacts')
	};

	public reports = {
		get: async (args?: { ReportID: string }): Promise<ReportsResponse> => {
			let endpoint = 'reports';
			if (args) {
				const reportId = args.ReportID;
				delete args.ReportID; // remove from querystring

				endpoint = endpoint + '/' + reportId + generateQueryString(args);
			}

			return this.oauth1Client.get<ReportsResponse>(endpoint);
		}
	};

	public taxRates = {
		get: async (args?: { TaxType?: string } & QueryArgs): Promise<TaxRatesResponse> => {
			let endpoint = 'taxrates';
			if (args && args.TaxType) {
				endpoint += '/' + args.TaxType;
				delete args.TaxType;
			}
			endpoint += generateQueryString(args);
			return this.oauth1Client.get<TaxRatesResponse>(endpoint);
		}
	};

	public purchaseorders = {
		create: async (body?: object, args?: { summarizeErrors: boolean }): Promise<any> => {
			let endpoint = 'purchaseorders';
			endpoint += generateQueryString(args, true);
			// TODO: Add interface here
			return this.oauth1Client.post<any>(endpoint, body);
		}
	};
}
