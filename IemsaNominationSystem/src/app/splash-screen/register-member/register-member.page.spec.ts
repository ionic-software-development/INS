import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterMemberPage } from './register-member.page';

describe('RegisterMemberPage', () => {
  let component: RegisterMemberPage;
  let fixture: ComponentFixture<RegisterMemberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterMemberPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterMemberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
