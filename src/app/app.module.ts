import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MatchHistoryComponent } from './match-history/match-history.component';
import { MatchDataService } from './match-data.service';
import { MatchDetailsComponent } from './match-details/match-details.component';
import { ShortTeamNamePipe } from './short-team-name.pipe';
import { UserFriendlyDatePipe } from './user-friendly-date.pipe';
import { MatchListComponent } from './match-list/match-list.component';
import { MatchStatsComponent } from './match-stats/match-stats.component';
import { MatchFilterComponent } from './match-filter/match-filter.component';
import { MatchSorterComponent } from './match-sorter/match-sorter.component';
import { UserFriendlyParamNamePipe } from './user-friendly-param-name.pipe';
import { SearchableDropdownComponent } from './searchable-dropdown/searchable-dropdown.component';
import { DatePickerComponent } from './date-picker/date-picker.component';


@NgModule({
  declarations: [
    AppComponent,
    MatchHistoryComponent,
    MatchDetailsComponent,
    ShortTeamNamePipe,
    UserFriendlyDatePipe,
    MatchListComponent,
    MatchStatsComponent,
    MatchFilterComponent,
    MatchSorterComponent,
    UserFriendlyParamNamePipe,
    SearchableDropdownComponent,
    DatePickerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [MatchDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
