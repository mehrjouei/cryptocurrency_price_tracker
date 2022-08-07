import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  it('should show menu on menu click', () => {
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.menu-open-btn i').click();
    fixture.detectChanges();
    const menuElement = fixture.nativeElement.querySelector(
      '.menu'
    ) as HTMLElement;
    expect(menuElement.classList.contains('menuVisible')).toBeTrue();
  });
});
