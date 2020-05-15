/**
 * Accounting API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
<<<<<<< HEAD
 * The version of the OpenAPI document: 2.1.3
=======
 * The version of the OpenAPI document: 2.1.2
>>>>>>> master
 * Contact: api@xero.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Attachment } from '././attachment';
import { Contact } from '././contact';
import { LineAmountTypes } from '././lineAmountTypes';
import { LineItem } from '././lineItem';
import { User } from '././user';
import { ValidationError } from '././validationError';

export class Receipt {
    /**
    * Date of receipt – YYYY-MM-DD
    */
    'date'?: string;
    'contact'?: Contact;
    'lineItems'?: Array<LineItem>;
    'user'?: User;
    /**
    * Additional reference number
    */
    'reference'?: string;
    'lineAmountTypes'?: LineAmountTypes;
    /**
    * Total of receipt excluding taxes
    */
    'subTotal'?: number;
    /**
    * Total tax on receipt
    */
    'totalTax'?: number;
    /**
    * Total of receipt tax inclusive (i.e. SubTotal + TotalTax)
    */
    'total'?: number;
    /**
    * Xero generated unique identifier for receipt
    */
    'receiptID'?: string;
    /**
    * Current status of receipt – see status types
    */
    'status'?: Receipt.StatusEnum;
    /**
    * Xero generated sequence number for receipt in current claim for a given user
    */
    'receiptNumber'?: string;
    /**
    * Last modified date UTC format
    */
    'updatedDateUTC'?: Date;
    /**
    * boolean to indicate if a receipt has an attachment
    */
    'hasAttachments'?: boolean;
    /**
    * URL link to a source document – shown as “Go to [appName]” in the Xero app
    */
    'url'?: string;
    /**
    * Displays array of validation error messages from the API
    */
    'validationErrors'?: Array<ValidationError>;
    /**
    * Displays array of warning messages from the API
    */
    'warnings'?: Array<ValidationError>;
    /**
    * Displays array of attachments from the API
    */
    'attachments'?: Array<Attachment>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "date",
            "baseName": "Date",
            "type": "string"
        },
        {
            "name": "contact",
            "baseName": "Contact",
            "type": "Contact"
        },
        {
            "name": "lineItems",
            "baseName": "LineItems",
            "type": "Array<LineItem>"
        },
        {
            "name": "user",
            "baseName": "User",
            "type": "User"
        },
        {
            "name": "reference",
            "baseName": "Reference",
            "type": "string"
        },
        {
            "name": "lineAmountTypes",
            "baseName": "LineAmountTypes",
            "type": "LineAmountTypes"
        },
        {
            "name": "subTotal",
            "baseName": "SubTotal",
            "type": "number"
        },
        {
            "name": "totalTax",
            "baseName": "TotalTax",
            "type": "number"
        },
        {
            "name": "total",
            "baseName": "Total",
            "type": "number"
        },
        {
            "name": "receiptID",
            "baseName": "ReceiptID",
            "type": "string"
        },
        {
            "name": "status",
            "baseName": "Status",
            "type": "Receipt.StatusEnum"
        },
        {
            "name": "receiptNumber",
            "baseName": "ReceiptNumber",
            "type": "string"
        },
        {
            "name": "updatedDateUTC",
            "baseName": "UpdatedDateUTC",
            "type": "Date"
        },
        {
            "name": "hasAttachments",
            "baseName": "HasAttachments",
            "type": "boolean"
        },
        {
            "name": "url",
            "baseName": "Url",
            "type": "string"
        },
        {
            "name": "validationErrors",
            "baseName": "ValidationErrors",
            "type": "Array<ValidationError>"
        },
        {
            "name": "warnings",
            "baseName": "Warnings",
            "type": "Array<ValidationError>"
        },
        {
            "name": "attachments",
            "baseName": "Attachments",
            "type": "Array<Attachment>"
        }    ];

    static getAttributeTypeMap() {
        return Receipt.attributeTypeMap;
    }
}

export namespace Receipt {
    export enum StatusEnum {
        DRAFT = <any> 'DRAFT',
        SUBMITTED = <any> 'SUBMITTED',
        AUTHORISED = <any> 'AUTHORISED',
        DECLINED = <any> 'DECLINED',
        VOIDED = <any> 'VOIDED'
    }
}
