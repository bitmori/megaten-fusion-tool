import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SharedCompendiumModule } from '../compendium/compendium.module';
import { CompendiumRoutingModule } from './compendium-routing.module';

import { CompendiumComponent } from './components/compendium.component';
import { DemonListContainerComponent } from './components/demon-list.component';
import { SkillListContainerComponent } from './components/skill-list.component';
import { FusionSettingsContainerComponent } from './components/fusion-settings.component';
import { DemonEntryComponent, DemonEntryContainerComponent } from './components/demon-entry.component';
import { FusionChartContainerComponent } from './components/fusion-chart.component';
import { RecipeGeneratorContainerComponent } from './components/recipe-generator.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SharedCompendiumModule,
    CompendiumRoutingModule
  ],
  declarations: [
    CompendiumComponent,
    DemonListContainerComponent,
    SkillListContainerComponent,
    DemonEntryComponent,
    DemonEntryContainerComponent,
    FusionSettingsContainerComponent,
    FusionChartContainerComponent,
    RecipeGeneratorContainerComponent
  ],
  exports: [
    CompendiumComponent,
    DemonListContainerComponent,
    SkillListContainerComponent,
    DemonEntryComponent,
    DemonEntryContainerComponent,
    FusionSettingsContainerComponent,
    FusionChartContainerComponent,
    RecipeGeneratorContainerComponent
  ],
})
export class Smt4CompendiumModule {
  static forRoot(): ModuleWithProviders<Smt4CompendiumModule> {
    return {
      ngModule: Smt4CompendiumModule
    };
  }
}
