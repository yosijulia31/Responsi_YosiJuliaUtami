import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToyPage } from './toy.page';

describe('ToyPage', () => {
  let component: ToyPage;
  let fixture: ComponentFixture<ToyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ToyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
