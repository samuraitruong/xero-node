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

import { RepeatingInvoice } from '././repeatingInvoice';

export class RepeatingInvoices {
    'repeatingInvoices'?: Array<RepeatingInvoice>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "repeatingInvoices",
            "baseName": "RepeatingInvoices",
            "type": "Array<RepeatingInvoice>"
        }    ];

    static getAttributeTypeMap() {
        return RepeatingInvoices.attributeTypeMap;
    }
}

