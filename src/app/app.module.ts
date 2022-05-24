import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { GithubSearchModule } from 'projects/github-search/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconComponent } from './icons/icon.component';
import { GhsOverlayModule } from './overlay/overlay.module';
import { SearchInputComponent } from './search-input/search-input.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { AdvancedSearchComponent } from './search-input/advanced-search/advanced-search.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    GithubSearchModule,
    GhsOverlayModule
  ],
  declarations: [
    AppComponent,
    IconComponent,
    SearchInputComponent,
    SearchResultsComponent,
    AdvancedSearchComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
