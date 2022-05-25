import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { GithubSearchModule } from 'projects/github-search/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconComponent } from './icons/icon.component';
import { GhsOverlayModule } from './overlay/overlay.module';
import { SearchInputComponent } from './search/search-input/search-input.component';
import { SearchResultsComponent } from './search/search-results/search-results.component';
import { AdvancedSearchComponent } from './search/search-input/advanced-search/advanced-search.component';
import { PaginationComponent } from './search/search-results/pagination/pagination.component';
import { SortingComponent } from './search/search-results/sorting/sorting.component';

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
    AdvancedSearchComponent,
    PaginationComponent,
    SortingComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
