import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NominatePage } from './nominate.page';

describe('NominatePage', () => {
  let component: NominatePage;
  let fixture: ComponentFixture<NominatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NominatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
