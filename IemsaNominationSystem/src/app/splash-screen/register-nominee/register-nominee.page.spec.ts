import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterNomineePage } from './register-nominee.page';

describe('RegisterNomineePage', () => {
  let component: RegisterNomineePage;
  let fixture: ComponentFixture<RegisterNomineePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterNomineePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterNomineePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
