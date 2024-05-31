import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { CompendiumRoutingModule } from '../pq2/compendium-routing.module';
import { FusionDataService } from '../pq2/fusion-data.service';

import { COMPENDIUM_CONFIG, FUSION_DATA_SERVICE, FUSION_TRIO_SERVICE } from '../compendium/constants';
import { PQCompendiumModule } from '../pq2/pq-compendium.module';
import { CompendiumConfig } from '../pq2/models';

import COMP_CONFIG_JSON from './data/comp-config.json';
import DEMON_DATA_JSON from './data/demon-data.json';
import SKILL_DATA_JSON from './data/skill-data.json';
import DLC_DATA_JSON from './data/dlc-data.json';
import SPECIAL_RECIPES_JSON from './data/special-recipes.json';
import FUSION_PREREQS_JSON from './data/fusion-prereqs.json';
import FUSION_CHART_JSON from './data/fusion-chart.json';
import DEMON_UNLOCKS_JSON from './data/demon-unlocks.json';

function estimatePrice(stats: number[]) {
  const statSum = 1.5*stats[0] + 1*stats[1] + 0.75*stats[2] + 0.75*stats[3];
  const price = 1164 + -2.29*statSum + 0.075*statSum**2;
  return Math.floor(price);
}

function createCompConfig(): CompendiumConfig {
  const resistElems = COMP_CONFIG_JSON.resistElems;
  const skillElems = resistElems.concat(COMP_CONFIG_JSON.skillElems);
  const races = [];
  const inheritTypes: { [elem: string]: number } = {};

  for(const race of COMP_CONFIG_JSON.races) {
    races.push(race);
    races.push(race + ' P');
  }

  for (const demon of Object.values(DEMON_DATA_JSON)) {
    demon['code'] = 1;
    demon['inherit'] = 'alm';
    demon['skills'] = {};
    demon['skills'][demon.skill] = 0.1;
    demon['price'] = estimatePrice(demon.stats);
  }

  for (const demon of Object.values(DLC_DATA_JSON)) {
    demon['inherit'] = 'alm';
    demon['skills'] = {};
    demon['skills'][demon.skill] = 0.1;
    demon['price'] = estimatePrice(demon.stats);
  }

  for (const [dname, prereq] of Object.entries(FUSION_PREREQS_JSON)) {
    DEMON_DATA_JSON[dname]['prereq'] = prereq;
  }

  const COST_MP = 3 << 10;

  for (const skill of Object.values(SKILL_DATA_JSON)) {
    skill['cost'] = skill['cost'] ? skill['cost'] + COST_MP - 1000 : 0,
    skill['code'] = 1;
  }

  for (const [elem, inherits] of Object.entries(COMP_CONFIG_JSON.inheritTypes)) {
    inheritTypes[elem] = parseInt(inherits, 2);
  }

  return {
    appTitle: 'Persona 5 Tactica',
    translations: { en: [] },
    lang: 'en',
    races,
    raceOrder: races.reduce((acc, x, i) => { acc[x] = i; return acc }, {}),
    appCssClasses: ['p5t'],

    skillData: SKILL_DATA_JSON,
    skillElems,
    ailmentElems: COMP_CONFIG_JSON.ailments,
    elemOrder: skillElems.reduce((acc, x, i) => { acc[x] = i; return acc }, {}),
    resistCodes: COMP_CONFIG_JSON.resistCodes,

    demonData: Object.assign(DEMON_DATA_JSON, DLC_DATA_JSON),
    baseStats: ['HP', 'MP', 'MD', 'GD'],
    resistElems,
    inheritTypes,
    inheritElems: COMP_CONFIG_JSON.inheritElems,

    enemyData: [],
    enemyStats: ['HP', 'Atk', 'Def'],

    demonUnlocks: DEMON_UNLOCKS_JSON,
    normalTable: FUSION_CHART_JSON,
    hasTripleFusion: false,
    hasDemonResists: false,
    hasSkillRanks: false,
    hasEnemies: false,
    hasQrcodes: false,
    specialRecipes: SPECIAL_RECIPES_JSON,

    defaultDemon: 'Pixie',
    settingsKey: 'p5t-fusion-tool-settings',
    settingsVersion: 2401131500
  };
}

const SMT_COMP_CONFIG = createCompConfig();

@NgModule({
  imports: [
    CommonModule,
    PQCompendiumModule,
    CompendiumRoutingModule
  ],
  providers: [
    Title,
    FusionDataService,
    [{ provide: FUSION_DATA_SERVICE, useExisting: FusionDataService }],
    [{ provide: FUSION_TRIO_SERVICE, useExisting: FusionDataService }],
    [{ provide: COMPENDIUM_CONFIG, useValue: SMT_COMP_CONFIG }],
  ]
})
export class CompendiumModule { }
