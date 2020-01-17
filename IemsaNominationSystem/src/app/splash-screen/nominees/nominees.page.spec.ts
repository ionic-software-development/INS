import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NomineesPage } from './nominees.page';

describe('NomineesPage', () => {
  let component: NomineesPage;
  let fixture: ComponentFixture<NomineesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NomineesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NomineesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
