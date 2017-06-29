import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchSorterComponent } from './match-sorter.component';

describe('MatchSorterComponent', () => {
  let component: MatchSorterComponent;
  let fixture: ComponentFixture<MatchSorterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchSorterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchSorterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
