/* tslint:disable */
/* eslint-disable */
/**
 * Skills Matrix
 * data for Skills Matrix
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface HealthControllerCheck200ResponseInfoValue
 */
export interface HealthControllerCheck200ResponseInfoValue {
    [key: string]: string | any;
    /**
     * 
     * @type {string}
     * @memberof HealthControllerCheck200ResponseInfoValue
     */
    status?: string;
}

export function HealthControllerCheck200ResponseInfoValueFromJSON(json: any): HealthControllerCheck200ResponseInfoValue {
    return HealthControllerCheck200ResponseInfoValueFromJSONTyped(json, false);
}

export function HealthControllerCheck200ResponseInfoValueFromJSONTyped(json: any, ignoreDiscriminator: boolean): HealthControllerCheck200ResponseInfoValue {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
            ...json,
        'status': !exists(json, 'status') ? undefined : json['status'],
    };
}

export function HealthControllerCheck200ResponseInfoValueToJSON(value?: HealthControllerCheck200ResponseInfoValue | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
            ...value,
        'status': value.status,
    };
}

