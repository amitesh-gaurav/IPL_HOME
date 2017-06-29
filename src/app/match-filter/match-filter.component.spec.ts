import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchFilterComponent } from './match-filter.component';

describe('MatchFilterComponent', () => {
  let component: MatchFilterComponent;
  let fixture: ComponentFixture<MatchFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
