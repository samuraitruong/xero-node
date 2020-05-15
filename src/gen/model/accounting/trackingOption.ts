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


export class TrackingOption {
    /**
    * The Xero identifier for a tracking optione.g. ae777a87-5ef3-4fa0-a4f0-d10e1f13073a
    */
    'trackingOptionID'?: string;
    /**
    * The name of the tracking option e.g. Marketing, East (max length = 50)
    */
    'name'?: string;
    /**
    * The status of a tracking option
    */
    'status'?: TrackingOption.StatusEnum;
    /**
    * Filter by a tracking categorye.g. 297c2dc5-cc47-4afd-8ec8-74990b8761e9
    */
    'trackingCategoryID'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "trackingOptionID",
            "baseName": "TrackingOptionID",
            "type": "string"
        },
        {
            "name": "name",
            "baseName": "Name",
            "type": "string"
        },
        {
            "name": "status",
            "baseName": "Status",
            "type": "TrackingOption.StatusEnum"
        },
        {
            "name": "trackingCategoryID",
            "baseName": "TrackingCategoryID",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return TrackingOption.attributeTypeMap;
    }
}

export namespace TrackingOption {
    export enum StatusEnum {
        ACTIVE = <any> 'ACTIVE',
        ARCHIVED = <any> 'ARCHIVED',
        DELETED = <any> 'DELETED'
    }
}
