import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDemandListComponent } from './admin-demand-list.component';

describe('AdminDemandListComponent', () => {
  let component: AdminDemandListComponent;
  let fixture: ComponentFixture<AdminDemandListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDemandListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDemandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
