import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTracksComponent } from './client-tracks.component';

describe('ClientTracksComponent', () => {
  let component: ClientTracksComponent;
  let fixture: ComponentFixture<ClientTracksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientTracksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
