/**
 * Xero Payroll AU
 * This is the Xero Payroll API for orgs in Australia region.
 *
 * The version of the OpenAPI document: 2.2.10
 * Contact: api@xero.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { PayRunStatus } from '././payRunStatus';
import { PayslipSummary } from '././payslipSummary';
import { ValidationError } from '././validationError';

export class PayRun {
    /**
    * Xero identifier for pay run
    */
    'payrollCalendarID': string;
    /**
    * Xero identifier for pay run
    */
    'payRunID'?: string;
    /**
    * Period Start Date for the PayRun (YYYY-MM-DD)
    */
    'payRunPeriodStartDate'?: string;
    /**
    * Period End Date for the PayRun (YYYY-MM-DD)
    */
    'payRunPeriodEndDate'?: string;
    'payRunStatus'?: PayRunStatus;
    /**
    * Payment Date for the PayRun (YYYY-MM-DD)
    */
    'paymentDate'?: string;
    /**
    * Payslip message for the PayRun
    */
    'payslipMessage'?: string;
    /**
    * Last modified timestamp
    */
    'updatedDateUTC'?: Date;
    /**
    * The payslips in the payrun
    */
    'payslips'?: Array<PayslipSummary>;
    /**
    * The total Wages for the Payrun
    */
    'wages'?: number;
    /**
    * The total Deductions for the Payrun
    */
    'deductions'?: number;
    /**
    * The total Tax for the Payrun
    */
    'tax'?: number;
    /**
    * The total Super for the Payrun
    */
    '_super'?: number;
    /**
    * The total Reimbursements for the Payrun
    */
    'reimbursement'?: number;
    /**
    * The total NetPay for the Payrun
    */
    'netPay'?: number;
    /**
    * Displays array of validation error messages from the API
    */
    'validationErrors'?: Array<ValidationError>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "payrollCalendarID",
            "baseName": "PayrollCalendarID",
            "type": "string"
        },
        {
            "name": "payRunID",
            "baseName": "PayRunID",
            "type": "string"
        },
        {
            "name": "payRunPeriodStartDate",
            "baseName": "PayRunPeriodStartDate",
            "type": "string"
        },
        {
            "name": "payRunPeriodEndDate",
            "baseName": "PayRunPeriodEndDate",
            "type": "string"
        },
        {
            "name": "payRunStatus",
            "baseName": "PayRunStatus",
            "type": "PayRunStatus"
        },
        {
            "name": "paymentDate",
            "baseName": "PaymentDate",
            "type": "string"
        },
        {
            "name": "payslipMessage",
            "baseName": "PayslipMessage",
            "type": "string"
        },
        {
            "name": "updatedDateUTC",
            "baseName": "UpdatedDateUTC",
            "type": "Date"
        },
        {
            "name": "payslips",
            "baseName": "Payslips",
            "type": "Array<PayslipSummary>"
        },
        {
            "name": "wages",
            "baseName": "Wages",
            "type": "number"
        },
        {
            "name": "deductions",
            "baseName": "Deductions",
            "type": "number"
        },
        {
            "name": "tax",
            "baseName": "Tax",
            "type": "number"
        },
        {
            "name": "_super",
            "baseName": "Super",
            "type": "number"
        },
        {
            "name": "reimbursement",
            "baseName": "Reimbursement",
            "type": "number"
        },
        {
            "name": "netPay",
            "baseName": "NetPay",
            "type": "number"
        },
        {
            "name": "validationErrors",
            "baseName": "ValidationErrors",
            "type": "Array<ValidationError>"
        }    ];

    static getAttributeTypeMap() {
        return PayRun.attributeTypeMap;
    }
}

