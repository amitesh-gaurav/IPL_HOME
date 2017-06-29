import { TestBed, inject } from '@angular/core/testing';

import { MatchDataService } from './match-data.service';

describe('MatchDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchDataService]
    });
  });

  it('should be created', inject([MatchDataService], (service: MatchDataService) => {
    expect(service).toBeTruthy();
  }));
});
