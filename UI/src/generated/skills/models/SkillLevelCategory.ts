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
import {
    SkillCategory,
    SkillCategoryFromJSON,
    SkillCategoryFromJSONTyped,
    SkillCategoryToJSON,
} from './SkillCategory';
import {
    SkillCategoryLevelTwo,
    SkillCategoryLevelTwoFromJSON,
    SkillCategoryLevelTwoFromJSONTyped,
    SkillCategoryLevelTwoToJSON,
} from './SkillCategoryLevelTwo';
import {
    SkillLevel,
    SkillLevelFromJSON,
    SkillLevelFromJSONTyped,
    SkillLevelToJSON,
} from './SkillLevel';

/**
 * 
 * @export
 * @interface SkillLevelCategory
 */
export interface SkillLevelCategory {
    /**
     * 
     * @type {string}
     * @memberof SkillLevelCategory
     */
    title: string;
    /**
     * 
     * @type {SkillLevel}
     * @memberof SkillLevelCategory
     */
    levelOne: SkillLevel;
    /**
     * 
     * @type {SkillCategoryLevelTwo}
     * @memberof SkillLevelCategory
     */
    levelTwo: SkillCategoryLevelTwo | null;
    /**
     * 
     * @type {SkillCategoryLevelTwo}
     * @memberof SkillLevelCategory
     */
    levelThree: SkillCategoryLevelTwo | null;
    /**
     * 
     * @type {SkillCategoryLevelTwo}
     * @memberof SkillLevelCategory
     */
    levelFour: SkillCategoryLevelTwo | null;
    /**
     * 
     * @type {SkillCategoryLevelTwo}
     * @memberof SkillLevelCategory
     */
    levelFive: SkillCategoryLevelTwo | null;
    /**
     * 
     * @type {SkillCategoryLevelTwo}
     * @memberof SkillLevelCategory
     */
    levelSix: SkillCategoryLevelTwo | null;
    /**
     * 
     * @type {SkillCategoryLevelTwo}
     * @memberof SkillLevelCategory
     */
    levelSeven: SkillCategoryLevelTwo | null;
    /**
     * 
     * @type {SkillCategoryLevelTwo}
     * @memberof SkillLevelCategory
     */
    levelEight: SkillCategoryLevelTwo | null;
}

export function SkillLevelCategoryFromJSON(json: any): SkillLevelCategory {
    return SkillLevelCategoryFromJSONTyped(json, false);
}

export function SkillLevelCategoryFromJSONTyped(json: any, ignoreDiscriminator: boolean): SkillLevelCategory {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'title': json['title'],
        'levelOne': SkillLevelFromJSON(json['levelOne']),
        'levelTwo': SkillCategoryLevelTwoFromJSON(json['levelTwo']),
        'levelThree': SkillCategoryLevelTwoFromJSON(json['levelThree']),
        'levelFour': SkillCategoryLevelTwoFromJSON(json['levelFour']),
        'levelFive': SkillCategoryLevelTwoFromJSON(json['levelFive']),
        'levelSix': SkillCategoryLevelTwoFromJSON(json['levelSix']),
        'levelSeven': SkillCategoryLevelTwoFromJSON(json['levelSeven']),
        'levelEight': SkillCategoryLevelTwoFromJSON(json['levelEight']),
    };
}

export function SkillLevelCategoryToJSON(value?: SkillLevelCategory | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'title': value.title,
        'levelOne': SkillLevelToJSON(value.levelOne),
        'levelTwo': SkillCategoryLevelTwoToJSON(value.levelTwo),
        'levelThree': SkillCategoryLevelTwoToJSON(value.levelThree),
        'levelFour': SkillCategoryLevelTwoToJSON(value.levelFour),
        'levelFive': SkillCategoryLevelTwoToJSON(value.levelFive),
        'levelSix': SkillCategoryLevelTwoToJSON(value.levelSix),
        'levelSeven': SkillCategoryLevelTwoToJSON(value.levelSeven),
        'levelEight': SkillCategoryLevelTwoToJSON(value.levelEight),
    };
}

